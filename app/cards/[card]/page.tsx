import { notFound } from "next/navigation";
import C3 from "@/components/Card3DClient";
import AddBag from "@/components/AddBag";
import { products, getProduct } from "@/lib/data";
import { money } from "@/lib/commerce/money";
export function generateStaticParams() { return products.map((p) => ({ card: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ card: string }> }) { const p = getProduct((await params).card); return { title: `${p?.name ?? "Card"} — Kova` }; }
export default async function Page({ params }: { params: Promise<{ card: string }> }) {
  const p = getProduct((await params).card); if (!p) notFound(); const others = products.filter((x) => x.slug !== p.slug);
  return (<main className="bg-cream">
    <section className="wrap grid gap-8 pb-16 pt-28 lg:grid-cols-12 lg:items-center">
      <div className={`relative h-[56vh] min-h-[380px] overflow-hidden rounded-[36px] lg:col-span-7 lg:h-[76vh] ${p.finish === "ink" ? "bg-[#2a2433]" : p.finish === "metal" ? "bg-[#d9d2e6]" : p.finish === "lilac" ? "bg-lilac" : "bg-[#ffd2c4]"}`}><C3 mode="single" finish={p.finish} z={3.5} /><span className="absolute bottom-5 left-5 rounded-full bg-paper/90 px-3 py-1.5 text-[12px]">Live 3D · drag to turn</span></div>
      <div className="lg:col-span-5"><p className="text-[13px] uppercase tracking-[.14em] text-mute">{p.kind}</p><h1 className="display mt-3 text-[clamp(52px,6vw,96px)]">{p.name}</h1><p className="mt-5 text-[18px] leading-relaxed text-ink/70">{p.body}</p>
        <div className="mt-8 flex items-end gap-3"><span className="display text-[56px] leading-none">{p.price ? money(p.price) : "Free"}</span><span className="pb-2 text-[15px] text-mute">{p.price ? p.per : "with any account"}</span></div>
        <div className="mt-8 flex flex-wrap gap-3"><AddBag slug={p.slug} /><a href="/pricing" className="pill border border-ink/15">Compare</a></div>
        <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">{p.specs.map(([a, b]) => <li key={a} className="flex justify-between py-3.5 text-[15px]"><span className="text-mute">{a}</span><span className="font-medium">{b}</span></li>)}</ul>
        <ul className="mt-6 flex flex-wrap gap-2">{p.perks.map((x) => <li key={x} className="rounded-full bg-paper px-4 py-2 text-[14px]">{x}</li>)}</ul></div></section>
    <section className="wrap pb-[clamp(80px,10vw,140px)]"><h2 className="display text-[clamp(36px,4vw,60px)]">Also in Kova</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{others.map((o) => <a key={o.slug} href={`/cards/${o.slug}`} className="card-ui p-6 transition-transform hover:-translate-y-1"><p className="text-[13px] text-mute">{o.kind}</p><p className="display mt-2 text-[30px]">{o.name}</p><p className="mt-1 text-[14px] text-ink/65">{o.line}</p></a>)}</div></section></main>);
}
