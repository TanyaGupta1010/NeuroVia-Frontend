"use client";

export default function LoginModal({ close, openSignup }: any) {
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
          Welcome back! Please login to continue.
        </p>

        <div className="space-y-4">
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

        <button className="w-full bg-black text-white py-3 rounded-xl mt-6 font-semibold hover:bg-gray-900 transition">
          Log In
        </button>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span
            onClick={openSignup}
            className="text-blue-600 cursor-pointer"
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}
