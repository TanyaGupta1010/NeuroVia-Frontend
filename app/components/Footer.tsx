import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* LEFT: BRAND */}
        <div className="md:col-span-2">
          <h2 className="text-4xl font-bold mb-4">NeuroVia</h2>
          <p className="text-gray-400 max-w-md">
            NeuroVia is an AI-powered learning platform that evaluates your
            skills, builds personalized roadmaps, and guides you toward
            real-world career readiness.
          </p>
        </div>

        {/* CENTER: QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/skills">My Skills</Link></li>
            <li><Link href="/assessment">Skill Assessment</Link></li>
            <li><Link href="/roadmap">Roadmap</Link></li>
            <li><Link href="/courses">Courses</Link></li>
          </ul>
        </div>

        {/* RIGHT: CONTACT & SOCIALS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Email: contact@neurovia.in</li>
            <li>LinkedIn</li>
            <li>GitHub</li>
            <li>Twitter / X</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} NeuroVia. All rights reserved.
      </div>
    </footer>
  );
}
