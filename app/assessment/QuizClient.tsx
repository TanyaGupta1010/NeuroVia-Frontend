"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const mockQuestions = [
  {
    id: 1,
    question: "Which of the following is a core principle of this domain?",
    options: ["Innovation", "Stagnation", "Isolation", "Redundancy"],
    correctAnswer: "Innovation",
  },
  {
    id: 2,
    question: "How do you define progress in a typical project lifecycle?",
    options: ["Speed", "Quality", "Consistency", "All of the above"],
    correctAnswer: "All of the above",
  },
  {
    id: 3,
    question: "What is the primary goal of a professional in this field?",
    options: ["Problem Solving", "Complexity", "Status Quo", "Manual Labor"],
    correctAnswer: "Problem Solving",
  },
];

export default function QuizClient({ domain }: { domain: string }) {
  const [step, setStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const router = useRouter();

  const handleSelect = (option: string) => {
    setSelectedAnswers({ ...selectedAnswers, [step]: option });
  };

  const handleNext = () => {
    if (step < mockQuestions.length - 1) {
      setStep(step + 1);
    } else {
      // Logic to calculate actual score
      let correctCount = 0;
      mockQuestions.forEach((q, index) => {
        if (selectedAnswers[index] === q.correctAnswer) {
          correctCount++;
        }
      });
      
      const score = Math.round((correctCount / mockQuestions.length) * 100);
      router.push(`/assessment/result?domain=${domain}&score=${score}`);
    }
  };

  const progress = ((step + 1) / mockQuestions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-gray-100 mt-10">
      {/* Progress Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#139fd6] uppercase tracking-wider mb-1">{domain} Quiz</span>
          <span className="text-sm font-medium text-gray-500">Question {step + 1} of {mockQuestions.length}</span>
        </div>
        <div className="w-48 bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-[#139fd6] h-2 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-black mb-8 leading-tight">
        {mockQuestions[step].question}
      </h2>

      <div className="space-y-4 mb-10">
        {mockQuestions[step].options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-200 group ${
              selectedAnswers[step] === option 
                ? "border-[#139fd6] bg-blue-50 text-[#139fd6] shadow-md" 
                : "border-gray-100 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
               <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors ${
                 selectedAnswers[step] === option ? "border-[#139fd6] bg-[#139fd6]" : "border-gray-300"
               }`}>
                 {selectedAnswers[step] === option && <div className="w-2 h-2 bg-white rounded-full" />}
               </div>
               <span className="font-medium">{option}</span>
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
          disabled={!selectedAnswers[step]}
          className="bg-[#139fd6] text-white px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
        >
          {step === mockQuestions.length - 1 ? "Finish Assessment" : "Continue"}
        </button>
      </div>
    </div>
  );
}