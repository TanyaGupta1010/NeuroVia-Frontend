"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export default function AuthModal({ close }: any) {
  const [isLogin, setIsLogin] = useState(true); // Default to Login based on your request
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleAuth = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }
    localStorage.setItem("userEmail", email);
    close(); 
    router.push("/dashboard"); 
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-[100] transition-all">
      
      <div className="bg-white rounded-[2.5rem] w-full max-w-[440px] p-10 relative shadow-2xl animate-in fade-in zoom-in duration-300">

        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        {/* Branding & Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black tracking-tighter text-black mb-2">
            NeuroVia
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            {isLogin
              ? "Welcome back! Please login to continue."
              : "Sign up for free to start learning today."}
          </p>
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Enter your profile name"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
            />
          )}

          <input
            type="email"
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
          />
        </div>

        {/* Main Action Button */}
        <button
          onClick={handleAuth}
          className="w-full bg-black text-white py-4 rounded-2xl mt-8 font-bold text-lg hover:bg-zinc-800 active:scale-[0.98] transition-all shadow-lg shadow-black/10"
        >
          {isLogin ? "Log In" : "Create Account"}
        </button>

        {/* Toggle link below button */}
        <p className="text-center text-sm mt-6 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-black font-bold cursor-pointer hover:underline underline-offset-4"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </p>

        {/* Divider moved below primary actions */}
        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-gray-100" />
          <span className="px-4 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">OR</span>
          <div className="flex-1 border-t border-gray-100" />
        </div>

        {/* Social Buttons at bottom */}
        <div className="space-y-3">
          <button className="w-full border border-gray-200 py-3 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors text-black font-semibold text-sm">
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <button className="w-full border border-gray-200 py-3 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors text-black font-semibold text-sm">
            <FaFacebookF className="text-blue-600" size={18} />
            Continue with Facebook
          </button>
        </div>

      </div>
    </div>
  );
}