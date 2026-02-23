"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Flame, Bell, User } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [email, setEmail] = useState("");
  const [openLib, setOpenLib] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white border-b px-12 h-20 flex items-center justify-between shadow-sm">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-12">

          <Image
            src="/neurovia.jpg"
            alt="NeuroVia"
            width={130}
            height={40}
            className="cursor-pointer"
            onClick={() => router.push("/dashboard")}
          />

          <div className="flex gap-8 text-gray-700 font-medium">

            <span
              onClick={() => router.push("/dashboard")}
              className="cursor-pointer hover:text-blue-600"
            >
              Dashboard
            </span>

            <span className="cursor-pointer hover:text-blue-600">
              MySkills
            </span>

            {/* LIBRARIES DROPDOWN */}
            <div
  className="relative"
  onMouseEnter={() => setOpenLib(true)}
  onMouseLeave={() => setOpenLib(false)}
>
  <span className="cursor-pointer hover:text-blue-600 flex items-center gap-1">
    Libraries
    <span
      className={`transition-transform duration-300 ${
        openLib ? "rotate-180" : ""
      }`}
    >
      ▾
    </span>
  </span>

  <div
    className={`absolute top-8 left-0 bg-white shadow-xl rounded-xl w-48 py-2 z-50
      transform transition-all duration-300 origin-top
      ${
        openLib
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
      }`}
  >
    <div
      onClick={() => router.push("/libraries/courses")}
      className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
    >
      Courses
    </div>

    <div
      onClick={() => router.push("/libraries/internships")}
      className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
    >
      Internships
    </div>
  </div>
</div>

            <span className="cursor-pointer hover:text-blue-600">
              Roadmap
            </span>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">

          <div className="flex items-center gap-1 text-orange-500 font-semibold">
            <Flame size={20} />
            <span>5</span>
          </div>

          <Bell className="text-gray-600 cursor-pointer" size={20} />

          <div className="flex items-center gap-2 text-gray-700">
            <User className="bg-gray-200 p-1 rounded-full" size={28} />
            <span className="text-sm font-medium">{email}</span>
          </div>

        </div>
      </nav>

      {/* PAGE CONTENT */}
      {children}
    </div>
  );
}