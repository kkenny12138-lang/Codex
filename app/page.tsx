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
  { id: 7, name: "焦糖短外套", space: "衣柜", category: "外套", color: "焦糖色", note: "初秋常穿", icon: "🧥" },
  { id: 8, name: "奶油色乐福鞋", space: "衣柜", category: "鞋履", color: "奶油色", note: "轻松通勤", icon: "👞" },
  { id: 5, name: "白瓷马克杯", space: "厨房", category: "杯具", color: "奶白色", note: "每天早餐", icon: "☕" },
  { id: 6, name: "铸铁煎锅", space: "厨房", category: "锅具", color: "黑色", note: "适合煎牛排", icon: "🍳" },
];

const spaces = [
  { name: "衣柜" as Space, icon: "🧥", subtitle: "衣物、鞋包与配饰", tone: "peach" },
  { name: "厨房" as Space, icon: "🍽️", subtitle: "餐具、厨具与食材", tone: "sage" },
];

export default function Home() {
  const [page, setPage] = useState<"首页" | "我的世界" | "形象穿搭">("首页");
  const [space, setSpace] = useState<Space>("衣柜");
  const [items, setItems] = useState<Item[]>(seedItems);
  const [query, setQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [added, setAdded] = useState(false);
  const [lookSaved, setLookSaved] = useState(false);
  const [face, setFace] = useState("柔和");
  const [skin, setSkin] = useState("#e9b994");
  const [hair, setHair] = useState("短发");
  const [body, setBody] = useState(2);
  const [outfit, setOutfit] = useState<Record<string, number>>({ 上装: 1, 下装: 4, 鞋履: 8 });

  useEffect(() => {
    const saved = localStorage.getItem("my-closet-items");
    if (saved) setItems(JSON.parse(saved));
    const savedAvatar = localStorage.getItem("my-closet-avatar");
    if (savedAvatar) {
      const avatar = JSON.parse(savedAvatar);
      setFace(avatar.face || "柔和");
      setSkin(avatar.skin || "#e9b994");
      setHair(avatar.hair || "短发");
      setBody(avatar.body || 2);
      setOutfit(avatar.outfit || { 上装: 1, 下装: 4, 鞋履: 8 });
    }
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

  function saveLook() {
    localStorage.setItem("my-closet-avatar", JSON.stringify({ face, skin, hair, body, outfit }));
    setLookSaved(true);
    window.setTimeout(() => setLookSaved(false), 2400);
  }

  const selectedByCategory = (category: string) => items.find((item) => item.id === outfit[category]);

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
      ) : page === "我的世界" ? (
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
      ) : (
        <div className="page studio-page">
          <nav className="crumb"><button onClick={() => setPage("首页")}>首页</button><span>/</span><b>形象穿搭</b></nav>
          <section className="studio-head">
            <div><p className="date">MY AVATAR</p><h1>捏出一个，<em>像你的你。</em></h1><p>创建专属形象，再把衣柜里的真实衣服穿到身上。</p></div>
            <button className="save-look" onClick={saveLook}>保存我的形象</button>
          </section>

          <section className="studio-layout">
            <div className="avatar-stage">
              <div className="stage-label"><span>今日穿搭</span><small>LOOK 01</small></div>
              <div className={`person body-${body}`}>
                <div className={`hair hair-${hair}`} />
                <div className={`person-head face-${face}`} style={{ background: skin }}>
                  <span className="eyes">•　•</span><span className="mouth">{face === "元气" ? "⌣" : face === "清冷" ? "—" : "◡"}</span>
                </div>
                <div className="neck" style={{ background: skin }} />
                <div className="person-body">
                  <div className="arms" style={{ background: skin }} />
                  <div className="top-piece">{selectedByCategory("上装")?.icon || "👕"}</div>
                  {selectedByCategory("外套") && <div className="coat-piece">{selectedByCategory("外套")?.icon}</div>}
                  <div className="bottom-piece">{selectedByCategory("下装")?.icon || "👖"}</div>
                  <div className="legs" style={{ background: skin }} />
                  <div className="shoes-piece">{selectedByCategory("鞋履")?.icon || "👟"}</div>
                  {selectedByCategory("配饰") && <div className="accessory-piece">{selectedByCategory("配饰")?.icon}</div>}
                </div>
              </div>
              <p className="look-caption">{[selectedByCategory("上装"), selectedByCategory("下装"), selectedByCategory("鞋履")].filter(Boolean).map((i) => i?.name).join(" · ")}</p>
            </div>

            <div className="custom-panel">
              <div className="editor-block">
                <div className="editor-title"><span>01</span><h2>脸与发型</h2></div>
                <label className="option-label">脸部气质</label>
                <div className="choice-row">{["柔和", "元气", "清冷"].map((v) => <button className={face === v ? "active" : ""} onClick={() => setFace(v)} key={v}>{v}</button>)}</div>
                <label className="option-label">肤色</label>
                <div className="swatches">{["#f3ceb0", "#e9b994", "#c98d68", "#8d5a40"].map((v) => <button key={v} aria-label={`选择肤色${v}`} className={skin === v ? "active" : ""} style={{ background: v }} onClick={() => setSkin(v)} />)}</div>
                <label className="option-label">发型</label>
                <div className="choice-row">{["短发", "长发", "丸子"].map((v) => <button className={hair === v ? "active" : ""} onClick={() => setHair(v)} key={v}>{v}</button>)}</div>
              </div>

              <div className="editor-block">
                <div className="editor-title"><span>02</span><h2>身材比例</h2></div>
                <label className="option-label" htmlFor="body-range">体型轮廓 <b>{["轻盈", "匀称", "柔和"][body - 1]}</b></label>
                <input id="body-range" className="body-range" type="range" min="1" max="3" value={body} onChange={(e) => setBody(Number(e.target.value))} />
                <div className="range-labels"><span>轻盈</span><span>匀称</span><span>柔和</span></div>
              </div>

              <div className="editor-block wardrobe-editor">
                <div className="editor-title"><span>03</span><h2>从衣柜选穿搭</h2></div>
                {["上装", "下装", "外套", "鞋履", "配饰"].map((category) => {
                  const choices = items.filter((item) => item.space === "衣柜" && item.category === category);
                  if (!choices.length) return null;
                  return <div className="outfit-row" key={category}><label>{category}</label><div>{choices.map((item) => <button key={item.id} title={item.name} className={outfit[category] === item.id ? "active" : ""} onClick={() => setOutfit((current) => ({ ...current, [category]: current[category] === item.id && ["外套", "配饰"].includes(category) ? 0 : item.id }))}><span>{item.icon}</span><small>{item.name}</small></button>)}</div></div>;
                })}
              </div>
            </div>
          </section>
        </div>
      )}

      <nav className="bottom-nav" aria-label="主导航">
        <button className={page === "首页" ? "active" : ""} onClick={() => setPage("首页")}><span>⌂</span>首页</button>
        <button className={page === "我的世界" ? "active" : ""} onClick={() => setPage("我的世界")}><span>◫</span>我的世界</button>
        <button onClick={() => { setPage("我的世界"); setShowAdd(true); }}><span>＋</span>记录</button>
        <button className={page === "形象穿搭" ? "active" : ""} onClick={() => setPage("形象穿搭")}><span>♙</span>穿搭</button>
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
      {lookSaved && <div className="toast">✓ 形象和穿搭已保存</div>}
    </main>
  );
}
