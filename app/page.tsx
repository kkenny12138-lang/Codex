"use client";

import { useEffect, useMemo, useState } from "react";

type Space = "衣柜" | "厨房";
type Item = {
  id: number;
  name: string;
  space: Space;
  category: string;
  color: string;
  note: string;
  icon: string;
};

const seedItems: Item[] = [
  { id: 1, name: "燕麦色针织衫", space: "衣柜", category: "上装", color: "燕麦色", note: "秋冬常穿", icon: "🧶" },
  { id: 2, name: "雾蓝衬衫", space: "衣柜", category: "上装", color: "雾蓝色", note: "适合通勤", icon: "👔" },
  { id: 3, name: "米白帆布包", space: "衣柜", category: "配饰", color: "米白色", note: "周末出门", icon: "👜" },
  { id: 4, name: "深咖半身裙", space: "衣柜", category: "下装", color: "深咖色", note: "换季收纳", icon: "👗" },
  { id: 5, name: "白瓷马克杯", space: "厨房", category: "杯具", color: "奶白色", note: "每天早餐", icon: "☕" },
  { id: 6, name: "铸铁煎锅", space: "厨房", category: "锅具", color: "黑色", note: "适合煎牛排", icon: "🍳" },
];

const spaces = [
  { name: "衣柜" as Space, icon: "🧥", subtitle: "衣物、鞋包与配饰", tone: "peach" },
  { name: "厨房" as Space, icon: "🍽️", subtitle: "餐具、厨具与食材", tone: "sage" },
];

