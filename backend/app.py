import os
import re
import uuid
from datetime import datetime, timezone
from functools import wraps

from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase import create_client, Client
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app, origins=os.getenv("FRONTEND_ORIGIN", "http://localhost:3000"), supports_credentials=True)

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.environ["SUPABASE_SECRET_KEY"]
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
ALLOWED_TYPES = {"application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"}
MAX_BYTES = 10 * 1024 * 1024


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
    content = upload.read()
    if len(content) > MAX_BYTES:
        return jsonify(error="Resume must be smaller than 10 MB."), 413
    filename = secure_filename(upload.filename)
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
    if result.data["mime_type"] != "text/plain":
        return jsonify(error="Text extraction for PDF and DOCX is enabled in the deployment worker. This local service currently accepts TXT extraction only."), 422
    try:
        raw = supabase.storage.from_("resumes").download(result.data["storage_path"]).decode("utf-8", errors="ignore")
        skills = supabase.table("skills").select("id,name,category").execute().data
        lower = raw.lower()
        detected = [{"skillId": item["id"], "skillName": item["name"], "category": item["category"], "confidence": 0.98, "evidence": item["name"], "source": "resume"} for item in skills if re.search(r"(?<![a-z0-9])" + re.escape(item["name"].lower()) + r"(?![a-z0-9])", lower)]
        supabase.table("resumes").update({"extracted_text": raw, "status": "ready", "updated_at": datetime.now(timezone.utc).isoformat()}).eq("id", resume_id).eq("user_id", request.user.id).execute()
        return jsonify(resumeId=resume_id, extractedText=raw, skills=detected)
    except Exception:
        return jsonify(error="Resume extraction failed. The file is still stored safely."), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")))
