"use client";

import { useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  character: string;
  arc: string;
  limited: boolean;
  stock: number;
  price: number;
};

const products: Product[] = [];

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

const schema = [
  ["titles", "Content roots", "title_id, title_name, origin_type, created_at"],
  ["arcs", "Story/content grouping", "arc_id, title_id, arc_name, sequence_order"],
  ["characters", "Character catalog", "character_id, title_id, character_name"],
  ["products", "Merchandise catalog", "product_id, character_id, arc_id, product_name, category, is_limited_edition"],
  ["product_variants", "Sellable variants", "variant_id, product_id, size, color, stock_quantity, price"],
  ["orders", "Customer purchases", "order_id, user_id, variant_id, quantity, ordered_at"],
  ["preorders", "Upcoming demand", "preorder_id, user_id, variant_id, preordered_at"],
] as const;

export default function Home() {
  const [active, setActive] = useState("overview");
  const [merchView, setMerchView] = useState("catalog");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);
  const [drafts, setDrafts] = useState<Product[]>(products);

  const filtered = drafts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.character.toLowerCase().includes(search.toLowerCase())
  );

  function saveProduct(product: Product) {
    setDrafts((current) => current.some((p) => p.id === product.id)
      ? current.map((p) => p.id === product.id ? product : p)
      : [...current, product]);
    setAdding(false);
    setEditing(null);
  }

  function deleteProduct() {
    if (!deleting) return;
    setDrafts((current) => current.filter((p) => p.id !== deleting.id));
    setDeleting(null);
  }

  const activeLabel = nav.find((item) => item[1] === active)?.[0] ?? "Overview";

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#17191d]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-black/10 bg-white lg:flex lg:flex-col">
          <div className="border-b border-black/10 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">Control Center</p>
            <h1 className="mt-1 text-xl font-semibold">admin</h1>
          </div>
          <nav className="flex-1 p-3">
            {nav.map(([label, key]) => (
              <button key={key} onClick={() => setActive(key)} className={`mb-1 w-full rounded-lg px-3 py-2.5 text-left text-sm ${active === key ? "bg-black text-white" : "text-black/60 hover:bg-black/5"}`}>
                {label}
              </button>
            ))}
          </nav>
          <div className="border-t border-black/10 p-4 text-xs text-black/45">Production · Admin</div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-black/10 bg-white/90 px-4 py-4 backdrop-blur md:px-8">
            <div className="mx-auto flex max-w-[1500px] items-center justify-between">
              <div><p className="text-xs text-black/40 lg:hidden">admin</p><h2 className="text-lg font-semibold">{activeLabel}</h2></div>
              <span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:block">Systems connected</span>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] space-y-6 px-4 py-7 md:px-8">
            {active === "overview" && (
              <>
                <section>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/35">Central administration</p>
                  <h3 className="mt-1 text-3xl font-semibold tracking-tight">System overview</h3>
                  <p className="mt-2 text-sm text-black/50">Administration surface for the connected Manga/LN, Anime and Merchandise departments.</p>
                </section>
                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["Central Admin", "admin", "Warehouse, users and analytics"],
                    ["Manga / LN", "manga", "Titles, arcs and purchases"],
                    ["Anime", "anime", "Episodes, watches and subscriptions"],
                    ["Merchandise", "merch", "Catalog, inventory, orders and preorders"],
                  ].map(([name, key, description]) => (
                    <button key={key} onClick={() => setActive(key)} className="rounded-2xl border border-black/10 bg-white p-5 text-left shadow-sm hover:border-black/20">
                      <span className="text-xs font-semibold text-black/40">SYSTEM</span>
                      <h4 className="mt-5 font-semibold">{name}</h4>
                      <p className="mt-2 text-xs leading-5 text-black/50">{description}</p>
                      <span className="mt-5 block text-xs font-semibold">Open →</span>
                    </button>
                  ))}
                </section>
              </>
            )}

            {active === "merch" && (
              <section className="space-y-5">
                <div className="rounded-2xl border border-amber-200 bg-white p-6">
                  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700/60">Padreganda Merchandise Department</p>
                      <h3 className="mt-1 text-3xl font-semibold tracking-tight">Merchandise Catalog</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-black/50">
                        Admin catalog management based on the Merchandise department specification: view, add, edit and delete merchandise.
                      </p>
                    </div>
                    <button onClick={() => setAdding(true)} className="rounded-lg bg-black px-4 py-2.5 text-xs font-semibold text-white hover:bg-black/80">+ Add Merchandise</button>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-4">
                  {[
                    ["Catalog", "Products", "Create, edit and delete"],
                    ["Inventory", "Variants", "Stock, size, color, price"],
                    ["Orders", "Purchases", "User + variant + quantity"],
                    ["Preorders", "Demand", "Upcoming variant demand"],
                  ].map(([label, value, detail]) => (
                    <div key={label} className="rounded-xl border border-black/10 bg-white p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">{label}</p>
                      <strong className="mt-2 block">{value}</strong>
                      <p className="mt-1 text-xs text-black/45">{detail}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-black/10 bg-white">
                  <div className="flex flex-col gap-3 border-b border-black/10 p-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex gap-2 overflow-x-auto">
                      {[
                        ["catalog", "Catalog"],
                        ["inventory", "Inventory"],
                        ["orders", "Orders"],
                        ["preorders", "Preorders"],
                        ["schema", "Schema"],
                      ].map(([key, label]) => (
                        <button key={key} onClick={() => setMerchView(key)} className={`rounded-lg px-3 py-2 text-xs font-semibold ${merchView === key ? "bg-black text-white" : "bg-black/5 text-black/55"}`}>{label}</button>
                      ))}
                    </div>
                    {merchView === "catalog" && (
                      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter merchandise..." className="w-full rounded-lg border border-black/10 px-3 py-2 text-xs outline-none focus:border-black/30 md:w-64" />
                    )}
                  </div>

                  {merchView === "catalog" && (
                    <div>
                      <div className="grid grid-cols-[1fr_100px_120px_100px] gap-3 border-b border-black/10 px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-black/35">
                        <span>Merchandise</span><span>Category</span><span>Character / Arc</span><span className="text-right">Actions</span>
                      </div>
                      {filtered.length === 0 ? (
                        <div className="px-5 py-14 text-center">
                          <p className="text-sm font-semibold">{drafts.length === 0 ? "No merchandise yet" : "No matching merchandise"}</p>
                          <p className="mt-1 text-xs text-black/45">{drafts.length === 0 ? "The database currently has no product rows. Add the first merchandise item to begin the catalog." : "Try a different filter."}</p>
                          {drafts.length === 0 && <button onClick={() => setAdding(true)} className="mt-4 rounded-lg bg-black px-4 py-2 text-xs font-semibold text-white">Add Merchandise</button>}
                        </div>
                      ) : filtered.map((product) => (
                        <div key={product.id} className="grid grid-cols-[1fr_100px_120px_100px] items-center gap-3 border-b border-black/8 px-4 py-4 last:border-0">
                          <div><p className="text-sm font-semibold">{product.name}</p><p className="mt-1 text-[10px] text-black/40">{product.limited ? "Limited edition" : "Standard"}</p></div>
                          <span className="text-xs capitalize">{product.category}</span>
                          <span className="text-xs text-black/50">{product.character || "—"} / {product.arc || "—"}</span>
                          <div className="flex justify-end gap-1"><button onClick={() => setEditing(product)} className="rounded-md px-2 py-1.5 text-[10px] font-semibold hover:bg-black/5">Edit</button><button onClick={() => setDeleting(product)} className="rounded-md px-2 py-1.5 text-[10px] font-semibold text-red-600 hover:bg-red-50">Delete</button></div>
                        </div>
                      ))}
                    </div>
                  )}

                  {merchView === "inventory" && (
                    <div className="p-5">
                      <h4 className="text-lg font-semibold">Variant inventory</h4>
                      <p className="mt-1 text-sm text-black/50">Inventory belongs to <code>product_variants</code> and is tracked by product, size, color, stock and price.</p>
                      <div className="mt-5 grid gap-3 md:grid-cols-4">{["variant_id", "product_id", "size", "color", "stock_quantity", "price"].map((x) => <code key={x} className="rounded-lg bg-[#f6f7f9] p-3 text-xs">{x}</code>)}</div>
                    </div>
                  )}

                  {merchView === "orders" && (
                    <div className="p-5">
                      <h4 className="text-lg font-semibold">Order catalog</h4>
                      <p className="mt-1 text-sm text-black/50">The department records purchases against product variants.</p>
                      <div className="mt-5 grid gap-3 md:grid-cols-4">{["order_id", "user_id", "variant_id", "quantity", "ordered_at"].map((x) => <code key={x} className="rounded-lg bg-[#f6f7f9] p-3 text-xs">{x}</code>)}</div>
                    </div>
                  )}

                  {merchView === "preorders" && (
                    <div className="p-5">
                      <h4 className="text-lg font-semibold">Preorder catalog</h4>
                      <p className="mt-1 text-sm text-black/50">Upcoming demand is linked to users and product variants.</p>
                      <div className="mt-5 grid gap-3 md:grid-cols-4">{["preorder_id", "user_id", "variant_id", "preordered_at"].map((x) => <code key={x} className="rounded-lg bg-[#f6f7f9] p-3 text-xs">{x}</code>)}</div>
                    </div>
                  )}

                  {merchView === "schema" && (
                    <div className="divide-y divide-black/8">
                      {schema.map(([table, label, columns]) => (
                        <div key={table} className="flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between">
                          <div><strong className="text-sm">{label}</strong><p className="mt-1 font-mono text-[10px] text-black/40">public.{table}</p></div>
                          <code className="rounded-lg bg-[#f6f7f9] px-3 py-2 text-[10px]">{columns}</code>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {!["overview", "merch"].includes(active) && (
              <section className="rounded-2xl border border-black/10 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/35">System module</p>
                <h3 className="mt-1 text-2xl font-semibold">{activeLabel}</h3>
                <p className="mt-2 text-sm text-black/50">Schema-aware administration workspace.</p>
              </section>
            )}
          </div>
        </div>
      </div>

      {(adding || editing) && (
        <ProductForm
          product={editing}
          onCancel={() => { setAdding(false); setEditing(null); }}
          onSave={saveProduct}
        />
      )}

      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-600">Delete Merchandise</p>
            <h3 className="mt-2 text-xl font-semibold">Delete {deleting.name}?</h3>
            <p className="mt-2 text-sm text-black/50">This is the confirmation step specified by the Merchandise department. The live database mutation is not executed by this frontend shell yet.</p>
            <div className="mt-6 flex justify-end gap-2"><button onClick={() => setDeleting(null)} className="rounded-lg border border-black/10 px-4 py-2 text-xs font-semibold">Cancel</button><button onClick={deleteProduct} className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white">Confirm Delete</button></div>
          </div>
        </div>
      )}
    </main>
  );
}

function ProductForm({ product, onCancel, onSave }: { product: Product | null; onCancel: () => void; onSave: (product: Product) => void }) {
  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState(product?.category ?? "other");
  const [character, setCharacter] = useState(product?.character ?? "");
  const [arc, setArc] = useState(product?.arc ?? "");
  const [limited, setLimited] = useState(product?.limited ?? false);
  const [stock, setStock] = useState(String(product?.stock ?? 0));
  const [price, setPrice] = useState(String(product?.price ?? 0));

  function submit() {
    onSave({
      id: product?.id ?? crypto.randomUUID(),
      name,
      category,
      character,
      arc,
      limited,
      stock: Number(stock) || 0,
      price: Number(price) || 0,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
      <div className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-black/35">{product ? "Edit Merchandise Catalog" : "Add Merchandise"}</p>
        <h3 className="mt-1 text-2xl font-semibold">{product ? "Edit merchandise" : "Add new merchandise"}</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="text-xs font-semibold">Product name<input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-lg border border-black/10 p-3 text-sm font-normal outline-none" placeholder="Product name" /></label>
          <label className="text-xs font-semibold">Category<select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2 w-full rounded-lg border border-black/10 p-3 text-sm font-normal"><option value="figurine">Figurine</option><option value="clothing">Clothing</option><option value="poster">Poster</option><option value="other">Other</option></select></label>
          <label className="text-xs font-semibold">Character ID / reference<input value={character} onChange={(e) => setCharacter(e.target.value)} className="mt-2 w-full rounded-lg border border-black/10 p-3 text-sm font-normal" /></label>
          <label className="text-xs font-semibold">Arc ID / reference<input value={arc} onChange={(e) => setArc(e.target.value)} className="mt-2 w-full rounded-lg border border-black/10 p-3 text-sm font-normal" /></label>
          <label className="text-xs font-semibold">Stock quantity<input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="mt-2 w-full rounded-lg border border-black/10 p-3 text-sm font-normal" /></label>
          <label className="text-xs font-semibold">Price<input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-2 w-full rounded-lg border border-black/10 p-3 text-sm font-normal" /></label>
        </div>
        <label className="mt-4 flex items-center gap-2 text-xs font-semibold"><input type="checkbox" checked={limited} onChange={(e) => setLimited(e.target.checked)} /> Limited edition</label>
        <div className="mt-6 flex justify-end gap-2"><button onClick={onCancel} className="rounded-lg border border-black/10 px-4 py-2 text-xs font-semibold">Cancel</button><button onClick={submit} disabled={!name.trim()} className="rounded-lg bg-black px-4 py-2 text-xs font-semibold text-white disabled:opacity-40">{product ? "Save Changes" : "Add Merchandise"}</button></div>
      </div>
    </div>
  );
}
