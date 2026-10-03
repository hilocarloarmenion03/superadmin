import { Activity, ArrowRight, BarChart3, CheckCircle2, CircleAlert, LineChart, Sparkles, Table2 } from "lucide-react";

export default function Home() {
  const organizations = [
    ["Manga & Light Novel", "Source content", "monthly_revenue · top_chapters", "Sales, purchases, subscriptions", "blue"],
    ["Anime", "Adaptation", "completion_rate · new_subs_by_month", "Completion, viewership, subscriber growth", "violet"],
    ["Merchandise", "Physical goods", "sales_by_character · sellout_speed", "Character sales, revenue, sellout speed, preorders", "amber"]
  ];

  return (
    <main className="min-h-screen bg-[#f4f5f7] text-[#17191d]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[270px] shrink-0 flex-col bg-[#101114] text-white lg:flex">
          <div className="border-b border-white/10 p-6">
            <p className="text-[9px] uppercase tracking-[.2em] text-white/35">Loxada Entertainments</p>
            <h1 className="mt-1 text-xl font-semibold">ADMIN / BI</h1>
            <p className="mt-4 text-xs leading-5 text-white/45">Executive control layer for Manga & Light Novel, Anime and Merchandise.</p>
          </div>
          <nav className="flex-1 p-3">
            {["Overview","Business Intelligence","Warehouse","Organizations","Analytics","System"].map((x) => (
              <a href={"#" + x.toLowerCase().replace(/ /g,"-")} key={x} className="mb-1 block rounded-xl px-3 py-2.5 text-xs text-white/55 hover:bg-white/10 hover:text-white">{x}</a>
            ))}
          </nav>
          <div className="border-t border-white/10 p-4 text-[10px] text-white/40">● Production · Central BI</div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-black/10 bg-white/90 px-4 py-4 backdrop-blur md:px-7">
            <div className="mx-auto flex max-w-[1600px] items-center justify-between">
              <div><p className="text-[9px] uppercase tracking-[.16em] text-black/35">Central administration</p><h2 className="font-semibold">Executive Dashboard</h2></div>
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700">Admin online</span>
            </div>
          </header>

          <div className="mx-auto max-w-[1600px] space-y-8 px-4 py-7 md:px-7 md:py-9">
            <section id="overview" className="rounded-3xl bg-[#111216] p-6 text-white md:p-8">
              <p className="text-[10px] uppercase tracking-[.2em] text-white/35">Executive Dashboard / Central BI</p>
              <div className="mt-2 grid gap-8 xl:grid-cols-[1.35fr_.65fr]">
                <div>
                  <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">One view of the Loxada pipeline.</h3>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50">Manga & Light Novel → Anime → Merchandise. Central turns subsystem activity into descriptive reporting and decision support while the warehouse remains the analytical source of truth.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold">WAREHOUSE STATUS</p>
                  <p className="mt-3 text-2xl font-semibold">Ready / awaiting ETL</p>
                  <p className="mt-1 text-xs leading-5 text-white/40">The Admin warehouse schema is present. Current fact tables contain zero rows, so no business result is fabricated.</p>
                </div>
              </div>
            </section>

            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {[
                ["Titles","0","warehouse.dim_title"],
                ["Arcs","0","warehouse.dim_arc"],
                ["Sales facts","0","warehouse.fact_sales"],
                ["View facts","0","warehouse.fact_views"],
                ["Subscription facts","0","warehouse.fact_subs"]
              ].map((x) => <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm" key={x[0]}><span className="text-[10px] font-semibold uppercase tracking-wider text-black/35">{x[0]}</span><strong className="mt-3 block text-xl">{x[1]}</strong><p className="mt-1 text-[10px] text-black/40">{x[2]}</p></div>)}
            </section>

            <section className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <p className="text-xs font-semibold text-blue-900">No fabricated KPIs</p>
              <p className="mt-1 text-xs leading-5 text-black/55">The Central warehouse has the documented dimensions and facts, but ETL has not populated them. The verified current state is therefore zero rows.</p>
            </section>

            <section className="space-y-4">
              <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-black/35">Organizations</p><h3 className="mt-1 text-2xl font-semibold">The Loxada pipeline</h3></div>
              <div className="grid gap-4 xl:grid-cols-3">
                {organizations.map((x) => <article className={"rounded-2xl border bg-white p-5 shadow-sm border-l-4 " + (x[4] === "blue" ? "border-l-blue-500" : x[4] === "violet" ? "border-l-violet-500" : "border-l-amber-500")} key={x[0]}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">{x[1]}</p>
                  <h4 className="mt-1 font-semibold">{x[0]}</h4>
                  <p className="mt-4 font-mono text-[10px] text-black/40">{x[2]}</p>
                  <p className="mt-3 text-xs leading-5 text-black/50">{x[3]}</p>
                </article>)}
              </div>
            </section>

            <section id="business-intelligence" className="space-y-4">
              <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-black/35">Business Intelligence</p><h3 className="mt-1 text-2xl font-semibold">From facts to decisions</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-black/50">The Central/Admin layer is the BI layer described in the knowledge base: descriptive, predictive and prescriptive analysis across the three organizations.</p></div>
              <div className="grid gap-4 xl:grid-cols-3">
                {[
                  ["Descriptive BI","What happened?","Measure actual sales, views, completion and subscription events from warehouse facts."],
                  ["Predictive BI","What is likely?","Velocity/growth and cross-department conversion are deferred until the warehouse has historical data."],
                  ["Prescriptive BI","What should be considered?","Strong Manga/LN performance can become an anime-license signal; strong anime completion plus character popularity can become a merchandise signal."]
                ].map((x) => <div className="rounded-2xl border bg-white p-5 shadow-sm" key={x[0]}><p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">{x[1]}</p><h4 className="mt-1 text-base font-semibold">{x[0]}</h4><p className="mt-4 rounded-lg bg-[#fafafa] p-3 text-xs leading-5 text-black/55">{x[2]}</p></div>)}
              </div>
            </section>

            <section id="warehouse" className="space-y-4">
              <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-black/35">Central / Data Warehouse</p><h3 className="mt-1 text-2xl font-semibold">Warehouse model</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-black/50">Central has no day-to-day OLTP. It aggregates subsystem analytics into warehouse dimensions and facts for the Executive Dashboard.</p></div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">DIMENSIONS</p><h4 className="mt-1 font-semibold">Conformed analytical context</h4><div className="mt-4 space-y-2">{["dim_title","dim_arc","dim_character","dim_user","dim_time"].map(x=><div className="flex items-center justify-between rounded-lg bg-[#fafafa] px-3 py-3 text-xs" key={x}><span className="font-mono">{x}</span><span className="rounded-full bg-black/5 px-2 py-1 text-[9px]">0 rows</span></div>)}</div></div>
                <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">FACTS</p><h4 className="mt-1 font-semibold">Measured business events</h4><div className="mt-4 space-y-2">{["fact_sales","fact_views","fact_subs"].map(x=><div className="flex items-center justify-between rounded-lg bg-[#fafafa] px-3 py-3 text-xs" key={x}><span className="font-mono">{x}</span><span className="rounded-full bg-black/5 px-2 py-1 text-[9px]">0 rows</span></div>)}</div></div>
              </div>
              <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">ETL BOUNDARY</p><h4 className="mt-1 font-semibold">Source → mart → warehouse</h4><div className="mt-4 grid gap-3 md:grid-cols-3">{["Three subsystem OLTP","Each subsystem mart","Central warehouse"].map(x=><div className="rounded-xl border bg-[#fafafa] p-4 text-center text-xs font-semibold" key={x}>{x}</div>)}</div><p className="mt-4 text-xs leading-5 text-black/45">The knowledge base specifies ETL from each subsystem's mart schema. ETL is the remaining bridge before Central can show live cross-department measures.</p></div>
            </section>

            <section id="organizations" className="space-y-4">
              <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-black/35">Shared identifiers</p><h3 className="mt-1 text-2xl font-semibold">The cross-department join spine</h3></div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{["title_id","arc_id","character_id","user_id"].map(x=><div className="rounded-xl border bg-white p-4 shadow-sm" key={x}><span className="text-[10px] uppercase tracking-wider text-black/35">Shared</span><strong className="mt-2 block font-mono text-sm">{x}</strong></div>)}</div>
            </section>

            <section id="analytics" className="space-y-4">
              <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-black/35">Analytics</p><h3 className="mt-1 text-2xl font-semibold">Warehouse measures</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-black/50">Analytical views use the warehouse as the source of truth. No trend or forecast is displayed when underlying facts are absent.</p></div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{[["Revenue","—","Awaiting fact_sales"],["View completion","—","Awaiting fact_views"],["Content coverage","0","No warehouse titles"],["Subscriber events","0","fact_subs"]].map(x=><div className="rounded-2xl border bg-white p-4 shadow-sm" key={x[0]}><span className="text-[10px] uppercase tracking-wider text-black/35">{x[0]}</span><strong className="mt-3 block text-2xl">{x[1]}</strong><p className="mt-1 text-[10px] text-black/40">{x[2]}</p></div>)}</div>
              <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">Readiness</p><h4 className="mt-1 font-semibold">Current analytical scope</h4>{["Revenue / sales","View completion","Subscription volume","Cross-department conversion","Velocity / growth rate","Demographic segmentation","Sentiment analysis"].map((x,i)=><div className="mt-2 flex items-center justify-between rounded-lg bg-[#fafafa] px-3 py-3 text-xs" key={x}><span>{x}</span><span className={i<3?"text-emerald-700":"text-amber-700"}>{i<3?"Schema ready":"Needs data / deferred"}</span></div>)}</div>
            </section>

            <section id="system" className="space-y-4">
              <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-black/35">System</p><h3 className="mt-1 text-2xl font-semibold">Central control and readiness</h3></div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{[["Admin Vercel","Production project",true],["Admin Supabase","ACTIVE_HEALTHY",true],["Warehouse schema","8 tables verified",true],["ETL","Not implemented",false]].map(x=><div className="rounded-2xl border bg-white p-4 shadow-sm" key={x[0]}><div className="flex justify-between"><strong className="text-xs">{x[0]}</strong><span className={x[2]?"text-emerald-600":"text-amber-600"}>{x[2]?"READY":"PENDING"}</span></div><p className="mt-2 text-[10px] text-black/40">{x[1]}</p></div>)}</div>
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5"><p className="text-[10px] font-semibold uppercase tracking-wider text-red-700">Security finding</p><h4 className="mt-1 font-semibold text-red-900">Warehouse RLS requires remediation</h4><p className="mt-2 text-xs leading-5 text-red-800/70">RLS is currently disabled on all 8 warehouse tables in the Admin Supabase project. This should be addressed with the actual Admin authorization policies; blindly enabling RLS without policies would block access.</p></div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
