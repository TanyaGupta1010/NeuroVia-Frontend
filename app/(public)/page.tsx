"use client";
import Image from "next/image";
import { BookOpenText } from "lucide-react";
import { useState } from "react";
import AutoCarousel from "@/app/components/AutoCarousel";
import AuthModal from "@/app/components/AuthModal";

export default function HomePage() {
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <>
      <main className="bg-white text-black">

        {/* ================= HERO ================= */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Learn Smarter. <br />
              Build Real Skills. <br />
              Grow with NeuroVia.
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              AI-personalized skill assessment, learning roadmaps, and
              career-ready guidance — all in one platform.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setOpenAuth(true)}
                className="px-6 py-3 bg-black text-white rounded-full font-semibold"
              >
                Sign Up
              </button>

              <a
                href="/assessment"
                className="px-6 py-3 border border-black rounded-full font-semibold"
              >
                Take Skill Quiz
              </a>

            </div>
          </div>

          <div className="relative h-150 w-full">
            <Image
            src="/career-illustration.png"
    alt="Career Guidance Illustration"
    fill
    className="object-contain"
    priority
  />
</div>
        </section>


        {/* ================= COURSES & INTERNSHIPS ================= */}
        <section className="bg-gray-50 py-16">
  <div className="max-w-7xl mx-auto px-6">
    
    {/* Header with Icon */}
    <div className="flex items-center gap-4 mb-8">
      <div className="w-14 h-14 rounded-full bg-[#A9D6E5] flex items-center justify-center">
        <BookOpenText className="w-8 h-8 text-black" />
      </div>

      <h2 className="text-3xl font-bold">
        Courses & Internships
      </h2>
    </div>

    <AutoCarousel />
    
  </div>
</section>


        {/* ================= WHY NEUROVIA ================= */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Why NeuroVia?
            </h2>

            <p className="text-gray-600 max-w-md">
              Most platforms give generic roadmaps.
              NeuroVia evaluates your real skills and adapts learning
              so you always know what to learn next.
            </p>
          </div>

          <div className="h-64 bg-black text-white rounded-xl flex items-center justify-center text-xl font-semibold">
            DEMO VIDEO
          </div>
        </section>


        {/* ================= INTERACTIVE SECTION ================= */}
        <section className="bg-black text-white py-20 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Feel the Learning
          </h2>

          <p className="text-lg text-gray-400">
            Interactive • Guided • Career-Focused
          </p>
        </section>

      </main>

      {openAuth && (
        <AuthModal close={() => setOpenAuth(false)} />
      )}
    </>
  );
}
