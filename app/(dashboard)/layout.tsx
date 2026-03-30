"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Flame, Bell, User, LogOut, Settings } from "lucide-react";
import {
  NotificationProvider,
  useNotifications,
} from "./NotificationContext";

function DashboardNavbar({ email, streak }: { email: string; streak: number }) {
  const router = useRouter();

  const [openLib, setOpenLib] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [openStreak, setOpenStreak] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const { notifications, markAsRead } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  /* ---------- STREAK MOCK DATA ---------- */
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  const completedDays = [1, 2, 3, 4, 5];

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    router.push("/");
  };

  return (
    <nav className="bg-white border-b h-[88px] px-12 flex items-center justify-between shadow-sm relative z-[60]">

      {/* ================= LEFT ================= */}
      <div className="flex items-center gap-12 text-black">
        <Image
          src="/neurovia.jpg"
          alt="NeuroVia"
          width={130}
          height={40}
          className="cursor-pointer"
          onClick={() => router.push("/dashboard")}
        />

        <div className="flex gap-8 font-medium items-center h-[88px]">
          <span
            onClick={() => router.push("/dashboard")}
            className="cursor-pointer hover:text-blue-600 transition"
          >
            Dashboard
          </span>

          <span
            onClick={() => router.push("/myskills")}
            className="cursor-pointer hover:text-blue-600 transition"
          >
            MySkills
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

            <div
              className={`absolute top-[60px] left-0 bg-transparent pt-4 transition-all duration-300
              ${openLib ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 pointer-events-none invisible"}`}
            >
              <div className="bg-white shadow-xl rounded-2xl w-52 py-2 border border-gray-200 overflow-hidden">
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

          <span 
          onClick={() => router.push("/roadmap")}
          className="cursor-pointer hover:text-blue-600 transition">
            Roadmap
          </span>
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="flex items-center gap-10">
        
        {/* ---------- STREAK ---------- */}
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

            <p className="text-sm text-gray-600 mb-6">
              Do a lesson today to continue your streak.
            </p>

            <div className="flex justify-between">
              {weekDays.map((day, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-500">{day}</span>
                  <div
                    className={`w-8 h-8 rounded-full border transition
                    ${completedDays.includes(index + 1) ? "bg-orange-500 border-orange-500" : "border-gray-300"}`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- NOTIFICATIONS ---------- */}
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
            <div className="p-4 border-b border-gray-200 font-semibold text-black">
              Notifications
            </div>

            <div className="max-h-64 overflow-y-auto">
              {notifications.map((note) => (
                <div
                  key={note.id}
                  onClick={() => markAsRead(note.id)}
                  className={`px-4 py-3 border-b border-gray-100 cursor-pointer transition
                  ${!note.read ? "bg-blue-50" : "bg-white hover:bg-gray-50"}`}
                >
                  <div className="flex items-center gap-2">
                    {!note.read && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                    <p className="text-sm font-medium text-black">{note.title}</p>
                  </div>
                  <p className="text-xs mt-1 text-gray-400">{note.time}</p>
                </div>
              ))}
            </div>

            <div className="p-3 text-center border-t border-gray-100">
              <button
                onClick={() => router.push("/dashboard/notifications")}
                className="text-blue-600 text-sm font-bold hover:underline"
              >
                View All
              </button>
            </div>
          </div>
        </div>

        {/* ---------- PROFILE ---------- */}
        <div 
          className="relative flex items-center h-[88px]"
          onMouseEnter={() => setOpenProfile(true)}
          onMouseLeave={() => setOpenProfile(false)}
        >
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 group-hover:border-black transition-all">
               <User className="text-gray-500 group-hover:text-black" size={20} />
            </div>
            <span className="text-sm font-bold text-black tracking-tight group-hover:text-blue-600 transition-colors">
              {email ? email.split('@')[0] : "User"}
            </span>
          </div>

          <div
            className={`absolute top-[60px] right-0 bg-transparent pt-4 transition-all duration-300 z-[70]
            ${openProfile ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 pointer-events-none invisible"}`}
          >
            <div className="bg-white shadow-2xl rounded-2xl w-60 py-2 border border-gray-100 overflow-hidden text-black">
              <div className="px-5 py-3 border-b border-gray-50 mb-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Account</p>
                <p className="text-sm font-bold truncate">{email}</p>
              </div>
              {/* <div 
                onClick={() => router.push("/profile")}
                className="px-5 py-3 hover:bg-gray-50 cursor-pointer text-sm font-bold flex items-center gap-3 transition-colors"
              >
                <Settings size={18} className="text-gray-400" />
                Settings
              </div> */}
              <div 
                onClick={handleLogout}
                className="px-5 py-4 hover:bg-red-50 cursor-pointer text-sm font-black text-red-500 flex items-center gap-3 transition-colors border-t border-gray-50"
              >
                <LogOut size={18} />
                Log Out
              </div>
            </div>
          </div>
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
        <main>{children}</main>
      </div>
    </NotificationProvider>
  );
}