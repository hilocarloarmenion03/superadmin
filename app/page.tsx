"use client";

import { useState } from "react";

type Section = { label: string; key: string };
type System = { name: string; key: string; description: string; tone: string };
type MerchTable = { name: string; table: string; columns: string; detail: string };

const sections: Section[] = [
  { label: "Overview", key: "overview" },
  { label: "Titles & Content", key: "content" },
  { label: "Manga / LN", key: "manga" },
  { label: "Anime", key: "anime" },
  { label: "Merchandise", key: "merch" },
  { label: "Warehouse", key: "warehouse" },
  { label: "Analytics", key: "analytics" },
  { label: "System", key: "system" },
];

const systems: System[] = [
  { name: "Central Admin", key: "admin", description: "Warehouse, users, analytics and system control", tone: "central" },
  { name: "Manga / LN", key: "manga_ln", description: "Titles, arcs, items, purchases and reading progress", tone: "manga" },
  { name: "Anime", key: "anime", description: "Anime titles, episodes, watches and subscriptions", tone: "anime" },
  { name: "Merchandise", key: "merch", description: "Characters, products, variants, orders and preorders", tone: "merch" },
];

const warehouseCards = [
  ["Titles", "dim_title", "Central catalog dimension"],
  ["Arcs", "dim_arc", "Shared content hierarchy"],
  ["Characters", "dim_character", "Character dimension"],
  ["Users", "dim_user", "Central user dimension"],
  ["Sales", "fact_sales", "Manga/LN + merchandise"],
  ["Views", "fact_views", "Anime viewing activity"],
  ["Subscriptions", "fact_subs", "Subscription events"],
];

const merchTables: MerchTable[] = [
  { name: "Titles", table: "titles", columns: "title_id · title_name · origin_type", detail: "Content roots used by merchandise" },
  { name: "Arcs", table: "arcs", columns: "arc_id · title_id · arc_name · sequence_order", detail: "Merchandise story/content grouping" },
  { name: "Characters", table: "characters", columns: "character_id · title_id · character_name", detail: "Character linkage for products" },
  { name: "Products", table: "products", columns: "product_id · character_id · arc_id · product_name · category · is_limited_edition", detail: "Merchandise catalog" },
  { name: "Variants", table: "product_variants", columns: "variant_id · product_id · size · color · stock_quantity · price", detail: "Sellable stock and pricing" },
  { name: "Orders", table: "orders", columns: "order_id · user_id · variant_id · quantity · ordered_at", detail: "Merchandise purchases" },
  { name: "Preorders", table: "preorders", columns: "preorder_id · user_id · variant_id · preordered_at", detail: "Upcoming merchandise demand" },
];

const merchTabs = [
  { key: "catalog", label: "Catalog" },
  { key: "inventory", label: "Inventory" },
  { key: "orders", label: "Orders" },
  { key: "preorders", label: "Preorders" },
  { key: "model", label: "Data model" },
];

