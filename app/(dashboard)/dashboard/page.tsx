"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  ArrowRight,
  Brain,
  Trophy,
  Flame,
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

  {/* ================= RIGHT MAIN CONTENT ================= */}
  <div className="lg:col-span-2 space-y-8">

    {/* Stats Row */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <StatCard title="Courses Enrolled" value="3" />
      <StatCard title="Completed" value="1" />
      <StatCard title=" Streak" value="5 Days" icon={<Flame className="text-orange-500" size={20} />} />
    </div>

    {/* Welcome Card */}
    <div className="bg-white p-8 rounded-2xl shadow-sm flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-black">
          Welcome back, {email} 👋
        </h2>
        <p className="text-gray-600">
          You're 75% done with your Psychology course. Keep going!
        </p>
      </div>

     <button
    onClick={() => router.push("libraries/courses")} // Changed from /course to /libraries
    className="bg-[#139fd6] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
  >
    Continue Learning
  </button>
</div>

    {/* Courses */}
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="text-xl font-semibold text-black">
          Your Courses
        </h3>
        <span className="text-[#139fd6] cursor-pointer hover:underline">
          View All
        </span>
      </div>

      <CourseCard
        title="Introduction to Psychology"
        progress={75}
        color="bg-[#75094d]"
      />

      <CourseCard
        title="Advanced Neuroscience"
        progress={30}
        color="bg-[#560975]"
      />

      <CourseCard
        title="Cognitive Behavioral Therapy"
        progress={0}
        color="bg-[#093475]"
      />
    </div>
  </div>


  {/* ================= LEFT SIDEBAR ================= */}
  <div className="space-y-6">

    {/* Weekly Goal */}
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-black">
        Weekly Learning Goal
      </h3>

      <div className="w-full bg-gray-200 h-3 rounded-full mb-3">
        <div className="bg-green-500 h-3 rounded-full w-[60%]" />
      </div>

      <p className="text-gray-600 text-sm">
        6 / 10 hours completed this week
      </p>
    </div>

    {/* Test Knowledge */}
    <div className="bg-gradient-to-r from-[#A9D6E5] to-[#139fd6] text-white p-6 rounded-2xl shadow-lg">
      <Brain size={32} className="mb-4" />

      <h3 className="text-xl font-bold mb-2">
        Test Your Knowledge
      </h3>

      <p className="mb-4 text-blue-100 text-sm">
        Challenge yourself with our latest assessment quizzes and earn badges.
      </p>

      <button
        onClick={() => router.push("/assessment")}
        className="bg-white text-[#139fd6] px-5 py-2 rounded-xl font-semibold hover:scale-105 transition"
      >
        Take a Quiz
      </button>
    </div>

    {/* Trust Card */}
    <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
      <Trophy size={28} className="mx-auto mb-3 text-yellow-500" />

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
{/* Badges */}
<div className="bg-white p-6 rounded-2xl shadow-sm text-center">
  <h3 className="font-semibold text-black mb-4">
    Your Achievements
  </h3>

  <div className="flex justify-center gap-4 text-2xl">
    🏆 🎯 📘 
  </div>

  <p className="text-gray-500 text-sm mt-4">
    Earn more badges by completing quizzes.
  </p>
</div>

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
                className="bg-[#139fd6] h-2 rounded-full transition-all duration-500"
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
function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      
      {/* Title */}
      <p className="text-gray-500 text-sm mb-2">
        {title}
      </p>

      {/* Value + Icon */}
      <div className="flex items-center gap-2">
        <h3 className="text-2xl font-bold text-black">
          {value}
        </h3>
        {icon}
      </div>

    </div>
  );
}
