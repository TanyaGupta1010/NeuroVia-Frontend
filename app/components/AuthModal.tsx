"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export default function AuthModal({ close }: any) {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleAuth = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    // Save email
    localStorage.setItem("userEmail", email);

    close(); // close modal
    router.push("/dashboard"); // redirect
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl w-[420px] p-8 relative">

        {/* Close */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-black text-xl"
        >
          ✕
        </button>

        {/* Toggle */}
        <div className="flex gap-6 mb-6">
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              !isLogin ? "border border-black text-black" : "text-black"
            }`}
          >
            Sign Up
          </button>

          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              isLogin ? "border border-black text-black" : "text-black"
            }`}
          >
            Log In
          </button>
        </div>

        <hr className="mb-6" />

        <h2 className="text-3xl font-bold text-center text-black mb-2">
          NeuroVia
        </h2>

        <p className="text-center text-black mb-6">
          {isLogin
            ? "Welcome back! Please login."
            : "Sign up for free to start learning."}
        </p>

        {/* Social */}
        <button className="w-full border border-gray-300 py-3 rounded-full mb-3 flex items-center justify-center gap-3 hover:bg-gray-100 text-black font-medium">
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <button className="w-full border border-gray-300 py-3 rounded-full mb-6 flex items-center justify-center gap-3 hover:bg-gray-100 text-black font-medium">
          <FaFacebookF className="text-blue-600" size={18} />
          Continue with Facebook
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300" />
          <span className="px-3 text-sm text-black">OR</span>
          <div className="flex-1 border-t border-gray-300" />
        </div>

        {/* Form */}
        <div className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Enter your profile name"
              className="w-full border border-black rounded-xl px-4 py-3 text-black"
            />
          )}

          <input
            type="email"
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-black rounded-xl px-4 py-3 text-black"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-black rounded-xl px-4 py-3 text-black"
          />
        </div>

        {/* Main Button */}
        <button
          onClick={handleAuth}
          className="w-full bg-black text-white py-3 rounded-xl mt-6 font-semibold hover:bg-gray-900 transition"
        >
          {isLogin ? "Log In" : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-4 text-black">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </p>
      </div>
    </div>
  );
}
