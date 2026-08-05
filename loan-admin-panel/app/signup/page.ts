"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { saveAuth } from "@/app/lib/auth";
import { toast } from "sonner";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed.");
      }

      saveAuth(data.user);
      toast.success("Account created successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Create account</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Join Loans Buzz</h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Register your customer account to save your CIBIL access and return quickly.
            </p>
            <div className="mt-8 grid gap-4 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-900">Quick setup</p>
                <p className="mt-1">Create an account with just a few details.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Stay signed in</p>
                <p className="mt-1">Your login persists until you explicitly logout.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/30">
            <h2 className="text-2xl font-semibold text-slate-900">Create your account</h2>
            <p className="mt-2 text-sm text-slate-500">Use a valid email and secure password.</p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                  Full name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  placeholder="Jane Doe"
                />
              </div>

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
                {loading ? "Creating account..." : "Sign up"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-emerald-600 hover:text-emerald-700">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
