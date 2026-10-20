import { Head } from "@/components/UI";
import C3 from "@/components/Card3DClient";
import { products } from "@/lib/data";
import { money } from "@/lib/commerce/money";
export const metadata = { title: "Cards & accounts — Kova" };
const bgs = ["bg-[#ffd2c4]", "bg-[#d9d2e6]", "bg-lilac", "bg-[#2a2433]"];
export default function Page() {
  return (<main><Head k="Cards" title={<>Pick your<br /><span className="text-flare">card.</span></>} lead="Two cards, one plan and one business account. Same app, same rates, same freeze button." />
    <section className="bg-cream pb-[clamp(80px,10vw,140px)]"><div className="wrap grid gap-5 md:grid-cols-2">{products.map((p, i) => <a key={p.slug} href={`/cards/${p.slug}`} className="card-ui group overflow-hidden">
      <div className={`relative h-[300px] md:h-[360px] ${bgs[i]}`}><C3 mode="single" finish={p.finish} z={3.1} /></div>
      <div className="flex items-end justify-between gap-6 p-7"><div><p className="text-[13px] uppercase tracking-[.14em] text-mute">{p.kind}</p><h2 className="display mt-2 text-[40px]">{p.name}</h2><p className="mt-1 text-[15px] text-ink/65">{p.line}</p></div>
        <div className="text-right"><p className="display text-[34px]">{p.price ? money(p.price) : "Free"}</p><p className="text-[13px] text-mute">{p.price ? p.per : "with any account"}</p></div></div></a>)}</div></section></main>);
}
