"use client";

import { createContext, useContext, useState } from "react";

export type NotificationType = {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
};

type NotificationContextType = {
  notifications: NotificationType[];
  markAllAsRead: () => void;
  markAsRead: (id: number) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<NotificationType[]>([
    {
      id: 1,
      title: "Quiz Results Available",
      description: "Your assessment results are ready.",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "New Internship Posted",
      description: "A new opportunity has been added.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "New Course Added",
      description: "Explore Business Analytics course.",
      time: "Yesterday",
      read: true,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, markAllAsRead, markAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }
  return context;
}