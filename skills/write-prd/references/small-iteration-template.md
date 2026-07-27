sed: --: No such file or directory
# 小型迭代 PRD 模板

Use one document for a release bundle, but keep every request independently traceable.

# `YYYYMMDD_迭代需求_状态`

## 一、需求概述

### 1 需求基本信息

| 序号 | 需求部门 | 提需人 | 原始需求 Flash | 标题 | 优先级 | 排期 | 状态 | 研发主 R | 评审通过时间 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | TBD | TBD | TBD | … | TBD | TBD | 草稿 | TBD | TBD |

Do not invent owners, schedules, priority, or status. Keep `TBD` until confirmed.

### 2 需求背景

Write each demand separately.

#### 2.1 关键问题及影响

For each demand:

- `需求 N：标题`
- Current behavior
- Key problem and affected role or process
- Business or user impact
- Expected result
- Relevant evidence, screenshots, data, or original request

For changes to fields, permissions, calculations, exports, or status logic, explicitly contrast `现状` and `期望结果`.

#### 2.2 解决思路

Describe key business strategy or process changes. For a straightforward optimization, one concise sentence such as `现有功能迭代优化` is acceptable, followed by any important constraint.

## 二、产品方案

Create a subsection per module or demand instead of using the literal title “模块 A”.

### 1 `模块或需求名称`

| 功能点 | 角色用例 | 交互原型 | 原型说明 | 外部依赖 |
|---|---|---|---|---|
| … | 作为…我需要…以便… | 链接/TBD | 行为、字段、规则、状态与异常 | 不涉及/TBD/系统名 |

Below the table, add detailed rules when needed:

- Entry, permission, and data scope
- Field type, required status, default, enum, length, and display condition
- Current and expected behavior
- Calculation or filter definition
- Error, empty, loading, repeated submission, and failure states
- Acceptance criteria

### 2 非功能需求

#### 2.1 分析需求

- Events or data fields to record
- Analysis use case and metric definition
- Query time range and expected data volume

Write `不涉及` only after checking whether the change needs measurement or auditability.

#### 2.2 多端兼容性要求

| 端 | 是否需要兼容 | 说明 |
|---|---|---|
| PC | 需要/不需要 | … |
| 安卓 | 需要/不需要 | … |
| iOS | 需要/不需要 | … |
| MacOS | 需要/不需要 | … |
| 鸿蒙 | 需要/不需要 | … |
| 小程序 | 需要/不需要 | … |

#### 2.3 风控要求

From the business-risk perspective, state which role or behavior needs monitoring or blocking and the exact rule. If no risk control applies, write `不涉及：原因`.

#### 2.4 灰度策略

State whether gradual release is needed. When applicable, define the gray dimension, such as organization, department, store, warehouse, route, account, role, or percentage; add observation metrics and stop conditions.

## 三、假设与开放问题

- Assumptions made
- `Blocking`, `Important`, and `Later` questions
- Next decisions or actions
