"use client"

import { useState } from "react"
import { FileText, Loader2, Upload, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { getApiError, getFlaskApiUrl, type ExtractedSkill, type ResumeExtractionResponse, type ResumeUploadResponse } from "@/lib/resume-api"

const MAX_BYTES = 10 * 1024 * 1024
const ACCEPTED = ".pdf,.docx,.txt"

function ResumeWorkspace() {
  const [file, setFile] = useState<File | null>(null)
  const [skills, setSkills] = useState<ExtractedSkill[]>([])
  const [text, setText] = useState("")
  const [status, setStatus] = useState<"idle" | "uploading" | "extracting" | "ready" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleUpload() {
    if (!file) return
    const apiUrl = getFlaskApiUrl()
    if (!apiUrl) { setStatus("error"); setMessage("Resume intelligence is not connected yet. Configure NEXT_PUBLIC_FLASK_API_URL for the separate Flask service."); return }
    setStatus("uploading"); setMessage("")
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.access_token) { setStatus("error"); setMessage("Your session has expired. Please log in again."); return }
    try {
      const uploadResponse = await fetch(`${apiUrl}/api/resumes`, { method: "POST", headers: { Authorization: `Bearer ${session.access_token}` }, body: (() => { const form = new FormData(); form.append("file", file); return form })() })
      const uploadBody = await uploadResponse.json() as ResumeUploadResponse | { error?: string }
      if (!uploadResponse.ok || !("resume" in uploadBody)) throw new Error(getApiError(uploadBody, "Upload failed."))
      setStatus("extracting")
      const extractionResponse = await fetch(`${apiUrl}/api/resumes/${uploadBody.resume.id}/extract`, { method: "POST", headers: { Authorization: `Bearer ${session.access_token}` } })
      const extractionBody = await extractionResponse.json() as ResumeExtractionResponse | { error?: string }
      if (!extractionResponse.ok || !("skills" in extractionBody)) throw new Error(getApiError(extractionBody, "Extraction failed."))
      setSkills(extractionBody.skills); setText(extractionBody.extractedText); setStatus("ready")
    } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Something went wrong.") }
  }

  function selectFile(next: File | undefined) {
    if (!next) return
    if (!(["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"].includes(next.type))) { setStatus("error"); setMessage("Choose a PDF, DOCX, or TXT file."); return }
    if (next.size > MAX_BYTES) { setStatus("error"); setMessage("Resume must be smaller than 10 MB."); return }
    setFile(next); setStatus("idle"); setMessage(""); setSkills([]); setText("")
  }

  return <AppShell title="Resume & Skills" description="Turn your resume into verified career intelligence." backHref="/dashboard" backLabel="Back to dashboard">
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Upload /></div><div><CardTitle>Upload your resume</CardTitle><CardDescription>PDF, DOCX, or TXT up to 10 MB.</CardDescription></div></div></CardHeader>
          <CardContent className="flex flex-col gap-5">
            <label htmlFor="resume-file" className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border p-10 text-center transition-colors hover:border-primary/50 hover:bg-primary/5">
              <FileText className="size-8 text-muted-foreground" /><span className="font-medium">{file?.name ?? "Choose a resume file"}</span><span className="text-sm text-muted-foreground">Your file stays private and is linked to your account.</span>
              <input id="resume-file" type="file" accept={ACCEPTED} className="sr-only" onChange={(event) => selectFile(event.target.files?.[0])} />
            </label>
            <Button size="lg" disabled={!file || status === "uploading" || status === "extracting"} onClick={handleUpload}>{(status === "uploading" || status === "extracting") && <Loader2 className="animate-spin" />}{status === "extracting" ? "Extracting skills..." : status === "uploading" ? "Uploading..." : "Upload and extract skills"}</Button>
            {status === "error" && <div role="alert" className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"><AlertCircle className="mt-0.5 size-4 shrink-0" />{message}</div>}
          </CardContent>
        </Card>
        <Card><CardHeader><div className="flex items-center gap-2"><ShieldCheck className="size-5 text-primary" /><CardTitle>Built for verification</CardTitle></div><CardDescription>Detected skills are evidence-backed suggestions, not automatic claims.</CardDescription></CardHeader><CardContent className="flex flex-col gap-3 text-sm text-muted-foreground"><p>Review the extracted skills before using them in your career analysis.</p><p>Resume files are stored in a private, account-owned Supabase Storage folder.</p><p>AI/NLP extraction remains server-owned so the browser cannot alter confidence or evidence.</p></CardContent></Card>
      </div>
      {status === "ready" && <div className="grid gap-6 lg:grid-cols-2"><Card><CardHeader><div className="flex items-center justify-between"><div><CardTitle>Detected skills</CardTitle><CardDescription>{skills.length} skills found in your resume.</CardDescription></div><CheckCircle2 className="size-5 text-primary" /></div></CardHeader><CardContent className="flex flex-wrap gap-2">{skills.length ? skills.map((skill) => <Badge key={skill.skillId} variant="secondary" className="gap-1.5">{skill.skillName}<span className="text-muted-foreground">{Math.round(skill.confidence * 100)}%</span></Badge>) : <p className="text-sm text-muted-foreground">No catalog skills were detected. You can continue with manual skill verification.</p>}</CardContent></Card><Card><CardHeader><CardTitle>Extracted text preview</CardTitle><CardDescription>Review what the service read from your resume.</CardDescription></CardHeader><CardContent><pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-muted/50 p-4 text-xs leading-relaxed text-muted-foreground">{text || "No text preview returned."}</pre></CardContent></Card></div>}
    </main>
  </AppShell>
}

export default function ResumePage() { return <ProtectedRoute><ResumeWorkspace /></ProtectedRoute> }
