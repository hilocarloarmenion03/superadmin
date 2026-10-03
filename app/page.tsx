"use client";

import { useState } from "react";
import { Activity, ArrowRight, BarChart3, BrainCircuit, CheckCircle2, CircleAlert, Database, Gauge, Layers3, LineChart, RefreshCw, Settings2, Sparkles, Table2, XCircle } from "lucide-react";

const nav = [
  ["Overview","overview"],["Business Intelligence","bi"],["Warehouse","warehouse"],
  ["Organizations","organizations"],["Analytics","analytics"],["System","system"]
];

export default function Home() {
  const [active,setActive] = useState("overview");
  const label = nav.find(x => x[1] === active)?.[0] || "Overview";
  return <main className="min-h-screen bg-[#f4f5f7] text-[#17191d]">
    <div className="flex min-h-screen">
      <aside className="hidden w-[270px] shrink-0 flex-col bg-[#101114] text-white lg:flex">
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black"><Sparkles size={18}/></div><div><p className="text-[9px] uppercase tracking-[.2em] text-white/35">Loxada Entertainments</p><h1 className="font-semibold">ADMIN / BI</h1></div></div>
          <p className="mt-4 text-xs leading-5 text-white/45">Executive control layer for the Manga & Light Novel, Anime and Merchandise organizations.</p>
        </div>
        <nav className="flex-1 p-3">{nav.map(x=><button key={x[1]} onClick={()=>setActive(x[1])} className={"mb-1 flex w-full rounded-xl px-3 py-2.5 text-left text-xs "+(active===x[1]?"bg-white text-black":"text-white/55 hover:bg-white/10")}>{x[0]}</button>)}</nav>
        <div className="border-t border-white/10 p-4 text-[10px] text-white/40">● Production · Central BI</div>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b border-black/10 bg-white/90 px-4 py-3 backdrop-blur md:px-7">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between"><div><p className="text-[9px] uppercase tracking-[.16em] text-black/35">Central administration</p><h2 className="font-semibold">{label}</h2></div><div className="flex items-center gap-2"><button className="rounded-lg border p-2 text-black/50" title="Warehouse state is verified from Admin Supabase"><RefreshCw size={14}/></button><span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700 sm:block">Admin online</span></div></div>
        </header>
        <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 md:px-7 md:py-8">
          {active==="overview" && <Overview go={setActive}/>}
          {active==="bi" && <BI/>}
          {active==="warehouse" && <Warehouse/>}
          {active==="organizations" && <Organizations/>}
          {active==="analytics" && <Analytics/>}
          {active==="system" && <System/>}
        </div>
      </div>
    </div>
  </main>;
}

function Intro({eyebrow,title,body}:{eyebrow:string;title:string;body:string}) {
  return <section><p className="eyebrow">{eyebrow}</p><h3 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-black/50">{body}</p></section>;
}

function Kpi({label,value,detail}:{label:string;value:string;detail:string}) {
  return <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm"><span className="text-[10px] font-semibold uppercase tracking-wider text-black/35">{label}</span><strong className="mt-3 block text-xl font-semibold">{value}</strong><p className="mt-1 text-[10px] text-black/40">{detail}</p></div>;
}