export default function Home() {
  const [page, setPage] = useState<"首页" | "我的世界">("首页");
  const [space, setSpace] = useState<Space>("衣柜");
  const [items, setItems] = useState<Item[]>(seedItems);
  const [query, setQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("my-closet-items");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("my-closet-items", JSON.stringify(items));
  }, [items]);

  const visibleItems = useMemo(
    () => items.filter((item) => item.space === space && item.name.includes(query.trim())),
    [items, query, space],
  );

  function enterSpace(nextSpace: Space) {
    setSpace(nextSpace);
    setPage("我的世界");
    setQuery("");
  }

  function addItem(formData: FormData) {
    const name = String(formData.get("name") || "").trim();
    if (!name) return;
    const category = String(formData.get("category") || "其他");
    setItems((current) => [
      { id: Date.now(), name, space, category, color: "新物品", note: "刚刚添加", icon: space === "衣柜" ? "👚" : "🥣" },
      ...current,
    ]);
    setShowAdd(false);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2400);
  }

  return (
    <main>
      <header className="topbar">
        <button className="brand" onClick={() => setPage("首页")} aria-label="返回首页">
          <span className="brand-flower">✿</span>
          <span>我的衣柜<small>MY LITTLE HOME</small></span>
        </button>
        <button className="avatar" aria-label="个人中心">K</button>
      </header>

      {page === "首页" ? (
        <div className="page">
          <section className="welcome">
            <div>
              <p className="date">七月 · 盛夏</p>
              <h1>你好，<br /><em>欢迎回家。</em></h1>
              <p className="intro">认真记下家里的每一件物品，<br />也收藏生活里微小的喜欢。</p>
            </div>
            <div className="home-illustration" aria-hidden="true">
              <span className="sun">☀</span>
              <span className="hanger">⌁</span>
              <span className="plant">♧</span>
              <span className="cat">◕ ᴥ ◕</span>
            </div>
          </section>

          <section className="overview">
            <div className="section-title">
              <div><span>01</span><h2>我的世界</h2></div>
              <p>两个空间 · {items.length} 件物品</p>
            </div>
            <div className="space-grid">
              {spaces.map((card) => (
                <button className={`space-card ${card.tone}`} key={card.name} onClick={() => enterSpace(card.name)}>
                  <span className="space-icon">{card.icon}</span>
                  <span className="space-text">
                    <strong>{card.name}</strong>
                    <small>{card.subtitle}</small>
                  </span>
                  <span className="space-count">{items.filter((item) => item.space === card.name).length}<small>件物品</small></span>
                  <span className="arrow">↗</span>
                </button>
              ))}
            </div>
          </section>

          <section className="recent">
            <div className="section-title">
              <div><span>02</span><h2>最近记录</h2></div>
              <button onClick={() => enterSpace("衣柜")}>查看全部 →</button>
            </div>
            <div className="recent-grid">
              {items.slice(0, 4).map((item) => (
                <article className="item-card" key={item.id}>
                  <div className="item-picture"><span>{item.icon}</span><i>{item.space}</i></div>
                  <div className="item-info"><h3>{item.name}</h3><p>{item.category} · {item.color}</p></div>
                </article>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="page world-page">
          <nav className="crumb"><button onClick={() => setPage("首页")}>首页</button><span>/</span><b>我的世界</b></nav>
          <section className="world-head">
            <div>
              <p className="date">我的世界 · {space}</p>
              <h1>{space === "衣柜" ? "今天，穿什么？" : "今天，吃什么？"}</h1>
              <p>{space === "衣柜" ? "把喜欢的衣服放在看得见的地方。" : "把厨房里的烟火气一件件收好。"}</p>
            </div>
            <div className="world-stat"><strong>{visibleItems.length}</strong><span>件物品</span></div>
          </section>

          <div className="world-tabs">
            {spaces.map((card) => <button key={card.name} className={space === card.name ? "active" : ""} onClick={() => enterSpace(card.name)}>{card.icon} {card.name}</button>)}
          </div>

          <div className="tools">
            <label><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`搜索${space}里的物品`} /></label>
            <button className="add-button" onClick={() => setShowAdd(true)}>＋ 添加物品</button>
          </div>

          {visibleItems.length ? (
            <div className="closet-grid">
              {visibleItems.map((item) => (
                <article className="closet-item" key={item.id}>
                  <div className="closet-image"><span>{item.icon}</span><button aria-label={`收藏${item.name}`}>♡</button></div>
                  <p>{item.category}</p><h3>{item.name}</h3><small>{item.note}</small>
                </article>
              ))}
            </div>
          ) : <div className="empty"><span>⌕</span><h3>还没有找到物品</h3><p>换个关键词，或者记录一件新物品吧。</p></div>}
        </div>
      )}

      <nav className="bottom-nav" aria-label="主导航">
        <button className={page === "首页" ? "active" : ""} onClick={() => setPage("首页")}><span>⌂</span>首页</button>
        <button className={page === "我的世界" ? "active" : ""} onClick={() => setPage("我的世界")}><span>◫</span>我的世界</button>
        <button onClick={() => { setPage("我的世界"); setShowAdd(true); }}><span>＋</span>记录</button>
        <button><span>♡</span>心愿</button>
        <button><span>○</span>我的</button>
      </nav>

      {showAdd && (
        <div className="modal-backdrop" onMouseDown={() => setShowAdd(false)}>
          <form className="modal" onSubmit={(e) => { e.preventDefault(); addItem(new FormData(e.currentTarget)); }} onMouseDown={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setShowAdd(false)}>×</button>
            <p className="date">记录生活</p><h2>添加一件新物品</h2>
            <label>物品名称<input name="name" required autoFocus placeholder={space === "衣柜" ? "例如：白色亚麻衬衫" : "例如：玻璃沙拉碗"} /></label>
            <label>分类<select name="category">{(space === "衣柜" ? ["上装", "下装", "外套", "鞋履", "配饰"] : ["餐具", "杯具", "锅具", "厨电", "食材"]).map((c) => <option key={c}>{c}</option>)}</select></label>
            <button className="save-button">保存到{space}</button>
          </form>
        </div>
      )}
      {added && <div className="toast">✓ 已经收进{space}啦</div>}
    </main>
  );
}
