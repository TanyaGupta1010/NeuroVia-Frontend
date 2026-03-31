"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isLogin && !name) {
      setError("Please enter your name.");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const data = await api.login(email, password);
        if (data.error) {
          setError(data.error);
          return;
        }
        // Store session info
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userName", data.user.name || email.split("@")[0]);
        router.push("/dashboard");
      } else {
        const data = await api.register(email, password, name);
        if (data.error) {
          setError(data.error);
          return;
        }
        // Auto-login after register
        const loginData = await api.login(email, password);
        if (loginData.token) {
          localStorage.setItem("token", loginData.token);
          localStorage.setItem("userId", loginData.user.id);
          localStorage.setItem("userEmail", loginData.user.email);
          localStorage.setItem("userName", loginData.user.name || name);
          router.push("/dashboard");
        } else {
          setIsLogin(true);
          setError("Registered! Please log in.");
        }
      }
    } catch {
      setError("Something went wrong. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f4fa] via-white to-[#f0f4ff]">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[420px] border border-gray-100">
        {/* Logo & heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#139fd6] to-[#0d7ba8] mb-4 shadow-lg">
            <span className="text-white text-2xl font-black">N</span>
          </div>
          <h1 className="text-2xl font-black text-black tracking-tight">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {isLogin ? "Log in to continue learning" : "Start your learning journey today"}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
          <button
            onClick={() => { setIsLogin(true); setError(""); }}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
              isLogin ? "bg-white text-black shadow-sm" : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(""); }}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
              !isLogin ? "bg-white text-black shadow-sm" : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-200 bg-gray-50 p-3.5 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#139fd6] focus:border-transparent transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-200 bg-gray-50 p-3.5 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#139fd6] focus:border-transparent transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className="w-full border border-gray-200 bg-gray-50 p-3.5 pr-12 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#139fd6] focus:border-transparent transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#139fd6] to-[#0d7ba8] text-white py-3.5 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-blue-200 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {isLogin ? "Logging in..." : "Creating account..."}
              </>
            ) : (
              isLogin ? "Log In" : "Create Account"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
