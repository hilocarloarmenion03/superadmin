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

const warehouseCards = [
  ["Titles", "dim_title", "Central catalog dimension"], ["Arcs", "dim_arc", "Shared content hierarchy"],
  ["Characters", "dim_character", "Character dimension"], ["Users", "dim_user", "Central user dimension"],
  ["Sales", "fact_sales", "Manga/LN + merchandise"], ["Views", "fact_views", "Anime viewing activity"],
  ["Subscriptions", "fact_subs", "Subscription events"],
];

const merchTables = [
  ["Titles", "titles", "title_id · title_name · origin_type", "Content roots used by merchandise"],
  ["Arcs", "arcs", "arc_id · title_id · arc_name · sequence_order", "Merchandise story/content grouping"],
  ["Characters", "characters", "character_id · title_id · character_name", "Character linkage for products"],
  ["Products", "products", "product_id · character_id · arc_id · product_name · category · is_limited_edition", "Merchandise catalog"],
  ["Variants", "product_variants", "variant_id · product_id · size · color · stock_quantity · price", "Sellable stock and pricing"],
  ["Orders", "orders", "order_id · user_id · variant_id · quantity · ordered_at", "Completed/placed purchases"],
  ["Preorders", "preorders", "preorder_id · user_id · variant_id · preordered_at", "Upcoming merchandise demand"],
];

const merchCategories = ["figurine", "clothing", "poster", "other"];

