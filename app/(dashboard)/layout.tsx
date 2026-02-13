"use client";

import { useEffect, useState } from "react";
import { Flame, Bell, User } from "lucide-react";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* DASHBOARD NAVBAR */}
      <nav className="bg-white border-b px-12 h-24 flex items-center justify-between shadow-sm">

        {/* LEFT */}
        <div className="flex items-center gap-10">
          <Image
            src="/neurovia.jpg"
            alt="NeuroVia"
            width={130}
            height={40}
          />

          <div className="flex gap-8 text-gray-700 font-medium">
            <span className="text-blue-600 cursor-pointer">
              Dashboard
            </span>
            <span className="cursor-pointer hover:text-blue-600">
              MySkills
            </span>
            <span className="cursor-pointer hover:text-blue-600">
              Libraries
            </span>
            <span className="cursor-pointer hover:text-blue-600">
              Roadmap
            </span>
          </div>
        </div>

        {/* RIGHT */}
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
      <div>{children}</div>
    </div>
  );
}
