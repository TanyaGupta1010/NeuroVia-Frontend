"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Flame, Bell, User } from "lucide-react";
import {
  NotificationProvider,
  useNotifications,
} from "./NotificationContext";

function DashboardNavbar({ email, streak }: { email: string; streak: number }) {
  const router = useRouter();

  const [openLib, setOpenLib] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [openStreak, setOpenStreak] = useState(false);

  const { notifications, markAsRead } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  const completedDays = [1, 2, 3, 4, 5];

  return (
    <nav className="bg-white border-b h-[88px] px-12 flex items-center justify-between shadow-sm relative z-[60]">

      {/* ================= LEFT ================= */}
      <div className="flex items-center gap-12">
        <Image
          src="/neurovia.jpg"
          alt="NeuroVia"
          width={130}
          height={40}
          className="cursor-pointer"
          onClick={() => router.push("/dashboard")}
        />

        <div className="flex gap-8 text-black font-medium items-center h-[88px]">
          <span
            onClick={() => router.push("/dashboard")}
            className="cursor-pointer hover:text-blue-600 transition"
          >
            Dashboard
          </span>

          <span className="cursor-pointer hover:text-blue-600 transition">
         {/* Dashboard Navigation Links */}
<span
  onClick={() => router.push("/myskills")} // Updated to match the relative path in the dashboard group
  className="cursor-pointer hover:text-blue-600 transition"
>
  MySkills
</span>
          </span>

          {/* LIBRARIES DROPDOWN */}
          <div
            className="relative flex items-center h-full" 
            onMouseEnter={() => setOpenLib(true)}
            onMouseLeave={() => setOpenLib(false)}
          >
            <span className="cursor-pointer hover:text-blue-600 flex items-center gap-1 py-2">
              Libraries
              <span className={`transition-transform duration-300 ${openLib ? "rotate-180" : ""}`}>
                ▾
              </span>
            </span>

            {/* Invisible Bridge Container */}
            <div
              className={`absolute top-[60px] left-0 bg-transparent pt-4 transition-all duration-300
              ${openLib ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 pointer-events-none invisible"}`}
            >
              {/* The visible menu */}
              <div className="bg-white shadow-xl rounded-2xl w-52 py-2 border border-gray-100 overflow-hidden">
                <div
                  onClick={() => router.push("/libraries/courses")}
                  className="px-4 py-4 hover:bg-gray-50 cursor-pointer text-black font-medium transition-colors"
                >
                  Courses
                </div>

                <div
                  onClick={() => router.push("/libraries/internships")}
                  className="px-4 py-4 hover:bg-gray-50 cursor-pointer text-black font-medium transition-colors"
                >
                  Internships
                </div>
              </div>
            </div>
          </div>

          <span className="cursor-pointer hover:text-blue-600 transition">
            Roadmap
          </span>
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="flex items-center gap-10">
        
        {/* STREAK */}
        <div
          className="relative"
          onMouseEnter={() => setOpenStreak(true)}
          onMouseLeave={() => setOpenStreak(false)}
        >
          <div className="flex items-center gap-1 text-orange-500 font-semibold cursor-pointer">
            <Flame size={20} />
            <span>{streak}</span>
          </div>

          <div
            className={`absolute right-0 mt-4 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl p-6 transition-all duration-300
            ${openStreak ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-black">{streak} Day Streak</h3>
              <Flame className="text-orange-500" size={20} />
            </div>
            <p className="text-sm text-gray-600 mb-6">Do a lesson today to continue your streak.</p>
            <div className="flex justify-between">
              {weekDays.map((day, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-500">{day}</span>
                  <div className={`w-8 h-8 rounded-full border transition ${completedDays.includes(index + 1) ? "bg-orange-500 border-orange-500" : "border-gray-300"}`} />
                </div>
              ))}
            </div>
          </div>
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
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </div>

          <div
            className={`absolute right-0 mt-4 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl transition-all duration-300
            ${openNotif ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
          >
            <div className="p-4 border-b border-gray-200 font-semibold text-black">Notifications</div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.map((note) => (
                <div key={note.id} onClick={() => markAsRead(note.id)} className={`px-4 py-3 border-b border-gray-100 cursor-pointer transition ${!note.read ? "bg-blue-50" : "bg-white hover:bg-gray-50"}`}>
                  <p className="text-sm font-medium text-black">{note.title}</p>
                  <p className="text-xs mt-1 text-gray-400">{note.time}</p>
                </div>
              ))}
            </div>
            <div className="p-3 text-center border-t border-gray-100">
              <button onClick={() => router.push("/dashboard/notifications")} className="text-blue-600 text-sm font-bold hover:underline">View All</button>
            </div>
          </div>
        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
             <User className="text-gray-500" size={20} />
          </div>
          <span className="text-sm font-bold text-black tracking-tight">
            {email.split('@')[0]}
          </span>
        </div>
      </div>
    </nav>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [streak, setStreak] = useState(5);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gray-50 font-sans">
        <DashboardNavbar email={email} streak={streak} />
        {children}
      </div>
    </NotificationProvider>
  );
}