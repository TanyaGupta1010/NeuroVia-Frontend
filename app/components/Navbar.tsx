"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold text-black tracking-tight"
        >
          neurovia
        </Link>

        {/* Center Menu */}
        <div className="hidden md:flex items-center gap-10 text-base font-medium text-black">
          
          {/* Services Dropdown */}
          <div
            className="relative cursor-pointer flex items-center gap-1"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <span>Services</span>
            <span className="text-sm">▾</span>

            {open && (
              <div className="absolute top-8 left-0 bg-white border border-gray-200 rounded-lg shadow-md w-56 py-2">
                <Link
                  href="/assessment"
                  className="block px-5 py-2.5 hover:bg-gray-100"
                >
                  Skill Assessment
                </Link>
                <Link
                  href="/roadmap"
                  className="block px-5 py-2.5 hover:bg-gray-100"
                >
                  Personalized Roadmap
                </Link>
                <Link
                  href="/analytics"
                  className="block px-5 py-2.5 hover:bg-gray-100"
                >
                  Growth Analytics
                </Link>
              </div>
            )}
          </div>

          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/signup"
            className="px-6 py-2.5 bg-black text-white rounded-full text-base font-semibold"
          >
            SIGN UP
          </Link>
          <Link
            href="/login"
            className="px-6 py-2.5 border border-black text-black rounded-full text-base font-semibold"
          >
            LOG IN
          </Link>
        </div>
      </div>
    </nav>
  );
}
