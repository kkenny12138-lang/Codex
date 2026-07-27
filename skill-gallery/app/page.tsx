sed: --: No such file or directory
"use client";

import { useEffect, useMemo, useState } from "react";

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

const skillDetails: Record<string, {
  scenario: string;
  capabilities: string[];
  outputs: string[];
}> = {
  "write-prd": {
    scenario: "当你需要把零散想法、业务反馈或会议纪要，转化为团队可以评审和落地的产品需求时使用。",
    capabilities: ["判断完整项目或小型迭代类型", "明确背景、目标、范围与业务规则", "拆解角色、流程、异常和边界状态", "编写可验证的验收标准与指标", "标记假设、风险和待决策问题"],
    outputs: ["完整项目 PRD", "小型迭代 PRD", "PRD 评审意见", "需求补全与改写稿"],
  },
  imagegen: {
    scenario: "需要从文字描述生成原创位图，或对现有图片进行风格、构图、元素和质感调整时使用。",
    capabilities: ["生成插画、照片感视觉与产品素材", "编辑、增删或替换图片元素", "制作透明背景主体与视觉变体", "根据参考图保持风格一致性"],
    outputs: ["PNG/JPEG 视觉素材", "产品与营销配图", "插画及场景图", "图像编辑版本"],
  },
  "openai-docs": {
    scenario: "开发 OpenAI API、选择模型、迁移提示词，或需要核对 Codex 与 OpenAI 产品最新能力时使用。",
    capabilities: ["检索最新官方文档", "解释模型、API 与工具能力", "提供官方引用和实现建议", "辅助模型升级与提示词迁移"],
    outputs: ["技术解答", "API 示例", "模型选型建议", "官方文档引用"],
  },
  "plugin-creator": {
    scenario: "需要把技能、连接器和应用能力组合成一个可安装、可分发的 Codex 插件时使用。",
    capabilities: ["生成插件目录与清单", "配置技能和 MCP 结构", "维护个人市场条目", "校验插件元数据与安装流程"],
    outputs: ["Codex 插件目录", "plugin.json", "市场配置", "可安装插件包"],
  },
  "skill-creator": {
    scenario: "希望把个人方法论、专业知识或固定工作流程封装成 Codex 可以稳定执行的技能时使用。",
    capabilities: ["设计触发条件与执行边界", "编写分步骤工作流", "组织参考资料、脚本和模板", "检查技能的可复用性与安全性"],
    outputs: ["SKILL.md", "技能参考资料", "辅助脚本", "技能资源包"],
  },
  "skill-installer": {
    scenario: "希望扩展 Codex 能力，从精选来源或 GitHub 仓库添加现成技能时使用。",
    capabilities: ["查看可安装技能", "安装精选技能", "从仓库路径安装技能", "处理公开或私有仓库来源"],
    outputs: ["已安装技能", "安装结果说明", "技能目录更新"],
  },
  browser: {
    scenario: "需要在已有登录状态的浏览器中打开页面、填写内容、点击操作或验证网页行为时使用。",
    capabilities: ["打开并导航网页", "读取可见内容与交互状态", "点击、输入和提交表单", "进行页面截图与本地网页测试"],
    outputs: ["网页操作结果", "页面状态检查", "截图", "交互验证记录"],
  },
  documents: {
    scenario: "需要创建专业 Word 文档，或对现有文档进行编辑、批注、修订和版式校验时使用。",
    capabilities: ["创建和编辑 DOCX", "批注、修订与红线对比", "应用样式、目录和页眉页脚", "逐页渲染并检查最终版式"],
    outputs: ["Word 文档", "修订稿", "批注版", "可转 Google Docs 的文稿"],
  },
  pdf: {
    scenario: "需要读取、整理或制作版式准确的 PDF，特别是表单、报告和最终交付文件时使用。",
    capabilities: ["提取 PDF 文本和结构", "创建与合并 PDF", "填写或制作 AcroForm 表单", "逐页渲染并检查布局"],
    outputs: ["PDF 报告", "合并或拆分文件", "可填写表单", "PDF 内容分析"],
  },
  presentations: {
    scenario: "需要把内容转化为具有叙事结构和视觉一致性的演示文稿，或优化已有 PPT 时使用。",
    capabilities: ["规划演示结构与故事线", "创建和编辑 PPTX", "制作图表、版式与视觉层级", "渲染检查文字溢出和页面一致性"],
    outputs: ["PowerPoint 演示稿", "Google Slides 就绪稿", "演讲结构", "视觉优化版本"],
  },
  spreadsheets: {
    scenario: "需要创建、清洗、分析或验证独立表格文件，处理计算、图表和数据汇总时使用。",
    capabilities: ["创建与编辑 XLSX/CSV/TSV", "编写公式和数据校验", "分析数据并生成图表", "检查计算结果与表格格式"],
    outputs: ["Excel 工作簿", "CSV/TSV 文件", "数据分析表", "图表与汇总结果"],
  },
  "excel-live-control": {
    scenario: "Microsoft Excel 已打开且已建立连接，希望直接在当前工作簿内完成操作时使用。",
    capabilities: ["读取当前工作表", "编辑单元格、公式和格式", "控制表格与工作簿结构", "在原文件中实时验证结果"],
    outputs: ["已更新的实时工作簿", "公式与格式调整", "当前表格分析结果"],
  },
  "sites-building": {
    scenario: "需要从需求快速构建可用的网站、落地页、看板、门户或轻量互动工具时使用。",
    capabilities: ["规划信息架构与页面体验", "实现响应式界面与交互", "接入持久化、认证和外部数据", "执行构建检查与产品化收尾"],
    outputs: ["完整网站源码", "响应式网页", "交互式工具", "可部署站点版本"],
  },
  "sites-hosting": {
    scenario: "网站已经完成，需要保存版本、发布上线或管理生产环境访问方式时使用。",
    capabilities: ["创建与管理站点", "保存可回溯版本", "部署私有或共享生产站点", "管理环境变量、域名与访问设置"],
    outputs: ["生产网站链接", "已保存站点版本", "部署状态", "托管配置"],
  },
  visualize: {
    scenario: "当普通文字不足以解释关系、变化或方案差异，需要用户自己探索数据与情景时使用。",
    capabilities: ["制作图表、关系图和时间线", "构建可调参数模拟器", "生成地图与交互式数据探索", "在对话中直接呈现可视化"],
    outputs: ["交互式图表", "模拟器与实验室", "地图", "比较与关系视图"],
  },
  "template-creator": {
    scenario: "你有一份满意的参考成品，希望以后持续复用相同结构、视觉与写作风格时使用。",
    capabilities: ["分析参考成品的结构与风格", "提取可复用规则和资源", "创建个人模板技能", "更新已有模板并保持一致性"],
    outputs: ["可复用模板技能", "模板说明", "结构与样式规范", "模板资源包"],
  },
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const [owner, setOwner] = useState<"all" | "mine" | "codex">("all");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  useEffect(() => {
    if (!selectedSkill) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedSkill(null);
    };
    document.body.classList.add("drawer-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("drawer-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedSkill]);

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
              role="button"
              tabIndex={0}
              aria-label={`查看 ${skill.title} 详情`}
              onClick={() => setSelectedSkill(skill)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedSkill(skill);
                }
              }}
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
                <span>查看详细能力</span>
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

      {selectedSkill && (
        <div className="detail-backdrop" role="presentation" onMouseDown={() => setSelectedSkill(null)}>
          <section
            className="detail-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-title"
            style={{ "--accent": selectedSkill.accent } as React.CSSProperties}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="detail-head">
              <div className="detail-glyph">{selectedSkill.glyph}</div>
              <button className="detail-close" onClick={() => setSelectedSkill(null)} aria-label="关闭详情">
                ×
              </button>
            </div>
            <div className="detail-label">
              {selectedSkill.owner === "mine" ? "MY SKILL" : "CODEX SKILL"} / {selectedSkill.category}
            </div>
            <h2 id="detail-title">{selectedSkill.title}</h2>
            <code className="detail-code">{selectedSkill.name}</code>
            <p className="detail-summary">{selectedSkill.description}</p>

            <div className="detail-block">
              <span className="detail-number">01</span>
              <div>
                <h3>什么时候使用</h3>
                <p>{skillDetails[selectedSkill.name].scenario}</p>
              </div>
            </div>
            <div className="detail-block">
              <span className="detail-number">02</span>
              <div>
                <h3>核心能力</h3>
                <ul>
                  {skillDetails[selectedSkill.name].capabilities.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
            <div className="detail-block">
              <span className="detail-number">03</span>
              <div>
                <h3>典型产出</h3>
                <div className="output-tags">
                  {skillDetails[selectedSkill.name].outputs.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            </div>
            <div className="detail-tip">
              <span>TIP</span>
              <p>在对话中直接描述你的目标，Codex 会在适合时调用这项技能。</p>
            </div>
          </section>
        </div>
      )}

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
