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

        {/* Manual Sign In Button */}
        <button className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded mb-4 font-semibold text-white">
          Sign In
        </button>

        {/* Google Sign In Button */}
        <button
          onClick={() => signIn("google")}
          className="w-full bg-white text-black font-semibold p-3 rounded hover:bg-gray-200 transition"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
