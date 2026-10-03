"use client";

import { useEffect, useState } from "react";
import { Activity, ArrowRight, BarChart3, Boxes, BrainCircuit, CheckCircle2, CircleAlert, Database, Eye, Gauge, Layers3, LineChart, Package, RefreshCw, Settings2, ShoppingCart, Sparkles, Table2, Users, XCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Section = "overview" | "bi" | "warehouse" | "organizations" | "analytics" | "system";

type Stats = {
  titles: number; arcs: number; characters: number; users: number;
  sales: number; salesAmount: number; views: number; completedViews: number; subs: number;
};

const empty: Stats = { titles: 0, arcs: 0, characters: 0, users: 0, sales: 0, salesAmount: 0, views: 0, completedViews: 0, subs: 0 };

const organizations = [
  ["Manga & Light Novel", "Source content", "monthly_revenue · top_chapters", "Sales, purchases, subscriptions", "blue"],
  ["Anime", "Adaptation", "completion_rate · new_subs_by_month", "Completion, viewership, subscriber growth", "violet"],
  ["Merchandise", "Physical goods", "sales_by_character · sellout_speed", "Character sales, revenue, sellout speed, preorders", "amber"],
] as const;

const dimensions = [
  ["dim_title", "Title", "Shared IP/content identity."],
  ["dim_arc", "Arc", "Story grouping linked to title_id."],
  ["dim_character", "Character", "Bridge between anime popularity and merchandise."],
  ["dim_user", "Lox Account", "Unified user identity."],
  ["dim_time", "Time", "Common date context for facts."],
];

const facts = [
  ["fact_sales", "Sales", "Manga/LN and Merchandise monetary events."],
  ["fact_views", "Views", "Anime viewing and completion events."],
  ["fact_subs", "Subscriptions", "Subscription events by tier and date."],
];

const nav: [string, Section, typeof Gauge][] = [
  ["Overview", "overview", Gauge], ["Business Intelligence", "bi", BrainCircuit],
  ["Warehouse", "warehouse", Database], ["Organizations", "organizations", Boxes],
  ["Analytics", "analytics", BarChart3], ["System", "system", Settings2],
];

const money = (n: number) => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(n);
const number = (n: number) => new Intl.NumberFormat("en-US").format(n);

export default function Home() {
  const [active, setActive] = useState<Section>("overview");
  const [stats, setStats] = useState<Stats>(empty);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobile, setMobile] = useState(false);

  async function refresh() {
    setLoading(true); setError("");
    try {
      const db = createClient();
      const [t, a, c, u, s, v, sub] = await Promise.all([
        db.schema("warehouse").from("dim_title").select("title_id", { count: "exact", head: true }),
        db.schema("warehouse").from("dim_arc").select("arc_id", { count: "exact", head: true }),
        db.schema("warehouse").from("dim_character").select("character_id", { count: "exact", head: true }),
        db.schema("warehouse").from("dim_user").select("user_id", { count: "exact", head: true }),
        db.schema("warehouse").from("fact_sales").select("amount"),
        db.schema("warehouse").from("fact_views").select("completed"),
        db.schema("warehouse").from("fact_subs").select("fact_id", { count: "exact", head: true }),
      ]);
      const all = [t, a, c, u, s, v, sub];
      const bad = all.find(x => x.error);
      if (bad?.error) throw new Error(bad.error.message);
      const sales = s.data ?? [], views = v.data ?? [];
      setStats({
        titles: t.count ?? 0, arcs: a.count ?? 0, characters: c.count ?? 0, users: u.count ?? 0,
        sales: sales.length, salesAmount: sales.reduce((x, r) => x + Number(r.amount ?? 0), 0),
        views: views.length, completedViews: views.filter(r => r.completed).length, subs: sub.count ?? 0,
      });
    } catch (e) { setError(e instanceof Error ? e.message : "Warehouse read failed"); }
    finally { setLoading(false); }
  }

  useEffect(() => { void refresh(); }, []);
  const completion = stats.views ? Math.round(stats.completedViews / stats.views * 100) : null;
  const label = nav.find(x => x[1] === active)?.[0] ?? "Overview";

  return (
    <main className="min-h-screen bg-[#f4f5f7] text-[#17191d]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[270px] shrink-0 flex-col bg-[#101114] text-white lg:flex">
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black"><Sparkles size={18}/></div><div><p className="text-[9px] uppercase tracking-[.2em] text-white/35">Loxada Entertainments</p><h1 className="font-semibold">ADMIN / BI</h1></div></div>
            <p className="mt-4 text-xs leading-5 text-white/45">Executive control layer for Manga & Light Novel, Anime and Merchandise.</p>
          </div>
          <nav className="flex-1 p-3">{nav.map(([name, key, Icon]) => <button key={key} onClick={() => setActive(key)} className={"mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs " + (active === key ? "bg-white text-black" : "text-white/55 hover:bg-white/8")}><Icon size={15}/>{name}</button>)}</nav>
          <div className="border-t border-white/10 p-4 text-[10px] text-white/40"><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"/>Production · Central BI</div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-black/10 bg-white/90 px-4 py-3 backdrop-blur md:px-7">
            <div className="mx-auto flex max-w-[1600px] items-center justify-between">
              <div className="flex items-center gap-3"><button onClick={() => setMobile(!mobile)} className="rounded-lg border p-2 lg:hidden"><Gauge size={15}/></button><div><p className="text-[9px] uppercase tracking-[.16em] text-black/35">Central administration</p><h2 className="font-semibold">{label}</h2></div></div>
              <div className="flex items-center gap-2"><button onClick={() => void refresh()} className="rounded-lg border p-2 text-black/50"><RefreshCw size={14} className={loading ? "animate-spin" : ""}/></button><span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700 sm:block">Admin online</span></div>
            </div>
          </header>
          {mobile && <div className="border-b bg-[#101114] p-3 lg:hidden">{nav.map(([name,key,Icon]) => <button key={key} onClick={() => {setActive(key);setMobile(false)}} className={"mr-1 mb-1 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs " + (active===key ? "bg-white text-black":"bg-white/5 text-white/60")}><Icon size={13}/>{name}</button>)}</div>}

          <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 md:px-7 md:py-8">
            {active === "overview" && <Overview stats={stats} completion={completion} loading={loading} error={error} go={setActive}/>}
            {active === "bi" && <BI stats={stats} completion={completion}/>}
            {active === "warehouse" && <Warehouse stats={stats}/>}
            {active === "organizations" && <Organizations/>}
            {active === "analytics" && <Analytics stats={stats} completion={completion}/>}
            {active === "system" && <System stats={stats} error={error}/>}
          </div>
        </div>
      </div>
    </main>
  );
}

