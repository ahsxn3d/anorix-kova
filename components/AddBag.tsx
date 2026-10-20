"use client";
import { useState } from "react";
import { useCart } from "@/lib/commerce/cart";
import { getProduct } from "@/lib/data";
export default function AddBag({ slug, className = "pill bg-ink text-cream" }: { slug: string; className?: string }) {
  const { add, lines } = useCart(), [ok, setOk] = useState(false), p = getProduct(slug)!, has = lines.some((l) => l.id === slug);
  return <button onClick={() => { if (has) { location.href = "/cart"; return; } add({ id: p.slug, name: p.name, price: p.price, opt: p.per }); setOk(true); setTimeout(() => setOk(false), 1500); }} className={className}>{ok ? "Added ✓" : has ? "In your bag → view" : p.price ? "Add to bag" : "Order free card"}</button>;
}