export default function Home() {
  const [active, setActive] = useState("overview");
  const [merchTab, setMerchTab] = useState("catalog");
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
            {active === "overview" && <>
              <section><p className="mb-1 text-sm text-black/45">Central administration</p><h3 className="text-3xl font-semibold tracking-[-0.03em]">System overview</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-black/55">One control surface for the four connected systems and the central warehouse.</p></section>
              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {systems.map((system) => <div key={system.key} className={`system-card ${system.tone}`}>
                  <div className="flex items-start justify-between"><div className="system-mark">{system.key === "admin" ? "A" : system.key === "manga_ln" ? "M" : system.key === "anime" ? "N" : "S"}</div><span className="status-dot"><i />{system.status}</span></div>
                  <h4 className="mt-6 text-base font-semibold">{system.name}</h4><p className="mt-2 min-h-10 text-xs leading-5 text-black/50">{system.description}</p>
                  <button onClick={() => setActive(system.key === "merch" ? "merch" : system.key === "manga_ln" ? "manga" : system.key === "anime" ? "anime" : "system")} className="mt-5 text-xs font-semibold text-black/65 hover:text-black">Open system →</button>
                </div>)}
              </section>
              <section className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
                <div className="panel"><div className="panel-head"><div><p className="eyebrow">Warehouse</p><h4>Central data model</h4></div><span className="badge">8 tables</span></div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{warehouseCards.map(([label, table, detail]) => <div key={table} className="data-card"><span>{label}</span><strong>{table}</strong><p>{detail}</p></div>)}</div>
                </div>
                <div className="panel"><div className="panel-head"><div><p className="eyebrow">Health</p><h4>Connection status</h4></div></div>
                  <div className="space-y-3">{systems.map((s) => <div key={s.key} className="health-row"><span>{s.name}</span><b><i />Connected</b></div>)}</div>
                </div>
              </section>
            </>}

            {active === "merch" && <section className="space-y-5">
              <div className="merch-hero">
                <div>
                  <p className="eyebrow">Merchandise subsystem</p>
                  <h3 className="mt-1 text-3xl font-semibold tracking-[-0.03em]">Merchandise control</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-black/55">Manage the merchandise catalog, variants, inventory, orders and preorders from the verified Merchandise database model.</p>
                </div>
                <div className="merch-count"><strong>7</strong><span>database tables</span></div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div className="stat-card"><span>Catalog</span><strong>Products</strong><p>Product records and limited editions</p></div>
                <div className="stat-card"><span>Inventory</span><strong>Variants</strong><p>Size, color, stock and price</p></div>
                <div className="stat-card"><span>Sales</span><strong>Orders</strong><p>User purchases by variant</p></div>
                <div className="stat-card"><span>Demand</span><strong>Preorders</strong><p>Upcoming purchase intent</p></div>
              </div>

              <div className="panel">
                <div className="module-tabs">
                  {[
                    ["catalog", "Catalog"],
                    ["inventory", "Inventory"],
                    ["orders", "Orders"],
                    ["preorders", "Preorders"],
                    ["model", "Data model"],
                  ].map(([key, label]) => <button key={key} onClick={() => setMerchTab(key)} className={`module-tab ${merchTab === key ? "active" : ""}`}>{label}</button>)}
                </div>

                {merchTab === "catalog" && <div className="space-y-5">
                  <div className="section-heading"><div><p className="eyebrow">Product catalog</p><h4>Products & content links</h4></div><button className="primary-action">Add product</button></div>
                  <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
                    <div className="inner-card"><div className="inner-title">Product structure</div><div className="flow-row"><span>Title</span><b>→</b><span>Arc</span><b>→</b><span>Product</span></div><div className="flow-row"><span>Character</span><b>→</b><span>Product</span><b>→</b><span>Variant</span></div><p className="helper">Products can be attached to a character and/or arc, while each product owns its sellable variants.</p></div>
                    <div className="inner-card"><div className="inner-title">Allowed categories</div><div className="chip-row">{merchCategories.map((x) => <span className="chip" key={x}>{x}</span>)}</div><div className="limited-row"><span>Limited edition</span><b>products.is_limited_edition</b></div></div>
                  </div>
                  <div className="table-card"><div className="table-title"><span>Products</span><span className="schema-name">public.products</span></div>
                    <div className="schema-grid">{merchTables.slice(0, 3).map(([name, table, cols, detail]) => <div key={table} className="schema-row"><div><strong>{name}</strong><span>{detail}</span></div><code>{cols}</code></div>)}</div>
                  </div>
                </div>}

                {merchTab === "inventory" && <div className="space-y-5">
                  <div className="section-heading"><div><p className="eyebrow">Inventory</p><h4>Variant-level stock & pricing</h4></div><button className="primary-action">Add variant</button></div>
                  <div className="inventory-grid"><div className="inventory-card"><span>Stock quantity</span><strong>product_variants.stock_quantity</strong><p>Integer quantity tracked per variant.</p></div><div className="inventory-card"><span>Price</span><strong>product_variants.price</strong><p>Numeric selling price per variant.</p></div><div className="inventory-card"><span>Attributes</span><strong>size · color</strong><p>Optional variant-level attributes.</p></div></div>
                  <div className="table-card"><div className="table-title"><span>Product variants</span><span className="schema-name">public.product_variants</span></div><div className="schema-columns">{["variant_id","product_id","size","color","stock_quantity","price"].map(x => <span key={x}>{x}</span>)}</div></div>
                </div>}

                {merchTab === "orders" && <div className="space-y-5">
                  <div className="section-heading"><div><p className="eyebrow">Orders</p><h4>Merchandise purchases</h4></div><span className="badge">public.orders</span></div>
                  <div className="order-layout"><div className="order-status"><span>Order identity</span><strong>order_id</strong><p>UUIDv7 primary key</p></div><div className="order-status"><span>Customer</span><strong>user_id</strong><p>Central user reference</p></div><div className="order-status"><span>Item</span><strong>variant_id</strong><p>Purchased variant</p></div><div className="order-status"><span>Quantity</span><strong>quantity</strong><p>Units ordered</p></div></div>
                  <div className="table-card"><div className="table-title"><span>Order lifecycle</span><span className="schema-name">ordered_at defaults to now()</span></div><div className="timeline"><span>Placed</span><b>→</b><span>Variant resolved</span><b>→</b><span>Quantity recorded</span></div></div>
                </div>}

                {merchTab === "preorders" && <div className="space-y-5">
                  <div className="section-heading"><div><p className="eyebrow">Preorders</p><h4>Upcoming merchandise demand</h4></div><span className="badge">public.preorders</span></div>
                  <div className="preorder-panel"><div className="preorder-icon">P</div><div><strong>Preorders are variant-linked</strong><p>Each preorder connects a user to a product variant and records the preorder timestamp.</p></div></div>
                  <div className="table-card"><div className="table-title"><span>Preorder fields</span><span className="schema-name">UUIDv7 identifiers</span></div><div className="schema-columns">{["preorder_id","user_id","variant_id","preordered_at"].map(x => <span key={x}>{x}</span>)}</div></div>
                </div>}

                {merchTab === "model" && <div className="space-y-5">
                  <div className="section-heading"><div><p className="eyebrow">Verified schema</p><h4>Merchandise database model</h4></div><span className="badge">7 tables</span></div>
                  <div className="schema-stack">{merchTables.map(([name, table, cols, detail]) => <div key={table} className="schema-row"><div><strong>{name}</strong><span>{detail}</span></div><code>{cols}</code></div>)}</div>
                </div>}
              </div>
            </section>}

            {!["overview", "merch"].includes(active) && <section className="panel">
              <p className="eyebrow">System module</p><h3 className="mt-1 text-2xl font-semibold">{activeLabel}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-black/55">This workspace is mapped to the verified database model. The controls can now be connected directly to the corresponding Supabase tables, views and storage.</p>
              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {(active === "warehouse" ? warehouseCards : systems).map((item) => { const title = Array.isArray(item) ? item[0] : item.name; const detail = Array.isArray(item) ? item[2] : item.description; return <div className="data-card" key={title}><span>Module</span><strong>{title}</strong><p>{detail}</p></div>; })}
              </div>
            </section>}
          </div>
        </div>
      </div>
    </main>
  );
}
