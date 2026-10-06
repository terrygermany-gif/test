// Terry's supplied Figma assessment (35:1258). These are qualitative scores,
// not independently verified competitor benchmarks. Order follows the radar clockwise.
export const radarCompanies = [
  { key: 'stateFarm', name: 'State Farm Today', color: '#e31837', scores: [2, 2, 2, 5, 2, 5, 3, 3] },
  { key: 'lemonade', name: 'Lemonade', color: '#00b388', scores: [5, 5, 4, 0, 5, 3, 5, 5] },
  { key: 'progressive', name: 'Progressive', color: '#2d5bff', scores: [3, 3, 4, 0, 3, 4, 4, 3] },
  { key: 'geico', name: 'Geico', color: '#64748b', scores: [2, 2, 2, 0, 2, 3, 3, 1] },
] as const;
export const radarCapabilities = [
  { name: 'Personalization', short: 'Personalization', detail: 'How well assistance adapts to the customer and their needs.' },
  { name: 'Context Awareness', short: 'Context', detail: 'How well assistance understands the current task and carries context forward.' },
  { name: 'Visual UX', short: 'Visual UX', detail: 'How clearly the interface makes the next action understandable.' },
  { name: 'Agent Integration', short: 'Agent handoff', detail: 'How naturally digital assistance connects to a human relationship when it matters.' },
  { name: 'Guided Experience', short: 'Guidance', detail: 'How effectively the experience helps customers move through an insurance task.' },
  { name: 'Trust', short: 'Trust', detail: 'How clearly the experience supports confidence, transparency, and customer control.' },
  { name: 'Self Service', short: 'Self service', detail: 'How effectively customers can complete tasks without additional support.' },
  { name: 'Conversational Commerce', short: 'Conversation', detail: 'How well conversation helps customers explore options and take the next step.' },
] as const;
export const radarData = radarCapabilities.map((capability, index) => ({
  capability: capability.short,
  ...Object.fromEntries(radarCompanies.map(company => [company.key, company.scores[index]])),
}));
export function toggleRadarCompany(current: string[], key: string) {
  // Keep one series visible so the chart never becomes an empty state.
  return current.includes(key) ? current.length > 1 ? current.filter(item => item !== key) : current : [...current, key];
}
