"use client";

import { useMemo, useState } from "react";

type Skill = {
  name: string;
  title: string;
  description: string;
  category: string;
  owner: "mine" | "codex";
  accent: string;
  glyph: string;
};

const skills: Skill[] = [
  {
    name: "write-prd",
    title: "PRD 需求文档",
    description: "把想法、反馈与会议记录整理成可决策、可验收的产品需求文档。",
    category: "产品与内容",
    owner: "mine",
    accent: "#ffd875",
    glyph: "PR",
  },
  {
    name: "imagegen",
    title: "图像生成",
    description: "生成原创插画、视觉素材、产品图与图像变体。",
    category: "视觉创作",
    owner: "codex",
    accent: "#f68d7b",
    glyph: "IM",
  },
  {
    name: "openai-docs",
    title: "OpenAI 文档",
    description: "查询最新官方文档，解答 API、模型与 Codex 使用问题。",
    category: "开发工具",
    owner: "codex",
    accent: "#8fd3bd",
    glyph: "OA",
  },
  {
    name: "plugin-creator",
    title: "插件创建",
    description: "搭建可安装的 Codex 插件结构、清单与市场配置。",
    category: "开发工具",
    owner: "codex",
    accent: "#94b7ff",
    glyph: "PL",
  },
  {
    name: "skill-creator",
    title: "技能创建",
    description: "把专业知识与工作流封装成清晰、可靠、可复用的技能。",
    category: "开发工具",
    owner: "codex",
    accent: "#ba9cff",
    glyph: "SC",
  },
  {
    name: "skill-installer",
    title: "技能安装",
    description: "从精选列表或 GitHub 仓库安装 Codex 技能。",
    category: "开发工具",
    owner: "codex",
    accent: "#e6a9d5",
    glyph: "SI",
  },
  {
    name: "browser",
    title: "浏览器控制",
    description: "打开、浏览和操作网页，用于页面验证与在线任务。",
    category: "自动化",
    owner: "codex",
    accent: "#7cc8eb",
    glyph: "BR",
  },
  {
    name: "documents",
    title: "Word 文档",
    description: "创建、编辑、批注与校验 Word 文档及 Google Docs 文稿。",
    category: "办公文档",
    owner: "codex",
    accent: "#8caef6",
    glyph: "DO",
  },
  {
    name: "pdf",
    title: "PDF 处理",
    description: "读取、生成、渲染和检查 PDF，包括可填写表单。",
    category: "办公文档",
    owner: "codex",
    accent: "#ff8f84",
    glyph: "PD",
  },
  {
    name: "presentations",
    title: "演示文稿",
    description: "创建、编辑并视觉校验 PowerPoint 与 Google Slides。",
    category: "办公文档",
    owner: "codex",
    accent: "#f3a76e",
    glyph: "SL",
  },
  {
    name: "spreadsheets",
    title: "电子表格",
    description: "创建、编辑、分析和验证 Excel、CSV 与 Google Sheets 文件。",
    category: "办公文档",
    owner: "codex",
    accent: "#7bd49f",
    glyph: "XS",
  },
  {
    name: "excel-live-control",
    title: "Excel 实时控制",
    description: "通过已连接会话直接操作当前打开的 Excel 工作簿。",
    category: "自动化",
    owner: "codex",
    accent: "#78c9a1",
    glyph: "XL",
  },
  {
    name: "sites-building",
    title: "网站构建",
    description: "从想法到完整页面，构建落地页、门户、看板与内部工具。",
    category: "网站与可视化",
    owner: "codex",
    accent: "#ffd875",
    glyph: "WB",
  },
  {
    name: "sites-hosting",
    title: "网站托管",
    description: "发布网站、管理生产版本、环境变量与访问权限。",
    category: "网站与可视化",
    owner: "codex",
    accent: "#f2c55c",
    glyph: "WH",
  },
  {
    name: "visualize",
    title: "交互式可视化",
    description: "制作图表、关系图、模拟器、地图与可交互探索工具。",
    category: "网站与可视化",
    owner: "codex",
    accent: "#a0d5ff",
    glyph: "VZ",
  },
  {
    name: "template-creator",
    title: "模板创建",
    description: "从参考成品提炼可重复使用的个人文档与视觉模板。",
    category: "产品与内容",
    owner: "codex",
    accent: "#d8adff",
    glyph: "TP",
  },
];

