"use client";

import { useNotifications } from "../../NotificationContext";

export default function NotificationsPage() {
  const { notifications, markAllAsRead } =
    useNotifications();

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black">
          Notifications
        </h1>

        <button
          onClick={markAllAsRead}
          className="text-[#5ebcdc] font-semibold hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((note) => (
          <div
            key={note.id}
            className={`p-6 rounded-2xl border ${
              note.read
                ? "bg-white"
                : "bg-blue-50 border-blue-200"
            }`}
          >
            <h3 className="font-semibold text-black">
              {note.title}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              {note.description}
            </p>

            <p className="text-xs text-gray-400 mt-3">
              {note.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}