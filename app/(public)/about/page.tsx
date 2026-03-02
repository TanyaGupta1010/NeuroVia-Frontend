import { Award, GraduationCap, LandPlot, Trophy, Users } from "lucide-react";
import Image from "next/image";
export default function AboutPage() {
  return (
    <main className="bg-white text-black">

      {/* ================= SECTION 1 : ABOUT HEADER ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">About Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          NeuroVia is dedicated to empowering individuals through accessible,
          high-quality education and career development resources.
        </p>
      </section>

      {/* ================= SECTION 1 : MISSION & WHY US ================= */}
<section className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-2 gap-20">
   {/* LEFT IMAGE */}
  <div className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2">
    <Image
      src="/right-image.png"
      alt="Left Illustration"
      width={600}
      height={800}
      className="object-contain"
    />
  </div>

  {/* RIGHT IMAGE */}
  <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2">
    <Image
      src="/left-image.png"
      alt="Right Illustration"
      width={600}
      height={800}
      className="object-contain"
    />
  </div>        
        {/* LEFT */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-5 leading-relaxed">
            We believe that everyone deserves access to quality education that
            can transform their lives. Our platform bridges the gap between
            ambition and achievement by providing structured learning paths,
            real-world experience, and professional guidance.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Through assessments, courses, internships, and personalized
            roadmaps, we help learners build meaningful careers.
          </p>
        </div>

        {/* RIGHT */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <ul className="space-y-5">
            {[
              "Industry-aligned curriculum",
              "Expert mentorship",
              "Hands-on practical experience",
              "Career-focused guidance",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="mt-1 h-4 w-4 rounded-full bg-[#8acce2]"></span>
                <p className="text-gray-700">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= SECTION 2 : CORE VALUES ================= */}
      <section className="pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          
          <h2 className="text-4xl font-bold text-center mb-16">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Student Focused */}
            <CoreValue
              title="Student-Focused"
              desc="Every decision we make puts our learners first"
              icon={<GraduationCap className="h-9 w-9 text-black" />}
            />

            {/* Goal Oriented */}
            <CoreValue
              title="Goal-Oriented"
              desc="We help you achieve your career objectives"
              icon={
                <LandPlot className="h-9 w-9 text-black" />
              }
            />

            {/* Excellence */}
            <CoreValue
              title="Excellence"
              desc="Committed to delivering the highest quality education"
              icon={
                <Trophy className="h-9 w-9 text-black" />
              }
            />

            {/* Community */}
            <CoreValue
              title="Community"
              desc="Building a supportive network of learners"
              icon={
                <Users className="h-9 w-9 text-black" />
              }
            />

          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= CORE VALUE CARD COMPONENT ================= */
function CoreValue({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded-2xl p-10 text-center hover:shadow-lg transition">
      <div className="mx-auto mb-6 h-14 w-14 rounded-full bg-[#A9D6E5] flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

      