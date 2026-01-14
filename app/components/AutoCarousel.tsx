"use client";

export default function AutoCarousel() {
  const items = [
    "Web Development",
    "DSA & Problem Solving",
    "AI / Machine Learning",
    "Data Science",
    "Internships",
    "Live Projects",
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex w-max animate-carousel gap-6">
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="min-w-[260px] h-40 bg-white border border-gray-200 rounded-xl flex items-center justify-center font-semibold text-black"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
