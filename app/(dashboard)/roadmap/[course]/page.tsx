"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const courseMap: any = {
  psychology: "Introduction to Psychology",
  neuro: "Advanced Neuroscience",
};

const steps = [
  { title: "Basics", desc: "Understanding fundamentals" },
  { title: "Core Concepts", desc: "Building strong base" },
  { title: "Advanced Topics", desc: "Deep dive learning" },
  { title: "Practical Application", desc: "Real world usage" },
  { title: "Mastery", desc: "Expert level understanding" },
];

export default function CourseRoadmap() {
  const { course } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);

  // scroll-based highlight
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".roadmap-step");

      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();

        if (rect.top >= 150 && rect.top <= 350) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white px-10 py-16">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-black mb-2">
        {courseMap[course as string] || "Course"} Roadmap
      </h1>

      <p className="text-gray-500 mb-16">
        Follow your structured learning journey
      </p>

      {/* TIMELINE */}
      <div className="relative max-w-5xl mx-auto">

        {/* CENTER LINE */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gray-200 -translate-x-1/2" />

        <div className="space-y-24">

          {steps.map((step, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className="roadmap-step relative flex items-center justify-between"
              >
                {/* LEFT CARD */}
                <div className="w-[45%] flex justify-end">
                  {index % 2 === 0 && (
                    <Card step={step} active={isActive} />
                  )}
                </div>

                {/* CENTER DOT */}
                <div className="relative z-10">
                  <div
                    className={`
                      w-6 h-6 rounded-full border-2 transition-all duration-300
                      ${
                        isActive
                          ? "bg-black border-black scale-110"
                          : "bg-white border-gray-300"
                      }
                    `}
                  />
                </div>

                {/* RIGHT CARD */}
                <div className="w-[45%] flex justify-start">
                  {index % 2 !== 0 && (
                    <Card step={step} active={isActive} />
                  )}
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}

function Card({
  step,
  active,
}: {
  step: { title: string; desc: string };
  active: boolean;
}) {
  return (
    <div
      className={`
        w-[320px]
        p-6
        rounded-2xl
        transition-all
        duration-500
        ${
          active
            ? "bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] opacity-100"
            : "bg-gray-50 opacity-40"
        }
      `}
    >
      <h3 className="text-lg font-semibold text-black">
        {step.title}
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        {step.desc}
      </p>
    </div>
  );
}