export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f5f7] text-[#17191d]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[270px] shrink-0 flex-col bg-[#101114] text-white lg:flex">
          <div className="border-b border-white/10 p-6">
            <p className="text-[9px] uppercase tracking-[.2em] text-white/35">Loxada Entertainments</p>
            <h1 className="mt-1 text-xl font-semibold">ADMIN / BI</h1>
            <p className="mt-4 text-xs leading-5 text-white/45">Executive control layer for Manga & Light Novel, Anime and Merchandise.</p>
          </div>
          <nav className="flex-1 space-y-1 p-3">
            <a href="#overview" className="block rounded-xl bg-white px-3 py-2.5 text-xs text-black">Overview</a>
            <a href="#bi" className="block rounded-xl px-3 py-2.5 text-xs text-white/55 hover:bg-white/10 hover:text-white">Business Intelligence</a>
            <a href="#warehouse" className="block rounded-xl px-3 py-2.5 text-xs text-white/55 hover:bg-white/10 hover:text-white">Warehouse</a>
            <a href="#organizations" className="block rounded-xl px-3 py-2.5 text-xs text-white/55 hover:bg-white/10 hover:text-white">Organizations</a>
            <a href="#analytics" className="block rounded-xl px-3 py-2.5 text-xs text-white/55 hover:bg-white/10 hover:text-white">Analytics</a>
            <a href="#system" className="block rounded-xl px-3 py-2.5 text-xs text-white/55 hover:bg-white/10 hover:text-white">System</a>
          </nav>
          <div className="border-t border-white/10 p-4 text-[10px] text-white/40">Production · Central BI</div>
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
              <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm"><span className="text-[10px] font-semibold uppercase tracking-wider text-black/35">Titles</span><strong className="mt-3 block text-xl">0</strong><p className="mt-1 text-[10px] text-black/40">warehouse.dim_title</p></div>
              <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm"><span className="text-[10px] font-semibold uppercase tracking-wider text-black/35">Arcs</span><strong className="mt-3 block text-xl">0</strong><p className="mt-1 text-[10px] text-black/40">warehouse.dim_arc</p></div>
              <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm"><span className="text-[10px] font-semibold uppercase tracking-wider text-black/35">Sales facts</span><strong className="mt-3 block text-xl">0</strong><p className="mt-1 text-[10px] text-black/40">warehouse.fact_sales</p></div>
              <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm"><span className="text-[10px] font-semibold uppercase tracking-wider text-black/35">View facts</span><strong className="mt-3 block text-xl">0</strong><p className="mt-1 text-[10px] text-black/40">warehouse.fact_views</p></div>
              <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm"><span className="text-[10px] font-semibold uppercase tracking-wider text-black/35">Subscription facts</span><strong className="mt-3 block text-xl">0</strong><p className="mt-1 text-[10px] text-black/40">warehouse.fact_subs</p></div>
            </section>

            <section className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <p className="text-xs font-semibold text-blue-900">No fabricated KPIs</p>
              <p className="mt-1 text-xs leading-5 text-black/55">The Central warehouse has the documented dimensions and facts, but ETL has not populated them. The verified current state is therefore zero rows.</p>
            </section>

            <section className="space-y-4">
              <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-black/35">Organizations</p><h3 className="mt-1 text-2xl font-semibold">The Loxada pipeline</h3></div>
              <div className="grid gap-4 xl:grid-cols-3">
                <article className="rounded-2xl border border-l-4 border-l-blue-500 bg-white p-5 shadow-sm"><p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">Source content</p><h4 className="mt-1 font-semibold">Manga & Light Novel</h4><p className="mt-4 font-mono text-[10px] text-black/40">monthly_revenue · top_chapters</p><p className="mt-3 text-xs leading-5 text-black/50">Sales, purchases, subscriptions</p></article>
                <article className="rounded-2xl border border-l-4 border-l-violet-500 bg-white p-5 shadow-sm"><p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">Adaptation</p><h4 className="mt-1 font-semibold">Anime</h4><p className="mt-4 font-mono text-[10px] text-black/40">completion_rate · new_subs_by_month</p><p className="mt-3 text-xs leading-5 text-black/50">Completion, viewership, subscriber growth</p></article>
                <article className="rounded-2xl border border-l-4 border-l-amber-500 bg-white p-5 shadow-sm"><p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">Physical goods</p><h4 className="mt-1 font-semibold">Merchandise</h4><p className="mt-4 font-mono text-[10px] text-black/40">sales_by_character · sellout_speed</p><p className="mt-3 text-xs leading-5 text-black/50">Character sales, revenue, sellout speed, preorders</p></article>
              </div>
            </section>

            <section id="bi" className="space-y-4">
              <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-black/35">Business Intelligence</p><h3 className="mt-1 text-2xl font-semibold">From facts to decisions</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-black/50">Central/Admin is the BI layer: descriptive, predictive and prescriptive analysis across the three organizations.</p></div>
              <div className="grid gap-4 xl:grid-cols-3">
                <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">WHAT HAPPENED?</p><h4 className="mt-1 font-semibold">Descriptive BI</h4><p className="mt-4 rounded-lg bg-[#fafafa] p-3 text-xs leading-5 text-black/55">Measure actual sales, views, completion and subscription events from warehouse facts.</p></div>
                <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">WHAT IS LIKELY?</p><h4 className="mt-1 font-semibold">Predictive BI</h4><p className="mt-4 rounded-lg bg-[#fafafa] p-3 text-xs leading-5 text-black/55">Velocity, growth and cross-department conversion require historical warehouse facts and remain deferred.</p></div>
                <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">WHAT SHOULD BE CONSIDERED?</p><h4 className="mt-1 font-semibold">Prescriptive BI</h4><p className="mt-4 rounded-lg bg-[#fafafa] p-3 text-xs leading-5 text-black/55">Strong Manga/LN performance can become an anime-license signal. Strong anime completion plus character popularity can become a merchandise signal.</p></div>
              </div>
              <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">CONFORMED DIMENSIONS</p><h4 className="mt-1 font-semibold">Cross-department analytical spine</h4><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"><div className="rounded-xl bg-[#fafafa] p-4 font-mono text-xs">dim_title</div><div className="rounded-xl bg-[#fafafa] p-4 font-mono text-xs">dim_arc</div><div className="rounded-xl bg-[#fafafa] p-4 font-mono text-xs">dim_character</div><div className="rounded-xl bg-[#fafafa] p-4 font-mono text-xs">dim_user</div><div className="rounded-xl bg-[#fafafa] p-4 font-mono text-xs">dim_time</div></div></div>
            </section>

            <section id="warehouse" className="space-y-4">
              <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-black/35">Central / Data Warehouse</p><h3 className="mt-1 text-2xl font-semibold">Warehouse model</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-black/50">Central has no day-to-day OLTP. It aggregates subsystem analytics into warehouse dimensions and facts for the Executive Dashboard.</p></div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">DIMENSIONS</p><h4 className="mt-1 font-semibold">Conformed analytical context</h4><div className="mt-4 space-y-2"><div className="rounded-lg bg-[#fafafa] p-3 font-mono text-xs">dim_title · 0 rows</div><div className="rounded-lg bg-[#fafafa] p-3 font-mono text-xs">dim_arc · 0 rows</div><div className="rounded-lg bg-[#fafafa] p-3 font-mono text-xs">dim_character · 0 rows</div><div className="rounded-lg bg-[#fafafa] p-3 font-mono text-xs">dim_user · 0 rows</div><div className="rounded-lg bg-[#fafafa] p-3 font-mono text-xs">dim_time · 0 rows</div></div></div>
                <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">FACTS</p><h4 className="mt-1 font-semibold">Measured business events</h4><div className="mt-4 space-y-2"><div className="rounded-lg bg-[#fafafa] p-3 font-mono text-xs">fact_sales · 0 rows</div><div className="rounded-lg bg-[#fafafa] p-3 font-mono text-xs">fact_views · 0 rows</div><div className="rounded-lg bg-[#fafafa] p-3 font-mono text-xs">fact_subs · 0 rows</div></div></div>
              </div>
              <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">ETL BOUNDARY</p><h4 className="mt-1 font-semibold">Source → mart → warehouse</h4><div className="mt-4 grid gap-3 md:grid-cols-3"><div className="rounded-xl border bg-[#fafafa] p-4 text-center text-xs font-semibold">Three subsystem OLTP</div><div className="rounded-xl border bg-[#fafafa] p-4 text-center text-xs font-semibold">Each subsystem mart</div><div className="rounded-xl border bg-[#fafafa] p-4 text-center text-xs font-semibold">Central warehouse</div></div><p className="mt-4 text-xs leading-5 text-black/45">The knowledge base specifies ETL from each subsystem mart schema. ETL is the remaining bridge before Central can show live cross-department measures.</p></div>
            </section>

            <section id="organizations" className="space-y-4">
              <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-black/35">Shared identifiers</p><h3 className="mt-1 text-2xl font-semibold">The cross-department join spine</h3></div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><div className="rounded-xl border bg-white p-4 shadow-sm"><span className="text-[10px] uppercase text-black/35">Shared</span><strong className="mt-2 block font-mono text-sm">title_id</strong></div><div className="rounded-xl border bg-white p-4 shadow-sm"><span className="text-[10px] uppercase text-black/35">Shared</span><strong className="mt-2 block font-mono text-sm">arc_id</strong></div><div className="rounded-xl border bg-white p-4 shadow-sm"><span className="text-[10px] uppercase text-black/35">Shared</span><strong className="mt-2 block font-mono text-sm">character_id</strong></div><div className="rounded-xl border bg-white p-4 shadow-sm"><span className="text-[10px] uppercase text-black/35">Shared</span><strong className="mt-2 block font-mono text-sm">user_id</strong></div></div>
            </section>

            <section id="analytics" className="space-y-4">
              <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-black/35">Analytics</p><h3 className="mt-1 text-2xl font-semibold">Warehouse measures</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-black/50">Analytical views use the warehouse as the source of truth. No trend or forecast is displayed when underlying facts are absent.</p></div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"><div className="rounded-2xl border bg-white p-4 shadow-sm"><span className="text-[10px] uppercase text-black/35">Revenue</span><strong className="mt-3 block text-2xl">—</strong><p className="mt-1 text-[10px] text-black/40">Awaiting fact_sales</p></div><div className="rounded-2xl border bg-white p-4 shadow-sm"><span className="text-[10px] uppercase text-black/35">View completion</span><strong className="mt-3 block text-2xl">—</strong><p className="mt-1 text-[10px] text-black/40">Awaiting fact_views</p></div><div className="rounded-2xl border bg-white p-4 shadow-sm"><span className="text-[10px] uppercase text-black/35">Content coverage</span><strong className="mt-3 block text-2xl">0</strong><p className="mt-1 text-[10px] text-black/40">No warehouse titles</p></div><div className="rounded-2xl border bg-white p-4 shadow-sm"><span className="text-[10px] uppercase text-black/35">Subscriber events</span><strong className="mt-3 block text-2xl">0</strong><p className="mt-1 text-[10px] text-black/40">fact_subs</p></div></div>
              <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">READINESS</p><h4 className="mt-1 font-semibold">Current analytical scope</h4><div className="mt-4 space-y-2"><div className="flex justify-between rounded-lg bg-[#fafafa] p-3 text-xs"><span>Revenue / sales</span><span className="text-emerald-700">Schema ready</span></div><div className="flex justify-between rounded-lg bg-[#fafafa] p-3 text-xs"><span>View completion</span><span className="text-emerald-700">Schema ready</span></div><div className="flex justify-between rounded-lg bg-[#fafafa] p-3 text-xs"><span>Subscription volume</span><span className="text-emerald-700">Schema ready</span></div><div className="flex justify-between rounded-lg bg-[#fafafa] p-3 text-xs"><span>Cross-department conversion</span><span className="text-amber-700">Needs data / deferred</span></div><div className="flex justify-between rounded-lg bg-[#fafafa] p-3 text-xs"><span>Velocity / growth rate</span><span className="text-amber-700">Needs data / deferred</span></div></div></div>
            </section>

            <section id="system" className="space-y-4">
              <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-black/35">System</p><h3 className="mt-1 text-2xl font-semibold">Central control and readiness</h3></div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"><div className="rounded-2xl border bg-white p-4 shadow-sm"><strong className="text-xs">Admin Vercel</strong><p className="mt-2 text-[10px] text-emerald-700">Production project</p></div><div className="rounded-2xl border bg-white p-4 shadow-sm"><strong className="text-xs">Admin Supabase</strong><p className="mt-2 text-[10px] text-emerald-700">ACTIVE_HEALTHY</p></div><div className="rounded-2xl border bg-white p-4 shadow-sm"><strong className="text-xs">Warehouse schema</strong><p className="mt-2 text-[10px] text-emerald-700">8 tables verified</p></div><div className="rounded-2xl border bg-white p-4 shadow-sm"><strong className="text-xs">ETL</strong><p className="mt-2 text-[10px] text-amber-700">Not implemented</p></div></div>
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5"><p className="text-[10px] font-semibold uppercase tracking-wider text-red-700">SECURITY FINDING</p><h4 className="mt-1 font-semibold text-red-900">Warehouse RLS requires remediation</h4><p className="mt-2 text-xs leading-5 text-red-800/70">RLS is currently disabled on all 8 warehouse tables in the Admin Supabase project. This should be addressed with the actual Admin authorization policies; enabling RLS without policies would block access.</p></div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
