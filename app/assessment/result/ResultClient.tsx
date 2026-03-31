"use client";

import dynamicImport from "next/dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Pie, Cell, Tooltip } from "recharts";
import { MapPin, Loader2, Sparkles } from "lucide-react";

/* Recharts – SSR safe */
const PieChart = dynamicImport(
  () => import("recharts").then(m => m.PieChart),
  { ssr: false }
);

const ResponsiveContainer = dynamicImport(
  () => import("recharts").then(m => m.ResponsiveContainer),
  { ssr: false }
);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white px-4 py-2 rounded-lg shadow-md border text-sm">
        <p className="font-semibold">{payload[0].name}</p>
        <p className="text-[#A9D6E5] font-bold">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function ResultClient() {
  const params = useSearchParams();
  const router = useRouter();
  const [domain, setDomain] = useState("your selected domain");
  const [score, setScore] = useState(0);
  const [skillId, setSkillId] = useState("");
  const [waitingForRoadmap, setWaitingForRoadmap] = useState(false);

  // Derive skill distribution data from score
  const getChartData = (s: number) => [
    { name: "Correct Answers", value: s, color: "#139fd6" },
    { name: "To Improve", value: 100 - s, color: "#e5e7eb" },
  ];

  const [chartData, setChartData] = useState(getChartData(0));

  useEffect(() => {
    const d = params.get("domain");
    const s = parseInt(params.get("score") || "0", 10);
    const sk = params.get("skillId") || localStorage.getItem("lastSkillId") || "";
    if (d) setDomain(d);
    setScore(s);
    setSkillId(sk);
    setChartData(getChartData(s));
  }, [params]);

  const handleViewRoadmap = async () => {
    if (!skillId) return;
    localStorage.setItem("lastSkillId", skillId);
    localStorage.setItem("lastDomain", domain);
    router.push(`/roadmap/${skillId}`);
  };

  const levelLabel = score >= 70 ? "Advanced" : score >= 40 ? "Intermediate" : "Beginner";
  const levelColor = score >= 70 ? "text-emerald-500" : score >= 40 ? "text-yellow-500" : "text-orange-500";

  return (
    <>

      <main className="min-h-screen bg-gray-50 text-black py-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
              ✓ Assessment Complete
            </div>
            <h1 className="text-4xl font-bold mb-2">Your Results</h1>
            <p className="text-gray-600 text-lg">
              You scored{" "}
              <span className="text-[#139fd6] font-bold text-2xl">{score}%</span>{" "}
              in <span className="text-[#216e88] font-semibold">{domain}</span>
            </p>
            <p className={`text-lg font-bold mt-1 ${levelColor}`}>{levelLabel} Level</p>
            <p className="text-gray-500 text-sm mt-2">Your AI-personalized roadmap is being generated...</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* LEFT SIDE */}
            <div className="bg-white rounded-3xl p-10 shadow-md">

              <h2 className="text-2xl font-bold mb-8">
                Skill Distribution
              </h2>

              {/* Score display */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke="#139fd6" strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 40 * score / 100} ${2 * Math.PI * 40 * (1 - score / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-black">{score}%</span>
                    <span className={`text-xs font-bold ${levelColor}`}>{levelLabel}</span>
                  </div>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="h-48">
                <ResponsiveContainer>
                  <PieChart>
                    <Tooltip content={<CustomTooltip />} />
                    <Pie
                      data={chartData}
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="mt-4 space-y-2">
                {chartData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-700 text-sm">{item.name}</span>
                    <span className="text-gray-500 text-sm font-bold ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>

              {/* Areas to Improve */}
              <div className="mt-10">
                <h3 className="text-lg font-semibold mb-4">
                  Areas to Improve
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Advanced Problem Solving</li>
                  <li>• Industry Specific Tools</li>
                  <li>• Project Management</li>
                </ul>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-8">

              {/* Paid Course */}
              <div className="bg-white rounded-3xl p-8 shadow-md border border-blue-200">
                <h3 className="text-xl font-bold mb-2">
                  Complete {domain} Masterclass
                </h3>
                <p className="text-gray-600 mb-4">
                  40 Hours • Certificate Included
                </p>
                <p className="text-gray-600 mb-6">
                  Deep dive into advanced concepts with industry experts.
                </p>
                <div className="text-2xl font-bold mb-4">$49.99</div>
                <button
                  onClick={() => router.push('/libraries/courses')}
                  className="px-6 py-3 bg-[#139fd6] text-white rounded-xl hover:bg-[#50b3cf]"
                >
                  View Course
                </button>
              </div>

              {/* FREE Course */}
              <div className="bg-white rounded-3xl p-8 shadow-md">
                <h3 className="text-xl font-bold mb-2">
                  Intro to {domain} Essentials
                </h3>
                <p className="text-gray-600 mb-4">
                  12 Hours • Self-paced
                </p>
                <p className="text-gray-600 mb-6">
                  Perfect for beginners looking to build foundation.
                </p>
                <div className="text-[#139fd6] font-bold text-xl mb-4">
                  Free
                </div>
                <button
                  onClick={() => router.push('/libraries/courses')}
                  className="px-6 py-3 border border-[#139fd6] text-[#139fd6] rounded-xl hover:bg-blue-50"
                >
                  Start Learning
                </button>
              </div>

              {/* CTA — View Roadmap */}
              <div className="bg-gradient-to-r from-[#A9D6E5] to-[#139fd6] text-white rounded-3xl p-10 text-center">
                <Sparkles size={32} className="mx-auto mb-3" />
                <h3 className="text-2xl font-bold mb-2">
                  Your Roadmap is Ready!
                </h3>
                <p className="mb-6 text-blue-100 text-sm">
                  AI has generated a 5-step personalized roadmap based on your {score}% score.
                </p>
                <button
                  onClick={handleViewRoadmap}
                  disabled={waitingForRoadmap || !skillId}
                  className="bg-white text-[#139fd6] px-8 py-3 rounded-xl font-bold hover:scale-105 transition disabled:opacity-70 flex items-center gap-2 mx-auto"
                >
                  {waitingForRoadmap ? (
                    <><Loader2 size={18} className="animate-spin" /> Preparing roadmap...</>
                  ) : (
                    <><MapPin size={18} /> View My Roadmap →</>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
