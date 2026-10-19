import Image from "next/image";
import { Arrow, Marquee } from "./kit/ui";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="wrap flex items-center justify-between pt-4">
        <a href="#" className="display rounded-full bg-paper/90 px-4 py-2 text-[24px] shadow-sm backdrop-blur" aria-label="Kova home">kova<span className="text-flare">.</span></a>
        <nav aria-label="Primary" className="hidden gap-1 rounded-full bg-paper/90 p-1 text-[14px] shadow-sm backdrop-blur md:flex">
          {[["App", "#app"], ["Currencies", "#fx"], ["Cards", "#cards"], ["Security", "#features"]].map(([l, h]) => <a key={l} href={h} className="rounded-full px-4 py-2 transition-colors hover:bg-ink hover:text-cream">{l}</a>)}
        </nav>
        <a href="#get" className="pill bg-flare !py-2.5 text-ink">Open account</a>
      </div>
    </header>
  );
}

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
            <a href="#get" className="pill mt-5 w-full justify-center bg-flare text-ink">Send now <Arrow /></a>
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
              <Image data-clip-img src="/img/kova-card.webp" alt="Kova cards in flare and plum" fill sizes="(min-width:768px) 60vw, 100vw" className="object-cover" />
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
        <Image data-clip-img src="/img/kova-stack.webp" alt="Four Kova card finishes fanned out" fill sizes="100vw" className="object-cover" />
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
        {[[2.1, "M", "people moving money", 1], [18, "B", "€ sent across borders", 0], [4.9, "★", "average app rating", 1]].map(([v, s, l, d]) => (
          <div key={l as string} className="border-t border-ink/25 pt-6" data-fade>
            <p className="display text-[clamp(84px,10vw,160px)]"><span data-count={v as number} data-dec={d as number}>0</span>{s as string}</p>
            <p className="mt-2 text-[17px]">{l as string}</p>
          </div>
        ))}
      </div>
      <div className="wrap mt-16 grid items-center gap-8 md:grid-cols-12">
        <blockquote className="display text-[clamp(30px,3.6vw,56px)] md:col-span-8" data-reveal="words">“I get paid in dollars, pay rent in euros and send home in rupees. Kova is the first app where that feels normal.”</blockquote>
        <div className="flex items-center gap-4 md:col-span-4 md:justify-end"><span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-cream display text-[22px]">S</span><div><p className="font-semibold">Sana Q.</p><p className="text-[14px] text-ink/70">Designer, Lisbon (fictional)</p></div></div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer id="get" className="bg-ink text-cream">
      <div className="wrap grid items-center gap-12 py-[clamp(88px,10vw,150px)] lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="display text-[clamp(56px,8vw,128px)]" data-reveal="chars">Go borderless.</h2>
          <p className="mt-6 max-w-[40ch] text-[17px] text-cream/70" data-fade>Open an account in four minutes with a passport and a selfie.</p>
          <div className="mt-8 flex flex-wrap gap-3" data-fade>
            {["App Store", "Google Play"].map((s) => <a key={s} href="#" className="pill border border-cream/20 bg-cream text-ink"><span aria-hidden className="h-4 w-4 rounded-[4px] bg-ink" />{s}</a>)}
          </div>
        </div>
        <div className="relative lg:col-span-6" data-fade>
          <div data-clip className="relative aspect-[4/3] overflow-hidden rounded-[32px]"><Image data-clip-img src="/img/kova-card.webp" alt="" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" /></div>
        </div>
      </div>
      <div className="wrap flex flex-col justify-between gap-3 border-t border-cream/10 py-8 text-[13px] text-cream/60 md:flex-row">
        <span>© 2026 Kova. A concept project by Anorix, not a real financial institution.</span><span>Designed &amp; built by Anorix</span>
      </div>
      <p aria-hidden className="display select-none text-center text-[30vw] leading-[.75] text-flare">kova</p>
    </footer>
  );
}
