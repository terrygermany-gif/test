import type { Evidence } from "./project-proof";

// Condensed from Terry's supplied insurance-experience maturity board.
// Keep this Level 1–5 framework separate from the board's other 0–7 CX scale.
export const maturityLevels = [
  {
    level: 1, name: "Assisted Automation", principle: "Rules + basic AI", stage: "Where we started",
    summary: "The customer asks. The system follows a defined path.",
    capabilities: ["Rule-based responses", "Scripted interaction flows", "Basic recommendations"],
    product: "Define clear, repeatable assistance for known customer tasks.",
    engineering: "Connect predictable rules and decision paths to the experience.",
    customer: "Useful answers, with the customer initiating each step.",
    example: "How do I get help with my claim?", exampleResponse: "Choose the claim topic you need help with, and I’ll guide you to the next step.",
  },
  {
    level: 2, name: "Context-Aware AI", principle: "Reactive + situational", stage: "The transition",
    summary: "The system responds with awareness of the customer's situation.",
    capabilities: ["Journey-aware guidance", "Contextual recommendations", "More relevant conversations"],
    product: "Connect assistance to the journey and the customer's immediate need.",
    engineering: "Make the relevant journey context available to the interaction.",
    customer: "Guidance that fits the task instead of restarting from a generic answer.",
    example: "I’m in the middle of a quote. What should I do next?", exampleResponse: "Let’s continue from the step you’re on and clarify the information you need.",
  },
  {
    level: 3, name: "Predictive AI Companion", principle: "Where differentiation begins", stage: "Where we progressed",
    summary: "The experience anticipates a relevant need and offers a next step.",
    capabilities: ["Signals that inform assistance", "Proactive suggestions", "A more connected companion experience"],
    product: "Identify moments where anticipation can create useful guidance across insurance journeys.",
    engineering: "Connect signals and context to timely suggestions while preserving customer control.",
    customer: "Relevant help before another question is needed, with a choice about what happens next.",
    example: "A relevant life change could affect your coverage.", exampleResponse: "Would you like to review your options? You decide whether to explore the next step.",
  },
] as const;

export const maturityContribution = "I introduced and implemented the AI Maturity Model with State Farm Product and Engineering, giving teams a shared framework for the progression from Level 1 Assisted Automation to Level 3 Predictive AI Companion.";
export const maturityEvidence: Evidence = {
  id: "ai-maturity", title: "AI Maturity Model", status: "Project summary",
  summary: "Terry’s framework implemented with Product and Engineering: Level 1 to Level 3.",
  detail: "Based on Terry’s supplied SF — GenAI Maturity Model-v2 board screenshot and his account of implementing the model with Product and Engineering. The insurance-experience framework defines Level 1 Assisted Automation, Level 2 Context-Aware AI, and Level 3 Predictive AI Companion. This portfolio presentation condenses those stages. Customer examples and team-focus descriptions illustrate the framework; they do not assert that every listed capability shipped or establish a measured enterprise-wide maturity assessment.",
};
