"use client";

import { useState } from "react";

const systems = [
  { name: "Central Admin", key: "admin", description: "Warehouse, users, analytics and system control", status: "Healthy", tone: "central" },
  { name: "Manga / LN", key: "manga_ln", description: "Titles, arcs, items, purchases and reading progress", status: "Healthy", tone: "manga" },
  { name: "Anime", key: "anime", description: "Anime titles, episodes, watches and subscriptions", status: "Healthy", tone: "anime" },
  { name: "Merchandise", key: "merch", description: "Characters, products, variants, orders and preorders", status: "Healthy", tone: "merch" },
];

const sections = [
  ["Overview", "overview"], ["Titles & Content", "content"], ["Manga / LN", "manga"],
  ["Anime", "anime"], ["Merchandise", "merch"], ["Warehouse", "warehouse"],
  ["Analytics", "analytics"], ["System", "system"],
];

const cards = [
  ["Titles", "dim_title", "Central catalog dimension"], ["Arcs", "dim_arc", "Shared content hierarchy"],
  ["Characters", "dim_character", "Character dimension"], ["Users", "dim_user", "Central user dimension"],
  ["Sales", "fact_sales", "Manga/LN + merchandise"], ["Views", "fact_views", "Anime viewing activity"],
  ["Subscriptions", "fact_subs", "Subscription events"],
];

export default function Home() {
  const [active, setActive] = useState("overview");
  const activeLabel = sections.find((x) => x[1] === active)?.[0];

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#17191d]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-black/8 bg-white lg:flex lg:flex-col">
          <div className="border-b border-black/8 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">Control Center</p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight">admin</h1>
          </div>
          <nav className="flex-1 p-3">
            {sections.map(([label, key]) => (
              <button key={key} onClick={() => setActive(key)}
                className={`mb-1 flex w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${active === key ? "bg-black text-white" : "text-black/65 hover:bg-black/5 hover:text-black"}`}>
                {label}
              </button>
            ))}
          </nav>
          <div className="border-t border-black/8 p-4"><div className="rounded-lg bg-[#f4f5f7] p-3">
            <div className="flex items-center justify-between text-xs"><span className="text-black/50">Environment</span><span className="font-medium">Production</span></div>
          </div></div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-black/8 bg-white/90 px-4 py-4 backdrop-blur md:px-8">
            <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
              <div><p className="text-xs font-medium text-black/40 lg:hidden">admin</p><h2 className="text-lg font-semibold tracking-tight">{activeLabel}</h2></div>
              <div className="flex items-center gap-2"><div className="hidden rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs text-black/55 sm:block">All systems healthy</div><button className="rounded-lg border border-black/10 px-3 py-1.5 text-xs font-medium hover:bg-black/5">Admin</button></div>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] space-y-8 px-4 py-7 md:px-8">
            {active === "overview" ? <>
              <section><p className="mb-1 text-sm text-black/45">Central administration</p><h3 className="text-3xl font-semibold tracking-[-0.03em]">System overview</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-black/55">One control surface for the four connected systems and the central warehouse.</p></section>
              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {systems.map((system) => <div key={system.key} className={`system-card ${system.tone}`}>
                  <div className="flex items-start justify-between"><div className="system-mark">{system.key === "admin" ? "A" : system.key === "manga_ln" ? "M" : system.key === "anime" ? "N" : "S"}</div><span className="status-dot"><i />{system.status}</span></div>
                  <h4 className="mt-6 text-base font-semibold">{system.name}</h4><p className="mt-2 min-h-10 text-xs leading-5 text-black/50">{system.description}</p><button className="mt-5 text-xs font-semibold text-black/65 hover:text-black">Open system →</button>
                </div>)}
              </section>
              <section className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
                <div className="panel"><div className="panel-head"><div><p className="eyebrow">Warehouse</p><h4>Central data model</h4></div><span className="badge">8 tables</span></div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{cards.map(([label, table, detail]) => <div key={table} className="data-card"><span>{label}</span><strong>{table}</strong><p>{detail}</p></div>)}</div>
                </div>
                <div className="panel"><div className="panel-head"><div><p className="eyebrow">Health</p><h4>Connection status</h4></div></div>
                  <div className="space-y-3">{systems.map((s) => <div key={s.key} className="health-row"><span>{s.name}</span><b><i />Connected</b></div>)}</div>
                </div>
              </section>
            </> : <section className="panel">
              <p className="eyebrow">System module</p><h3 className="mt-1 text-2xl font-semibold">{activeLabel}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-black/55">This workspace is mapped to the verified database model. The controls can now be connected directly to the corresponding Supabase tables, views and storage.</p>
              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {(active === "warehouse" ? cards : systems).map((item) => { const title = Array.isArray(item) ? item[0] : item.name; const detail = Array.isArray(item) ? item[2] : item.description; return <div className="data-card" key={title}><span>Module</span><strong>{title}</strong><p>{detail}</p></div>; })}
              </div>
            </section>}
          </div>
        </div>
      </div>
    </main>
  );
}
