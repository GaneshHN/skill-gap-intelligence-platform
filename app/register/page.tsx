"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LevelUpBrand } from "@/components/app-shell"
import { createClient } from "@/lib/supabase/client"

export default function RegisterPage() {
  const router = useRouter(); const supabase = createClient(); const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [confirm, setConfirm] = useState(""); const [error, setError] = useState(""); const [success, setSuccess] = useState(""); const [loading, setLoading] = useState(false)
  async function submit(event: FormEvent) { event.preventDefault(); setError(""); if (password.length < 8) return setError("Password must be at least 8 characters."); if (password !== confirm) return setError("Passwords do not match."); setLoading(true); const { data, error } = await supabase.auth.signUp({ email: email.trim(), password, options: { data: { name: name.trim() }, emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback` } }); setLoading(false); if (error) { setError(error.message.toLowerCase().includes("already") ? "An account with this email already exists." : "Unable to create your account. Please check your details and try again."); return } if (data.session) router.replace("/dashboard"); else setSuccess("Account created. Check your email to confirm your account, then sign in.") }
  return <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10"><Card className="w-full max-w-md"><CardHeader><LevelUpBrand /><CardTitle className="mt-6">Create your account</CardTitle><CardDescription>Start building your personalized career intelligence profile.</CardDescription></CardHeader><CardContent><form onSubmit={submit} className="flex flex-col gap-5">{error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}{success && <Alert><AlertDescription>{success}</AlertDescription></Alert>}<div className="flex flex-col gap-2"><Label htmlFor="name">Full Name</Label><Input id="name" required value={name} onChange={(e) => setName(e.target.value)} /></div><div className="flex flex-col gap-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div><div className="flex flex-col gap-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} /></div><div className="flex flex-col gap-2"><Label htmlFor="confirm">Confirm Password</Label><Input id="confirm" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} /></div><Button type="submit" disabled={loading}>{loading ? "Creating account..." : "Create account"}</Button><p className="text-center text-sm text-muted-foreground">Already registered? <Link className="text-primary underline" href="/login">Sign in</Link></p></form></CardContent></Card></main>
}