export default function Home() {
  const [active, setActive] = useState("overview");
  const [merchTab, setMerchTab] = useState("catalog");
  const activeLabel = sections.find((item) => item.key === active)?.label ?? "Overview";

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#17191d]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-black/8 bg-white lg:flex lg:flex-col">
          <div className="border-b border-black/8 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">Control Center</p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight">admin</h1>
          </div>
          <nav className="flex-1 p-3">
            {sections.map((item) => (
              <button key={item.key} onClick={() => setActive(item.key)} className={`mb-1 flex w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${active === item.key ? "bg-black text-white" : "text-black/65 hover:bg-black/5 hover:text-black"}`}>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="border-t border-black/8 p-4">
            <div className="rounded-lg bg-[#f4f5f7] p-3">
              <div className="flex items-center justify-between text-xs"><span className="text-black/50">Environment</span><span className="font-medium">Production</span></div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-black/8 bg-white/90 px-4 py-4 backdrop-blur md:px-8">
            <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
              <div><p className="text-xs font-medium text-black/40 lg:hidden">admin</p><h2 className="text-lg font-semibold tracking-tight">{activeLabel}</h2></div>
              <span className="hidden rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs text-black/55 sm:block">All systems healthy</span>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] space-y-8 px-4 py-7 md:px-8">
            {active === "overview" && (
              <>
                <section>
                  <p className="mb-1 text-sm text-black/45">Central administration</p>
                  <h3 className="text-3xl font-semibold tracking-[-0.03em]">System overview</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-black/55">One control surface for the four connected systems and the central warehouse.</p>
                </section>
                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {systems.map((system) => (
                    <div key={system.key} className={`system-card ${system.tone}`}>
                      <div className="flex items-start justify-between"><div className="system-mark">{system.key === "admin" ? "A" : system.key === "manga_ln" ? "M" : system.key === "anime" ? "N" : "S"}</div><span className="status-dot"><i />Healthy</span></div>
                      <h4 className="mt-6 text-base font-semibold">{system.name}</h4>
                      <p className="mt-2 min-h-10 text-xs leading-5 text-black/50">{system.description}</p>
                      <button onClick={() => setActive(system.key === "merch" ? "merch" : system.key === "manga_ln" ? "manga" : system.key === "anime" ? "anime" : "system")} className="mt-5 text-xs font-semibold text-black/65 hover:text-black">Open system →</button>
                    </div>
                  ))}
                </section>
                <section className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
                  <div className="panel"><div className="panel-head"><div><p className="eyebrow">Warehouse</p><h4>Central data model</h4></div><span className="badge">8 tables</span></div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{warehouseCards.map(([label, table, detail]) => <div key={table} className="data-card"><span>{label}</span><strong>{table}</strong><p>{detail}</p></div>)}</div>
                  </div>
                  <div className="panel"><div className="panel-head"><div><p className="eyebrow">Health</p><h4>Connection status</h4></div></div>
                    <div className="space-y-3">{systems.map((system) => <div key={system.key} className="health-row"><span>{system.name}</span><b><i />Connected</b></div>)}</div>
                  </div>
                </section>
              </>
            )}

            {active === "merch" && (
              <section className="space-y-5">
                <div className="merch-hero">
                  <div><p className="eyebrow">Merchandise subsystem</p><h3 className="mt-1 text-3xl font-semibold tracking-[-0.03em]">Merchandise control</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-black/55">Catalog, inventory, orders and preorders mapped directly to the verified Merchandise schema.</p></div>
                  <div className="merch-count"><strong>7</strong><span>database tables</span></div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                  <div className="stat-card"><span>Catalog</span><strong>Products</strong><p>Product records and limited editions</p></div>
                  <div className="stat-card"><span>Inventory</span><strong>Variants</strong><p>Size, color, stock and price</p></div>
                  <div className="stat-card"><span>Sales</span><strong>Orders</strong><p>User purchases by variant</p></div>
                  <div className="stat-card"><span>Demand</span><strong>Preorders</strong><p>Upcoming merchandise demand</p></div>
                </div>

                <div className="panel">
                  <div className="module-tabs">
                    {merchTabs.map((tab) => <button key={tab.key} onClick={() => setMerchTab(tab.key)} className={`module-tab ${merchTab === tab.key ? "active" : ""}`}>{tab.label}</button>)}
                  </div>

                  {merchTab === "catalog" && (
                    <div className="space-y-5">
                      <div className="section-heading"><div><p className="eyebrow">Product catalog</p><h4>Products & content links</h4></div><button className="primary-action">Add product</button></div>
                      <div className="grid gap-4 lg:grid-cols-2">
                        <div className="inner-card"><div className="inner-title">Product structure</div><div className="flow-row"><span>Title</span><b>→</b><span>Arc</span><b>→</b><span>Product</span></div><div className="flow-row"><span>Character</span><b>→</b><span>Product</span><b>→</b><span>Variant</span></div><p className="helper">Products can reference a character and/or arc. Each product owns its sellable variants.</p></div>
                        <div className="inner-card"><div className="inner-title">Allowed categories</div><div className="chip-row"><span className="chip">figurine</span><span className="chip">clothing</span><span className="chip">poster</span><span className="chip">other</span></div><div className="limited-row"><span>Limited edition</span><b>products.is_limited_edition</b></div></div>
                      </div>
                      <div className="table-card"><div className="table-title"><span>Product foundation</span><span className="schema-name">public.titles · public.arcs · public.characters · public.products</span></div>
                        <div className="schema-stack">{merchTables.slice(0, 4).map((row) => <div key={row.table} className="schema-row"><div><strong>{row.name}</strong><span>{row.detail}</span></div><code>{row.columns}</code></div>)}</div>
                      </div>
                    </div>
                  )}

                  {merchTab === "inventory" && (
                    <div className="space-y-5">
                      <div className="section-heading"><div><p className="eyebrow">Inventory</p><h4>Variant-level stock & pricing</h4></div><button className="primary-action">Add variant</button></div>
                      <div className="inventory-grid"><div className="inventory-card"><span>Stock quantity</span><strong>stock_quantity</strong><p>Integer stock tracked per variant.</p></div><div className="inventory-card"><span>Price</span><strong>price</strong><p>Numeric selling price per variant.</p></div><div className="inventory-card"><span>Attributes</span><strong>size · color</strong><p>Optional variant-level attributes.</p></div></div>
                      <div className="table-card"><div className="table-title"><span>Product variants</span><span className="schema-name">public.product_variants</span></div><div className="schema-columns"><span>variant_id</span><span>product_id</span><span>size</span><span>color</span><span>stock_quantity</span><span>price</span></div></div>
                    </div>
                  )}

                  {merchTab === "orders" && (
                    <div className="space-y-5">
                      <div className="section-heading"><div><p className="eyebrow">Orders</p><h4>Merchandise purchases</h4></div><span className="badge">public.orders</span></div>
                      <div className="order-layout"><div className="order-status"><span>Order</span><strong>order_id</strong><p>UUIDv7 primary key</p></div><div className="order-status"><span>Customer</span><strong>user_id</strong><p>User reference</p></div><div className="order-status"><span>Variant</span><strong>variant_id</strong><p>Purchased variant</p></div><div className="order-status"><span>Quantity</span><strong>quantity</strong><p>Units ordered</p></div></div>
                      <div className="table-card"><div className="table-title"><span>Order fields</span><span className="schema-name">ordered_at defaults to now()</span></div><div className="schema-columns"><span>order_id</span><span>user_id</span><span>variant_id</span><span>quantity</span><span>ordered_at</span></div></div>
                    </div>
                  )}

                  {merchTab === "preorders" && (
                    <div className="space-y-5">
                      <div className="section-heading"><div><p className="eyebrow">Preorders</p><h4>Upcoming merchandise demand</h4></div><span className="badge">public.preorders</span></div>
                      <div className="preorder-panel"><div className="preorder-icon">P</div><div><strong>Variant-linked preorders</strong><p>Each preorder connects a user to a product variant and records when the preorder was made.</p></div></div>
                      <div className="table-card"><div className="table-title"><span>Preorder fields</span><span className="schema-name">UUIDv7 identifiers</span></div><div className="schema-columns"><span>preorder_id</span><span>user_id</span><span>variant_id</span><span>preordered_at</span></div></div>
                    </div>
                  )}

                  {merchTab === "model" && (
                    <div className="space-y-5">
                      <div className="section-heading"><div><p className="eyebrow">Verified schema</p><h4>Merchandise data model</h4></div><span className="badge">7 tables</span></div>
                      <div className="schema-stack">{merchTables.map((row) => <div key={row.table} className="schema-row"><div><strong>{row.name}</strong><span>{row.detail}</span></div><code>{row.columns}</code></div>)}</div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {!["overview", "merch"].includes(active) && (
              <section className="panel">
                <p className="eyebrow">System module</p><h3 className="mt-1 text-2xl font-semibold">{activeLabel}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/55">This workspace is mapped to the verified database model. The controls can be connected directly to the corresponding subsystem tables.</p>
                <div className="mt-8 grid gap-3 md:grid-cols-3">{(active === "warehouse" ? warehouseCards.map((item) => ({ title: item[0], detail: item[2] })) : systems.map((item) => ({ title: item.name, detail: item.description }))).map((item) => <div className="data-card" key={item.title}><span>Module</span><strong>{item.title}</strong><p>{item.detail}</p></div>)}</div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
