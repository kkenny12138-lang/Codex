sed: --: No such file or directory
# PRD Type Routing

## Decision rules

Use **完整项目 PRD** if any strong signal applies:

- New product, platform, system, or foundational capability
- Replacement, migration, vendor exit, or business-continuity deadline
- Multiple delivery phases or a roadmap beyond one release
- Multiple connected modules, user roles, or operational processes
- Complex formulas, policies, state transitions, or exception rules
- Multiple upstream or downstream system integrations
- Initial data setup, migration, reconciliation, or historical-data handling
- High-impact permission, payroll, finance, compliance, privacy, or security behavior
- A project log is needed to retain cross-functional decisions

Use **小型迭代 PRD** when most signals apply:

- Limited, localized changes to an existing feature
- One or a few screens, fields, buttons, filters, exports, permissions, or notifications
- Several independent requests are packaged into one release
- Current behavior and expected behavior can describe most changes
- No foundational data model or architecture change
- Dependencies and rollout are small and bounded

## Ambiguous cases

Score one point for each:

- More than 3 modules
- More than 3 roles
- More than 2 external systems
- Phased delivery
- Data migration or initialization
- Complex calculation rules
- High-risk business domain

Use complete-project format at 2 or more points. Use small-iteration format at 0 points. At 1 point, choose based on the risk of omitted context.

## Conversion

Escalate an iteration PRD to a complete-project PRD when discovery reveals shared infrastructure, a new domain model, broad permission changes, multi-system orchestration, or substantial rollout risk.

Split a complete-project PRD into linked iteration PRDs when the high-level background, scope, architecture, and shared rules are stable but individual releases need focused implementation detail.
