"use client";

import dynamicImport from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Pie, Cell, Tooltip } from "recharts";
import AuthModal from "@/app/components/AuthModal";

/* Recharts – SSR safe */
const PieChart = dynamicImport(
  () => import("recharts").then(m => m.PieChart),
  { ssr: false }
);

const ResponsiveContainer = dynamicImport(
  () => import("recharts").then(m => m.ResponsiveContainer),
  { ssr: false }
);

const data = [
  { name: "Technical Skills", value: 35, color: "#2563EB" },
  { name: "Soft Skills", value: 25, color: "#10B981" },
  { name: "Practical Knowledge", value: 20, color: "#F59E0B" },
  { name: "Industry Awareness", value: 20, color: "#F97316" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white px-4 py-2 rounded-lg shadow-md border text-sm">
        <p className="font-semibold">{payload[0].name}</p>
        <p className="text-[#1d7e9e] font-bold">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function ResultClient() {
  const params = useSearchParams();
  const [domain, setDomain] = useState("your selected domain");
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const d = params.get("domain");
    if (d) setDomain(d);
  }, [params]);

  return (
    <>
      {showAuth && <AuthModal close={() => setShowAuth(false)} />}

      <main className="min-h-screen bg-gray-50 text-black py-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">
              Assessment Complete
            </h1>
            <p className="text-gray-600 text-lg">
              Based on your responses for{" "}
              <span className="text-[#216e88] font-semibold">{domain}</span>,
              here is your personalized analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* LEFT SIDE */}
            <div className="bg-white rounded-3xl p-10 shadow-md">

              <h2 className="text-2xl font-bold mb-8">
                Skill Distribution
              </h2>

              {/* Pie Chart */}
              <div className="h-72">
                <ResponsiveContainer>
                  <PieChart>
                    <Tooltip content={<CustomTooltip />} />
                    <Pie
                      data={data}
                      innerRadius={70}
                      outerRadius={110}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="mt-8 space-y-2">
                {data.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700 text-sm">
                      {item.name}
                    </span>
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
                  onClick={() => setShowAuth(true)}
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
                  onClick={() => setShowAuth(true)}
                  className="px-6 py-3 border border-[#139fd6] text-[#139fd6] rounded-xl hover:bg-blue-50"
                >
                  Start Learning
                </button>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-[#A9D6E5] to-[#139fd6] text-white rounded-3xl p-10 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to unlock your full potential?
                </h3>
                <p className="mb-6">
                  Create an account to save your results.
                </p>
                <button
                  onClick={() => setShowAuth(true)}
                  className="bg-white text-black px-8 py-3 rounded-xl font-semibold"
                >
                  Sign Up to Continue →
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
