"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, Lock, CheckCircle2, PlayCircle, BookOpen, ExternalLink, Sparkles } from "lucide-react";
import { api } from "../../../lib/api";

type NodeStatus = "LOCKED" | "IN_PROGRESS" | "COMPLETED";

interface RoadmapNode {
  id: string;
  title: string;
  status: NodeStatus;
  order: number;
  resources?: {
    free?: { title: string; url: string }[];
  };
}

interface Roadmap {
  id: string;
  currentLevel: string;
  progress: number;
  skill: { name: string };
  nodes: RoadmapNode[];
}

const statusConfig: Record<NodeStatus, { icon: React.ReactNode; dot: string; card: string }> = {
  COMPLETED: {
    icon: <CheckCircle2 size={20} className="text-emerald-500" />,
    dot: "bg-emerald-500 border-emerald-500 scale-110",
    card: "bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] opacity-100 border-emerald-100",
  },
  IN_PROGRESS: {
    icon: <PlayCircle size={20} className="text-[#139fd6]" />,
    dot: "bg-[#139fd6] border-[#139fd6] scale-125 ring-4 ring-blue-100",
    card: "bg-white shadow-[0_20px_40px_rgba(19,159,214,0.15)] opacity-100 border-blue-200",
  },
  LOCKED: {
    icon: <Lock size={20} className="text-gray-300" />,
    dot: "bg-white border-gray-300 scale-100",
    card: "bg-gray-50 opacity-50 border-gray-100",
  },
};

// Rotating status messages shown while waiting for AI
const GENERATING_MSGS = [
  "🤖 Gemini AI is building your roadmap...",
  "🔍 Searching YouTube for the best resources...",
  "📚 Organizing your learning path...",
  "⚡ Almost ready — finalizing your personalized nodes...",
  "🗺️ Stitching together your 5-step journey...",
];

