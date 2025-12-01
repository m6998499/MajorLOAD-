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

        {/* Username */}
        <input
          className="w-full p-3 rounded mb-3 bg-slate-800 border border-slate-700"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          className="w-full p-3 rounded mb-4 bg-slate-800 border border-slate-700"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Sign in button */}
        <button className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded mb-4">
          Sign In
        </button>

        {/* Google auth - FIXED: Added callbackUrl to redirect to /loadboard */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/loadboard" })}
          className="w-full bg-white text-black font-semibold p-3 rounded"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
<button
          onClick={() => signIn("google")}
          className="w-full bg-white text-black font-semibold p-3 rounded"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
