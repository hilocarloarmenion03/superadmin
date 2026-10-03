"use client";

import { useState } from "react";

export default function Home() {
  const [section, setSection] = useState("overview");
  const [tab, setTab] = useState("catalog");

  return (
    <main className="min-h-screen bg-[#f6f7f9] p-4 text-[#17191d] md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex items-center justify-between rounded-2xl border border-black/10 bg-white p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">Control Center</p>
            <h1 className="mt-1 text-2xl font-semibold">admin</h1>
          </div>
          <span className="text-xs text-black/45">Production</span>
        </header>

        <nav className="mb-6 flex gap-2 overflow-x-auto">
          <button onClick={() => setSection("overview")} className="rounded-lg bg-black px-4 py-2 text-xs font-semibold text-white">Overview</button>
          <button onClick={() => setSection("merch")} className="rounded-lg border border-black/10 bg-white px-4 py-2 text-xs font-semibold">Merchandise</button>
        </nav>

        {section === "overview" && (
          <section className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/35">Central administration</p>
              <h2 className="mt-1 text-3xl font-semibold">System overview</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-black/10 bg-white p-5"><b>Central Admin</b><p className="mt-2 text-xs text-black/50">Warehouse, users and analytics</p></div>
              <div className="rounded-2xl border border-blue-200 bg-white p-5"><b>Manga / LN</b><p className="mt-2 text-xs text-black/50">Titles, arcs and purchases</p></div>
              <div className="rounded-2xl border border-violet-200 bg-white p-5"><b>Anime</b><p className="mt-2 text-xs text-black/50">Episodes, watches and subscriptions</p></div>
              <button onClick={() => setSection("merch")} className="rounded-2xl border border-amber-200 bg-white p-5 text-left"><b>Merchandise</b><p className="mt-2 text-xs text-black/50">Products, variants, orders and preorders</p></button>
            </div>
          </section>
        )}

        {section === "merch" && (
          <section className="space-y-5">
            <div className="rounded-2xl border border-amber-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/35">Merchandise subsystem</p>
              <div className="mt-1 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div><h2 className="text-3xl font-semibold">Merchandise control</h2><p className="mt-2 text-sm text-black/50">Products, inventory, orders and preorders mapped to the verified database.</p></div>
                <div className="rounded-xl bg-amber-50 px-5 py-4"><strong className="text-3xl">7</strong><p className="text-[10px] uppercase tracking-wider text-black/40">tables</p></div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-xl border border-black/10 bg-white p-4"><span className="text-[10px] uppercase text-black/35">Catalog</span><b className="mt-2 block">Products</b><p className="mt-1 text-xs text-black/45">Definitions and categories</p></div>
              <div className="rounded-xl border border-black/10 bg-white p-4"><span className="text-[10px] uppercase text-black/35">Stock</span><b className="mt-2 block">Variants</b><p className="mt-1 text-xs text-black/45">Size, color, stock, price</p></div>
              <div className="rounded-xl border border-black/10 bg-white p-4"><span className="text-[10px] uppercase text-black/35">Sales</span><b className="mt-2 block">Orders</b><p className="mt-1 text-xs text-black/45">Purchases by variant</p></div>
              <div className="rounded-xl border border-black/10 bg-white p-4"><span className="text-[10px] uppercase text-black/35">Demand</span><b className="mt-2 block">Preorders</b><p className="mt-1 text-xs text-black/45">Upcoming demand</p></div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-5">
              <div className="mb-5 flex gap-2 overflow-x-auto border-b border-black/10 pb-3">
                <button onClick={() => setTab("catalog")} className="px-3 py-2 text-xs font-semibold">Catalog</button>
                <button onClick={() => setTab("inventory")} className="px-3 py-2 text-xs font-semibold">Inventory</button>
                <button onClick={() => setTab("orders")} className="px-3 py-2 text-xs font-semibold">Orders</button>
                <button onClick={() => setTab("preorders")} className="px-3 py-2 text-xs font-semibold">Preorders</button>
                <button onClick={() => setTab("model")} className="px-3 py-2 text-xs font-semibold">Data model</button>
              </div>

              {tab === "catalog" && <div><h3 className="text-lg font-semibold">Product catalog</h3><p className="mt-2 text-sm text-black/50">public.products links to characters and arcs and owns product variants.</p><div className="mt-5 grid gap-3 md:grid-cols-2"><div className="rounded-xl bg-[#fafafa] p-4"><b>Categories</b><p className="mt-2 text-xs text-black/50">figurine · clothing · poster · other</p></div><div className="rounded-xl bg-[#fafafa] p-4"><b>Limited edition</b><p className="mt-2 text-xs text-black/50">products.is_limited_edition</p></div></div></div>}

              {tab === "inventory" && <div><h3 className="text-lg font-semibold">Variant inventory</h3><p className="mt-2 text-sm text-black/50">public.product_variants stores size, color, stock_quantity and price for each product.</p><div className="mt-5 flex flex-wrap gap-2"><code className="rounded-lg bg-[#f6f7f9] px-3 py-2 text-xs">variant_id</code><code className="rounded-lg bg-[#f6f7f9] px-3 py-2 text-xs">product_id</code><code className="rounded-lg bg-[#f6f7f9] px-3 py-2 text-xs">size</code><code className="rounded-lg bg-[#f6f7f9] px-3 py-2 text-xs">color</code><code className="rounded-lg bg-[#f6f7f9] px-3 py-2 text-xs">stock_quantity</code><code className="rounded-lg bg-[#f6f7f9] px-3 py-2 text-xs">price</code></div></div>}

              {tab === "orders" && <div><h3 className="text-lg font-semibold">Orders</h3><p className="mt-2 text-sm text-black/50">public.orders records user purchases against a product variant.</p><div className="mt-5 grid gap-3 md:grid-cols-4"><b className="rounded-xl bg-[#fafafa] p-4">order_id</b><b className="rounded-xl bg-[#fafafa] p-4">user_id</b><b className="rounded-xl bg-[#fafafa] p-4">variant_id</b><b className="rounded-xl bg-[#fafafa] p-4">quantity</b></div></div>}

              {tab === "preorders" && <div><h3 className="text-lg font-semibold">Preorders</h3><p className="mt-2 text-sm text-black/50">public.preorders links users to product variants and records preordered_at.</p><div className="mt-5 flex flex-wrap gap-2"><code className="rounded-lg bg-[#f6f7f9] px-3 py-2 text-xs">preorder_id</code><code className="rounded-lg bg-[#f6f7f9] px-3 py-2 text-xs">user_id</code><code className="rounded-lg bg-[#f6f7f9] px-3 py-2 text-xs">variant_id</code><code className="rounded-lg bg-[#f6f7f9] px-3 py-2 text-xs">preordered_at</code></div></div>}

              {tab === "model" && <div><h3 className="text-lg font-semibold">Verified Merchandise schema</h3><div className="mt-5 space-y-2"><p className="rounded-lg bg-[#fafafa] p-3 text-xs"><b>titles</b> — title_id, title_name, origin_type</p><p className="rounded-lg bg-[#fafafa] p-3 text-xs"><b>arcs</b> — arc_id, title_id, arc_name, sequence_order</p><p className="rounded-lg bg-[#fafafa] p-3 text-xs"><b>characters</b> — character_id, title_id, character_name</p><p className="rounded-lg bg-[#fafafa] p-3 text-xs"><b>products</b> — product_id, character_id, arc_id, product_name, category, is_limited_edition</p><p className="rounded-lg bg-[#fafafa] p-3 text-xs"><b>product_variants</b> — variant_id, product_id, size, color, stock_quantity, price</p><p className="rounded-lg bg-[#fafafa] p-3 text-xs"><b>orders</b> — order_id, user_id, variant_id, quantity, ordered_at</p><p className="rounded-lg bg-[#fafafa] p-3 text-xs"><b>preorders</b> — preorder_id, user_id, variant_id, preordered_at</p></div></div>}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
