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
  const [openNotif, setOpenNotif] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const notifications = [
    { title: "New Course Added", time: "2 min ago" },
    { title: "Quiz Results Available", time: "1 hour ago" },
    { title: "Internship Posted", time: "Yesterday" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white border-b h-[88px] px-12 flex items-center justify-between shadow-sm">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-12">

          {/* Logo */}
          <Image
            src="/neurovia.jpg"
            alt="NeuroVia"
            width={130}
            height={40}
            className="cursor-pointer"
            onClick={() => router.push("/dashboard")}
          />

          {/* Menu */}
          <div className="flex gap-8 text-black font-medium">

            <span
              onClick={() => router.push("/dashboard")}
              className="cursor-pointer hover:text-blue-600 transition"
            >
              Dashboard
            </span>

            <span className="cursor-pointer hover:text-blue-600 transition">
              MySkills
            </span>

            {/* LIBRARIES DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setOpenLib(true)}
              onMouseLeave={() => setOpenLib(false)}
            >
              <span className="cursor-pointer hover:text-blue-600 flex items-center gap-1 transition">
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
                className={`absolute top-10 left-0 bg-white shadow-xl rounded-xl w-52 py-2 z-50
                border border-gray-200
                transition-all duration-300 origin-top
                ${
                  openLib
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <div
                  onClick={() => router.push("/libraries/courses")}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition"
                >
                  Courses
                </div>

                <div
                  onClick={() => router.push("/libraries/internships")}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition"
                >
                  Internships
                </div>
              </div>
            </div>

            <span className="cursor-pointer hover:text-blue-600 transition">
              Roadmap
            </span>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-8">

          {/* STREAK */}
          <div className="flex items-center gap-1 text-orange-500 font-semibold">
            <Flame size={20} />
            <span>5</span>
          </div>

          {/* NOTIFICATION */}
          <div
            className="relative"
            onMouseEnter={() => setOpenNotif(true)}
            onMouseLeave={() => setOpenNotif(false)}
          >
            <div className="relative cursor-pointer">
              <Bell size={22} className="text-black" />

              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {notifications.length}
                </span>
              )}
            </div>

            {/* DROPDOWN */}
            <div
              className={`absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-xl border border-gray-200
              transition-all duration-300 origin-top
              ${
                openNotif
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible"
              }`}
            >
              <div className="p-4 border-b font-semibold text-black">
                Notifications
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.map((note, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 hover:bg-blue-50 transition cursor-pointer border-b border-gray-100"
                  >
                    <p className="text-sm font-medium text-black">
                      {note.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {note.time}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-3 text-center border-t">
                <button
                  onClick={() =>
                    router.push("/dashboard/notifications")
                  }
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  View All
                </button>
              </div>
            </div>
          </div>

          {/* PROFILE */}
          <div className="flex items-center gap-2 text-black">
            <User className="bg-gray-200 p-1 rounded-full" size={30} />
            <span className="text-sm font-medium">
              {email}
            </span>
          </div>

        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div>{children}</div>

    </div>
  );
}