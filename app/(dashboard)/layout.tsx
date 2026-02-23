"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Flame, Bell, User } from "lucide-react";
import {
  NotificationProvider,
  useNotifications,
} from "./NotificationContext";

function DashboardNavbar({ email }: { email: string }) {
  const router = useRouter();
  const [openLib, setOpenLib] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);

  const { notifications, markAsRead } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="bg-white border-b h-[88px] px-12 flex items-center justify-between shadow-sm">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-12">

        <Image
          src="/neurovia.jpg"
          alt="NeuroVia"
          width={130}
          height={40}
          className="cursor-pointer"
          onClick={() => router.push("/dashboard")}
        />

        <div className="flex gap-8 text-black font-medium">

          <span
            onClick={() => router.push("/dashboard")}
            className="cursor-pointer hover:text-blue-600 transition duration-200"
          >
            Dashboard
          </span>

          <span className="cursor-pointer hover:text-blue-600 transition duration-200">
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
              className={`absolute top-10 left-0 bg-white shadow-xl rounded-xl w-52 py-2 border border-gray-200 transition-all duration-300 origin-top
              ${
                openLib
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
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

          <span className="cursor-pointer hover:text-blue-600 transition duration-200">
            Roadmap
          </span>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-8">

        <div className="flex items-center gap-1 text-orange-500 font-semibold">
          <Flame size={20} />
          <span>5</span>
        </div>

        {/* NOTIFICATIONS */}
        <div
          className="relative"
          onMouseEnter={() => setOpenNotif(true)}
          onMouseLeave={() => setOpenNotif(false)}
        >
          <div className="relative cursor-pointer">
            <Bell size={22} className="text-black" />

            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
                {unreadCount}
              </span>
            )}
          </div>

          {/* DROPDOWN */}
          <div
            className={`absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 origin-top
            ${
              openNotif
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 invisible"
            }`}
          >
            <div className="p-4 border-b border-gray-200 font-semibold text-black !text-black">
              Notifications
            </div>

            {notifications.map((note) => (
              <div
                key={note.id}
                onClick={() => markAsRead(note.id)}
                className={`px-4 py-3 border-b border-gray-200 cursor-pointer transition duration-200
                ${
                  !note.read
                    ? "bg-blue-50 hover:bg-blue-100"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  {!note.read && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></span>
                  )}

                  <p className="text-sm font-semibold text-black !text-black">
                    {note.title}
                  </p>
                </div>

                <p className="text-xs mt-1 text-black !text-black">
                  {note.time}
                </p>
              </div>
            ))}

            <div className="p-3 text-center border-t border-gray-200">
              <button
                onClick={() => router.push("/dashboard/notifications")}
                className="text-blue-600 font-semibold hover:underline"
              >
                View All
              </button>
            </div>
          </div>
        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-2">
          <User className="bg-gray-200 p-1 rounded-full" size={30} />
          <span className="text-sm font-medium text-black">
            {email}
          </span>
        </div>
      </div>
    </nav>
  );
}

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
    <NotificationProvider>
      <div className="min-h-screen bg-gray-50">
        <DashboardNavbar email={email} />
        {children}
      </div>
    </NotificationProvider>
  );
}