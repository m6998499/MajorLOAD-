"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API_BASE_URL from "../../config/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Login failed");
      }

      const data = await res.json();
      // You could store token in localStorage if you want:
      // localStorage.setItem("majorloadToken", data.token);

      router.push("/loadboard");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-10 max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="text-sm text-slate-300">
        Enter your carrier credentials to access the MajorLoad dashboard.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-majorTeal"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-majorTeal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-majorTeal px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
              }
