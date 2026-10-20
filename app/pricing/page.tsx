import { Head } from "@/components/UI";
import AddBag from "@/components/AddBag";
import { products } from "@/lib/data";
import { money } from "@/lib/commerce/money";
export const metadata = { title: "Plans & pricing — Kova" };
const rows: [string, string[]][] = [["Hold balances", ["10", "10", "40", "40"]], ["Local account details", ["—", "—", "5 currencies", "5 currencies"]], ["FX margin", ["0.5%", "0.5%", "0.35%", "0.35%"]], ["Free ATM / month", ["€200", "€600", "€400", "€400"]], ["Team cards", ["—", "—", "—", "Up to 10"]]];
export default function Page() {
  return (<main><Head k="Plans" title={<>Fees you can<br /><span className="text-flare">read.</span></>} lead="Every fee is shown before you confirm. These are demo prices for a concept app." tone="lilac" />
    <section className="bg-lilac pb-16"><div className="wrap grid gap-4 md:grid-cols-4">{products.map((p, i) => <div key={p.slug} className={`flex flex-col rounded-[28px] p-7 ${i === 2 ? "bg-ink text-cream" : "bg-paper"}`}><p className="text-[13px] uppercase tracking-[.14em] opacity-60">{p.kind}</p><h2 className="display mt-2 text-[34px]">{p.name}</h2><p className="display mt-6 text-[52px] leading-none">{p.price ? money(p.price) : "Free"}</p><p className="text-[14px] opacity-60">{p.price ? p.per : "always"}</p><p className="mt-5 text-[15px] opacity-75">{p.line}</p><div className="mt-auto pt-8"><AddBag slug={p.slug} className={`pill w-full justify-center ${i === 2 ? "bg-flare text-ink" : "bg-ink text-cream"}`} /></div></div>)}</div></section>
    <section className="bg-cream py-[clamp(64px,8vw,120px)]"><div className="wrap overflow-x-auto"><table className="w-full min-w-[720px] text-left text-[15px]"><thead><tr className="border-b border-ink/15"><th className="py-4 font-medium text-mute">Compare</th>{products.map((p) => <th key={p.slug} className="display py-4 text-[20px]">{p.name}</th>)}</tr></thead>
      <tbody>{rows.map(([k, v]) => <tr key={k} className="border-b border-ink/10"><td className="py-4 text-mute">{k}</td>{v.map((x, i) => <td key={i} className="py-4 font-medium">{x}</td>)}</tr>)}</tbody></table></div></section></main>);
}
