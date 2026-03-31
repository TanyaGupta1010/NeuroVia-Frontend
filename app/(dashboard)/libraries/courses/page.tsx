"use client";

import { useState, useMemo, useEffect } from "react";
import { api } from "../../../lib/api";
import { Loader2, Sparkles } from "lucide-react";

// Static fallback courses (always shown, represent platform content)
const STATIC_COURSES = [
  {
    id: "static-1",
    title: "Introduction to Psychology",
    category: "MEDICAL",
    description: "Explore the human mind — from cognition to behavior and mental health.",
    type: "Free",
    price: null,
    color: "bg-purple-200",
    isStatic: true,
  },
  {
    id: "static-2",
    title: "Business Analytics",
    category: "BUSINESS",
    description: "Learn to make data-driven decisions using modern analytics tools.",
    type: "Paid",
    price: "$49.99",
    color: "bg-yellow-200",
    isStatic: true,
  },
  {
    id: "static-3",
    title: "Contract Law Fundamentals",
    category: "LAW",
    description: "Understand the foundations of contract law and legal agreements.",
    type: "Free",
    price: null,
    color: "bg-pink-200",
    isStatic: true,
  },
  {
    id: "static-4",
    title: "Full-Stack Web Development",
    category: "TECHNOLOGY",
    description: "Build modern web apps with React, Node.js, and databases.",
    type: "Paid",
    price: "$79.99",
    color: "bg-blue-200",
    isStatic: true,
  },
  {
    id: "static-5",
    title: "Machine Learning Foundations",
    category: "DATA SCIENCE",
    description: "Master ML algorithms, model evaluation, and practical applications.",
    type: "Paid",
    price: "$59.99",
    color: "bg-green-200",
    isStatic: true,
  },
  {
    id: "static-6",
    title: "UI/UX Design Principles",
    category: "ARTS & DESIGN",
    description: "Create stunning, user-centered digital experiences that convert.",
    type: "Free",
    price: null,
    color: "bg-orange-200",
    isStatic: true,
  },
];

