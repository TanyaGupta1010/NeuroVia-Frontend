import {
  Target,
  BarChart3,
  Award,
  Lightbulb,
  BookCheck,
  BookOpenText,
  Sprout,
  Goal,
  BadgeCheck,
} from "lucide-react";
import Image from "next/image";
export default function ServicesPage() {
  return (
    <main className="bg-gray-50 text-black">
      {/* ================= SERVICES HERO ================= */}
<section className="relative pt-24 pb-20 text-center overflow-hidden">

  {/* HERO CONTENT WRAPPER */}
  <div className="relative max-w-4xl mx-auto">

    {/* LEFT CHARACTER */}
    <div className="hidden xl:block absolute -left-44 top-1/2 -translate-y-1/2">
      <Image
        src="/services-left.png"
        alt="Left character"
        width={300}
        height={500}
        className="object-contain"
        priority
      />
    </div>

    {/* RIGHT CHARACTER */}
    <div className="hidden xl:block absolute -right-44 top-1/2 -translate-y-1/2">
      <Image
        src="/services-right.png"
        alt="Right character"
        width={300}
        height={500}
        className="object-contain"
        priority
      />
    </div>

    {/* TEXT CONTENT */}
    <h1 className="text-5xl font-bold mb-4">
      Our Services
    </h1>

    <p className="text-lg mb-10">
      Comprehensive solutions to accelerate your career growth
    </p>

    <div className="flex justify-center gap-6 flex-wrap">
      <a
        href="#assessment"
        className="px-6 py-3 border border-gray-400 rounded-xl bg-white hover:bg-black hover:text-white transition"
      >
        Assessment
      </a>

      <a
        href="#courses"
        className="px-6 py-3 border border-gray-400 rounded-xl bg-white hover:bg-black hover:text-white transition"
      >
        Courses & Internships
      </a>

      <a
        href="#roadmap"
        className="px-6 py-3 border border-gray-400 rounded-xl bg-white hover:bg-black hover:text-white transition"
      >
        Roadmap
      </a>
    </div>

  </div>
      </section>
      {/* ================= ASSESSMENT ================= */}
      <section id="assessment" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-[#A9D6E5] flex items-center justify-center">
                  <BookCheck className="w-8 h-8 text-black" />
                </div>

                <h2 className="text-3xl font-bold">Assessment</h2>
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Comprehensive Skill Evaluation
              </h3>

              <p className="max-w-md mb-6">
                Our advanced assessment system helps you understand your current
                skill level and creates a personalized learning path.
              </p>

              <button className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition">
                Start Assessment
              </button>
            </div>

            {/* RIGHT */}
            <div className="bg-[#C8E3EE] rounded-2xl p-8">
              <h4 className="font-semibold text-lg mb-6">What You&apos;ll Get</h4>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#A9D6E5] flex items-center justify-center">
                    <Goal className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <p className="font-medium">Skill Assessment</p>
                    <p className="text-sm">Evaluate your current skill level</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#A9D6E5] flex items-center justify-center">
                    <Sprout className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <p className="font-medium">Performance Analytics</p>
                    <p className="text-sm">Track your progress over time</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#A9D6E5] flex items-center justify-center">
                    <BadgeCheck className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <p className="font-medium">Certification Ready</p>
                    <p className="text-sm">
                      Prepare for industry certifications
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COURSES ================= */}
      <section id="courses" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-12">
            {/* Courses Header (icon + text side-by-side) */}
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-full bg-[#A9D6E5] flex items-center justify-center">
                <BookOpenText className="w-8 h-8 text-black" />
              </div>

              <h2 className="text-3xl font-bold">Courses & Internships</h2>
            </div>

            <p className="text-center max-w-2xl mx-auto mb-12">
              Explore our curated selection of courses and internship
              opportunities
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {[
                {
                  title: "Frontend Development",
                  level: "Beginner to Advanced",
                  duration: "12 weeks",
                },
                {
                  title: "Backend Development",
                  level: "Intermediate",
                  duration: "10 weeks",
                },
                {
                  title: "Mobile App Development",
                  level: "Advanced",
                  duration: "14 weeks",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-2xl overflow-hidden flex flex-col h-full bg-white"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                    Image Required
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
                    <p className="text-sm">Level: {c.level}</p>
                    <p className="text-sm mb-4">Duration: {c.duration}</p>

                    <button className="mt-auto w-full border border-gray-300 py-3 rounded-xl hover:bg-black hover:text-white transition">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ROADMAP ================= */}
      <section id="roadmap" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#A9D6E5] flex items-center justify-center">
                <img
    src="/roadmap-icon.png"
    alt="Roadmap Icon"
    className="w-8 h-8"
  />
              </div>

              <h2 className="text-3xl font-bold text-black">Roadmap</h2>
            </div>

            {/* Subtitle */}
            <p className="text-center max-w-2xl mx-auto mb-16 text-black">
              Your personalized journey from beginner to professional
            </p>

            {/* Timeline */}
<div className="relative flex justify-center mb-20">
  
  {/* Line */}
  <div className="h-1 w-full max-w-5xl bg-[#98c6d8] rounded-full" />

  {/* Dots */}
  <div className="absolute top-[-12px] w-full max-w-5xl flex justify-between">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="w-6 h-6 bg-[#72bdda] rounded-full border-4 border-white shadow-md"
      />
    ))}
  </div>

</div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-16">
              {[
                {
                  tag: "Discovery",
                  title: "Skill Assessment",
                  desc: "Identify your strengths and areas for improvement",
                },
                {
                  tag: "Learning",
                  title: "Course Enrollment",
                  desc: "Choose the right courses for your goals",
                },
                {
                  tag: "Practice",
                  title: "Hands-on Projects",
                  desc: "Build real-world projects to solidify skills",
                },
                {
                  tag: "Application",
                  title: "Internship",
                  desc: "Apply your skills in a professional setting",
                },
                {
                  tag: "Success",
                  title: "Career Launch",
                  desc: "Land your dream job with our support",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-2xl p-6 text-center"
                >
                  <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1 rounded-full mb-4">
                    {step.tag}
                  </span>

                  <h3 className="text-lg font-bold text-black mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-black">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <button className="px-8 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition">
                View Detailed Roadmap
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}