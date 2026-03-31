"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MapPin, Lock, CheckCircle2, PlayCircle } from "lucide-react";
import { api } from "../../lib/api";

interface UserInterest {
  id: string;
  interestId: string;
  interest: { id: string; name: string };
}

interface RoadmapSummary {
  skillId: string;
  skillName: string;
  progress: number;
  currentLevel: string;
  status: "loaded" | "not_found";
}

export default function RoadmapPage() {
  const router = useRouter();
  const [roadmaps, setRoadmaps] = useState<RoadmapSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          router.push("/login");
          return;
        }

        // Get user's interests
        const interestsData = await api.getUserInterests(userId);
        if (!Array.isArray(interestsData) || interestsData.length === 0) {
          setLoading(false);
          return;
        }

        const results: RoadmapSummary[] = [];

        for (const ui of interestsData) {
          // Get skills for this interest
          const skills = await api.getSkillsByInterest(ui.interest.id);
          if (!Array.isArray(skills) || skills.length === 0) continue;

          const skill = skills[0]; // primary skill per interest
          const roadmapData = await api.getRoadmap(userId, skill.id);

          if (roadmapData && !roadmapData.message && !roadmapData.error && roadmapData.nodes) {
            // Calculate progress from nodes (schema has no progress field)
            const total = roadmapData.nodes.length;
            const completed = roadmapData.nodes.filter((n: any) => n.status === "COMPLETED").length;
            const inProgress = roadmapData.nodes.filter((n: any) => n.status === "IN_PROGRESS").length;
            const progress = total > 0
              ? Math.round(((completed + inProgress * 0.5) / total) * 100)
              : 0;

            results.push({
              skillId: skill.id,
              skillName: skill.name,
              progress,
              currentLevel: roadmapData.currentLevel ?? "beginner",
              status: "loaded",
            });
          } else {
            results.push({
              skillId: skill.id,
              skillName: skill.name,
              progress: 0,
              currentLevel: "—",
              status: "not_found",
            });
          }
        }

        setRoadmaps(results);
      } catch (err) {
        console.error("Failed to load roadmaps:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 size={36} className="animate-spin text-[#139fd6] mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Loading your roadmaps...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-10 py-10">
      <h1 className="text-3xl font-bold text-black mb-2">Your Roadmaps</h1>
      <p className="text-gray-500 mb-10">Continue your AI-personalized learning journey</p>

      {roadmaps.length === 0 ? (
        <div className="text-center py-20 max-w-md mx-auto">
          <MapPin size={48} className="mx-auto text-gray-200 mb-4" />
          <h2 className="text-xl font-bold text-black mb-2">No Roadmaps Yet</h2>
          <p className="text-gray-400 text-sm mb-6">
            Take an assessment quiz to generate your first AI-personalized roadmap.
          </p>
          <button
            onClick={() => router.push("/assessment")}
            className="bg-[#139fd6] text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Start Assessment
          </button>
        </div>
      ) : (
        <div className="space-y-6 max-w-3xl">
          {roadmaps.map((rm) => (
            <div
              key={rm.skillId}
              onClick={() => {
                localStorage.setItem("lastSkillId", rm.skillId);
                localStorage.setItem("lastDomain", rm.skillName);
                router.push(`/roadmap/${rm.skillId}`);
              }}
              className="bg-white p-6 rounded-2xl shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-black">{rm.skillName}</h3>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                    {rm.currentLevel} level
                  </span>
                </div>
                {rm.status === "loaded" ? (
                  rm.progress === 100 ? (
                    <CheckCircle2 size={22} className="text-emerald-500" />
                  ) : rm.progress > 0 ? (
                    <PlayCircle size={22} className="text-[#139fd6]" />
                  ) : (
                    <Lock size={22} className="text-gray-300" />
                  )
                ) : (
                  <span className="text-xs text-gray-300 font-medium">quiz pending</span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="w-full bg-gray-100 h-2 rounded-full">
                  <div
                    className="bg-[#139fd6] h-2 rounded-full transition-all duration-700"
                    style={{ width: `${rm.progress}%` }}
                  />
                </div>
                <span className="text-sm text-black font-bold shrink-0">{rm.progress}%</span>
              </div>
            </div>
          ))}

          <button
            onClick={() => router.push("/assessment")}
            className="w-full border-2 border-dashed border-gray-200 p-6 rounded-2xl text-gray-400 hover:border-[#139fd6] hover:text-[#139fd6] transition-all font-semibold text-sm"
          >
            + Add New Skill
          </button>
        </div>
      )}
    </div>
  );
}