const COLORS = [
  "bg-yellow-200",
  "bg-pink-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-purple-200",
  "bg-orange-200",
  "bg-teal-200",
  "bg-red-200",
];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [visible, setVisible] = useState(6);
  const [dbCourses, setDbCourses] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loadingDb, setLoadingDb] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "recommended">("all");

  useEffect(() => {
    const loadFromDb = async () => {
      try {
        const userId = localStorage.getItem("userId");

        // Fetch all interests (categories) from DB
        const interests = await api.getAllInterests();

        // For each interest, fetch its skills and turn into course cards
        const fetched: any[] = [];
        for (const interest of interests) {
          const skills = await api.getSkillsByInterest(interest.id);
          for (const skill of skills) {
            fetched.push({
              id: skill.id,
              title: skill.name,
              category: interest.name.toUpperCase(),
              description: `Master ${skill.name} with AI-guided learning and personalized assessments.`,
              type: Math.random() > 0.5 ? "Free" : "Paid",
              price: Math.random() > 0.5 ? null : "$49.99",
              color: COLORS[fetched.length % COLORS.length],
              isStatic: false,
              skillId: skill.id,
            });
          }
        }

        setDbCourses(fetched);

        // Fetch recommendations if logged in
        if (userId) {
          const recData = await api.getRecommendations(userId);
          if (recData.recommendations && Array.isArray(recData.recommendations)) {
            const recSkillNames = recData.recommendations.map((r: any) =>
              r.skill.toLowerCase()
            );
            setRecommendations(recSkillNames);
          }
        }
      } catch (err) {
        console.error("Failed to load DB courses:", err);
      } finally {
        setLoadingDb(false);
      }
    };

    loadFromDb();
  }, []);

  // Merge DB + static (deduplicate by title)
  const allCourses = useMemo(() => {
    const dbTitles = new Set(dbCourses.map((c) => c.title.toLowerCase()));
    const uniqueStatic = STATIC_COURSES.filter(
      (s) => !dbTitles.has(s.title.toLowerCase())
    );
    return [...dbCourses, ...uniqueStatic];
  }, [dbCourses]);

  // Recommended courses = those whose title/category matches user's recommendation list
  const recommendedCourses = useMemo(() => {
    if (recommendations.length === 0) return [];
    return allCourses.filter((c) =>
      recommendations.some(
        (r) =>
          c.title.toLowerCase().includes(r) ||
          c.category.toLowerCase().includes(r)
      )
    );
  }, [allCourses, recommendations]);

  const displayCourses = activeTab === "recommended" ? recommendedCourses : allCourses;

  const categories = useMemo(
    () => [...new Set(allCourses.map((c) => c.category))],
    [allCourses]
  );

  const filteredCourses = useMemo(() => {
    return displayCourses.filter((course) => {
      const matchSearch = course.title.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "All" || course.type === typeFilter;
      const matchCategory = categoryFilter === "All" || course.category === categoryFilter;
      return matchSearch && matchType && matchCategory;
    });
  }, [displayCourses, search, typeFilter, categoryFilter]);

  return (
    <div className="max-w-7xl mx-auto px-12 py-12">
      {/* Heading */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Course Library</h1>
          <p className="text-gray-500 mt-2">
            Explore our curated collection of expert-designed courses to upgrade your skills.
          </p>
        </div>
        {loadingDb && (
          <div className="flex items-center gap-2 text-[#139fd6] text-sm font-medium">
            <Loader2 size={16} className="animate-spin" />
            Loading from database...
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-8">
        <button
          onClick={() => { setActiveTab("all"); setVisible(6); }}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === "all" ? "bg-white text-black shadow-sm" : "text-gray-500"
          }`}
        >
          All Courses
        </button>
        <button
          onClick={() => { setActiveTab("recommended"); setVisible(6); }}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === "recommended"
              ? "bg-white text-[#139fd6] shadow-sm"
              : "text-gray-500"
          }`}
        >
          <Sparkles size={14} />
          Recommended
          {recommendedCourses.length > 0 && (
            <span className="bg-[#139fd6] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
              {recommendedCourses.length}
            </span>
          )}
        </button>
      </div>

      {/* Recommended empty state */}
      {activeTab === "recommended" && recommendedCourses.length === 0 && !loadingDb && (
        <div className="text-center py-20">
          <Sparkles size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-semibold text-lg">No recommendations yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Take an assessment quiz to get personalized course recommendations.
          </p>
        </div>
      )}

      {/* Search + Filters */}
      {(activeTab === "all" || recommendedCourses.length > 0) && (
        <div className="flex flex-wrap gap-4 mb-10">
          <input
            type="text"
            placeholder="Search courses..."
            className="border border-gray-200 rounded-xl px-4 py-2 w-64 text-black text-sm focus:ring-2 focus:ring-[#139fd6] focus:border-transparent outline-none"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setVisible(6); }}
          />
          <select
            className="border border-gray-200 rounded-xl px-4 py-2 text-black text-sm focus:ring-2 focus:ring-[#139fd6] outline-none"
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setVisible(6); }}
          >
            <option value="All">All Types</option>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
          <select
            className="border border-gray-200 rounded-xl px-4 py-2 text-black text-sm focus:ring-2 focus:ring-[#139fd6] outline-none"
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setVisible(6); }}
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.slice(0, visible).map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-[#139fd6] hover:shadow-lg hover:-translate-y-1"
          >
            {/* Top colored area */}
            <div className={`h-40 ${course.color} relative flex items-center justify-center`}>
              {recommendations.some((r) =>
                course.title.toLowerCase().includes(r) ||
                course.category.toLowerCase().includes(r)
              ) && (
                <div className="absolute top-4 left-4 bg-[#139fd6] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={10} />
                  Recommended
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full border border-gray-200 text-sm font-semibold text-black">
                {course.type === "Free" ? "Free" : course.price}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <span className="text-[#139fd6] text-xs font-black uppercase tracking-widest">
                {course.category}
              </span>
              <h3 className="text-xl font-bold text-black mt-2 mb-3">{course.title}</h3>
              <p className="text-gray-500 text-sm mb-6">{course.description}</p>
              <button className="bg-black text-white w-full py-3 rounded-full hover:scale-105 transition font-semibold">
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
            className="bg-black text-white px-8 py-3 rounded-xl hover:scale-105 transition font-semibold"
          >
            Show More
          </button>
        </div>
      )}

      {filteredCourses.length === 0 && !loadingDb && (
        <div className="text-center py-20 text-gray-400 font-medium">
          No courses found matching your filters.
        </div>
      )}
    </div>
  );
}