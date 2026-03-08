"use client";

import { useEffect, useRef, useState } from "react";

export default function AutoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationFrame: number;

    const animate = () => {
      if (!track) return;

      if (!isPaused) {
        track.scrollLeft += 0.5;

        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  // Put your image URLs here
  const images = [
    "https://res.cloudinary.com/dx0r0pbgb/image/upload/v1772990020/coursera_mdhnjh.png",
    "https://res.cloudinary.com/dx0r0pbgb/image/upload/v1772990868/udemy-removebg-preview_m81wtx.png",
    "https://res.cloudinary.com/dx0r0pbgb/image/upload/v1772990321/infosys_bjo1gy.png",
    "https://res.cloudinary.com/dx0r0pbgb/image/upload/v1772991018/fcc_nteznp.png",
    "https://res.cloudinary.com/dx0r0pbgb/image/upload/v1772990511/aws_rlhwup.png",
    "https://res.cloudinary.com/dx0r0pbgb/image/upload/v1772990667/ms_mddnno.png",
  ];

  return (
    <section
      className="relative w-full py-2 bg-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Soft Edge Fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10" />

      <div
        ref={trackRef}
        className="flex gap-12 overflow-x-hidden"
      >
        {[...images, ...images].map((image, index) => (
          <div
            key={index}
            className="
              min-w-[260px]
              h-[160px]
              bg-white
              rounded-3xl
              flex
              items-center
              justify-center
              text-5xl
              font-semibold
              text-black
              transition-all
              duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              shadow-[0_4px_12px_rgba(0,0,0,0.04)]
              hover:-translate-y-2
              hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
            "
          >
          <img
              src={image}
              alt="carousel"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}