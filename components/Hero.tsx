"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lazy3D from "./kit/Lazy3D";
import { Arrow } from "./kit/ui";
const CardScene = dynamic(() => import("./CardScene"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  useEffect(() => {
    const st = ScrollTrigger.create({ trigger: root.current, start: "top top", end: "bottom top", onUpdate: (s) => { progress.current = s.progress; } });
    return () => st.kill();
  }, []);
  return (
    <section ref={root} className="relative overflow-clip bg-cream pt-28 md:pt-32">
      <div className="wrap grid items-center gap-8 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-6">
          <p className="kit-soft inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-[13px]"><span className="h-2 w-2 rounded-full bg-flare kit-pulse" /> Now in 34 countries</p>
          <h1 className="display mt-6 text-[clamp(60px,9vw,150px)]">
            {["Money,", "minus the", "borders."].map((l, i) => <span key={l} className="kit-mask"><span className={`kit-line ${i === 2 ? "text-flare" : ""}`} style={{ animationDelay: `${0.1 + i * 0.09}s` }}>{l}</span></span>)}
          </h1>
          <p className="kit-soft mt-7 max-w-[440px] text-[18px] leading-relaxed text-ink/70">Hold, spend and send 40+ currencies from one account and one card. Real exchange rates, no surprise fees, built for lives that cross borders.</p>
          <div className="kit-soft mt-9 flex flex-wrap gap-3">
            <a href="#get" className="pill bg-ink text-cream">Get the app <Arrow /></a>
            <a href="#app" className="pill border border-ink/15">See it fold</a>
          </div>
        </div>
        <div className="relative h-[52vh] min-h-[380px] lg:col-span-6 lg:h-[78vh]">
          <div className="absolute inset-0 overflow-hidden rounded-[36px] bg-[#ebe4da]">
            <Lazy3D poster="/img/kova-hero.webp" priority eager render={({ onReady, running }) => <CardScene progress={progress} running={running} onReady={onReady} />} />
          </div>
          <div className="absolute bottom-5 left-5 rounded-[20px] bg-paper/95 p-4 shadow-xl" data-fade data-delay="0.8">
            <p className="text-[12px] text-mute">You send</p><p className="display text-[28px]">€1,000.00</p>
            <p className="mt-1 text-[12px] text-mute">Ammi gets <b className="text-ink">₨ 3,24,180</b> · in 9 sec</p>
          </div>
        </div>
      </div>
      <div className="wrap mt-14 grid grid-cols-2 gap-6 border-t border-ink/10 py-8 md:grid-cols-4">
        {[["2.1M", "people on Kova"], ["40+", "currencies"], ["0.2%", "flat FX margin"], ["9 sec", "median transfer"]].map(([a, b]) => <div key={b}><p className="display text-[clamp(32px,3.4vw,48px)]">{a}</p><p className="text-[14px] text-mute">{b}</p></div>)}
      </div>
    </section>
  );
}