function Overview({stats,completion,loading,error,go}:{stats:Stats;completion:number|null;loading:boolean;error:string;go:(s:Section)=>void}) {
  const emptyFacts = !loading && !error && stats.sales + stats.views + stats.subs === 0;
  return <>
    <section className="rounded-3xl bg-[#111216] p-6 text-white md:p-8"><div className="grid gap-8 xl:grid-cols-[1.35fr_.65fr]"><div><p className="text-[10px] uppercase tracking-[.2em] text-white/35">Executive Dashboard / Central BI</p><h3 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">One view of the Loxada pipeline.</h3><p className="mt-4 max-w-2xl text-sm leading-6 text-white/50">Manga & Light Novel → Anime → Merchandise. Central turns subsystem activity into descriptive reporting and decision signals while the warehouse remains the analytical source of truth.</p></div><div className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="flex items-center gap-2 text-xs font-semibold"><Activity size={15}/>Warehouse status</div><p className="mt-3 text-2xl font-semibold">{loading ? "Reading…" : error ? "Needs attention" : emptyFacts ? "Ready / awaiting ETL" : "Data available"}</p><p className="mt-1 text-xs leading-5 text-white/40">The documented ETL bridge from the three subsystem marts is the remaining data-loading boundary.</p></div></div></section>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5"><Kpi label="Titles" value={number(stats.titles)} detail="dim_title"/><Kpi label="Arcs" value={number(stats.arcs)} detail="dim_arc"/><Kpi label="Sales facts" value={number(stats.sales)} detail={stats.sales ? money(stats.salesAmount) : "No facts loaded"}/><Kpi label="View facts" value={number(stats.views)} detail={completion === null ? "No facts loaded" : completion+"% completed"}/><Kpi label="Subscription facts" value={number(stats.subs)} detail="fact_subs"/></div>
    {error && <Notice danger title="Warehouse read failed" body={error}/>}
    {emptyFacts && <Notice title="No fabricated KPIs" body="The warehouse tables exist, but there are currently no fact rows. The dashboard therefore reports zero rather than inventing business results. Populate subsystem marts and implement ETL before using these measures for decisions."/>}
    <section className="grid gap-4 xl:grid-cols-3">{organizations.map(([name,tag,mart,signals,tone]) => <button key={name} onClick={()=>go("organizations")} className="rounded-2xl border bg-white p-5 text-left shadow-sm hover:border-black/20"><div className="flex justify-between"><span className={"rounded-lg px-2 py-1 text-[9px] font-bold text-white " + (tone==="blue"?"bg-blue-600":tone==="violet"?"bg-violet-600":"bg-amber-600")}>{tag}</span><ArrowRight size={15}/></div><h4 className="mt-5 font-semibold">{name}</h4><p className="mt-2 font-mono text-[10px] text-black/40">{mart}</p><p className="mt-3 text-xs leading-5 text-black/50">{signals}</p></button>)}</section>
    <section className="panel"><div className="panel-head"><div><p className="eyebrow">Decision pipeline</p><h4>BI connects the organizations</h4></div><button onClick={()=>go("bi")} className="text-xs font-semibold">Open BI →</button></div><div className="grid gap-3 md:grid-cols-3">{["Sustained manga/LN performance → anime license signal","Anime completion + character popularity → merchandise signal","Shared title_id / arc_id / character_id / user_id → cross-department analysis"].map((x,i)=><div className="data-card" key={x}><span>0{i+1}</span><strong>{x.split(" → ")[0]}</strong><p>→ {x.split(" → ")[1]}</p></div>)}</div></section>
  </>;
}

