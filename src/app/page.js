"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMockLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Placeholder for future username/password auth
    try {
      await new Promise((res) => setTimeout(res, 800));
      alert("Username/password login isn’t enabled yet. Please use Google Sign-In.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    // Uses NextAuth Google provider
    signIn("google", {
      callbackUrl: "/dashboard", // where to go after login
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      {/* Top Nav */}
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#020617]/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-cyan-500 flex items-center justify-center text-sm font-bold">
            ML
          </div>
          <span className="text-lg font-semibold">MajorLoad</span>
        </div>

        <nav className="flex items-center gap-6 text-sm text-gray-300">
          {/* Home = login page */}
          <Link href="/" className="hover:text-white">
            Login
          </Link>
          <Link href="/loadboard" className="hover:text-white">
            Load Board
          </Link>
          <Link href="/post-load" className="hover:text-white">
            Post a Load
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-8 shadow-xl shadow-cyan-500/10">
          {/* Logo + heading */}
          <div className="flex flex-col items-center mb-8">
            <div className="h-16 w-16 rounded-2xl bg-cyan-500 flex items-center justify-center text-xl font-bold shadow-lg shadow-cyan-500/40">
              ML
            </div>
            <h1 className="mt-4 text-2xl font-semibold">MajorLoad</h1>
            <p className="mt-1 text-sm text-gray-300">
              Log in to access the real-time load board.
            </p>
          </div>

          {/* Username / Password form (for later) */}
          <form onSubmit={handleMockLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm text-gray-200" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-200" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-300">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-3 w-3 rounded border border-white/20 bg-slate-900"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="text-cyan-400 hover:text-cyan-300"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 w-full rounded-xl bg-cyan-500 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-gray-400">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* GOOGLE SIGN-IN BUTTON */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-slate-900/80 py-2.5 text-sm font-medium text-gray-100 hover:border-cyan-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-slate-900">
              G
            </span>
            <span>Continue with Google</span>
          </button>

          {/* Footer link */}
          <p className="mt-6 text-center text-xs text-gray-400">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="text-cyan-400 hover:text-cyan-300"
            >
              Contact Sales
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
