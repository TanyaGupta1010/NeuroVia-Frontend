"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email) return;

    localStorage.setItem("userEmail", email);
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-3xl shadow-lg w-96">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Login to NeuroVision
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-3 rounded-xl mb-6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800"
        >
          Login
        </button>

      </div>
    </main>
  );
}
