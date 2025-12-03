"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-slate-900 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">MajorLoad</h1>

        {/* Username Input */}
        <input
          className="w-full p-3 rounded mb-3 bg-slate-800 border border-slate-700 text-white"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          className="w-full p-3 rounded mb-4 bg-slate-800 border border-slate-700 text-white"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Manual Sign In Button */}
        <button 
          disabled={isLoading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded mb-4 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        {/* Google Sign In Button - Redirects to Load Board */}
        <button
          onClick={async () => {
            setIsLoading(true);
            setError("");
            try {
              await signIn("google", { callbackUrl: "/loadboard" });
            } catch (err) {
              setError("Failed to sign in. Please try again.");
            } finally {
              setIsLoading(false);
            }
          }}
          disabled={isLoading}
          className="w-full bg-white text-black font-semibold p-3 rounded hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing in..." : "Continue with Google"}
        </button>
      </div>
    </div>
  );
}
