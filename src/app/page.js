"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-slate-900 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">MajorLoad</h1>

        {/* Email Input */}
        <input
          type="email"
          className="w-full p-3 rounded mb-4 bg-slate-800 border border-slate-700 text-white"
          placeholder="Enter your email address"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Email Sign In Button */}
        <button
          onClick={() => {
            if (username) {
              signIn("credentials", { email: username, callbackUrl: "/dashboard" });
            }
          }}
          className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded mb-4 font-semibold text-white"
        >
          Sign In with Email
        </button>
        
        <p className="text-center text-sm text-gray-400">
          No password required - just enter your email
        </p>
      </div>
    </div>
  );
}