function BI({stats,completion}:{stats:Stats;completion:number|null}) {
  return <><Intro eyebrow="Business Intelligence" title="From facts to decisions" body="Central/Admin is explicitly the BI layer: descriptive, predictive and prescriptive analysis across the three organizations."/><div className="grid gap-4 xl:grid-cols-3"><Mode title="Descriptive BI" question="What happened?" icon={BarChart3} items={["Sales facts: "+number(stats.sales),"View facts: "+number(stats.views),"Subscription facts: "+number(stats.subs),"Warehouse titles: "+number(stats.titles)]}/><Mode title="Predictive BI" question="What is likely?" icon={LineChart} items={["Velocity/growth is a deferred branch feature.","Cross-department conversion is not yet built.","No forecast is shown without historical facts.",completion===null?"Completion trend: awaiting view facts.":"Current completion snapshot: "+completion+"%"]}/><Mode title="Prescriptive BI" question="What should be considered?" icon={Sparkles} items={["Strong manga/LN performance → consider anime license acquisition.","Strong anime completion + character popularity → consider merchandise line.","Use shared identifiers to connect evidence first.","Signals support decisions; they do not auto-approve them."]}/></div><section className="panel"><div className="panel-head"><div><p className="eyebrow">Conformed dimensions</p><h4>Cross-department analytical spine</h4></div></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{dimensions.map(([id,name,text])=><div className="data-card" key={id}><span>{id}</span><strong>{name}</strong><p>{text}</p></div>)}</div></section><section className="panel"><div className="panel-head"><div><p className="eyebrow">Galaxy-ready fact group</p><h4>Shared dimensions, multiple fact streams</h4></div></div><div className="grid gap-3 lg:grid-cols-3">{facts.map(([id,name,text])=><div className="rounded-xl border p-4" key={id}><div className="flex justify-between"><strong className="text-sm">{name}</strong><span className="badge">{id}</span></div><p className="mt-3 text-xs leading-5 text-black/50">{text}</p><div className="mt-4 flex flex-wrap gap-1.5">{["title","arc","user","time",...(id==="fact_sales"?["character"]:[])].map(x=><span className="rounded bg-black/5 px-2 py-1 text-[9px] font-semibold" key={x}>dim_{x}</span>)}</div></div>)}</div></section></>;
}

