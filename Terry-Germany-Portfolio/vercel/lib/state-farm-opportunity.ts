// Operational figures supplied by Terry. Targets remain separate from observed data.
export const serviceOutcomes = {
  total: 27700,
  reportedFcr: 52.7,
  resolved: 14612,
  escalated: 13088,
};
export const outcomeRows = [
  { key: 'resolved', label: 'Resolved without escalation', value: serviceOutcomes.resolved, detail: 'Slightly more than half of analyzed interactions completed without escalation. This is a baseline for understanding where self-service is already working.' },
  { key: 'escalated', label: 'Escalated', value: serviceOutcomes.escalated, detail: 'Nearly half of analyzed interactions required additional support. The design opportunity is to reduce avoidable friction while keeping a clear path to human help.' },
] as const;
export const outcomeShare = (count: number) => count / serviceOutcomes.total * 100;
export const opportunityJourney = [
  { from: '20+ steps', to: 'Intent recognition', detail: 'Recognize the customer’s goal early so the experience can respond to the task rather than requiring a long sequence of steps.' },
  { from: 'Forms', to: 'Personalized guidance', detail: 'Use relevant context to guide the customer through the information needed for their specific task.' },
  { from: 'Navigation', to: 'Dynamic UI', detail: 'Bring the relevant controls into the flow as the task evolves, reducing the need to search through navigation.' },
  { from: 'Customer determines next action', to: 'Agentic task execution', detail: 'Explore task completion with AI support, clear confirmation, and customer control over important actions.' },
  { from: 'Escalation', to: 'Human handoff when needed', detail: 'Make access to a person an intentional part of the journey, preserving task context when additional support is needed.' },
] as const;
export const opportunityResearchTopics = ['Entry points', 'Conversational vs. traditional UI', 'Proactive assistance', 'Trust', 'Branding', 'AI identity', 'Human handoff', 'Personalization'];
