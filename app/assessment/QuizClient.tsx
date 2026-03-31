"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { api } from "../lib/api";

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

export default function QuizClient({ domain }: { domain: string }) {
  const [step, setStep] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [skillId, setSkillId] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Setting up your quiz...");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    const setup = async () => {
      try {
        // ── Step 1: Resolve Interest ────────────────────────────────────────
        setLoadingMsg("Mapping your domain...");

        let interest: any = null;
        const createIntRes = await api.createInterest(domain);

        if (createIntRes?.id) {
          // Freshly created
          interest = createIntRes;
        } else {
          // Already exists (400 error) — find it by name from all interests
          const allInterests = await api.getAllInterests();
          interest = (allInterests as any[]).find(
            (i: any) => i.name?.toLowerCase() === domain.toLowerCase()
          );
        }

        if (!interest?.id) throw new Error(`Could not resolve interest for "${domain}"`);

        // ── Step 2: Save user interest (best-effort, ignore if dupe) ────────
        const userId = localStorage.getItem("userId");
        if (userId) {
          await api.addUserInterest(userId, interest.id, 1).catch(() => {
            // P2002 duplicate — ignore silently
          });
        }

        // ── Step 3: Resolve Skill (find existing OR create) ─────────────────
        setLoadingMsg("Preparing skill assessment...");

        // First look for an existing skill under this interest with the same name
        const existingSkills = await api.getSkillsByInterest(interest.id);
        let skill: any = null;

        if (Array.isArray(existingSkills)) {
          skill = existingSkills.find(
            (s: any) => s.name?.toLowerCase() === domain.toLowerCase()
          );
        }

        // If not found, create it
        if (!skill?.id) {
          const createSkillRes = await api.createSkill(domain, interest.id);
          if (createSkillRes?.id) {
            skill = createSkillRes;
          } else if (Array.isArray(existingSkills) && existingSkills.length > 0) {
            // Fallback: use first available skill under this interest
            skill = existingSkills[0];
          }
        }

        if (!skill?.id) throw new Error(`Could not resolve skill for "${domain}"`);
        setSkillId(skill.id);

        // ── Step 4: Fetch questions (generate via AI if none exist) ─────────
        setLoadingMsg("Loading your questions...");
        let quizData = await api.getQuizBySkill(skill.id);

        if (!quizData?.questions || quizData.questions.length === 0) {
          setLoadingMsg("🤖 Generating AI questions… this may take ~15 seconds");
          await api.generateQuestions(skill.id);
          quizData = await api.getQuizBySkill(skill.id);
        }

        if (quizData?.questions?.length > 0) {
          setQuestions(quizData.questions);
        } else {
          throw new Error("No questions could be loaded. Try again in a moment.");
        }
      } catch (err: any) {
        console.error("🔴 Quiz setup error:", err);
        setErrorMsg(err?.message || "Failed to load quiz. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    setup();
  }, [domain]);

  const handleSelect = (optionId: string) => {
    setSelectedAnswers({ ...selectedAnswers, [step]: optionId });
  };

  const handleNext = async () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
      return;
    }

    // Final submission
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // Store quiz context then redirect to login
      localStorage.setItem("pendingSkillId", skillId);
      localStorage.setItem("pendingDomain", domain);
      router.push("/login");
      return;
    }

    setSubmitting(true);
    try {
      const answers = questions.map((_, i) => ({
        optionId: selectedAnswers[i] || "",
      }));

      const result = await api.submitQuiz(userId, skillId, answers, "INITIAL");

      const total = result?.total ?? answers.length;
      const score = total > 0 ? Math.round(((result?.score ?? 0) / total) * 100) : 0;

      localStorage.setItem("lastSkillId", skillId);
      localStorage.setItem("lastDomain", domain);

      router.push(`/assessment/result?domain=${encodeURIComponent(domain)}&score=${score}&skillId=${skillId}`);
    } catch (err) {
      console.error("Quiz submit error:", err);
      setSubmitting(false);
    }
  };

  const progress = questions.length > 0 ? ((step + 1) / questions.length) * 100 : 0;

  // ── Loading State ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-16 border border-gray-100 mt-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 mb-6">
          <Sparkles className="text-[#139fd6]" size={28} />
        </div>
        <Loader2 size={36} className="animate-spin text-[#139fd6] mx-auto mb-4" />
        <p className="text-gray-700 font-semibold text-lg">{loadingMsg}</p>
        <p className="text-gray-400 text-sm mt-2">Powered by Gemini AI</p>
      </div>
    );
  }

  // ── Error State ────────────────────────────────────────────────────────────
  if (errorMsg || questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-16 border border-gray-100 mt-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6 mx-auto">
          <AlertCircle size={32} className="text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-black mb-2">Something went wrong</h3>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">{errorMsg || "No questions could be loaded."}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => { setLoading(true); setErrorMsg(""); window.location.reload(); }}
            className="bg-[#139fd6] text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/assessment")}
            className="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[step];

  // ── Quiz UI ────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-gray-100 mt-10">
      {/* Progress Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#139fd6] uppercase tracking-wider mb-1">
            {domain} Quiz
          </span>
          <span className="text-sm font-medium text-gray-500">
            Question {step + 1} of {questions.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-40 bg-gray-100 h-2 rounded-full">
            <div
              className="bg-[#139fd6] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-bold text-gray-400">{Math.round(progress)}%</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-black mb-8 leading-tight">
        {currentQuestion.text}
      </h2>

      <div className="space-y-4 mb-10">
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
              selectedAnswers[step] === option.id
                ? "border-[#139fd6] bg-blue-50 text-[#139fd6] shadow-md"
                : "border-gray-100 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center shrink-0 transition-colors ${
                  selectedAnswers[step] === option.id
                    ? "border-[#139fd6] bg-[#139fd6]"
                    : "border-gray-300"
                }`}
              >
                {selectedAnswers[step] === option.id && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="font-medium">{option.text}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
          className="flex items-center gap-2 text-gray-500 hover:text-black font-semibold transition disabled:opacity-0"
        >
          <ChevronLeft size={20} /> Back
        </button>

        <button
          onClick={handleNext}
          disabled={!selectedAnswers[step] || submitting}
          className="bg-[#139fd6] text-white px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none flex items-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Submitting...
            </>
          ) : step === questions.length - 1 ? (
            "Finish Assessment"
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </div>
  );
}