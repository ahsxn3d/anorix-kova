"use client";
import { useCart } from "@/lib/commerce/cart";
import { money } from "@/lib/commerce/money";
export default function Bag() {
  const { lines, setQty, total, ready } = useCart(); if (!ready) return <div className="h-40" />;
  if (!lines.length) return <div className="card-ui p-10 text-center"><p className="display text-[40px]">Your bag is empty.</p><a href="/cards" className="pill mt-6 bg-ink text-cream">Browse cards</a></div>;
  const once = lines.filter((l) => l.opt !== "/mo").reduce((a, l) => a + l.price * l.qty, 0), mo = lines.filter((l) => l.opt === "/mo").reduce((a, l) => a + l.price * l.qty, 0);
  return (<div className="grid gap-6 lg:grid-cols-12"><ul className="space-y-3 lg:col-span-8">{lines.map((l) => <li key={l.id} className="card-ui flex items-center gap-4 p-5"><span className="display flex-1 text-[26px]">{l.name}</span>
    <span className="flex items-center rounded-full bg-cream"><button aria-label="Less" onClick={() => setQty(l.id, l.opt, l.qty - 1)} className="px-3.5 py-2">−</button><span className="w-6 text-center">{l.qty}</span><button aria-label="More" onClick={() => setQty(l.id, l.opt, l.qty + 1)} className="px-3.5 py-2">+</button></span>
    <span className="w-28 text-right font-semibold">{l.price ? `${money(l.price * l.qty)}${l.opt === "/mo" ? "/mo" : ""}` : "Free"}</span></li>)}</ul>
    <aside className="card-ui h-fit p-7 lg:col-span-4"><p className="text-[13px] uppercase tracking-[.14em] text-mute">Summary</p><div className="mt-5 flex justify-between"><span>Today</span><b>{money(once)}</b></div><div className="mt-2 flex justify-between"><span>Monthly</span><b>{money(mo)}/mo</b></div><div className="mt-4 border-t border-ink/10 pt-4 text-[13px] text-mute">Total today {money(once + mo)}</div>
      <a href="/checkout" className="pill mt-6 w-full justify-center bg-flare text-ink">Checkout</a><p className="mt-3 text-center text-[12px] text-mute">Demo store · nothing is charged</p></aside></div>);
}
