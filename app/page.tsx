"use client";

import { useState } from "react";

const nav = [
  ["Overview", "overview"],
  ["Titles & Content", "content"],
  ["Manga / LN", "manga"],
  ["Anime", "anime"],
  ["Merchandise", "merch"],
  ["Warehouse", "warehouse"],
  ["Analytics", "analytics"],
  ["System", "system"],
] as const;

const merchTables = [
  ["titles", "Titles", "title_id, title_name, origin_type"],
  ["arcs", "Arcs", "arc_id, title_id, arc_name, sequence_order"],
  ["characters", "Characters", "character_id, title_id, character_name"],
  ["products", "Products", "product_id, character_id, arc_id, product_name, category, is_limited_edition"],
  ["product_variants", "Variants", "variant_id, product_id, size, color, stock_quantity, price"],
  ["orders", "Orders", "order_id, user_id, variant_id, quantity, ordered_at"],
  ["preorders", "Preorders", "preorder_id, user_id, variant_id, preordered_at"],
] as const;

export default function Home() {
  const [active, setActive] = useState("overview");
  const [tab, setTab] = useState("catalog");

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#17191d]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-black/8 bg-white lg:flex lg:flex-col">
          <div className="border-b border-black/8 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">Control Center</p>
            <h1 className="mt-1 text-xl font-semibold">admin</h1>
          </div>
          <nav className="flex-1 p-3">
            {nav.map(([label, key]) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`mb-1 w-full rounded-lg px-3 py-2.5 text-left text-sm ${active === key ? "bg-black text-white" : "text-black/60 hover:bg-black/5"}`}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="border-t border-black/8 p-4 text-xs text-black/45">Production</div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-black/8 bg-white/90 px-4 py-4 backdrop-blur md:px-8">
            <div className="mx-auto max-w-[1500px]">
              <p className="text-xs text-black/40 lg:hidden">admin</p>
              <h2 className="text-lg font-semibold">{nav.find((item) => item[1] === active)?.[0]}</h2>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] space-y-6 px-4 py-7 md:px-8">
            {active === "overview" && (
              <>
                <section>
                  <p className="eyebrow">Central administration</p>
                  <h3 className="mt-1 text-3xl font-semibold tracking-[-0.03em]">System overview</h3>
                  <p className="mt-2 text-sm text-black/50">Four connected systems with one central warehouse.</p>
                </section>
                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["Central Admin", "admin", "Warehouse, users and analytics"],
                    ["Manga / LN", "manga", "Titles, arcs and purchases"],
                    ["Anime", "anime", "Episodes, watches and subscriptions"],
                    ["Merchandise", "merch", "Products, variants, orders and preorders"],
                  ].map(([name, key, description]) => (
                    <button key={key} onClick={() => setActive(key)} className="system-card text-left">
                      <span className="status-dot"><i />Connected</span>
                      <h4 className="mt-5 font-semibold">{name}</h4>
                      <p className="mt-2 text-xs leading-5 text-black/50">{description}</p>
                      <span className="mt-5 block text-xs font-semibold">Open system →</span>
                    </button>
                  ))}
                </section>
              </>
            )}

            {active === "merch" && (
              <>
                <section className="merch-hero">
                  <div>
                    <p className="eyebrow">Merchandise subsystem</p>
                    <h3 className="mt-1 text-3xl font-semibold tracking-[-0.03em]">Merchandise control</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-black/50">
                      Frontend mapped to the verified Merchandise Supabase schema.
                    </p>
                  </div>
                  <div className="merch-count"><strong>7</strong><span>tables</span></div>
                </section>

                <section className="grid gap-4 md:grid-cols-4">
                  <div className="stat-card"><span>Catalog</span><strong>Products</strong><p>Product definitions and categories</p></div>
                  <div className="stat-card"><span>Stock</span><strong>Variants</strong><p>Size, color, stock and price</p></div>
                  <div className="stat-card"><span>Sales</span><strong>Orders</strong><p>User purchases by variant</p></div>
                  <div className="stat-card"><span>Demand</span><strong>Preorders</strong><p>Variant-linked preorders</p></div>
                </section>

                <section className="panel">
                  <div className="module-tabs">
                    {[
                      ["catalog", "Catalog"],
                      ["inventory", "Inventory"],
                      ["orders", "Orders"],
                      ["preorders", "Preorders"],
                      ["model", "Data model"],
                    ].map(([key, label]) => (
                      <button key={key} onClick={() => setTab(key)} className={`module-tab ${tab === key ? "active" : ""}`}>{label}</button>
                    ))}
                  </div>

                  {tab === "catalog" && (
                    <div className="space-y-5">
                      <div className="section-heading">
                        <div><p className="eyebrow">Catalog</p><h4>Products & content</h4></div>
                        <button className="primary-action">Add product</button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="inner-card">
                          <div className="inner-title">Product categories</div>
                          <div className="chip-row"><span className="chip">figurine</span><span className="chip">clothing</span><span className="chip">poster</span><span className="chip">other</span></div>
                        </div>
                        <div className="inner-card">
                          <div className="inner-title">Relationships</div>
                          <p className="helper">Products can link to characters and arcs. Product variants hold the actual sellable stock and price.</p>
                        </div>
                      </div>
                      <div className="table-card">
                        <div className="table-title"><span>Catalog tables</span><span className="schema-name">public</span></div>
                        {merchTables.slice(0, 4).map(([table, label, columns]) => (
                          <div className="schema-row" key={table}><div><strong>{label}</strong><span>{table}</span></div><code>{columns}</code></div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === "inventory" && (
                    <div className="space-y-5">
                      <div className="section-heading"><div><p className="eyebrow">Inventory</p><h4>Variant stock & pricing</h4></div><button className="primary-action">Add variant</button></div>
                      <div className="inventory-grid">
                        <div className="inventory-card"><span>Stock</span><strong>stock_quantity</strong><p>Integer quantity per variant.</p></div>
                        <div className="inventory-card"><span>Price</span><strong>price</strong><p>Numeric selling price.</p></div>
                        <div className="inventory-card"><span>Attributes</span><strong>size · color</strong><p>Optional variant attributes.</p></div>
                      </div>
                      <div className="table-card"><div className="table-title"><span>product_variants</span><span className="schema-name">public.product_variants</span></div><div className="schema-columns"><span>variant_id</span><span>product_id</span><span>size</span><span>color</span><span>stock_quantity</span><span>price</span></div></div>
                    </div>
                  )}

                  {tab === "orders" && (
                    <div className="space-y-5">
                      <div className="section-heading"><div><p className="eyebrow">Orders</p><h4>Merchandise purchases</h4></div><span className="badge">public.orders</span></div>
                      <div className="order-layout">
                        <div className="order-status"><span>Order</span><strong>order_id</strong><p>UUIDv7 primary key</p></div>
                        <div className="order-status"><span>Customer</span><strong>user_id</strong><p>User reference</p></div>
                        <div className="order-status"><span>Variant</span><strong>variant_id</strong><p>Purchased variant</p></div>
                        <div className="order-status"><span>Quantity</span><strong>quantity</strong><p>Units ordered</p></div>
                      </div>
                    </div>
                  )}

                  {tab === "preorders" && (
                    <div className="space-y-5">
                      <div className="section-heading"><div><p className="eyebrow">Preorders</p><h4>Upcoming merchandise demand</h4></div><span className="badge">public.preorders</span></div>
                      <div className="preorder-panel"><div className="preorder-icon">P</div><div><strong>Variant-linked preorders</strong><p>Each preorder references a user and product variant with a timestamp.</p></div></div>
                      <div className="schema-columns"><span>preorder_id</span><span>user_id</span><span>variant_id</span><span>preordered_at</span></div>
                    </div>
                  )}

                  {tab === "model" && (
                    <div className="space-y-5">
                      <div className="section-heading"><div><p className="eyebrow">Verified schema</p><h4>Merchandise data model</h4></div><span className="badge">7 tables</span></div>
                      <div className="schema-stack">
                        {merchTables.map(([table, label, columns]) => (
                          <div className="schema-row" key={table}><div><strong>{label}</strong><span>public.{table}</span></div><code>{columns}</code></div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              </>
            )}

            {!["overview", "merch"].includes(active) && (
              <section className="panel">
                <p className="eyebrow">System module</p>
                <h3 className="mt-1 text-2xl font-semibold">{nav.find((item) => item[1] === active)?.[0]}</h3>
                <p className="mt-2 text-sm text-black/50">Schema-aware administration workspace.</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
