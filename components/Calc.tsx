"use client";
import { useMemo, useState } from "react";
import { rates, MARGIN } from "@/lib/data";
const fmt = (n: number, c: string) => new Intl.NumberFormat("en-US", { style: "currency", currency: c, maximumFractionDigits: c === "JPY" || c === "PKR" ? 0 : 2 }).format(n);
export default function Calc() {
  const [amt, setAmt] = useState("1000"), [from, setFrom] = useState("EUR"), [to, setTo] = useState("PKR"), [sent, setSent] = useState(false);
  const r = useMemo(() => { const a = Math.max(0, parseFloat(amt) || 0), mid = rates[to] / rates[from], fee = a * MARGIN, get = (a - fee) * mid; return { a, mid, fee, get, bank: a * mid * .965 }; }, [amt, from, to]);
  const cur = Object.keys(rates), sel = "rounded-full bg-ink px-4 py-2.5 text-[15px] font-semibold text-cream outline-none";
  return (<div className="card-ui p-6 md:p-8">
    <label className="flex items-center justify-between rounded-[20px] bg-cream p-5"><span><span className="block text-[13px] text-mute">You send</span><input inputMode="decimal" value={amt} onChange={(e) => { setAmt(e.target.value.replace(/[^\d.]/g, "")); setSent(false); }} className="display mt-1 w-full bg-transparent text-[clamp(32px,4vw,52px)] outline-none" aria-label="Amount to send" /></span><select aria-label="From currency" value={from} onChange={(e) => setFrom(e.target.value)} className={sel}>{cur.map((c) => <option key={c}>{c}</option>)}</select></label>
    <button aria-label="Swap currencies" onClick={() => { setFrom(to); setTo(from); }} className="mx-auto -my-3 relative z-10 grid h-10 w-10 place-items-center rounded-full bg-flare text-ink">⇅</button>
    <div className="flex items-center justify-between rounded-[20px] bg-cream p-5"><span><span className="block text-[13px] text-mute">They get</span><span className="display mt-1 block text-[clamp(32px,4vw,52px)]">{fmt(r.get, to)}</span></span><select aria-label="To currency" value={to} onChange={(e) => setTo(e.target.value)} className={sel}>{cur.map((c) => <option key={c}>{c}</option>)}</select></div>
    <div className="mt-5 grid grid-cols-3 gap-3 text-[13px]">{[["Rate", r.mid.toFixed(r.mid > 10 ? 2 : 4)], ["Fee (0.35%)", fmt(r.fee, from)], ["Arrives", "Seconds"]].map(([a, b]) => <div key={a} className="rounded-2xl border border-ink/10 p-3"><p className="text-mute">{a}</p><p className="mt-1 font-semibold">{b}</p></div>)}</div>
    <p className="mt-4 text-[13px] text-mute">A typical bank at a 3.5% spread would give about <b className="text-ink">{fmt(r.bank, to)}</b>.</p>
    <button onClick={() => setSent(true)} className="pill mt-5 w-full justify-center bg-flare text-ink">{sent ? "Demo transfer queued ✓" : "Send (demo)"}</button>
    <p className="mt-3 text-center text-[12px] text-mute">Illustrative rates, not live. No money moves.</p></div>);
}