function Overview({go}:{go:(x:string)=>void}) {
  const orgs = [
    ["Manga & Light Novel","Source content","monthly_revenue · top_chapters","Sales, purchases, subscriptions","blue"],
    ["Anime","Adaptation","completion_rate · new_subs_by_month","Completion, viewership, subscriber growth","violet"],
    ["Merchandise","Physical goods","sales_by_character · sellout_speed","Character sales, revenue, sellout speed, preorders","amber"]
  ];
  return <>
    <section className="rounded-3xl bg-[#111216] p-6 text-white md:p-8"><div className="grid gap-8 xl:grid-cols-[1.35fr_.65fr]"><div><p className="text-[10px] uppercase tracking-[.2em] text-white/35">Executive Dashboard / Central BI</p><h3 className="mt-2 text-3xl font-semibold md:text-5xl">One view of the Loxada pipeline.</h3><p className="mt-4 max-w-2xl text-sm leading-6 text-white/50">Manga & Light Novel → Anime → Merchandise. Central turns subsystem activity into descriptive reporting and decision support while the warehouse remains the analytical source of truth.</p></div><div className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="flex items-center gap-2 text-xs font-semibold"><Activity size={15}/>Warehouse status</div><p className="mt-3 text-2xl font-semibold">Ready / awaiting ETL</p><p className="mt-1 text-xs leading-5 text-white/40">The Admin warehouse schema is present. Current fact tables contain zero rows, so no business result is fabricated here.</p></div></div></section>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5"><Kpi label="Titles" value="0" detail="warehouse.dim_title"/><Kpi label="Arcs" value="0" detail="warehouse.dim_arc"/><Kpi label="Sales facts" value="0" detail="fact_sales"/><Kpi label="View facts" value="0" detail="fact_views"/><Kpi label="Subscription facts" value="0" detail="fact_subs"/></div>
    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4"><div className="flex gap-3"><CircleAlert size={17} className="text-blue-600"/><div><strong className="text-xs">No fabricated KPIs</strong><p className="mt-1 text-xs leading-5 text-black/55">The Central warehouse has the documented dimensions and facts, but ETL has not populated them. The dashboard therefore shows the verified zero state.</p></div></div></div>
    <section className="grid gap-4 xl:grid-cols-3">{orgs.map(x=><button key={x[0]} onClick={()=>go("organizations")} className="rounded-2xl border bg-white p-5 text-left shadow-sm hover:border-black/20"><span className={"rounded-lg px-2 py-1 text-[9px] font-bold text-white "+(x[4]==="blue"?"bg-blue-600":x[4]==="violet"?"bg-violet-600":"bg-amber-600")}>{x[1]}</span><h4 className="mt-5 font-semibold">{x[0]}</h4><p className="mt-2 font-mono text-[10px] text-black/40">{x[2]}</p><p className="mt-3 text-xs leading-5 text-black/50">{x[3]}</p><span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold">Open <ArrowRight size={13}/></span></button>)}</section>
    <section className="panel"><div className="panel-head"><div><p className="eyebrow">Decision pipeline</p><h4>BI connects the organizations</h4></div><button onClick={()=>go("bi")} className="text-xs font-semibold">Open BI →</button></div><div className="grid gap-3 md:grid-cols-3">{["Sustained manga/LN performance → anime license signal","Anime completion + character popularity → merchandise signal","Shared title_id / arc_id / character_id / user_id → cross-department analysis"].map((x,i)=><div className="data-card" key={x}><span>0{i+1}</span><strong>{x.split(" → ")[0]}</strong><p>→ {x.split(" → ")[1]}</p></div>)}</div></section>
  </>;
}

function BI() {
  const modes = [
    ["Descriptive BI","What happened?","Measure actual sales, views, completion and subscription events from warehouse facts."],
    ["Predictive BI","What is likely?","Velocity/growth, cross-department conversion and other historical prediction features remain deferred until the warehouse has history."],
    ["Prescriptive BI","What should be considered?","Strong Manga/LN performance can become an anime-license signal; strong anime completion plus character popularity can become a merchandise signal."]
  ];
  return <><Intro eyebrow="Business Intelligence" title="From facts to decisions" body="Central/Admin is the BI layer described in the knowledge base: descriptive, predictive and prescriptive analysis across the three organizations."/><div className="grid gap-4 xl:grid-cols-3">{modes.map((x,i)=><div className="panel" key={x[0]}><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">{i===0?<BarChart3 size={16}/>:i===1?<LineChart size={16}/>:<Sparkles size={16}/>}</div><div><h4>{x[0]}</h4><p className="text-xs text-black/40">{x[1]}</p></div></div><p className="mt-5 rounded-lg bg-[#fafafa] p-3 text-xs leading-5 text-black/55">{x[2]}</p></div>)}</div><section className="panel"><p className="eyebrow">Conformed dimensions</p><h4 className="mt-1">Cross-department analytical spine</h4><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{["dim_title","dim_arc","dim_character","dim_user","dim_time"].map((x)=><div className="data-card" key={x}><span>Warehouse</span><strong>{x}</strong></div>)}</div></section><section className="panel"><p className="eyebrow">Galaxy-ready fact group</p><h4 className="mt-1">Multiple fact streams using shared dimensions</h4><div className="mt-4 grid gap-3 lg:grid-cols-3">{[["fact_sales","Sales"],["fact_views","Views"],["fact_subs","Subscriptions"]].map(x=><div className="rounded-xl border p-4" key={x[0]}><div className="flex justify-between"><strong className="text-sm">{x[1]}</strong><span className="badge">{x[0]}</span></div><p className="mt-3 text-xs leading-5 text-black/50">Shared title/arc/user/time context makes the fact stream comparable inside Central.</p></div>)}</div></section></>;
}

function Warehouse() {
  return <><Intro eyebrow="Central / Data Warehouse" title="Warehouse model" body="Central has no day-to-day OLTP. It aggregates subsystem analytics into warehouse dimensions and facts for the Executive Dashboard."/><div className="grid gap-4 lg:grid-cols-2"><section className="panel"><div className="panel-head"><div><p className="eyebrow">Dimensions</p><h4>Shared analytical context</h4></div><Table2 size={18}/></div>{["dim_title","dim_arc","dim_character","dim_user","dim_time"].map(x=><div className="health-row mb-2" key={x}><span><b className="font-semibold">{x}</b><small className="mt-1 block text-[9px] text-black/35">0 current rows</small></span><span className="badge">dimension</span></div>)}</section><section className="panel"><div className="panel-head"><div><p className="eyebrow">Facts</p><h4>Measured business events</h4></div><Activity size={18}/></div>{["fact_sales","fact_views","fact_subs"].map(x=><div className="rounded-lg bg-[#fafafa] p-3 mb-2" key={x}><div className="flex justify-between"><strong className="text-xs">{x}</strong><span className="badge">0 rows</span></div><p className="mt-1 text-[10px] text-black/45">Ready for ETL loading.</p></div>)}</section></div><section className="panel"><p className="eyebrow">ETL boundary</p><h4 className="mt-1">Source → mart → warehouse</h4><div className="mt-4 grid gap-3 md:grid-cols-3">{["Three subsystem OLTP","Each subsystem mart","Central warehouse"].map(x=><div className="rounded-xl border bg-[#fafafa] p-4 text-center" key={x}><strong className="text-xs">{x}</strong></div>)}</div><p className="mt-4 text-xs leading-5 text-black/45">The knowledge base specifies ETL from each subsystem's mart schema. ETL is the remaining bridge before Central can show live cross-department measures.</p></section></>;
}

function Organizations() {
  return <><Intro eyebrow="Three Organizations" title="The Loxada pipeline" body="Each organization owns operational data and local analytics. Central consumes their analytical output rather than becoming another transactional department."/><section className="grid gap-4">{[["Manga & Light Novel","Source content","monthly_revenue · top_chapters","Sales, purchases, subscriptions","blue"],["Anime","Adaptation","completion_rate · new_subs_by_month","Completion, viewership, subscriber growth","violet"],["Merchandise","Physical goods","sales_by_character · sellout_speed","Character sales, revenue, sellout speed, preorders","amber"]].map(x=><article className={"panel border-l-4 "+(x[4]==="blue"?"border-l-blue-500":x[4]==="violet"?"border-l-violet-500":"border-l-amber-500")} key={x[0]}><div className="grid gap-5 lg:grid-cols-3"><div><p className="eyebrow">{x[1]}</p><h4 className="mt-1 text-xl">{x[0]}</h4></div><div><p className="eyebrow">Local mart</p><p className="mt-2 font-mono text-xs">{x[2]}</p></div><div><p className="eyebrow">BI signals</p><p className="mt-2 text-xs leading-5 text-black/55">{x[3]}</p></div></div></article>)}</section><section className="panel"><p className="eyebrow">Shared identifiers</p><h4 className="mt-1">The cross-department join spine</h4><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{["title_id","arc_id","character_id","user_id"].map(x=><div className="data-card" key={x}><span>Shared</span><strong className="font-mono">{x}</strong></div>)}</div></section></>;
}

function Analytics() {
  return <><Intro eyebrow="Analytics" title="Warehouse measures" body="Analytical views use the warehouse as the source of truth. No trend or forecast is displayed when the underlying facts are absent."/><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><Kpi label="Revenue" value="—" detail="Awaiting fact_sales"/><Kpi label="View completion" value="—" detail="Awaiting fact_views"/><Kpi label="Content coverage" value="0" detail="No warehouse titles"/><Kpi label="Subscriber events" value="0" detail="fact_subs"/></div><section className="panel"><p className="eyebrow">Readiness</p><h4 className="mt-1">What can be answered now</h4>{["Revenue / sales","View completion","Subscription volume","Cross-department conversion","Velocity / growth rate","Demographic segmentation","Sentiment analysis"].map((x,i)=><div className="health-row mt-2" key={x}><span>{x}</span><b>{i<3?<><CheckCircle2 size={13} className="text-emerald-600"/>Schema ready</>:<><CircleAlert size={13} className="text-amber-600"/>Needs data / deferred</>}</b></div>)}</section></>;
}

function System() {
  return <><Intro eyebrow="System" title="Central control and readiness" body="Admin coordinates the warehouse, BI interpretation and system health while operational organizations remain separated."/><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{[["Admin Vercel",true,"Production project"],["Admin Supabase",true,"ACTIVE_HEALTHY"],["Warehouse schema",true,"8 tables verified"],["ETL",false,"Not implemented"]].map(x=><div className="panel" key={x[0]}><div className="flex justify-between"><strong className="text-xs">{x[0]}</strong>{x[1]?<CheckCircle2 size={15} className="text-emerald-600"/>:<XCircle size={15} className="text-amber-600"/>}</div><p className="mt-2 text-[10px] text-black/40">{x[2]}</p></div>)}</div><section className="panel"><p className="eyebrow">Security finding</p><h4 className="mt-1">Warehouse RLS requires remediation</h4><div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4"><p className="text-xs font-semibold text-red-800">RLS is disabled on all 8 warehouse tables.</p><p className="mt-2 text-xs leading-5 text-red-800/70">Verified against the Admin Supabase project. Do not blindly enable RLS without defining the Admin authorization policies first.</p></div></section><section className="panel"><p className="eyebrow">Verified state</p><h4 className="mt-1">Central warehouse is structurally ready, data-loading is not</h4><div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4"><Kpi label="Dimension rows" value="0" detail="Verified"/><Kpi label="Fact rows" value="0" detail="Verified"/><Kpi label="ETL" value="Pending" detail="Knowledge base status"/><Kpi label="BI shell" value="Ready" detail="This dashboard"/></div></section></>;
}
