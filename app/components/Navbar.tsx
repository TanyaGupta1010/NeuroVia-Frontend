"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/neurovia.jpg"
              alt="NeuroVia Logo"
              width={120}
              height={32}
              className="object-contain"
              priority
            />
          </Link>

          {/* Center Menu */}
          <div className="hidden md:flex items-center gap-10 text-base font-medium text-black">

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <Link
                href="/services"
                className="flex items-center gap-1"
              >
                Services
                <span
                  className={`transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </Link>

              {/* Dropdown */}
              <div
                className={`absolute top-10 left-0 w-56 rounded-xl bg-white border border-gray-200 shadow-lg
                transition-all duration-200 ease-out
                ${
                  open
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-2 invisible"
                }`}
              >
                <ul className="py-2 text-sm text-black">
                  <li>
                    <Link
                      href="/services#assessment"
                      className="block px-5 py-2.5 hover:bg-gray-100"
                    >
                      Skill Assessment
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services#courses"
                      className="block px-5 py-2.5 hover:bg-gray-100"
                    >
                      Courses & Internships
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services#roadmap"
                      className="block px-5 py-2.5 hover:bg-gray-100"
                    >
                      Personalized Roadmap
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {/* Right CTA */}
          <div className="flex items-center">
            <button
              onClick={() => setShowAuth(true)}
              className="px-8 py-2.5 bg-black text-white rounded-full text-base font-semibold hover:bg-gray-900 transition"
            >
              Sign Up / Log In
            </button>
          </div>

        </div>
      </nav>

      {/* AUTH MODAL */}
      {showAuth && <AuthModal close={() => setShowAuth(false)} />}
    </>
  );
}