function Warehouse({stats}:{stats:Stats}) {
  return <><Intro eyebrow="Central / Data Warehouse" title="Warehouse model" body="Central has no day-to-day OLTP. It aggregates subsystem analytics into warehouse dimensions and facts for the Executive Dashboard."/><div className="grid gap-4 lg:grid-cols-2"><section className="panel"><div className="panel-head"><div><p className="eyebrow">Dimensions</p><h4>Shared analytical context</h4></div><Table2 size={18}/></div>{dimensions.map(([id,name])=><div className="health-row mb-2" key={id}><span><b className="font-semibold">{name}</b><small className="mt-1 block font-mono text-[9px] text-black/35">warehouse.{id}</small></span><span className="badge">{id==="dim_title"?number(stats.titles):id==="dim_arc"?number(stats.arcs):id==="dim_character"?number(stats.characters):id==="dim_user"?number(stats.users):"date"} rows</span></div>)}</section><section className="panel"><div className="panel-head"><div><p className="eyebrow">Facts</p><h4>Measured business events</h4></div><Activity size={18}/></div>{facts.map(([id,name,text])=><div className="rounded-lg bg-[#fafafa] p-3 mb-2" key={id}><div className="flex justify-between"><strong className="text-xs">{name}</strong><span className="badge">{id==="fact_sales"?number(stats.sales):id==="fact_views"?number(stats.views):number(stats.subs)} rows</span></div><p className="mt-1 text-[10px] leading-4 text-black/45">{text}</p></div>)}</section></div><section className="panel"><div className="panel-head"><div><p className="eyebrow">ETL boundary</p><h4>Source → mart → warehouse</h4></div></div><div className="grid gap-3 md:grid-cols-3">{["Three subsystem OLTP","Each subsystem mart","Central warehouse"].map((x,i)=><div className="rounded-xl border bg-[#fafafa] p-4 text-center" key={x}><strong className="text-xs">{x}</strong><p className="mt-1 text-[10px] text-black/40">{i===0?"Operational source":i===1?"Local OLAP":"Executive BI source"}</p></div>)}</div><p className="mt-4 text-xs leading-5 text-black/45">The knowledge base specifies ETL from each subsystem's <code>mart</code> schema. That layer is not considered complete until it loads Central facts.</p></section></>;
}

function Organizations() {
  return <><Intro eyebrow="Three Organizations" title="The Loxada pipeline" body="Each organization owns its operational data and local analytics. Central consumes their analytical output rather than becoming another transactional department."/><section className="grid gap-4">{organizations.map(([name,tag,mart,signals,tone])=><article className={"panel border-l-4 "+(tone==="blue"?"border-l-blue-500":tone==="violet"?"border-l-violet-500":"border-l-amber-500")} key={name}><div className="grid gap-5 lg:grid-cols-3"><div><p className="eyebrow">{tag}</p><h4 className="mt-1 text-xl">{name}</h4></div><div><p className="eyebrow">Local mart</p><p className="mt-2 font-mono text-xs">{mart}</p></div><div><p className="eyebrow">BI signals</p><p className="mt-2 text-xs leading-5 text-black/55">{signals}</p></div></div></article>)}</section><section className="panel"><p className="eyebrow">Shared identifiers</p><h4 className="mt-1">The cross-department join spine</h4><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{["title_id","arc_id","character_id","user_id"].map(x=><div className="data-card" key={x}><span>Shared</span><strong className="font-mono">{x}</strong></div>)}</div></section></>;
}

function Analytics({stats,completion}:{stats:Stats;completion:number|null}) {
  return <><Intro eyebrow="Analytics" title="Warehouse measures" body="Analytical views use the warehouse as the source of truth. No trend or forecast is displayed when the underlying facts are absent."/><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><Kpi label="Revenue" value={stats.sales?money(stats.salesAmount):"—"} detail={stats.sales?number(stats.sales)+" sales facts":"Awaiting fact_sales"}/><Kpi label="View completion" value={completion===null?"—":completion+"%"} detail={stats.views?number(stats.completedViews)+" completed":"Awaiting fact_views"}/><Kpi label="Content coverage" value={number(stats.titles)} detail={number(stats.arcs)+" arcs"}/><Kpi label="Subscriber events" value={number(stats.subs)} detail="fact_subs rows"/></div><section className="panel"><div className="panel-head"><div><p className="eyebrow">Readiness</p><h4>What can be answered now</h4></div></div>{[["Revenue / sales",stats.sales>0],["View completion",stats.views>0],["Subscription volume",stats.subs>0],["Cross-department conversion",false],["Velocity / growth rate",false],["Demographic segmentation",false],["Sentiment analysis",false]].map(([x,ready])=><div className="health-row mb-2" key={String(x)}><span>{x}</span><b>{ready?<><CheckCircle2 size={13} className="text-emerald-600"/>Available</>:<><CircleAlert size={13} className="text-amber-600"/>Needs data / deferred</>}</b></div>)}</section></>;
}

