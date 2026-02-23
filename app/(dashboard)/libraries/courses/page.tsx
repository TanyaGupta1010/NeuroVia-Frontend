"use client";

import { useState, useMemo } from "react";

const colors = [
  "bg-yellow-200",
  "bg-pink-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-purple-200",
];

const categories = ["LAW", "MEDICAL", "BUSINESS"];

const coursesData = Array.from({ length: 18 }, (_, i) => {
  const isFree = Math.random() > 0.5;

  return {
    id: i + 1,
    title: `Course ${i + 1}`,
    category: categories[i % 3],
    description:
      "Learn from industry experts with practical projects and real-world applications.",
    type: isFree ? "Free" : "Paid",
    price: isFree ? null : "$49.99",
    color: colors[i % colors.length],
  };
});

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [visible, setVisible] = useState(6);

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchSearch = course.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchType =
        typeFilter === "All" || course.type === typeFilter;

      const matchCategory =
        categoryFilter === "All" ||
        course.category === categoryFilter;

      return matchSearch && matchType && matchCategory;
    });
  }, [search, typeFilter, categoryFilter]);

  return (
    <div className="max-w-7xl mx-auto px-12 py-12">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-black">
        Course Library
      </h1>

      <p className="text-black mt-2 mb-8">
        Explore our curated collection of expert-designed courses to upgrade your skills.
      </p>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-4 mb-10">

        <input
          type="text"
          placeholder="Search courses..."
          className="border border-black rounded-xl px-4 py-2 w-64 text-black"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisible(6);
          }}
        />

        <select
          className="border border-black rounded-xl px-4 py-2 text-black"
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setVisible(6);
          }}
        >
          <option value="All">All</option>
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>

        <select
          className="border border-black rounded-xl px-4 py-2 text-black"
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setVisible(6);
          }}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {filteredCourses.slice(0, visible).map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-gray-300 overflow-hidden
            transition-all duration-300
            hover:border-blue-500 hover:shadow-lg hover:-translate-y-1"
          >

            {/* Top colored area */}
            <div className={`h-40 ${course.color} relative`}>

              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full border border-gray-300 text-sm font-semibold text-black">
                {course.type === "Free" ? (
                  <span> Free</span>
                ) : (
                  <span> {course.price}</span>
                )}
              </div>

            </div>

            {/* Content */}
            <div className="p-6">

              <span className="text-black text-sm font-semibold">
                {course.category}
              </span>

              <h3 className="text-xl font-bold text-black mt-2 mb-3">
                {course.title}
              </h3>

              <p className="text-black text-sm mb-6">
                {course.description}
              </p>

              <button className="bg-black text-white w-full py-3 rounded-full hover:scale-105 transition">
                Enroll Now
              </button>

            </div>
          </div>
        ))}

      </div>

      {/* Show More */}
      {visible < filteredCourses.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisible(visible + 6)}
            className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}