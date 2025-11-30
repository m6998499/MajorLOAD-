"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API_BASE_URL from "../../config/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Login failed. Please try again.");
      }

      const data = await res.json();

      // TODO: store token if you want to keep the user logged in
      // localStorage.setItem("majorload_token", data.token);

      // For now, just go to the load board
      router.push("/loadboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 rounded-2xl bg-cyan-500/90 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <span className="text-2xl font-bold text-white">ML</span>
            {/* You can replace this with a real truck icon/logo image later */}
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-white">MajorLoad</h1>
          <p className="mt-2 text-sm text-slate-300">
            Log in to access the real-time load board
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl shadow-black/60 backdrop-blur-xl px-6 py-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-200">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-200">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="rounded-xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer text */}
          <p className="mt-5 text-center text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="font-medium text-cyan-400 hover:text-cyan-300"
            >
              Contact Sales
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
