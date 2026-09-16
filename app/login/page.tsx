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

export default function LoginPage() {
  const router = useRouter(); const supabase = createClient()
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false)
  async function submit(event: FormEvent) { event.preventDefault(); setError(""); setLoading(true); const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password }); setLoading(false); if (error) { setError("Invalid email or password. If you just registered, confirm your email first."); return } router.replace(new URLSearchParams(window.location.search).get("next") || "/dashboard") }
  return <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10"><Card className="w-full max-w-md"><CardHeader><LevelUpBrand /><CardTitle className="mt-6">Welcome back</CardTitle><CardDescription>Sign in to your LevelUp career workspace.</CardDescription></CardHeader><CardContent><form onSubmit={submit} className="flex flex-col gap-5">{error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}<div className="flex flex-col gap-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div><div className="flex flex-col gap-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} /></div><Button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button><p className="text-center text-sm text-muted-foreground">New to LevelUp? <Link className="text-primary underline" href="/register">Create an account</Link></p></form></CardContent></Card></main>
}
