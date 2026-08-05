"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { saveAuth, getAuth } from "@/app/lib/auth";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const existing = getAuth();
    if (existing) {
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid credentials.");
      }

      saveAuth(data.user);
      toast.success("Login successful");
      window.location.href = "/";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Customer login</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Welcome back</h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Sign in to continue to your Loans Buzz dashboard and view your CIBIL score.
            </p>
            <div className="mt-8 grid gap-4 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-900">Fast access</p>
                <p className="mt-1">Login once and keep your session until you logout.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Secure</p>
                <p className="mt-1">Your information is validated and stored safely.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/30">
            <h2 className="text-2xl font-semibold text-slate-900">Login to your account</h2>
            <p className="mt-2 text-sm text-slate-500">Use your registered email and password.</p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full py-3 text-sm font-semibold">
                {loading ? "Signing in..." : "Login"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">
                Create one.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
