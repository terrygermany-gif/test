// Editorial framing from existing project notes, not a completed competitor audit.
export type ProjectStrategy = {
  context: string;
  comparisons: { title: string; question: string }[];
  opportunity: string;
  engagement: { title: string; direction: string }[];
  signals: string[];
};

export const projectStrategies: Record<string, ProjectStrategy> = {
  "digital-assistance": {
    context: "Help customers recognize useful assistance, move through an insurance task, and reach human support when needed.",
    comparisons: [
      { title: "Entry points", question: "How do comparable insurance and service experiences make assistance recognizable at the moment of need?" },
      { title: "Task continuity", question: "How do widgets, panels, and full-page flows preserve context across a complex task?" },
      { title: "Trust & handoff", question: "How clearly does the experience explain the next step and a path to human help?" },
    ],
    opportunity: "Test whether task-aware assistance and clear handoffs provide a more useful experience than one uniform assistant surface.",
    engagement: [
      { title: "Invite in context", direction: "Use the documented entry-point and button explorations to make assistance visible within shopping, service, claims, and onboarding." },
      { title: "Guide the next step", direction: "Match mobile and desktop surfaces to task complexity, with contextual guidance and explainability." },
      { title: "Keep people in control", direction: "Make human handoff part of the journey so engagement supports the customer's goal." },
    ],
    signals: ["Assistance entry-point recognition", "Task completion and actions required", "Successful handoff to human help"],
  },
  "apple-intelligence": {
    context: "Make intelligent capabilities understandable and useful within familiar product interactions.",
    comparisons: [
      { title: "Discoverability", question: "How do comparable intelligent experiences introduce a capability without disrupting the familiar task?" },
      { title: "Interaction clarity", question: "How clearly do product patterns communicate what an intelligent capability does and how to use it?" },
      { title: "Platform coherence", question: "How consistently do interactions support accessibility and familiar behavior across surfaces?" },
    ],
    opportunity: "Explore whether familiar, accessible interaction patterns make intelligent capabilities easier to understand and use across platforms.",
    engagement: [
      { title: "Start with the task", direction: "Connect intelligent behavior to familiar flows aligned with Human Interface Guidelines and accessibility principles." },
      { title: "Build understanding", direction: "Use experience architecture, interaction design, and prototype validation to refine how capabilities fit the product." },
      { title: "Support consistency", direction: "Carry shared patterns and reusable components across iOS, macOS, tvOS, and web." },
    ],
    signals: ["Capability discovery and comprehension", "Usability and accessibility findings", "Consistency across product surfaces"],
  },
  upgather: {
    context: "Help operators start event and editorial work, see what needs attention, and resume unfinished tasks.",
    comparisons: [
      { title: "Creation paths", question: "How do comparable event and enterprise platforms balance new creation, template reuse, and draft recovery?" },
      { title: "Operational context", question: "How do tables and contextual panels make the next decision visible across connected workflows?" },
      { title: "Workflow continuity", question: "How are draft states and transitions between creation, management, and publishing communicated?" },
    ],
    opportunity: "Test whether guided creation and a consistent operational workspace help people move through connected work with less uncertainty.",
    engagement: [
      { title: "Give creation a start", direction: "Offer a new layout, a reusable layout, or a saved draft within the documented event setup direction." },
      { title: "Keep context visible", direction: "Use AG Grid, contextual panels, and consistent draft states for ongoing operational work." },
      { title: "Make returning easier", direction: "Use the separation between guided setup and management to support continuing unfinished work." },
    ],
    signals: ["Creation flow completion", "Layout reuse and draft recovery", "Time and errors in operational tasks"],
  },
  "design-systems": {
    context: "Help designers and engineers understand, adopt, and maintain a shared component language.",
    comparisons: [
      { title: "Documentation depth", question: "How do comparable design systems describe behavior, states, accessibility, content, and responsive variation?" },
      { title: "Design-to-code alignment", question: "How are design intent and implementation connected through component examples and shared references?" },
      { title: "Change visibility", question: "How do teams communicate revisions and distinguish tracked changes from proposed automation?" },
    ],
    opportunity: "Explore whether behavior-first documentation and traceable changes make shared components easier to adopt and maintain.",
    engagement: [
      { title: "Make patterns usable", direction: "Pair reusable Figma components with behavior, content, accessibility, and handoff expectations." },
      { title: "Engineer alongside", direction: "Use working sessions, prototype reviews, Storybook, and repository references to clarify trade-offs." },
      { title: "Sustain the system", direction: "Support mentoring and tracked changes before advancing toward proposed automation." },
    ],
    signals: ["Component adoption and reuse", "Design-to-code consistency", "Accessibility and change-review findings"],
  },
};

export function strategyEvidence(slug: string) {
  const strategy = projectStrategies[slug];
  return {
    id: "competitive-intelligence", title: "Competitive intelligence", status: "Placeholder" as const,
    summary: "Competitor comparisons and source artifacts to be added.",
    detail: `Comparison framework: ${strategy.comparisons.map(c => `${c.title}: ${c.question}`).join(" ")} Add named comparators, dated sources or approved screenshots, observed strengths and gaps, and the decision each finding influenced. This framework is not a completed benchmark or a claim that competitive research was performed. Engagement signals are proposed measures; no results are supplied.`,
  };
}
