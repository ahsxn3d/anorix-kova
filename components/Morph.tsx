"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const tx = [["Rent · Lisbon", "−€1,450.00", "EUR"], ["Freelance · Acme Ltd", "+$4,200.00", "USD"], ["Groceries · Lidl", "−€62.18", "EUR"], ["Transfer to Ammi", "−₨45,000", "PKR"], ["Coffee · Monmouth", "−£3.60", "GBP"]];
const bal = [["EUR", "€8,214.50", 62], ["USD", "$3,980.12", 30], ["GBP", "£612.00", 8]];

function Desktop() {
  return (
    <div className="grid h-full grid-cols-[200px_1fr_300px] gap-5 p-6 text-ink">
      <aside className="rounded-[20px] bg-cream p-5">
        <p className="display text-[26px]">kova</p>
        <ul className="mt-8 space-y-1 text-[14px]">{["Home", "Accounts", "Cards", "Send", "Insights", "Settings"].map((l, i) => <li key={l} className={`rounded-xl px-3 py-2 ${i === 0 ? "bg-ink text-cream" : "text-ink/70"}`}>{l}</li>)}</ul>
      </aside>
      <section className="flex flex-col gap-5">
        <div className="rounded-[20px] bg-cream p-6">
          <p className="text-[13px] text-mute">Total balance</p>
          <p className="display mt-2 text-[56px]">€12,806.62</p>
          <svg viewBox="0 0 500 90" className="mt-3 h-[90px] w-full"><path d="M0 70 C60 66 90 40 150 46 S260 20 320 30 S430 8 500 12" fill="none" stroke="#ff5a36" strokeWidth="3" /><path d="M0 70 C60 66 90 40 150 46 S260 20 320 30 S430 8 500 12 L500 90 L0 90Z" fill="#ff5a36" opacity=".1" /></svg>
        </div>
        <div className="flex-1 rounded-[20px] bg-cream p-5">
          <p className="text-[13px] text-mute">Recent</p>
          <ul className="mt-3">{tx.map(([a, b, c]) => <li key={a} className="flex items-center justify-between border-b border-ink/5 py-2.5 text-[14px] last:border-0"><span className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-lilac text-[10px] font-semibold">{c}</span>{a}</span><span className={b.startsWith("+") ? "text-[#1f8a55]" : ""}>{b}</span></li>)}</ul>
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <div className="aspect-[1.58] rounded-[18px] bg-gradient-to-br from-[#ff7a52] to-[#ff3d24] p-5 text-[#fff4ec]"><p className="display text-[22px]">kova</p><p className="mt-14 font-mono text-[13px]">•••• 4821</p></div>
        <div className="flex-1 rounded-[20px] bg-cream p-5">
          <p className="text-[13px] text-mute">Currencies</p>
          {bal.map(([c, v, w]) => <div key={c} className="mt-4"><div className="flex justify-between text-[14px]"><span>{c}</span><span>{v}</span></div><div className="mt-2 h-1.5 rounded-full bg-ink/10"><div className="h-1.5 rounded-full bg-ink" style={{ width: `${w}%` }} /></div></div>)}
        </div>
      </section>
    </div>
  );
}

function Phone() {
  return (
    <div className="flex h-full flex-col gap-3 p-5 text-ink">
      <div className="flex items-center justify-between"><p className="display text-[22px]">kova</p><span className="h-8 w-8 rounded-full bg-lilac" /></div>
      <div className="rounded-[18px] bg-cream p-4"><p className="text-[12px] text-mute">Total balance</p><p className="display mt-1 text-[34px]">€12,806.62</p></div>
      <div className="grid grid-cols-3 gap-2">{["Send", "Add", "Swap"].map((l) => <span key={l} className="rounded-2xl bg-ink py-3 text-center text-[12px] font-semibold text-cream">{l}</span>)}</div>
      <div className="aspect-[1.58] rounded-[16px] bg-gradient-to-br from-[#ff7a52] to-[#ff3d24] p-4 text-[#fff4ec]"><p className="display text-[18px]">kova</p><p className="mt-8 font-mono text-[11px]">•••• 4821</p></div>
      <ul className="flex-1 rounded-[18px] bg-cream px-4 py-2">{tx.slice(0, 4).map(([a, b]) => <li key={a} className="flex justify-between border-b border-ink/5 py-2 text-[12px] last:border-0"><span>{a}</span><span>{b}</span></li>)}</ul>
    </div>
  );
}

export default function Morph() {
  const root = useRef<HTMLElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Fit the fixed 1100x700 stage into its column (and the viewport height) so the phone inset never collapses.
    const b = box.current, st = stage.current; if (!b || !st) return;
    const fit = () => { const s = Math.min(1, b.clientWidth / 1100, (window.innerHeight * 0.82) / 700); st.style.transform = `translateX(-50%) scale(${s})`; b.style.height = `${700 * s}px`; };
    fit(); const ro = new ResizeObserver(fit); ro.observe(b); window.addEventListener("resize", fit);
    return () => { ro.disconnect(); window.removeEventListener("resize", fit); };
  }, []);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: true } });
      // frame: 1100x700. phone = 340 wide -> inset 380px each side. One transform driver per element.
      tl.fromTo(".m-frame", { clipPath: "inset(0px 0px 0px 0px round 28px)" }, { clipPath: "inset(0px 380px 0px 380px round 48px)", ease: "power2.inOut", duration: 1 }, 0.15)
        .to(".m-desk", { opacity: 0, scale: 0.92, duration: 0.45, ease: "power1.in" }, 0.25)
        .fromTo(".m-phone", { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, 0.6)
        .fromTo(".m-step", { opacity: 0.25 }, { opacity: 1, stagger: 0.35, duration: 0.2 }, 0)
        .fromTo(".m-side", { x: -40, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.15, duration: 0.3 }, 0.8);
    });
    return () => mm.revert();
  }, []);
  return (
    <section ref={root} id="app" className="relative bg-plum text-cream lg:h-[240vh]">
      <div className="wrap grid gap-10 py-24 lg:sticky lg:top-0 lg:h-[100svh] lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-0">
        <div className="lg:col-span-3">
          <p className="text-[13px] uppercase tracking-[0.14em] text-cream/60">One account, every screen</p>
          <h2 className="display mt-5 text-[clamp(44px,5vw,76px)]" data-reveal="lines">Desk to pocket.</h2>
          <ol className="mt-8 space-y-4 text-[15px]">
            {["Full dashboard on desktop", "Same balances, same cards", "Folds into the app as you move"].map((t, i) => <li key={t} className="m-step flex gap-3"><span className="text-flare">0{i + 1}</span>{t}</li>)}
          </ol>
        </div>
        <div className="relative lg:col-span-9">
          <div ref={box} className="relative hidden w-full lg:block">
          <div ref={stage} className="absolute left-1/2 top-0 h-[700px] w-[1100px] origin-top">
            <div className="m-frame absolute inset-0 overflow-hidden bg-paper">
              <div className="m-desk absolute inset-0"><Desktop /></div>
              <div className="m-phone absolute inset-y-0 left-[380px] w-[340px] opacity-0"><Phone /></div>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[340px] flex-col justify-center gap-4 lg:flex">
              {[["Instant", "Sends land in seconds"], ["0.2%", "Above mid-market, flat"], ["40+", "Currencies, one card"]].map(([a, b]) => <div key={a} className="m-side ml-auto w-[260px] rounded-[22px] bg-cream p-5 text-ink opacity-0"><p className="display text-[36px]">{a}</p><p className="text-[14px] text-mute">{b}</p></div>)}
            </div>
          </div>
          </div>
          <div className="mx-auto h-[640px] w-[320px] overflow-hidden rounded-[44px] border-[10px] border-ink bg-paper lg:hidden" data-fade><Phone /></div>
        </div>
      </div>
    </section>
  );
}
