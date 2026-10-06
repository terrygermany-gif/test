import type { PortfolioContent } from './portfolio-content';
import { stateFarmCopy } from './state-farm-copy-update';

// These summaries describe the work supplied for the case study, without
// presenting research questions or design targets as measured results.
export const stateFarmEvidenceCopy: Record<string, { summary: string; detail: string }> = {
  research: {
    summary: 'Research into how customers find, use, and trust digital assistance.',
    detail: 'I directed research and experimentation with Research, Data Science, Product, and Engineering to understand where digital assistance could make insurance easier. We explored entry points, conversational versus traditional interfaces, proactive help, personalization, AI identity, trust, and human handoff.\n\nThe work included prototypes and variations for moderated research and A/B testing. Program data covering 27,700 onboarding and service interactions helped frame the opportunity: 14,612 were resolved without escalation, while 13,088 needed additional support. I used that context to focus the design on clearer guidance and smoother transitions to human help.'
  },
  concepts: {
    summary: 'Exploring a simpler way to complete insurance tasks.',
    detail: 'I explored how a Digital Assistant could help customers move through shopping, service, onboarding, and claims. The concepts combined conversation with useful interface elements, so customers could describe their goal and take the next step in the same experience.\n\nThe mobile prototype below shows one of those directions. I explored assistance entry points, widget and full-page formats, suggestion chips, contextual guidance, and paths to human support. The aim was to reduce navigation effort while keeping customers informed and in control.'
  },
  engineering: {
    summary: 'A shared direction for design, product, and engineering.',
    detail: 'I connected the customer experience with a shared direction for Design, Research, Data Science, Engineering, Product, Content, and AI.\n\nI directed prototypes, experimentation, and the Digital Assistance Design Kit, and implemented the Level 1–3 AI Maturity Model with Product and Engineering. Shared conversation patterns and experience standards helped connect the vision to delivery planning. I also mentored designers and kept the work aligned across teams.'
  },
  'ai-maturity': {
    summary: 'A practical path from Level 1 to Level 3 AI assistance.',
    detail: 'I implemented the AI Maturity Model with Product and Engineering to give teams a shared way to plan the progression from Level 1 to Level 3. It connected AI capabilities to the customer experience we wanted to create.\n\nLevel 1 — Assisted Automation: rules-based help for defined tasks.\n\nLevel 2 — Context-Aware AI: assistance that responds to the customer’s situation.\n\nLevel 3 — Predictive AI Companion: assistance that anticipates needs and offers proactive guidance.\n\nThe model helped align priorities and experience standards across teams. It describes the direction of the work; individual features progressed at different stages.'
  }
};

export const defaultStateFarmEvidence = stateFarmCopy.evidence.map(item => ({
  ...item, ...stateFarmEvidenceCopy[item.id]
}));

const previousEngineeringDetail = 'I led 25+ specialists across Design, Research, Data Science, Engineering, Product, Content, and AI, with strategy spanning 12+ customer journeys. My role was to connect the customer experience with a direction the teams could work toward together.\n\nI directed prototypes, experimentation, and the Digital Assistance Design Kit, and implemented the Level 1–3 AI Maturity Model with Product and Engineering. Shared conversation patterns and experience standards helped connect the vision to delivery planning. I also mentored designers and kept the work aligned across teams.';

export function applyStateFarmEvidenceUpdate(content: PortfolioContent): PortfolioContent {
  if (content.stateFarmEvidenceVersion === 2) return content;
  const study = content.studies['digital-assistance'];
  const evidence = study.evidence.map(item => {
    const baseline = stateFarmCopy.evidence.find(previous => previous.id === item.id);
    const replacement = stateFarmEvidenceCopy[item.id];
    if (!baseline || !replacement) return item;
    // Keep any copy the owner has already changed in the private editor.
    return {
      ...item,
      summary: item.summary === baseline.summary ? replacement.summary : item.summary,
      detail: (item.detail === baseline.detail || (item.id === 'engineering' && item.detail === previousEngineeringDetail)) ? replacement.detail : item.detail
    };
  });
  return { ...content, stateFarmEvidenceVersion: 2, studies: {
    ...content.studies, 'digital-assistance': { ...study, evidence }
  }};
}
