import os
import re
import uuid
from datetime import datetime, timezone
from functools import wraps

from io import BytesIO

from flask import Flask, jsonify, request
from flask_cors import CORS
from pypdf import PdfReader
from docx import Document
from supabase import create_client, Client
from werkzeug.utils import secure_filename

app = Flask(__name__)
FRONTEND_ORIGINS = [origin.strip() for origin in os.getenv("FRONTEND_ORIGINS", os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")).split(",") if origin.strip()]
CORS(app, origins=FRONTEND_ORIGINS, supports_credentials=True)

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.getenv("SUPABASE_SECRET_KEY") or os.getenv("SUPABASE_SERVICE_ROLE_KEY")
if not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_SECRET_KEY is required for the resume service")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
ALLOWED_TYPES = {"application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"}
MAX_BYTES = int(os.getenv("MAX_RESUME_BYTES", str(10 * 1024 * 1024)))
MAX_TEXT_CHARS = 250_000


def extract_text(content: bytes, mime_type: str) -> str:
    if mime_type == "text/plain":
        text = content.decode("utf-8-sig", errors="replace")
    elif mime_type == "application/pdf":
        text = "\n".join(page.extract_text() or "" for page in PdfReader(BytesIO(content)).pages)
    elif mime_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        document = Document(BytesIO(content))
        text = "\n".join(paragraph.text for paragraph in document.paragraphs)
    else:
        raise ValueError("Unsupported document type")
    text = re.sub(r"\\s+", " ", text).strip()
    if not text:
        raise ValueError("The resume does not contain readable text")
    return text[:MAX_TEXT_CHARS]


def find_skills(text: str, skills: list[dict]) -> list[dict]:
    normalized = text.casefold()
    detected = []
    for skill in skills:
        name = str(skill.get("name", "")).strip()
        if not name:
            continue
        pattern = r"(?<![a-z0-9])" + re.escape(name.casefold()) + r"(?![a-z0-9])"
        match = re.search(pattern, normalized)
        if match:
            start = max(0, match.start() - 45)
            end = min(len(text), match.end() + 75)
            detected.append({"skillId": skill["id"], "skillName": name, "category": skill.get("category", "general"), "confidence": 0.98, "evidence": text[start:end].strip(), "source": "resume"})
    return detected


def require_user(handler):
    @wraps(handler)
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization", "").removeprefix("Bearer ").strip()
        if not token:
            return jsonify(error="Authentication required"), 401
        try:
            user = supabase.auth.get_user(token).user
            if not user:
                raise ValueError("No user")
            request.user = user
        except Exception:
            return jsonify(error="Authentication required"), 401
        return handler(*args, **kwargs)
    return wrapper


@app.get("/health")
def health():
    return jsonify(status="ok", service="levelup-resume-intelligence")


@app.post("/api/resumes")
@require_user
def upload_resume():
    upload = request.files.get("file")
    if not upload or not upload.filename:
        return jsonify(error="Choose a resume file first."), 400
    if upload.mimetype not in ALLOWED_TYPES:
        return jsonify(error="Only PDF, DOCX, or TXT resumes are supported."), 415
    content = upload.read(MAX_BYTES + 1)
    if not content:
        return jsonify(error="The selected resume is empty."), 400
    if len(content) > MAX_BYTES:
        return jsonify(error="Resume must be smaller than 10 MB."), 413
    filename = secure_filename(upload.filename)
    if not filename or filename in {".", ".."}:
        return jsonify(error="The resume filename is invalid."), 400
    path = f"{request.user.id}/{uuid.uuid4()}-{filename}"
    try:
        supabase.storage.from_("resumes").upload(path, content, {"content-type": upload.mimetype, "upsert": "false"})
        row = {"user_id": request.user.id, "file_name": filename, "storage_path": path, "mime_type": upload.mimetype, "file_size": len(content), "status": "uploaded"}
        saved = supabase.table("resumes").insert(row).execute().data[0]
        return jsonify(resume={"id": saved["id"], "fileName": filename, "status": saved["status"], "fileSize": len(content)}), 201
    except Exception:
        return jsonify(error="The resume could not be uploaded. Please try again."), 500


@app.post("/api/resumes/<resume_id>/extract")
@require_user
def extract_resume(resume_id):
    result = supabase.table("resumes").select("id,file_name,storage_path,mime_type,user_id").eq("id", resume_id).eq("user_id", request.user.id).maybe_single().execute()
    if not result.data:
        return jsonify(error="Resume not found."), 404
    try:
        content = supabase.storage.from_("resumes").download(result.data["storage_path"])
        raw = extract_text(content, result.data["mime_type"])
        skills = supabase.table("skills").select("id,name,category").execute().data or []
        detected = find_skills(raw, skills)
        supabase.table("resumes").update({"extracted_text": raw, "status": "ready", "error_message": None, "updated_at": datetime.now(timezone.utc).isoformat()}).eq("id", resume_id).eq("user_id", request.user.id).execute()
        return jsonify(resumeId=resume_id, extractedText=raw, skills=detected)
    except ValueError as error:
        supabase.table("resumes").update({"status": "failed", "error_message": str(error), "updated_at": datetime.now(timezone.utc).isoformat()}).eq("id", resume_id).eq("user_id", request.user.id).execute()
        return jsonify(error=str(error)), 422
    except Exception:
        supabase.table("resumes").update({"status": "failed", "error_message": "Extraction failed", "updated_at": datetime.now(timezone.utc).isoformat()}).eq("id", resume_id).eq("user_id", request.user.id).execute()
        return jsonify(error="Resume extraction failed. The file is still stored safely."), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")))
