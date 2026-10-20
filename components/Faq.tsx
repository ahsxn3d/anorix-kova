"use client";
import { useState } from "react";
import { faq } from "@/lib/data";
export default function Faq() { const [o, setO] = useState(0); return <div className="space-y-3">{faq.map(([q, a], i) => <div key={q} className="card-ui overflow-hidden"><button aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)} className="flex w-full items-center justify-between gap-6 p-6 text-left"><span className="display text-[clamp(20px,2vw,28px)]">{q}</span><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-flare text-ink transition-transform ${o === i ? "rotate-45" : ""}`}>+</span></button>{o === i && <p className="px-6 pb-6 text-[16px] leading-relaxed text-ink/70">{a}</p>}</div>)}</div>; }