const categories = ["全部", ...Array.from(new Set(skills.map((skill) => skill.category)))];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const [owner, setOwner] = useState<"all" | "mine" | "codex">("all");

  const filtered = useMemo(
    () =>
      skills.filter((skill) => {
        const matchesQuery = `${skill.name}${skill.title}${skill.description}`
          .toLowerCase()
          .includes(query.trim().toLowerCase());
        const matchesCategory = category === "全部" || skill.category === category;
        const matchesOwner = owner === "all" || skill.owner === owner;
        return matchesQuery && matchesCategory && matchesOwner;
      }),
    [category, owner, query],
  );

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Skill Atlas 首页">
          <span className="brand-mark">S/</span>
          <span>SKILL ATLAS</span>
        </a>
        <div className="nav-meta">
          <span className="live-dot" />
          <span>当前工作空间</span>
          <span className="version">v1.0</span>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow">
          <span>01</span>
          <span className="eyebrow-line" />
          <span>能力索引 / 2026</span>
        </div>
        <div className="hero-grid">
          <div>
            <h1>
              我的技能，
              <br />
              <span>与你的能力栈。</span>
            </h1>
            <p className="hero-copy">
              一张动态更新的技能地图。浏览我亲手创建的工作流，以及 Codex
              在当前会话中可以调用的专业能力。
            </p>
          </div>
          <div className="hero-stats" aria-label="技能统计">
            <div>
              <strong>01</strong>
              <span>我的技能</span>
            </div>
            <div>
              <strong>{String(skills.filter((s) => s.owner === "codex").length).padStart(2, "0")}</strong>
              <span>Codex 技能</span>
            </div>
            <div>
              <strong>{String(categories.length - 1).padStart(2, "0")}</strong>
              <span>能力分类</span>
            </div>
          </div>
        </div>
        <div className="ticker" aria-hidden="true">
          <span>WRITE · BUILD · VISUALIZE · AUTOMATE · ANALYZE · PUBLISH</span>
          <span>WRITE · BUILD · VISUALIZE · AUTOMATE · ANALYZE · PUBLISH</span>
        </div>
      </section>

      <section className="catalog" id="catalog">
        <div className="section-heading">
          <div>
            <span className="section-number">02</span>
            <h2>技能目录</h2>
          </div>
          <p>选择、搜索，找到完成下一项工作的最佳能力。</p>
        </div>

        <div className="controls">
          <label className="search">
            <span>⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索技能或用途…"
              aria-label="搜索技能"
            />
            <kbd>⌘ K</kbd>
          </label>
          <div className="owner-tabs" aria-label="按技能所有者筛选">
            {[
              ["all", "全部"],
              ["mine", "我的"],
              ["codex", "Codex"],
            ].map(([value, label]) => (
              <button
                key={value}
                className={owner === value ? "active" : ""}
                onClick={() => setOwner(value as typeof owner)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="category-row" aria-label="按分类筛选">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="result-meta">
          <span>{String(filtered.length).padStart(2, "0")} 个结果</span>
          <span className="rule" />
        </div>

        <div className="skill-grid">
          {filtered.map((skill, index) => (
            <article
              className={`skill-card ${skill.owner === "mine" ? "is-mine" : ""}`}
              key={skill.name}
              style={{ "--accent": skill.accent } as React.CSSProperties}
            >
              <div className="card-top">
                <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="owner-badge">
                  {skill.owner === "mine" ? "MY SKILL" : "CODEX"}
                </span>
              </div>
              <div className="glyph" aria-hidden="true">{skill.glyph}</div>
              <div className="card-content">
                <span className="category">{skill.category}</span>
                <h3>{skill.title}</h3>
                <code>{skill.name}</code>
                <p>{skill.description}</p>
              </div>
              <div className="card-footer">
                <span>AVAILABLE</span>
                <span className="arrow">↗</span>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty">
            <span>NO MATCH</span>
            <h3>没有找到匹配技能</h3>
            <button onClick={() => { setQuery(""); setCategory("全部"); setOwner("all"); }}>
              清除所有筛选
            </button>
          </div>
        )}
      </section>

      <footer>
        <div>
          <span className="brand-mark">S/</span>
          <p>你的能力边界，正在持续扩展。</p>
        </div>
        <span>LOCAL SKILL INDEX · SHANGHAI</span>
      </footer>
    </main>
  );
}
