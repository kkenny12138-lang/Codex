sed: --: No such file or directory
---
name: write-prd
description: Create, complete, review, or revise Product Requirements Documents (PRDs) using either a comprehensive project format for large cross-module initiatives or a lightweight iteration format for small, fragmented product changes. Use when Codex needs to turn product ideas, requests, user feedback, research, meeting notes, or drafts into requirements; choose the appropriate PRD type; or define background, value, scope, business rules, modules, roles, prototypes, dependencies, analytics, compatibility, risk controls, rollout, acceptance criteria, assumptions, or open questions. Default to the user's local Tuhu-style Chinese PRD conventions while supporting Chinese and English output.
---

# Write PRD

Produce decision-ready requirements rather than decorative prose. Keep facts, assumptions, recommendations, and open questions distinct.

## Choose an operation

- **Create**: Build a PRD from an idea, brief, notes, research, or conversation.
- **Improve**: Preserve valid content while fixing ambiguity, omissions, contradictions, and weak acceptance criteria.
- **Review**: Report issues by severity and propose concrete fixes; do not rewrite unless requested.
- **Adapt**: Convert requirements into the user's template, language, or requested level of detail.

Use the language of the user's request unless another language is specified.

## Follow the workflow

### 1. Route to a PRD type

Choose the type before writing:

- **完整项目 PRD**: Use for a new system or platform, major replacement or migration, multiple phases, multiple modules or roles, complex business rules or formulas, several system integrations, major organizational impact, or a project requiring a durable decision log.
- **小型迭代 PRD**: Use for scattered optimizations, bug-like product changes, field or permission changes, copy or interaction adjustments, report/export changes, localized logic changes, or a release that bundles several mostly independent requests.

Read [references/type-routing.md](references/type-routing.md) when the type is unclear. If signals conflict, choose the complete-project format when omission could create cross-module, data, permission, compliance, payroll, or integration risk. Otherwise prefer the iteration format.

If the user explicitly names a type, follow it. If the type remains materially ambiguous, ask one question: “这是完整项目还是小型迭代？” When speed matters, state the assumed type and proceed.

### 2. Establish context

Extract the known product, lifecycle stage, target users, problem evidence, business objective, desired user outcome, current behavior, constraints, deadline, stakeholders, dependencies, and relevant artifacts.

Do not invent company facts, research, commitments, owners, dates, baselines, or targets. Mark plausible but unverified content as `Assumption` and missing decisions as `Open question`.

Ask questions only when answers would materially change direction, scope, or feasibility. Ask one compact batch of high-leverage questions. If the user wants a fast draft or cannot answer, proceed using explicit assumptions.

### 3. Load the matching structure

- For a complete project, read and follow [references/complete-project-template.md](references/complete-project-template.md).
- For a small iteration, read and follow [references/small-iteration-template.md](references/small-iteration-template.md).

Preserve the template's section order. Omit an optional subsection only when it clearly does not apply; write `不涉及` for a risk-sensitive field that reviewers must consciously confirm.

### 4. Define the problem first

State who experiences the problem, what outcome is blocked, the context, supporting evidence, the impact, and why it matters now. Separate the user problem from the proposed feature. If the request is solution-first, infer a candidate problem and label it as an assumption.

### 5. Define scope and behavior

Make in-scope and out-of-scope items explicit. Organize requirements by user journey or capability, give them stable IDs such as `FR-01`, and use `Must`, `Should`, or `Could` priorities when useful.

For every important requirement, capture:

- Actor and trigger
- Observable system behavior
- Main success path
- Relevant empty, loading, error, permission, boundary, and recovery states
- Verifiable acceptance criteria

Use Given/When/Then only when it improves precision. Avoid prescribing architecture or visual design unless it is a real constraint or the user asks for it.

### 6. Define outcomes and measurement

Connect every success metric to a goal. When known, specify definition, direction, population, window, source, baseline, and target. Mark unsupported values `TBD` rather than inventing precision. Add guardrails for likely harms such as latency, errors, abuse, cancellations, support volume, or loss of trust.

### 7. Address delivery and uncertainty

Capture applicable dependencies, privacy, security, accessibility, compliance, localization, performance, reliability, analytics, operational readiness, and support needs. Describe major risks and mitigations. Include rollout stages, readiness criteria, monitoring, and rollback conditions proportional to risk.

### 8. Run the quality gate

Read [references/quality-checklist.md](references/quality-checklist.md). Resolve contradictions, remove vague language, and ensure every must-have behavior can be verified.

## Deliver

Lead with a concise recommendation and major assumptions. Provide the PRD in clean Markdown unless another artifact or format is requested.

Name documents consistently:

- Complete project: `YYYYMMDD_项目或系统名称_阶段或状态`
- Small iteration bundle: `YYYYMMDD_迭代需求_状态`

Keep multiple small requests as separate numbered demand items within one iteration document. Do not force unrelated items into one shared problem statement or solution narrative.

When information is incomplete, finish with:

1. **Assumptions made**
2. **Open questions**, prioritized as `Blocking`, `Important`, or `Later`
3. **Next decisions or actions**

For a review, present findings first in severity order. Name the affected section, explain the consequence, and provide replacement wording or a decision path. Then summarize strengths and unresolved questions.

Avoid:

- Repeating context across sections
- Treating launch, output, or feature usage as the user outcome
- Vague words such as “fast,” “intuitive,” or “support” without measurable meaning
- Mixing MVP scope with future ideas
- Hiding uncertainty behind confident wording
