// Centralized API utility for NeuroVia frontend
const BASE_URL = "http://localhost:5000/api";

export const api = {
  // ─── AUTH ────────────────────────────────────────────────────────────────
  register: (email: string, password: string, name: string) =>
    fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    }).then((r) => r.json()),

  login: (email: string, password: string) =>
    fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((r) => r.json()),

  // ─── INTERESTS ───────────────────────────────────────────────────────────
  getAllInterests: () =>
    fetch(`${BASE_URL}/interests`).then((r) => r.json()),

  createInterest: (name: string) =>
    fetch(`${BASE_URL}/interests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    }).then((r) => r.json()),

  // ─── SKILLS ──────────────────────────────────────────────────────────────
  getSkillsByInterest: (interestId: string) =>
    fetch(`${BASE_URL}/skills/${interestId}`).then((r) => r.json()),

  createSkill: (name: string, interestId: string) =>
    fetch(`${BASE_URL}/skills`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, interestId }),
    }).then((r) => r.json()),

  // ─── USER INTERESTS ──────────────────────────────────────────────────────
  addUserInterest: (userId: string, interestId: string, priority: number) =>
    fetch(`${BASE_URL}/user-interests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, interestId, priority }),
    }).then((r) => r.json()),

  getUserInterests: (userId: string) =>
    fetch(`${BASE_URL}/user-interests/${userId}`).then((r) => r.json()),

  // ─── AI QUESTION GENERATION ──────────────────────────────────────────────
  generateQuestions: (skillId: string) =>
    fetch(`${BASE_URL}/ai/generate/${skillId}`).then((r) => r.json()),

  // ─── QUIZ ────────────────────────────────────────────────────────────────
  getQuizBySkill: (skillId: string) =>
    fetch(`${BASE_URL}/quiz/${skillId}`).then((r) => r.json()),

  submitQuiz: (
    userId: string,
    skillId: string,
    answers: { optionId: string }[],
    type: "INITIAL" | "PRACTICE"
  ) =>
    fetch(`${BASE_URL}/quiz/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, skillId, answers, type }),
    }).then((r) => r.json()),

  // ─── ROADMAP ─────────────────────────────────────────────────────────────
  getRoadmap: (userId: string, skillId: string) =>
    fetch(`${BASE_URL}/roadmap/${userId}/${skillId}?t=${Date.now()}`).then((r) => r.json()),

  // ─── RECOMMENDATIONS ─────────────────────────────────────────────────────
  getRecommendations: (userId: string) =>
    fetch(`${BASE_URL}/recommendations/${userId}`).then((r) => r.json()),
};
