"use client";
import { useState } from "react";
import { useCart } from "@/lib/commerce/cart";
import { money } from "@/lib/commerce/money";
export default function Checkout() {
  const { lines, total, clear, ready } = useCart(), [busy, setBusy] = useState(false), [pay, setPay] = useState("kova");
  const f = "w-full rounded-[16px] bg-cream px-4 py-3.5 text-[16px] outline-none ring-1 ring-ink/10 focus:ring-2 focus:ring-flare";
  if (ready && !lines.length) return <p>Your bag is empty. <a className="underline" href="/cards">Browse cards</a></p>;
  return (<form className="grid gap-8 lg:grid-cols-12" onSubmit={(e) => { e.preventDefault(); setBusy(true); setTimeout(() => { clear(); location.href = "/checkout/done"; }, 900); }}>
    <div className="card-ui grid gap-4 p-7 sm:grid-cols-2 lg:col-span-7"><p className="display text-[26px] sm:col-span-2">Your details</p>
      <input required placeholder="Full name (as on passport)" autoComplete="name" className={`${f} sm:col-span-2`} /><input required type="email" placeholder="Email" autoComplete="email" className={f} /><input required placeholder="Country of residence" autoComplete="country-name" className={f} />
      <input required placeholder="Delivery address" autoComplete="street-address" className={`${f} sm:col-span-2`} />
      <p className="display mt-4 text-[26px] sm:col-span-2">Pay with</p>
      <div className="flex gap-2 sm:col-span-2">{[["kova", "Kova Pay"], ["card", "Card"]].map(([k, l]) => <button type="button" key={k} onClick={() => setPay(k)} className={`pill ${pay === k ? "bg-ink text-cream" : "bg-cream"}`}>{l}</button>)}</div>
      {pay === "card" ? <><input required inputMode="numeric" placeholder="4242 4242 4242 4242" className={`${f} sm:col-span-2`} /><input required placeholder="MM / YY" className={f} /><input required placeholder="CVC" className={f} /></> : <p className="rounded-[16px] bg-lilac p-4 text-[14px] sm:col-span-2">Kova Pay: approve in the app with Face ID (demo, nothing happens).</p>}</div>
    <aside className="card-ui h-fit p-7 lg:col-span-5"><p className="display text-[26px]">Order</p><ul className="mt-4 space-y-2 text-[15px]">{lines.map((l) => <li key={l.id} className="flex justify-between"><span>{l.name} × {l.qty}</span><span>{l.price ? money(l.price * l.qty) : "Free"}</span></li>)}</ul>
      <div className="mt-5 flex justify-between border-t border-ink/10 pt-4 text-[18px] font-semibold"><span>Total today</span><span>{money(total)}</span></div>
      <button disabled={busy} className="pill mt-6 w-full justify-center bg-flare text-ink disabled:opacity-60">{busy ? "Confirming…" : "Place demo order"}</button><p className="mt-3 text-center text-[12px] text-mute">Demo checkout · no payment is taken</p></aside></form>);
}
