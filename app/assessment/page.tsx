"use client";

import {
  Scale,
  Briefcase,
  HeartPulse,
  Laptop,
  Palette,
  Code,
  LineChart,
  Microscope,
  Cpu,
  GraduationCap,
} from "lucide-react";

const domains = [
  { title: "Law", desc: "Legal studies, justice systems, and advocacy.", icon: Scale },
  { title: "Engineering", desc: "Innovation, construction, and technical design.", icon: Cpu },
  { title: "Medical", desc: "Healthcare, medicine, and biology.", icon: HeartPulse },
  { title: "Business", desc: "Finance, management, and entrepreneurship.", icon: Briefcase },
  { title: "Technology", desc: "Software, AI, cybersecurity, and data science.", icon: Laptop },
  { title: "Arts & Design", desc: "Creative arts, graphic design, and media.", icon: Palette },
  { title: "Data Science", desc: "Machine learning, analytics, and statistics.", icon: LineChart },
  { title: "Research", desc: "Scientific discovery and innovation.", icon: Microscope },
  { title: "Programming", desc: "Frontend, backend, and full-stack development.", icon: Code },
  { title: "Academics", desc: "Higher education and subject mastery.", icon: GraduationCap },
];

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">

        {/* Heading */}
        <h1 className="text-5xl font-bold text-black mb-4">
          Discover Your Path
        </h1>

        <p className="text-black text-lg mb-12">
          Select a field you're interested in to begin your personalized assessment.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {domains.map((domain, index) => {
            const Icon = domain.icon;

            return (
              <div
                key={index}
                className="
                  bg-white
                  p-8
                  rounded-2xl
                  border border-gray-200
                  transition-all duration-300 ease-in-out
                  cursor-pointer
                  hover:bg-blue-50
                  hover:border-blue-500
                  hover:shadow-lg
                  hover:-translate-y-1
                "
              >
                {/* Icon */}
                <div className="
                  w-14 h-14
                  rounded-full
                  bg-blue-100
                  flex items-center justify-center
                  mb-6 mx-auto
                  transition
                  group-hover:bg-blue-200
                ">
                  <Icon className="w-7 h-7 text-blue-600" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-black mb-3">
                  {domain.title}
                </h3>

                {/* Description */}
                <p className="text-black text-sm">
                  {domain.desc}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </main>
  );
}