export default function CourseRoadmap() {
  const { course } = useParams();
  const router = useRouter();
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generatingMsg, setGeneratingMsg] = useState(GENERATING_MSGS[0]);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0); // seconds waited
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const msgRef = useRef<NodeJS.Timeout | null>(null);
  const MAX_WAIT = 150; // seconds before giving up

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    // The URL param IS the skillId (set by QuizClient before navigating)
    const skillId = (course as string) || localStorage.getItem("lastSkillId") || "";

    if (!userId) {
      setError("Please log in to view your roadmap.");
      setLoading(false);
      return;
    }
    if (!skillId) {
      setError("No skill found. Please complete an assessment first.");
      setLoading(false);
      return;
    }

    let attempts = 0;

    const tryFetch = async () => {
      attempts++;
      setElapsed(attempts * 4);

      try {
        const data = await api.getRoadmap(userId, skillId);

        // Roadmap not generated yet — keep polling
        if (data?.message === "Roadmap not found for this skill yet." || data?.error) {
          if (attempts * 4 >= MAX_WAIT) {
            setGenerating(false);
            setError("Roadmap generation is taking longer than expected. Please try refreshing in a moment.");
            setLoading(false);
            return;
          }
          // Still waiting — show generating state
          setLoading(false);
          setGenerating(true);
          return; // pollRef will call again
        }

        // Success — roadmap is ready
        if (data?.nodes) {
          clearInterval(pollRef.current!);
          clearInterval(msgRef.current!);

          const total = data.nodes.length;
          const completed = data.nodes.filter((n: RoadmapNode) => n.status === "COMPLETED").length;
          const inProgress = data.nodes.filter((n: RoadmapNode) => n.status === "IN_PROGRESS").length;
          const progress = total > 0
            ? Math.round(((completed + inProgress * 0.5) / total) * 100)
            : 0;

          const nodes: RoadmapNode[] = data.nodes.map((n: any) => ({
            ...n,
            resources: typeof n.resources === "string" ? JSON.parse(n.resources) : (n.resources ?? {}),
          }));

          setRoadmap({ ...data, progress, nodes });

          const inProgressIdx = nodes.findIndex((n) => n.status === "IN_PROGRESS");
          if (inProgressIdx >= 0) setActiveIndex(inProgressIdx);

          setGenerating(false);
          setLoading(false);
        }
      } catch (e) {
        console.error("Roadmap poll error:", e);
        // Don't stop polling on network errors — backend might just be processing
      }
    };

    // Rotate the generating messages
    let msgIndex = 0;
    msgRef.current = setInterval(() => {
      msgIndex = (msgIndex + 1) % GENERATING_MSGS.length;
      setGeneratingMsg(GENERATING_MSGS[msgIndex]);
    }, 4000);

    // Poll every 4 seconds
    tryFetch(); // first attempt immediately
    pollRef.current = setInterval(tryFetch, 4000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (msgRef.current) clearInterval(msgRef.current);
    };
  }, [course]);

  // Scroll-based highlight
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".roadmap-step");
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top >= 100 && rect.top <= 400) setActiveIndex(index);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Initial spinner (first request) ───────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-[#139fd6] mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Checking for your roadmap...</p>
        </div>
      </div>
    );
  }

  // ── AI is still generating — show animated waiting state ─────────────────
  if (generating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md px-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#A9D6E5] to-[#139fd6] mb-6 shadow-lg">
            <Sparkles size={36} className="text-white" />
          </div>

          {/* Animated dots */}
          <div className="flex justify-center gap-2 mb-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-[#139fd6] animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>

          <h2 className="text-2xl font-bold text-black mb-3">
            Generating Your Roadmap
          </h2>
          <p className="text-gray-500 text-sm mb-2 transition-all duration-500">
            {generatingMsg}
          </p>
          <p className="text-gray-300 text-xs">
            {elapsed}s elapsed · This usually takes 15–30 seconds
          </p>

          {/* Progress bar */}
          <div className="mt-6 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#A9D6E5] to-[#139fd6] rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((elapsed / MAX_WAIT) * 100, 95)}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  // ── Error / not found ─────────────────────────────────────────────────────
  if (error || !roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">🗺️</div>
          <h2 className="text-2xl font-bold text-black mb-2">No Roadmap Found</h2>
          <p className="text-gray-500 mb-6 text-sm">{error || "Complete the assessment quiz first."}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-[#139fd6] text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
            >
              Retry
            </button>
            <button
              onClick={() => router.push("/assessment")}
              className="bg-gray-100 text-gray-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
            >
              Take Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Roadmap UI ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white px-10 py-16">
      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#139fd6]">
            {roadmap.currentLevel} Level
          </span>
          <span className="text-gray-300">·</span>
          <span className="text-xs font-bold text-gray-400">{roadmap.progress}% complete</span>
        </div>
        <h1 className="text-3xl font-bold text-black mb-2">
          {roadmap.skill.name} Roadmap
        </h1>
        <p className="text-gray-500 mb-4">Follow your AI-personalized learning journey</p>

        {/* Overall progress bar */}
        <div className="w-full bg-gray-100 h-2 rounded-full max-w-md">
          <div
            className="bg-[#139fd6] h-2 rounded-full transition-all duration-1000"
            style={{ width: `${roadmap.progress}%` }}
          />
        </div>
      </div>

      {/* TIMELINE */}
      <div className="relative max-w-5xl mx-auto mt-16">
        {/* CENTER LINE */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gray-100 -translate-x-1/2" />

        <div className="space-y-24">
          {roadmap.nodes.map((node, index) => {
            const isActive = index === activeIndex;
            const cfg = statusConfig[node.status];

            return (
              <div
                key={node.id}
                className="roadmap-step relative flex items-center justify-between"
              >
                {/* LEFT CARD */}
                <div className="w-[45%] flex justify-end">
                  {index % 2 === 0 && (
                    <NodeCard node={node} active={isActive} cfg={cfg} />
                  )}
                </div>

                {/* CENTER DOT */}
                <div className="relative z-10">
                  <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${cfg.dot}`} />
                </div>

                {/* RIGHT CARD */}
                <div className="w-[45%] flex justify-start">
                  {index % 2 !== 0 && (
                    <NodeCard node={node} active={isActive} cfg={cfg} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NodeCard({
  node,
  active,
  cfg,
}: {
  node: RoadmapNode;
  active: boolean;
  cfg: (typeof statusConfig)[NodeStatus];
}) {
  const [expanded, setExpanded] = useState(false);
  const resources = node.resources?.free || [];

  return (
    <div
      className={`w-[320px] p-6 rounded-2xl border transition-all duration-500 ${cfg.card} ${
        active ? "opacity-100" : node.status === "LOCKED" ? "opacity-40" : "opacity-80"
      }`}
    >
      <div className="flex items-start gap-2 mb-2">
        {cfg.icon}
        <span className="text-xs font-black uppercase tracking-widest text-gray-400">
          Step {node.order}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-black mb-2">{node.title}</h3>

      <span
        className={`text-[10px] font-black uppercase tracking-widest ${
          node.status === "COMPLETED"
            ? "text-emerald-500"
            : node.status === "IN_PROGRESS"
            ? "text-[#139fd6]"
            : "text-gray-400"
        }`}
      >
        {node.status.replace("_", " ")}
      </span>

      {/* Resources */}
      {resources.length > 0 && node.status !== "LOCKED" && (
        <div className="mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-bold text-[#139fd6] hover:underline flex items-center gap-1"
          >
            <BookOpen size={12} />
            {expanded ? "Hide" : "Show"} Resources ({resources.length})
          </button>

          {expanded && (
            <ul className="mt-3 space-y-2">
              {resources.slice(0, 3).map((r: { title: string; url: string }, i: number) => (
                <li key={i}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-600 hover:text-[#139fd6] flex items-center gap-1 group"
                  >
                    <ExternalLink size={11} className="shrink-0" />
                    <span className="truncate group-hover:underline">{r.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}