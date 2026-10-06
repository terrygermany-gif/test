import type { PortfolioContent } from './portfolio-content';

// Editorial update from Terry’s supplied State Farm account, October 2026.
// Saved drafts may predate this copy. Update unchanged fields only.
const previousCopy = {
  "project": {
    "slug": "digital-assistance",
    "company": "State Farm",
    "title": "Making complex insurance feel human.",
    "subtitle": "A connected strategy for conversational shopping, service, claims, and onboarding.",
    "role": "Senior Experience Lead · AI & Digital Assistance",
    "domain": "Human–AI interaction",
    "challenge": "Insurance journeys span products, channels, identity systems, and moments of uncertainty. Digital assistance needed a consistent interaction model to guide customers while preserving clarity and human control.",
    "contribution": [
      "Experience strategy across 12+ customer journeys",
      "Influence across 15+ cross-functional teams",
      "Conversation patterns and a Digital Assistance design kit",
      "Research direction and executive prototypes",
      "AI Maturity Model implemented with Product and Engineering: Level 1 to Level 3"
    ],
    "evidence": "The wider digital ecosystem serves 10M+ users. Journey and team counts describe scope of influence. One workflow exploration targeted up to 50% fewer actions; this is a design target, not a measured launch result.",
    "takeaway": "Trust emerges from how a system behaves: what it explains, what it asks, and when it brings in a person.",
    "decisions": [
      {
        "title": "Choose the right surface",
        "text": "Designed mobile full-page assistance and explored desktop widget, side-panel, and full-page patterns around the complexity of the customer's task."
      },
      {
        "title": "Keep people in control",
        "text": "Defined handoff patterns, contextual guidance, and explainability concepts to support customer decisions."
      },
      {
        "title": "Test the invitation",
        "text": "Developed entry-point, button, and interface variations for moderated research and A/B testing, including how customers recognize assistance and the State Farm brand."
      }
    ]
  },
  "scope": "12+ customer journeys · 15+ cross-functional teams",
  "collaboration": "Aligned Product and Engineering through shared conversation patterns, a Digital Assistance design kit, and the AI Maturity Model.",
  "researchIntro": "Research focused on how customers recognize assistance, enter a conversation, and move through insurance tasks.",
  "researchNote": "Entry-point, button, and interface variations were prepared for moderated research and A/B testing. Specific findings and post-test changes are not supplied.",
  "outcomeNote": "Quantitative launch results are not available in these project notes.",
  "insights": [
    "Assistance must work across shopping, service, registration, and claims.",
    "Task complexity informed the choice of mobile full-page and desktop surfaces.",
    "Recognition, clarity, and human handoff were central research questions."
  ],
  "choice": "Match the surface to the task.",
  "why": "The documented direction uses mobile full-page assistance and explores multiple desktop patterns around task complexity. A single surface was not prescribed for every journey.",
  "directional": "A shared model for digital assistance across journeys and surfaces.",
  "strategy": {
    "context": "Help customers recognize useful assistance, move through an insurance task, and reach human support when needed.",
    "comparisons": [
      {
        "title": "Entry points",
        "question": "How do comparable insurance and service experiences make assistance recognizable at the moment of need?"
      },
      {
        "title": "Task continuity",
        "question": "How do widgets, panels, and full-page flows preserve context across a complex task?"
      },
      {
        "title": "Trust & handoff",
        "question": "How clearly does the experience explain the next step and a path to human help?"
      }
    ],
    "opportunity": "Test whether task-aware assistance and clear handoffs provide a more useful experience than one uniform assistant surface.",
    "engagement": [
      {
        "title": "Invite in context",
        "direction": "Use the documented entry-point and button explorations to make assistance visible within shopping, service, claims, and onboarding."
      },
      {
        "title": "Guide the next step",
        "direction": "Match mobile and desktop surfaces to task complexity, with contextual guidance and explainability."
      },
      {
        "title": "Keep people in control",
        "direction": "Make human handoff part of the journey so engagement supports the customer's goal."
      }
    ],
    "signals": [
      "Assistance entry-point recognition",
      "Task completion and actions required",
      "Successful handoff to human help"
    ]
  },
  "evidence": [
    {
      "id": "research",
      "title": "User research",
      "status": "Project summary",
      "summary": "Research approach and validation methods.",
      "detail": "Moderated research and A/B testing informed the research plan around assistance entry points, buttons, and interfaces. Findings are awaiting approved artifacts."
    },
    {
      "id": "interviews",
      "title": "Interview snippets",
      "status": "Placeholder",
      "summary": "Approved excerpts and context to be added.",
      "detail": "Placeholder — add an approved artifact and its context. No findings or quotations are asserted here. Include the participant context, date, and how the excerpt affected a decision."
    },
    {
      "id": "whiteboards",
      "title": "FigJam / whiteboards",
      "status": "Placeholder",
      "summary": "Workshop and synthesis artifacts to be added.",
      "detail": "Placeholder — add an approved artifact and its context. No findings or quotations are asserted here. Explain the question explored and the resulting decision."
    },
    {
      "id": "concepts",
      "title": "Early concepts",
      "status": "Artifact available",
      "summary": "Conversational mobile prototype.",
      "detail": "The supplied conversational mobile prototype shows one assistance surface. It is a design artifact, not proof of a launch outcome.",
      "src": "/work/state-farm-assistant.png"
    },
    {
      "id": "failed",
      "title": "Failed concepts",
      "status": "Placeholder",
      "summary": "An abandoned direction and what it taught us.",
      "detail": "Placeholder — add an approved artifact and its context. No findings or quotations are asserted here. No failed concept is documented in the current notes. Add the alternative, why it was dropped, and the evidence."
    },
    {
      "id": "testing",
      "title": "Testing findings",
      "status": "Placeholder",
      "summary": "Specific findings and post-test changes pending.",
      "detail": "Entry-point, button, and interface variations were developed for moderated research and A/B testing. Specific findings and post-test changes have not been added yet."
    },
    {
      "id": "stakeholders",
      "title": "Stakeholder communication",
      "status": "Project summary",
      "summary": "Contribution and alignment from project notes.",
      "detail": "Experience strategy across 12+ customer journeys. Influence across 15+ cross-functional teams. Conversation patterns and a Digital Assistance design kit. Research direction and executive prototypes. AI Maturity Model implemented with Product and Engineering: Level 1 to Level 3. Add approved workshop notes or a decision record to substantiate stakeholder changes."
    },
    {
      "id": "product",
      "title": "Product constraints",
      "status": "Project summary",
      "summary": "Context that shaped the experience.",
      "detail": "Insurance journeys span products, channels, identity systems, and moments of uncertainty. Digital assistance needed a consistent interaction model to guide customers while preserving clarity and human control."
    },
    {
      "id": "engineering",
      "title": "Engineering constraints",
      "status": "Project summary",
      "summary": "System and implementation considerations.",
      "detail": "Contributed the Digital Assistance design kit and implemented the AI Maturity Model with Product and Engineering. Connected the Level 1-to-Level 3 progression to customer experience and technical capability. Specific release details and engineering trade-offs are documented separately. Add an approved decision record for the specific technical constraint and its effect."
    },
    {
      "id": "competitive-intelligence",
      "title": "Competitive intelligence",
      "status": "Placeholder",
      "summary": "Competitor comparisons and source artifacts to be added.",
      "detail": "Comparison framework: Entry points: How do comparable insurance and service experiences make assistance recognizable at the moment of need? Task continuity: How do widgets, panels, and full-page flows preserve context across a complex task? Trust & handoff: How clearly does the experience explain the next step and a path to human help? Add named comparators, dated sources or approved screenshots, observed strengths and gaps, and the decision each finding influenced. This framework is not a completed benchmark or a claim that competitive research was performed. Engagement signals are proposed measures; no results are supplied."
    },
    {
      "id": "ai-maturity",
      "title": "AI Maturity Model",
      "status": "Project summary",
      "summary": "Terry’s framework implemented with Product and Engineering: Level 1 to Level 3.",
      "detail": "Based on Terry’s supplied SF — GenAI Maturity Model-v2 board screenshot and his account of implementing the model with Product and Engineering. The insurance-experience framework defines Level 1 Assisted Automation, Level 2 Context-Aware AI, and Level 3 Predictive AI Companion. This portfolio presentation condenses those stages. Customer examples and team-focus descriptions illustrate the framework; they do not assert that every listed capability shipped or establish a measured enterprise-wide maturity assessment."
    }
  ]
};
export const stateFarmCopy = {
  "project": {
    "slug": "digital-assistance",
    "company": "State Farm",
    "title": "Making complex insurance feel human.",
    "subtitle": "B2C Digital Assistant + AI: experience strategy, research, and product design across insurance journeys.",
    "role": "Senior Experience Lead · AI & Digital Assistance",
    "domain": "B2C AI experience strategy",
    "challenge": "Insurance journeys and emerging AI initiatives were spread across separate teams, forms, and digital surfaces. I defined an assistance model around customer intent: understand the goal, guide complex decisions, explain recommendations, and connect people to human support when needed.",
    "contribution": [
      "Led 25+ specialists across Design, Research, Data Science, Engineering, Product, Content, and AI.",
      "Owned strategy across 12+ journeys: SmartQuote, quote review/purchase, service, registration/onboarding, claims/FNOL, and policy/vehicle management.",
      "Directed research, prototypes, experimentation, and the Digital Assistance Design Kit; implemented the Level 1–3 AI Maturity Model with Product and Engineering."
    ],
    "evidence": "Established shared AI experience principles, reusable interaction patterns, and experience governance across State Farm’s consumer ecosystem. Connected near-term product work with a longer-term roadmap for generative AI, predictive assistance, and emerging agentic experiences.",
    "takeaway": "AI should help people accomplish a goal while making its behavior understandable. Trust, accessibility, transparency, and human support belong in the interaction model from the start.",
    "decisions": [
      {
        "title": "Match assistance to the customer’s task.",
        "text": "Designed full-page AI, widgets, side panels, embedded assistance, and mobile experiences, with transitions between conversational and traditional interfaces."
      },
      {
        "title": "Give AI a shared interaction foundation.",
        "text": "Built and governed the Digital Assistance Design Kit: prompt and input behavior, quick replies, AI-generated cards, explainability, human handoff, error recovery, trust, and responsive desktop/mobile patterns."
      },
      {
        "title": "Test discovery, usefulness, and trust.",
        "text": "Evaluated AI entry points, CTA language, suggestion chips, proactive assistance, visual treatments, AI identity, and human escalation through research and experimentation."
      }
    ]
  },
  "scope": "25+ multidisciplinary team members · 12+ customer journeys · 10M+ customer ecosystem",
  "collaboration": "Aligned Product, Engineering, Research, Data Science, and Content around a shared Digital Assistance vision. Mentored designers and connected experience standards, experimentation, and delivery planning.",
  "researchIntro": "I embedded research in product strategy, partnering with researchers, data scientists, Product, and Engineering to evaluate whether AI felt useful, understandable, trustworthy, and appropriate for the State Farm brand.",
  "researchNote": "Methods included usability studies, A/B experimentation, prototype validation, and AI trust/brand studies. Specific findings and post-test performance results are not supplied.",
  "outcomeNote": "Agentic experiences were a longer-term direction. Program scale describes reach and responsibility; measured conversion, service-resolution, or customer-satisfaction results are not provided.",
  "insights": [
    "Compare conversational and traditional flows, and widget versus full-page assistance, against the customer’s task.",
    "Test entry points, CTA language, suggestion chips, proactive assistance, and visual treatments to understand how people discover and use AI.",
    "Evaluate AI identity, explanations, and human escalation for trust, brand fit, and customer control."
  ],
  "choice": "Match assistance to the customer’s task.",
  "why": "Designed full-page AI, widgets, side panels, embedded assistance, and mobile experiences around task context. Hybrid interactions let customers move between conversation and traditional UI rather than forcing every task into a chat.",
  "directional": "A shared foundation for State Farm’s B2C AI experience.",
  "strategy": {
    "context": "Connect assistance to customer intent across shopping, quoting, service, onboarding, claims, and policy management. Evaluate discovery, continuity, and trust across conversational and traditional experiences.",
    "comparisons": [
      {
        "title": "Entry points",
        "question": "How do comparable insurance and service experiences make assistance recognizable at the moment of need?"
      },
      {
        "title": "Task continuity",
        "question": "How do widgets, panels, and full-page flows preserve context across a complex task?"
      },
      {
        "title": "Trust & handoff",
        "question": "How clearly does the experience explain the next step and a path to human help?"
      }
    ],
    "opportunity": "Test where contextual and proactive assistance can reduce uncertainty and help customers complete an insurance task while preserving their choice and access to human support.",
    "engagement": [
      {
        "title": "Invite in context",
        "direction": "Evaluate entry points, CTA language, suggestion chips, and visual treatments within the customer’s insurance journey."
      },
      {
        "title": "Guide a useful next step",
        "direction": "Use contextual assistance, clear explanations, and hybrid conversational/traditional interactions to support complex decisions and tasks."
      },
      {
        "title": "Make trust actionable",
        "direction": "Define AI identity, transparency, error recovery, and human escalation as part of the interaction—not as an afterthought."
      }
    ],
    "signals": [
      "Assistance entry-point recognition",
      "Task completion and actions required",
      "Successful handoff to human help"
    ]
  },
  "evidence": [
    {
      "id": "research",
      "title": "Research + experimentation",
      "status": "Project summary",
      "summary": "Usability, A/B experimentation, prototype validation, and AI trust/brand studies.",
      "detail": "Terry’s supplied project account describes research embedded in product strategy with Research, Data Science, Product, and Engineering. Variables included AI entry points, conversational versus traditional UI, widget versus full-page interactions, proactive assistance, CTA language, visual treatments, suggestion chips, AI identity, and human escalation. The work evaluated usefulness, comprehension, trust, and brand fit. Participant quotations, specific findings, and measured outcomes have not been supplied."
    },
    {
      "id": "interviews",
      "title": "Interview snippets",
      "status": "Placeholder",
      "summary": "Approved excerpts and context to be added.",
      "detail": "Placeholder — add an approved artifact and its context. No findings or quotations are asserted here. Include the participant context, date, and how the excerpt affected a decision."
    },
    {
      "id": "whiteboards",
      "title": "FigJam / whiteboards",
      "status": "Placeholder",
      "summary": "Workshop and synthesis artifacts to be added.",
      "detail": "Placeholder — add an approved artifact and its context. No findings or quotations are asserted here. Explain the question explored and the resulting decision."
    },
    {
      "id": "concepts",
      "title": "Early concepts",
      "status": "Artifact available",
      "summary": "Conversational mobile prototype.",
      "detail": "The supplied conversational mobile prototype shows one assistance surface. It is a design artifact, not proof of a launch outcome.",
      "src": "/work/state-farm-assistant.png"
    },
    {
      "id": "failed",
      "title": "Failed concepts",
      "status": "Placeholder",
      "summary": "An abandoned direction and what it taught us.",
      "detail": "Placeholder — add an approved artifact and its context. No findings or quotations are asserted here. No failed concept is documented in the current notes. Add the alternative, why it was dropped, and the evidence."
    },
    {
      "id": "testing",
      "title": "Testing findings",
      "status": "Placeholder",
      "summary": "Specific findings and post-test changes pending.",
      "detail": "Entry-point, button, and interface variations were developed for moderated research and A/B testing. Specific findings and post-test changes have not been added yet."
    },
    {
      "id": "stakeholders",
      "title": "Stakeholder communication",
      "status": "Project summary",
      "summary": "Contribution and alignment from project notes.",
      "detail": "Experience strategy across 12+ customer journeys. Influence across 15+ cross-functional teams. Conversation patterns and a Digital Assistance design kit. Research direction and executive prototypes. AI Maturity Model implemented with Product and Engineering: Level 1 to Level 3. Add approved workshop notes or a decision record to substantiate stakeholder changes."
    },
    {
      "id": "product",
      "title": "Product constraints",
      "status": "Project summary",
      "summary": "Context that shaped the experience.",
      "detail": "Insurance journeys span products, channels, identity systems, and moments of uncertainty. Digital assistance needed a consistent interaction model to guide customers while preserving clarity and human control."
    },
    {
      "id": "engineering",
      "title": "Design + Engineering alignment",
      "status": "Project summary",
      "summary": "A shared Digital Assistance Design Kit and experience governance.",
      "detail": "Terry led 25+ multidisciplinary team members and aligned Product, Design, Engineering, Data Science, Research, Content, and AI around Digital Assistance. His account describes ownership of interaction models, prototypes, standards, experimentation, and experience governance, including the Digital Assistance Design Kit and implementation of the AI Maturity Model with Product and Engineering. Specific technical trade-offs and release-level outcomes are not supplied."
    },
    {
      "id": "competitive-intelligence",
      "title": "Competitive intelligence",
      "status": "Placeholder",
      "summary": "Competitor comparisons and source artifacts to be added.",
      "detail": "Comparison framework: Entry points: How do comparable insurance and service experiences make assistance recognizable at the moment of need? Task continuity: How do widgets, panels, and full-page flows preserve context across a complex task? Trust & handoff: How clearly does the experience explain the next step and a path to human help? Add named comparators, dated sources or approved screenshots, observed strengths and gaps, and the decision each finding influenced. This framework is not a completed benchmark or a claim that competitive research was performed. Engagement signals are proposed measures; no results are supplied."
    },
    {
      "id": "ai-maturity",
      "title": "AI Maturity Model",
      "status": "Project summary",
      "summary": "Terry’s framework implemented with Product and Engineering: Level 1 to Level 3.",
      "detail": "Based on Terry’s supplied SF — GenAI Maturity Model-v2 board screenshot and his account of implementing the model with Product and Engineering. The insurance-experience framework defines Level 1 Assisted Automation, Level 2 Context-Aware AI, and Level 3 Predictive AI Companion. This portfolio presentation condenses those stages. Customer examples and team-focus descriptions illustrate the framework; they do not assert that every listed capability shipped or establish a measured enterprise-wide maturity assessment."
    }
  ]
};

function mergeUnchanged(current:unknown, previous:unknown, next:unknown):unknown {
 if(JSON.stringify(current)===JSON.stringify(previous))return structuredClone(next);
 if(Array.isArray(current)&&Array.isArray(previous)&&Array.isArray(next)) {
  if(next.every(item=>item&&typeof item==='object'&&'id' in item))return current.map(item=>{const old=previous.find(p=>p.id===item.id),fresh=next.find(p=>p.id===item.id);return old&&fresh?mergeUnchanged(item,old,fresh):item;});
  return current;
 }
 if(current&&previous&&next&&typeof current==='object'&&typeof previous==='object'&&typeof next==='object') {
  const result={...current} as Record<string,unknown>,old=previous as Record<string,unknown>;
  for(const [key,value] of Object.entries(next))result[key]=mergeUnchanged(result[key],old[key],value);
  return result;
 }
 return current;
}
export function applyStateFarmCopyUpdate(content:PortfolioContent):PortfolioContent {
 if(content.stateFarmCopyVersion===1)return content;
 return {...content,stateFarmCopyVersion:1,studies:{...content.studies,'digital-assistance':mergeUnchanged(content.studies['digital-assistance'],previousCopy,stateFarmCopy) as PortfolioContent['studies'][string]}};
}
