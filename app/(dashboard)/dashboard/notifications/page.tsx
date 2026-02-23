"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

type NotificationType = {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationType[]>([
    {
      id: 1,
      title: "Quiz Results Available",
      description: "Your recent assessment results are ready to view.",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "New Internship Posted",
      description: "A new internship opportunity has been added.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "New Course Added",
      description: "Explore the newly added Business Analytics course.",
      time: "Yesterday",
      read: true,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  return (
    <div className="max-w-4xl mx-auto px-12 py-12">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black flex items-center gap-3">
          <Bell size={28} />
          Notifications
        </h1>

        {unread.length > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-blue-600 font-semibold hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* UNREAD SECTION */}
      {unread.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-black mb-4">
            Unread
          </h2>

          <div className="space-y-4 mb-10">
            {unread.map((note) => (
              <NotificationCard key={note.id} note={note} />
            ))}
          </div>
        </>
      )}

      {/* READ SECTION */}
      {read.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-black mb-4">
            Earlier
          </h2>

          <div className="space-y-4">
            {read.map((note) => (
              <NotificationCard key={note.id} note={note} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ================= CARD COMPONENT ================= */

function NotificationCard({ note }: { note: NotificationType }) {
  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition cursor-pointer">

      <div className="flex justify-between items-start">

        <div>
          <div className="flex items-center gap-2 mb-2">
            {!note.read && (
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            )}

            <h3 className="font-semibold text-black">
              {note.title}
            </h3>
          </div>

          <p className="text-black text-sm">
            {note.description}
          </p>
        </div>

        <span className="text-xs text-gray-500">
          {note.time}
        </span>

      </div>
    </div>
  );
}