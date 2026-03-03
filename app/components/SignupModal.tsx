"use client";

export default function SignupModal({ close, openLogin }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl w-[420px] p-8 relative">

        {/* Close */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-500 text-xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center mb-2">
          NeuroVia
        </h2>

        <p className="text-center text-black mb-6">
          Sign up for free to start learning.
        </p>

        {/* Social Buttons */}
        <button className="w-full border py-3 rounded-full mb-3 hover:bg-gray-100">
          Continue with Google
        </button>

        <button className="w-full border py-3 rounded-full mb-6 hover:bg-gray-100">
          Continue with Facebook
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t" />
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-1 border-t" />
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your profile name"
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="email"
            placeholder="name@domain.com"
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        {/* Signup Button */}
        <button className="w-full bg-black text-white py-3 rounded-xl mt-6 font-semibold hover:bg-gray-900 transition">
          Sign Up
        </button>

        <p className="text-center text-sm mt-4">
           have an account?{" "}
          <span
            onClick={openLogin}
            className="text-blue-600 cursor-pointer"
          >
            Log In
          </span>
        </p>

      </div>
    </div>
  );
}
