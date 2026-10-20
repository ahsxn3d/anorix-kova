"use client";
import { useState } from "react";
const cards = [
  { h: "Product", bg: "bg-gradient-to-br from-[#f4effc] to-[#cfc3ee] text-ink", links: [["Cards", "/cards"], ["Plans & pricing", "/pricing"], ["Send money", "/send"], ["The app", "/app"]] },
  { h: "Company", bg: "bg-gradient-to-br from-[#4a3a66] to-[#17121f] text-cream", links: [["About", "/about"], ["Security", "/security"], ["FAQ", "/faq"], ["Contact", "/contact"]] },
  { h: "Get Kova", bg: "bg-gradient-to-br from-[#ff8a5c] to-[#ff3d24] text-ink", links: [] as string[][] },
];
export default function StackFooter() {
  const [open, setOpen] = useState(false);
  return (
    <footer className="relative overflow-hidden bg-ink pb-36 pt-[clamp(80px,10vw,140px)] text-cream">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5"><h2 className="display text-[clamp(56px,7vw,120px)]">Go borderless.</h2><p className="mt-6 max-w-[38ch] text-[17px] text-cream/70">Open an account in four minutes with a passport and a selfie. Tap the cards to fan them open.</p>
          <button onClick={() => setOpen(!open)} className="pill mt-8 bg-cream text-ink">{open ? "Stack the cards" : "Fan the cards"}</button></div>
        <div className="relative h-[520px] [perspective:1400px] lg:col-span-7" onMouseEnter={() => setOpen(true)} onClick={() => setOpen(true)}>
          {cards.map((c, i) => { const t = open ? `translate3d(${(i - 1) * 34}%, ${(i === 1 ? -6 : 4)}%, ${i * 10}px) rotateZ(${(i - 1) * 9}deg) rotateX(8deg)` : `translate3d(0, ${(2 - i) * -5}%, ${i * 10}px) rotateZ(${-10 + i * 4}deg) rotateX(48deg)`;
            return (<div key={c.h} style={{ transform: t, zIndex: i }} className={`absolute left-1/2 top-1/2 -ml-[min(170px,40vw)] -mt-[min(107px,25vw)] flex aspect-[1.586] w-[min(340px,80vw)] flex-col justify-between rounded-[22px] p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)] transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] ${c.bg}`}>
              <div className="flex items-start justify-between"><span className="display text-[26px]">kova</span><span className="text-[12px] uppercase tracking-[.14em] opacity-70">{c.h}</span></div>
              {c.links.length ? <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[15px] font-medium">{c.links.map(([l, h]) => <li key={h}><a href={h} tabIndex={open ? 0 : -1} className="underline-offset-4 hover:underline">{l}</a></li>)}</ul>
                : <div className="flex flex-wrap gap-2">{["App Store", "Google Play"].map((s) => <a key={s} href="/app" className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[13px] text-cream"><span className="h-3.5 w-3.5 rounded-[4px] bg-cream" />{s} · soon</a>)}</div>}
              <span className="font-mono text-[12px] opacity-60">•••• {["2026", "4821", "0042"][i]}</span></div>); })}
        </div>
      </div>
      <div className="wrap mt-16 flex flex-col justify-between gap-3 border-t border-cream/10 pt-8 text-[13px] text-cream/55 md:flex-row"><span>© 2026 Kova. A concept project by Anorix, not a real financial institution.</span><span>Designed &amp; built by Anorix</span></div>
    </footer>);
}
