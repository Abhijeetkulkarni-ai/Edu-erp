"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"
import {
  BarChart3,
  ClipboardCheck,
  CreditCard,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  LogIn,
  Mail
} from "lucide-react"

/* -----------------------------------------------------------
   Demo login (no backend)
   The sign-in below only checks these demo values in the browser
   and then opens the demo dashboard. It is not real security, so
   never reuse this pattern for a production app.
------------------------------------------------------------ */
const DEMO = {
  institute: "institute1",
  instituteLabel: "Institute One",
  email: "demo@yourdomain.com",
  password: "Demo@12345",
}

/* Aarohan wordmark: bold name + yellow dot, "LEARNING" underneath. */
function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="leading-none">
      <div className="flex items-start">
        <span
          className={`text-2xl font-bold tracking-tight ${dark ? "text-slate-900" : "text-white"}`}
        >
          AAROHAN
        </span>
        <span className="ml-1 mt-0.5 h-2.5 w-2.5 rounded-full bg-yellow-400" aria-hidden="true" />
      </div>
      <div
        className={`mt-1.5 text-[10px] font-medium tracking-[0.3em] ${dark ? "text-slate-500" : "text-slate-400"}`}
      >
        LEARNING
      </div>
    </div>
  )
}

const HIGHLIGHTS = [
  { icon: ClipboardCheck, title: "Admissions to attendance", text: "Every student record in one place." },
  { icon: CreditCard, title: "Fees without the chasing", text: "Track dues, receipts and reminders." },
  { icon: BarChart3, title: "Reports in one click", text: "See how every class and branch is doing." },
]

export default function LoginPage() {
  const router = useRouter()
  const [institute, setInstitute] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const fillDemo = () => {
    setInstitute(DEMO.institute)
    setEmail(DEMO.email)
    setPassword(DEMO.password)
    setError("")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!institute || !email || !password) {
      setError("All fields are required")
      return
    }

    setError("")
    setLoading(true)

    // Short pause so the sign-in feels real, then check the demo values.
    window.setTimeout(() => {
      const valid =
        institute === DEMO.institute &&
        email.trim().toLowerCase() === DEMO.email.toLowerCase() &&
        password === DEMO.password

      if (valid) {
        router.push("/dashboard")
      } else {
        setError("Those details don't match the demo account. Use the demo login below.")
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel (desktop only) */}
      <aside className="relative hidden overflow-hidden bg-slate-950 text-white lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
        {/* Soft glow + grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 20% 0%, rgba(37,99,235,0.45), transparent 70%), radial-gradient(40% 40% at 100% 100%, rgba(250,204,21,0.18), transparent 70%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "auto, auto, 44px 44px, 44px 44px",
          }}
        />

        <div className="relative">
          <Logo />
        </div>

        <div className="relative max-w-lg">
          <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight xl:text-5xl">
            Run your whole institute from one place.
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Sign in to manage students, staff, fees and reports without the paperwork.
          </p>

          <ul className="mt-10 space-y-6">
            {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                  <Icon className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-slate-400">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-slate-500">
          © {new Date().getFullYear()} Aarohan Learning. All rights reserved.
        </p>
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <Logo dark />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in with your institute account to continue.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5" noValidate>
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="institute">Institute</Label>
              <Select value={institute} onValueChange={setInstitute} required>
                <SelectTrigger id="institute" className="h-11 rounded-lg">
                  <SelectValue placeholder="Select your institute" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="institute1">Institute One</SelectItem>
                  <SelectItem value="institute2">Institute Two</SelectItem>
                  <SelectItem value="institute3">Institute Three</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@school.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-lg pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-lg pl-10 pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-blue-600 text-base font-medium hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" /> Sign in
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>

          <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                  <KeyRound className="h-4 w-4 text-blue-600" />
                  Try the demo
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={fillDemo}
                  className="h-8 rounded-md border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
                >
                  Fill details
                </Button>
              </div>

              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-500">Institute</dt>
                  <dd className="font-medium text-slate-800">{DEMO.instituteLabel}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-500">Email</dt>
                  <dd className="break-all text-right font-mono text-xs text-slate-800 sm:text-[13px]">
                    {DEMO.email}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-500">Password</dt>
                  <dd className="font-mono text-xs text-slate-800 sm:text-[13px]">{DEMO.password}</dd>
                </div>
              </dl>

              <p className="mt-3 text-xs text-slate-500">
                Sample data only. Changes made in the demo may be reset.
              </p>
            </div>
        </div>
      </main>
    </div>
  )
}