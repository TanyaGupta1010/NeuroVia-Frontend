"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  ArrowRight,
  Brain,
  Trophy,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* ================= LEFT SIDE ================= */}
      <div className="lg:col-span-2 space-y-8">

        {/* Welcome Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-2 text-black">
            Welcome, {email}!
          </h2>
          <p className="text-gray-600">
            Continue where you left off or start something new today.
          </p>
        </div>

        {/* Courses Section */}
        <div>
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-semibold text-black">
              Your Courses
            </h3>
            <span className="text-blue-600 cursor-pointer hover:underline">
              View All
            </span>
          </div>

          <CourseCard
            title="Introduction to Psychology"
            progress={75}
            color="bg-purple-500"
          />

          <CourseCard
            title="Advanced Neuroscience"
            progress={30}
            color="bg-blue-500"
          />

          <CourseCard
            title="Cognitive Behavioral Therapy"
            progress={0}
            color="bg-green-500"
          />
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="space-y-8">

        {/* Quiz Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-3xl shadow-lg">
          <Brain size={40} className="mb-4" />

          <h3 className="text-2xl font-bold mb-2">
            Test Your Knowledge
          </h3>

          <p className="mb-6 text-blue-100">
            Challenge yourself with our latest assessment quizzes and earn badges.
          </p>

          <button
            onClick={() => router.push("/assessment")}
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Take a Quiz
          </button>
        </div>

        {/* Trust Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
          <Trophy size={32} className="mx-auto mb-4 text-yellow-500" />

          <h3 className="font-semibold text-black mb-2">
            Trust in NeuroVia
          </h3>

          <p className="text-gray-600 text-sm">
            Join thousands of learners achieving their goals with verified certification programs.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= COURSE CARD ================= */

function CourseCard({
  title,
  progress,
  color,
}: {
  title: string;
  progress: number;
  color: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mb-4 flex items-center justify-between hover:shadow-md transition">

      <div className="flex items-center gap-4 w-full">

        <div className={`${color} p-3 rounded-xl text-white`}>
          <BookOpen size={20} />
        </div>

        <div className="w-full">
          <h4 className="font-semibold text-black mb-2">
            {title}
          </h4>

          <div className="flex items-center gap-4">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="text-sm text-gray-600">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      <ArrowRight className="text-gray-400 ml-4" />
    </div>
  );
}