function System({stats,error}:{stats:Stats;error:string}) {
  return <><Intro eyebrow="System" title="Central control and readiness" body="Admin coordinates the warehouse, BI interpretation and system health while operational organizations remain separated."/><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"><Status name="Admin Vercel" ok detail="Production project"/><Status name="Admin Supabase" ok detail="ACTIVE_HEALTHY"/><Status name="Warehouse schema" ok={!error} detail={error||"Connected"}/><Status name="ETL" ok={false} detail="Not implemented"/></div><section className="panel"><div className="panel-head"><div><p className="eyebrow">Security finding</p><h4>Warehouse RLS requires remediation</h4></div></div><div className="rounded-xl border border-red-200 bg-red-50 p-4"><p className="text-xs font-semibold text-red-800">RLS is disabled on the 8 warehouse tables.</p><p className="mt-2 text-xs leading-5 text-red-800/70">This was verified against the Admin Supabase project. It should be addressed with the actual Admin authorization model; blindly enabling RLS without policies would block access.</p></div></section><section className="panel"><div className="panel-head"><div><p className="eyebrow">Current warehouse state</p><h4>Loaded rows</h4></div></div><div className="grid grid-cols-2 gap-3 md:grid-cols-4"><Kpi label="Dimensions" value={number(stats.titles+stats.arcs+stats.characters+stats.users)} detail="Current rows"/><Kpi label="Facts" value={number(stats.sales+stats.views+stats.subs)} detail="Current rows"/><Kpi label="Sales value" value={stats.sales?money(stats.salesAmount):"—"} detail="fact_sales"/><Kpi label="State" value={error?"Error":stats.sales+stats.views+stats.subs?"Loaded":"Awaiting ETL"} detail="Verified"/></div></section></>;
}

function Intro({eyebrow,title,body}:{eyebrow:string;title:string;body:string}) { return <section><p className="eyebrow">{eyebrow}</p><h3 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-black/50">{body}</p></section>; }
function Kpi({label,value,detail}:{label:string;value:string;detail:string}) { return <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm"><span className="text-[10px] font-semibold uppercase tracking-wider text-black/35">{label}</span><strong className="mt-3 block text-xl font-semibold">{value}</strong><p className="mt-1 text-[10px] text-black/40">{detail}</p></div>; }
function Mode({title,question,icon:Icon,items}:{title:string;question:string;icon:typeof Gauge;items:string[]}) { return <div className="panel"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white"><Icon size={16}/></div><div><h4>{title}</h4><p className="text-xs text-black/40">{question}</p></div></div><div className="mt-5 space-y-2">{items.map(x=><div className="rounded-lg bg-[#fafafa] p-3 text-xs leading-5 text-black/55" key={x}>{x}</div>)}</div></div>; }
function Status({name,ok,detail}:{name:string;ok:boolean;detail:string}) { return <div className="panel"><div className="flex justify-between"><strong className="text-xs">{name}</strong>{ok?<CheckCircle2 size={15} className="text-emerald-600"/>:<XCircle size={15} className="text-amber-600"/>}</div><p className="mt-2 text-[10px] text-black/40">{detail}</p></div>; }
function Notice({title,body,danger=false}:{title:string;body:string;danger?:boolean}) { return <div className={"rounded-2xl border p-4 "+(danger?"border-red-200 bg-red-50":"border-blue-200 bg-blue-50")}><div className="flex gap-3"><CircleAlert size={17} className={danger?"text-red-600":"text-blue-600"}/><div><strong className="text-xs">{title}</strong><p className="mt-1 text-xs leading-5 text-black/55">{body}</p></div></div></div>; }
