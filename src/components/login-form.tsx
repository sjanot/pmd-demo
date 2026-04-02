"use client";

import { useState } from "react";
import { Cross, LogIn, Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  onLogin: () => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Vyplňte e-mail a heslo.");
      return;
    }

    setLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      if (email === "demo@pmd.sk" && password === "demo123") {
        onLogin();
      } else {
        setError("Nesprávny e-mail alebo heslo.");
        setLoading(false);
      }
    }, 800);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary to-primary-light px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Cross className="mx-auto h-10 w-10 text-gold" />
          <h1 className="mt-3 text-xl font-bold text-white">
            Pápežské misijné diela
          </h1>
          <p className="mt-1 text-sm text-white/60">Správa databázy kontaktov</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-white/10 bg-card p-6 shadow-2xl"
        >
          <h2 className="mb-4 text-center text-sm font-semibold text-foreground">
            Prihlásenie
          </h2>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs text-muted">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vas@email.sk"
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-muted">Heslo</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-10 w-full rounded-md border border-border bg-background px-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-3 rounded-md bg-accent/10 px-3 py-2 text-xs text-accent">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-white transition-colors hover:bg-primary-light disabled:opacity-60"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Prihlásiť sa
              </>
            )}
          </button>

          <div className="relative my-4 flex items-center">
            <div className="flex-1 border-t border-border" />
            <span className="px-3 text-xs text-muted">alebo</span>
            <div className="flex-1 border-t border-border" />
          </div>

          <button
            type="button"
            onClick={() => {
              setLoading(true);
              setTimeout(() => onLogin(), 800);
            }}
            disabled={loading}
            className="flex h-10 w-full items-center justify-center gap-3 rounded-md border border-border bg-white text-sm font-medium text-foreground transition-colors hover:bg-muted-bg disabled:opacity-60"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Prihlásiť cez Google
          </button>

          <div className="mt-4 rounded-md bg-muted-bg p-3">
            <p className="text-xs font-medium text-muted">Demo prístupy:</p>
            <p className="mt-1 font-mono text-xs text-foreground">
              demo@pmd.sk / demo123
            </p>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-white/40">
          Demo verzia — it-dk.sk
        </p>
      </div>
    </div>
  );
}
