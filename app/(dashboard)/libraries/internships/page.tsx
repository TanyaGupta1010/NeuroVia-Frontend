"use client";

import { useState, useMemo } from "react";

const colors = [
  "bg-indigo-200",
  "bg-orange-200",
  "bg-emerald-200",
  "bg-rose-200",
  "bg-cyan-200",
];

const categories = ["TECH", "LAW", "BUSINESS"];

export default function InternshipPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [visible, setVisible] = useState(6);

  // ✅ Generate internships safely inside useMemo (prevents hydration issue)
  const internshipsData = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => {
      const isPaid = Math.random() > 0.5;

      return {
        id: i + 1,
        title: `Internship ${i + 1}`,
        category: categories[i % categories.length],
        description:
          "Gain real-world experience by working on live industry projects and building your portfolio.",
        type: isPaid ? "Paid" : "Unpaid",
        stipend: isPaid ? "$800/month" : null,
        color: colors[i % colors.length],
      };
    });
  }, []);

  // ✅ Filter Logic
  const filteredInternships = useMemo(() => {
    return internshipsData.filter((item) => {
      const matchSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchType =
        typeFilter === "All" || item.type === typeFilter;

      const matchCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      return matchSearch && matchType && matchCategory;
    });
  }, [search, typeFilter, categoryFilter, internshipsData]);

  return (
    <div className="max-w-7xl mx-auto px-12 py-12">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-black">
        Internship Opportunities
      </h1>

      <p className="text-black mt-2 mb-8">
        Discover hands-on internships designed to give you practical industry exposure.
      </p>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-4 mb-10">

        {/* Search */}
        <input
          type="text"
          placeholder="Search internships..."
          className="border border-black rounded-xl px-4 py-2 w-64 text-black"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisible(6);
          }}
        />

        {/* Type Filter */}
        <select
          className="border border-black rounded-xl px-4 py-2 text-black"
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setVisible(6);
          }}
        >
          <option value="All">All</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>

        {/* Category Filter */}
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
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

      </div>

      {/* Internship Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredInternships.slice(0, visible).map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-300 overflow-hidden
            transition-all duration-300
            hover:border-blue-500 hover:shadow-lg hover:-translate-y-1"
          >

            {/* Top Colored Section */}
            <div className={`h-40 ${item.color} relative`}>

              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full border border-gray-300 text-sm font-semibold text-black">
                {item.type === "Paid" ? (
                  <span>{item.stipend}</span>
                ) : (
                  <span>Unpaid</span>
                )}
              </div>

            </div>

            {/* Content */}
            <div className="p-6">

              <span className="text-black text-sm font-semibold">
                {item.category}
              </span>

              <h3 className="text-xl font-bold text-black mt-2 mb-3">
                {item.title}
              </h3>

              <p className="text-black text-sm mb-6">
                {item.description}
              </p>

              <button className="bg-black text-white w-full py-3 rounded-full hover:scale-105 transition">
                Apply Now
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* Show More Button */}
      {visible < filteredInternships.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisible((prev) => prev + 6)}
            className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition"
          >
            Show More
          </button>
        </div>
      )}

    </div>
  );
}