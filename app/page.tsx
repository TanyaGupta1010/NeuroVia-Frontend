import AutoCarousel from "@/app/components/AutoCarousel";

export default function HomePage() {
  return (
    <main className="bg-white text-black">

      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
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
            <a
              href="/signup"
              className="px-6 py-3 bg-black text-white rounded-full font-semibold"
            >
              Sign Up
            </a>

            <a
              href="/assessment"
              className="px-6 py-3 border border-black rounded-full font-semibold"
            >
              Take Skill Quiz
            </a>
          </div>
        </div>

        {/* Right Visual */}
        <div className="h-80 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
          Product Dashboard Preview
        </div>
      </section>

      {/* ================= COURSES & INTERNSHIPS ================= */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">
            Courses & Internships
          </h2>

          <AutoCarousel />
        </div>
      </section>

      {/* ================= DEMO VIDEO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Text */}
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

        {/* Right Video */}
        <div className="h-64 bg-black text-white rounded-xl flex items-center justify-center text-xl font-semibold">
          DEMO VIDEO
        </div>
      </section>

      {/* ================= INTERACTIVE FEEL ================= */}
      <section className="bg-black text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Feel the Learning
        </h2>

        <p className="text-lg text-gray-400">
          Interactive • Guided • Career-Focused
        </p>
      </section>

    </main>
  );
}
