"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import the router
import { 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  CheckCircle2,
  MoreHorizontal,
  Brain,
  Zap
} from "lucide-react";

export default function MySkillsPage() {
  const router = useRouter(); // Initialize the router
  const [openSections, setOpenSections] = useState({
    current: true,
    completed: true,
    specific: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 min-h-screen">
      
      {/* Header with Redirecting Button */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black text-black tracking-tighter">
            My Skills
          </h1>
          <p className="text-gray-400 font-medium mt-1 text-sm uppercase tracking-widest">
            Academic & Professional Growth
          </p>
        </div>
        
        {/* REDIRECT FIXED: Now points to /libraries/courses */}
        <button 
          onClick={() => router.push("/libraries/courses")}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-black/10"
        >
          <Plus size={18} strokeWidth={3} />
          Add New Skill
        </button>
      </div>

      <div className="space-y-8">
        {/* ================= CURRENT LEARNING ================= */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div 
            onClick={() => toggleSection('current')}
            className="flex justify-between items-center p-8 cursor-pointer hover:bg-gray-50/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <h2 className="text-xl font-extrabold text-black tracking-tight">Current Learning</h2>
            </div>
            {openSections.current ? <ChevronUp size={20} className="text-gray-300" /> : <ChevronDown size={20} className="text-gray-300" />}
          </div>
          
          {openSections.current && (
            <div className="px-8 pb-8 space-y-3">
              <SkillItem 
                title="Introduction to Psychology" 
                status="Active Learning" 
                progress={75} 
                icon={<Clock className="text-black" size={20} />}
                accent="bg-black"
              />
              <SkillItem 
                title="Advanced Neuroscience" 
                status="Active Learning" 
                progress={30} 
                icon={<Clock className="text-black" size={20} />}
                accent="bg-black"
              />
            </div>
          )}
        </div>

        {/* ================= COMPLETED ================= */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div 
            onClick={() => toggleSection('completed')}
            className="flex justify-between items-center p-8 cursor-pointer hover:bg-gray-50/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <h2 className="text-xl font-extrabold text-black tracking-tight">Achieved Skills</h2>
            </div>
            {openSections.completed ? <ChevronUp size={20} className="text-gray-300" /> : <ChevronDown size={20} className="text-gray-300" />}
          </div>
          
          {openSections.completed && (
            <div className="px-8 pb-8 space-y-3">
              <SkillItem 
                title="Basic Cognitive Theory" 
                status="Certified" 
                progress={100} 
                icon={<CheckCircle2 className="text-emerald-500" size={20} />}
                accent="bg-emerald-500"
                isCompleted
              />
            </div>
          )}
        </div>

        {/* ================= SPECIFIC SKILLS DEVELOPED ================= */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div 
            onClick={() => toggleSection('specific')}
            className="flex justify-between items-center p-8 cursor-pointer hover:bg-gray-50/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <h2 className="text-xl font-extrabold text-black tracking-tight">Specific Skills Developed</h2>
            </div>
            {openSections.specific ? <ChevronUp size={20} className="text-gray-300" /> : <ChevronDown size={20} className="text-gray-300" />}
          </div>
          
          {openSections.specific && (
            <div className="px-8 pb-8 space-y-3">
              <SkillItem 
                title="Data Analysis" 
                status="Advanced" 
                progress={85} 
                icon={<Brain className="text-purple-500" size={20} />}
                accent="bg-purple-600"
              />
              <SkillItem 
                title="Critical Thinking" 
                status="Intermediate" 
                progress={55} 
                icon={<Zap className="text-purple-500" size={20} />}
                accent="bg-purple-600"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Skill Item Component ---
function SkillItem({ title, status, progress, icon, accent, isCompleted = false }: any) {
  return (
    <div className="flex items-center justify-between p-5 rounded-[1.5rem] bg-gray-50/50 border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group cursor-pointer">
      <div className="flex items-center gap-5">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-black text-lg tracking-tight group-hover:text-blue-600 transition-colors">{title}</h4>
          <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${isCompleted ? 'text-emerald-500' : 'text-gray-400'}`}>
            {status}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex flex-col items-end gap-2">
           <span className="text-xs font-bold text-black">{progress}%</span>
           <div className="w-48 bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`${accent} h-full transition-all duration-1000 ease-out`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="text-gray-300 hover:text-black" size={20} />
        </button>
      </div>
    </div>
  );
}