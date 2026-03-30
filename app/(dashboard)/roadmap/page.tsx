"use client";

import { useRouter } from "next/navigation";

const courses = [
  {
    id: "psychology",
    title: "Introduction to Psychology",
    progress: 75,
  },
  {
    id: "neuro",
    title: "Advanced Neuroscience",
    progress: 30,
  },
];

export default function RoadmapPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white px-10 py-10">

      <h1 className="text-3xl font-bold text-black mb-2">
        Your Roadmaps
      </h1>

      <p className="text-gray-500 mb-10">
        Continue your learning journey
      </p>

      <div className="space-y-6 max-w-3xl">

        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => router.push(`/roadmap/${course.id}`)}
            className="
              bg-white
              p-6
              rounded-2xl
              shadow-sm
              cursor-pointer
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <h3 className="text-lg font-semibold text-black">
              {course.title}
            </h3>

            <div className="mt-3 flex items-center gap-4">
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              <span className="text-sm text-black">
                {course.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}