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
      {/* This wrapper detects if the modal is open. 
        If true, it blurs the background and prevents clicking on it.
      */}
      <div 
        className={`transition-all duration-500 ease-in-out ${
          openAuth ? "blur-md scale-[0.98] pointer-events-none select-none" : ""
        }`}
      >
        <main className="bg-white text-black">

          {/* ================= HERO ================= */}
          <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div>
              <h1 className="text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
                Learn Smarter. <br />
                <span className="text-gray-400">Build Real Skills.</span> <br />
                Grow with NeuroVia.
              </h1>

              <p className="text-xl text-gray-500 mb-8 max-w-lg leading-relaxed">
                AI-personalized skill assessment, learning roadmaps, and
                career-ready guidance — all in one platform.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setOpenAuth(true)}
                  className="px-8 py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-zinc-800 transition-transform active:scale-95 shadow-xl shadow-black/10"
                >
                  Get Started
                </button>

                <a
                  href="/assessment"
                  className="px-8 py-4 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition-all"
                >
                  Take Skill Quiz
                </a>
              </div>
            </div>

            <div className="relative h-[500px] w-full animate-in fade-in slide-in-from-right duration-1000">
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
          <section className="bg-gray-50 py-24 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center shadow-lg shadow-black/20">
                  <BookOpenText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold tracking-tight">
                  Courses & Internships
                </h2>
              </div>
              <AutoCarousel />
            </div>
          </section>

          {/* ================= WHY NEUROVIA ================= */}
          <section className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 tracking-tight">
                Why NeuroVia?
              </h2>
              <p className="text-xl text-gray-500 max-w-md leading-relaxed">
                Most platforms give generic roadmaps.
                NeuroVia evaluates your real skills and adapts learning
                so you always know what to learn next.
              </p>
            </div>

            {/* Demo Video */}
            <div className="h-80 bg-zinc-900 text-white rounded-[2.5rem] flex items-center justify-center text-xl font-bold shadow-2xl overflow-hidden border-8 border-white">
              <video
                className="w-full h-full object-cover"
                autoPlay muted loop
                poster="https://res.cloudinary.com/dx0r0pbgb/image/upload/v1772991680/Screenshot_2026-03-08_231030_e5ny89.png"
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

            </div>
          </section>

          {/* ================= INTERACTIVE SECTION ================= */}
          <section className="bg-black text-white py-32 text-center rounded-t-[3rem]">
            <h2 className="text-5xl font-extrabold mb-6 tracking-tighter">
              Feel the Learning
            </h2>
            <p className="text-xl text-gray-400 font-medium">
              Interactive • Guided • Career-Focused
            </p>
          </section>
        </main>
      </div>

      {/* The Modal remains outside the blurred div */}
      {openAuth && (
        <AuthModal close={() => setOpenAuth(false)} />
      )}
    </>
  );
}