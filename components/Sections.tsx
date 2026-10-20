"use client";
import dynamic from "next/dynamic";
const Card3D = dynamic(() => import("./Card3D"), { ssr: false });
import { Arrow, Marquee } from "./kit/ui";

const cur = [["EUR", "€"], ["USD", "$"], ["GBP", "£"], ["PKR", "₨"], ["AED", "د.إ"], ["JPY", "¥"], ["TRY", "₺"], ["INR", "₹"], ["CHF", "₣"], ["SAR", "﷼"], ["CAD", "$"], ["SGD", "$"]];
export function Currencies() {
  return (
    <section id="fx" className="relative overflow-hidden bg-lilac py-[clamp(88px,10vw,150px)]">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[13px] uppercase tracking-[0.14em] text-mute">Real rates</p>
          <h2 className="display mt-5 text-[clamp(48px,6vw,96px)]" data-reveal="lines">Swap at the<br />rate you see.</h2>
          <p className="mt-6 max-w-[40ch] text-[17px] leading-relaxed text-ink/70" data-fade>The mid-market rate plus one flat, visible margin. No weekend mark-ups, no hidden spread, no math homework.</p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7" data-fade>
          <div className="card-ui p-6 md:p-8">
            {[["You send", "1,000.00", "EUR"], ["They get", "3,24,180", "PKR"]].map(([l, v, c], i) => (
              <div key={l} className={`flex items-center justify-between rounded-[20px] bg-cream p-5 ${i ? "mt-3" : ""}`}>
                <div><p className="text-[13px] text-mute">{l}</p><p className="display mt-1 text-[clamp(32px,4vw,52px)]">{v}</p></div>
                <span className="rounded-full bg-ink px-4 py-2 text-[14px] font-semibold text-cream">{c}</span>
              </div>
            ))}
            <div className="mt-5 grid grid-cols-3 gap-3 text-[13px]">
              {[["Rate", "324.18"], ["Fee", "€2.00"], ["Arrives", "Seconds"]].map(([a, b]) => <div key={a} className="rounded-2xl border border-ink/10 p-3"><p className="text-mute">{a}</p><p className="mt-1 font-semibold">{b}</p></div>)}
            </div>
            <a href="/send" className="pill mt-5 w-full justify-center bg-flare text-ink">Open the calculator <Arrow /></a>
          </div>
        </div>
      </div>
      <div className="mt-16 space-y-3 text-[clamp(20px,2.4vw,32px)] font-semibold">
        <Marquee items={cur.slice(0, 6).map(([c, s]) => `${s} ${c}`)} />
        <div className="[&_.kit-marquee]:[animation-direction:reverse]"><Marquee items={cur.slice(6).map(([c, s]) => `${s} ${c}`)} /></div>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section id="features" className="bg-cream py-[clamp(88px,10vw,150px)]">
      <div className="wrap">
        <h2 className="display max-w-[14ch] text-[clamp(48px,6vw,96px)]" data-reveal="lines">Everything a passport-heavy life needs.</h2>
        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <article className="card-ui relative overflow-hidden md:col-span-4 md:row-span-2" data-fade>
            <div data-clip className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[560px]">
              <div className="absolute inset-0 bg-[#e4e1ef]"><Card3D mode="single" finish="flare" z={3} /></div>
            </div>
            <div className="absolute left-6 top-6 max-w-[300px]"><h3 className="display text-[40px]">A card that travels light.</h3><p className="mt-2 text-[15px] text-ink/70">Virtual in a tap, metal in a week.</p></div>
          </article>
          <article className="card-ui p-6 md:col-span-2" data-fade data-delay="0.1">
            <h3 className="display text-[30px]">Send in seconds</h3>
            <ul className="mt-5 space-y-2 text-[14px]">{[["Ammi", "PKR", "9s"], ["Lea", "EUR", "4s"], ["Omar", "AED", "12s"]].map(([n, c, t]) => <li key={n} className="flex items-center justify-between rounded-2xl bg-cream px-4 py-3"><span className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-flare text-[12px] font-bold">{n[0]}</span>{n} · {c}</span><span className="text-[#1f8a55]">✓ {t}</span></li>)}</ul>
          </article>
          <article className="card-ui p-6 md:col-span-2" data-fade data-delay="0.2">
            <h3 className="display text-[30px]">Bank-grade, quietly</h3>
            <svg viewBox="0 0 200 120" className="mt-4 h-[120px] w-full" aria-hidden="true"><path d="M100 10 L160 32 V64 C160 92 132 108 100 116 C68 108 40 92 40 64 V32Z" fill="#17121f" /><path d="m76 62 16 16 32-32" fill="none" stroke="#ff5a36" strokeWidth="8" strokeLinecap="round" /></svg>
            <p className="mt-3 text-[14px] text-ink/70">Licensed e-money institution. Freeze, limits and 3-D Secure in one tap.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function Showcase() {
  return (
    <section id="cards" className="relative bg-ink text-cream">
      <div data-clip className="relative h-[90svh] min-h-[560px] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#2a1f3d,#17121f_70%)]"><Card3D mode="stack" z={4.2} /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <div className="wrap absolute inset-x-0 bottom-0 pb-14">
          <h2 className="display max-w-[12ch] text-[clamp(52px,8vw,132px)]" data-reveal="lines">Four finishes. One account.</h2>
          <div className="mt-8 flex flex-wrap gap-3">{[["Flare", "#ff5a36"], ["Plum", "#2a1f3d"], ["Lilac", "#e9e3f7"], ["Cream", "#f1ece4"]].map(([n, c]) => <span key={n} className="flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-[14px]"><span className="h-4 w-4 rounded-full border border-cream/30" style={{ background: c }} />{n}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="bg-flare py-[clamp(88px,10vw,150px)] text-ink">
      <div className="wrap grid gap-10 md:grid-cols-3">
        {[["People moving money"], ["Sent across borders"], ["Average app rating"]].map(([l]) => (
          <div key={l} className="border-t border-ink/25 pt-6" data-fade>
            <p className="display text-[clamp(84px,10vw,160px)] text-ink/35" aria-label={`${l}: placeholder until launch`}>—</p>
            <p className="mt-2 text-[17px]">{l}</p>
            <p className="mono mt-1 text-[12px] uppercase tracking-[.12em] text-ink/60">Placeholder · real figure at launch</p>
          </div>
        ))}
      </div>
      <div className="wrap mt-16 grid items-center gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="display text-[clamp(30px,3.6vw,56px)]" data-reveal="words">Paid in one currency, living in another. One app for all of it.</p>
          <p className="mt-6 max-w-[520px] text-[17px] text-ink/75">Customer stories go here once Kova has customers. This is a concept; we don&apos;t publish quotes from people who don&apos;t exist.</p>
        </div>
        <div data-clip className="relative aspect-[4/3] overflow-hidden rounded-[32px] md:col-span-5"><div className="absolute inset-0 bg-[#ffd2c4]"><Card3D mode="phone" finish="metal" z={3.4} /></div></div>
      </div>
    </section>
  );
}

