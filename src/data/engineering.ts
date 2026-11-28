// Engineering data definitions
export const capabilities = [
  { icon: 'layers', title: 'System design & architecture', summary: 'Clear boundaries, sound trade‑offs, and scalable foundations.' },
  { icon: 'shield-check', title: 'Cybersecurity by design', summary: 'Threat modeling, least privilege, secure reviews, and resilient delivery.' },
  { icon: 'sparkles', title: 'AI-assisted, engineer‑verified', summary: 'Move faster with AI, while keeping reviews, tests, and judgment human.' },
  { icon: 'database', title: 'Production ownership', summary: 'Reliability, observability, incidents, recovery, and iteration.' },
  { icon: 'layout-grid', title: 'Product‑minded engineering', summary: 'Build the right system for the real problem — not just more code.' },
] as const;

export const architecture = [
  { icon: 'file-text', name: 'Requirements', detail: 'Find the business goals, operational constraints, failure cases, and success criteria.' },
  { icon: 'layers', name: 'Boundaries', detail: 'Define ownership, APIs, isolation, coupling, and the cost of complexity.' },
  { icon: 'workflow', name: 'Services', detail: 'Choose cohesive components and communication patterns that fit expected growth.' },
  { icon: 'database', name: 'Data', detail: 'Design consistency, indexes, caching, privacy boundaries, and recovery.' },
  { icon: 'eye', name: 'Observability', detail: 'Instrument the system for metrics, logs, traces, and useful alerts.' },
  { icon: 'shield-check', name: 'Reliability', detail: 'Plan for security, retries, isolation, rollback, and graceful degradation.' },
] as const;

export const principles = [
  { icon: 'layers', title: 'Architecture before frameworks', summary: 'Start with constraints, scale, and long‑term maintainability.', detail: 'I begin with the problem and its boundaries, then document the trade‑offs. A modular monolith, distributed service, or managed platform is a decision — not a default.' },
  { icon: 'shield-check', title: 'Security from the first decision', summary: 'Threat models, least privilege, data protection, and secure delivery.', detail: 'I consider authentication, authorization, tenant isolation, secret management, dependency risk, and abuse cases in design and review — not as a last‑minute checklist.' },
  { icon: 'sparkles', title: 'AI accelerates; engineers decide', summary: 'Use AI deliberately, validate behavior, and own the result.', detail: 'AI can help explore options, build bounded changes, write tests, and debug. I remain accountable for correctness, maintainability, data privacy, and the final technical judgment.' },
  { icon: 'activity', title: 'Design for the day after launch', summary: 'Observe, recover, and improve the system in production.', detail: 'Instrumentation, SLO‑aware monitoring, safe deploys, incident learning, and cost control matter just as much as implementation.' },
  { icon: 'code', title: 'Tools follow the problem', summary: 'Strong foundations; flexible implementation choices.', detail: 'TypeScript, Next.js, NestJS, PostgreSQL, Redis, Docker, and CI/CD are familiar tools. I choose others when they solve the problem better.' },
] as const;

export const process = [
  { icon: 'search', name: 'Clarify', detail: 'Align on constraints and outcomes.' },
  { icon: 'layers', name: 'Architect', detail: 'Choose boundaries, data flows, and trade‑offs.' },
  { icon: 'code', name: 'Implement', detail: 'Build in small, reviewable increments.' },
  { icon: 'check-circle', name: 'Validate', detail: 'Test behavior, failure cases, and security.' },
  { icon: 'activity', name: 'Operate', detail: 'Deploy safely and monitor real‑world behavior.' },
  { icon: 'trending-up', name: 'Evolve', detail: 'Improve using evidence and user feedback.' },
] as const;

export const projects = [
  { number: '01', title: 'BajuTech Commerce — AI-Integrated E-Commerce Platform', status: 'Architecture & implementation', description: 'Next-gen multi-tenant commerce architecture orchestrating storefronts, real-time inventory, intelligent routing, and automated courier logistics into one high-throughput engine.', href: '/work/commerce-platform/', diagram: 'commerce' },
  { number: '02', title: 'BajuTech Inbox — AI Customer Service & Automation', status: 'Production system', description: 'An AI-powered inbox that brings customer chats together, answers common questions, captures orders, and flags risky deliveries for review.', href: '/work/automation-system/', diagram: 'automation' },
] as const;
