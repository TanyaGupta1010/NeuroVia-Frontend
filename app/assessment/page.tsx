"use client";

import { useRouter } from "next/navigation";
import {
  Scale,
  Briefcase,
  HeartPulse,
  Laptop,
  Palette,
  Code,
  LineChart,
  Microscope,
  Toolbox,
  GraduationCap,
} from "lucide-react";

const domains = [
  {
    title: "Law",
    desc: "Legal studies, justice systems, and advocacy.",
    icon: Scale,
  },
  {
    title: "Engineering",
    desc: "Innovation, construction, and technical design.",
    icon: Toolbox,
  },
  {
    title: "Medical",
    desc: "Healthcare, medicine, and biology.",
    icon: HeartPulse,
  },
  {
    title: "Business",
    desc: "Finance, management, and entrepreneurship.",
    icon: Briefcase,
  },
  {
    title: "Technology",
    desc: "Software, AI, cybersecurity, and data science.",
    icon: Laptop,
  },
  {
    title: "Arts & Design",
    desc: "Creative arts, graphic design, and media.",
    icon: Palette,
  },
  {
    title: "Data Science",
    desc: "Machine learning, analytics, and statistics.",
    icon: LineChart,
  },
  {
    title: "Research",
    desc: "Scientific discovery and innovation.",
    icon: Microscope,
  },
  {
    title: "Programming",
    desc: "Frontend, backend, and full-stack development.",
    icon: Code,
  },
  {
    title: "Academics",
    desc: "Higher education and subject mastery.",
    icon: GraduationCap,
  },
];

export default function AssessmentPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen bg-gray-50 py-20 px-6 overflow-hidden"
    >{/* Left Decorative Image */}
<img
  src="/Peeking left.png"
  alt="Decorative"
  className="
    hidden lg:block
    absolute left-0 top-1/2
    -translate-y-1/2
    -translate-x-1/3
    w-150
    opacity-100
    pointer-events-none
  "
/>
{/* Right Decorative Image */}
<img
  src="/Peeking right.png"
  alt="Decorative"
  className="
    hidden lg:block
    absolute right-0 top-1/2
    -translate-y-1/2
    translate-x-1/3
    w-150
    opacity-100
    pointer-events-none
  "
/>
      <div className="max-w-7xl mx-auto text-center">

        {/* Heading */}
        <h1 className="text-5xl font-bold text-black mb-4">
          Discover Your Path
        </h1>

        <p className="text-gray-600 text-lg mb-12">
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
                  bg-white p-8 rounded-3xl shadow-sm 
                  border border-gray-200
                  transition-all duration-300
                  hover:shadow-xl
                  hover:scale-105
                  hover:bg-blue-50
                  hover:border-blue-500
                  cursor-pointer
                "
              >
                {/* Icon */}
                <div
                className="
                w-14 h-14 rounded-full bg-[#A9D6E5] 
                flex items-center justify-center mb-6 mx-auto">
                  <Icon className="w-8 h-8 text-black" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-black mb-3">
                  {domain.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-6">
                  {domain.desc}
                </p>

                {/* Start Quiz Button */}
                <button
                  onClick={() =>
                    router.push(
                      `/assessment/result?domain=${domain.title}`
                    )
                  }
                  className="
                    text-[#2ca2ca] font-semibold 
                    hover:underline
                  "
                >
                  Start Quiz →
                </button>
              </div>
            );
          })}

        </div>
      </div>
    </main>
  );
}
