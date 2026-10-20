import { Head } from "@/components/UI";
import Calc from "@/components/Calc";
export const metadata = { title: "Send money — Kova" };
export default function Page() { return (<main><Head k="Send" title={<>See it before<br />you <span className="text-flare">send it.</span></>} lead="Pick an amount and two currencies. The rate, the fee and what arrives are all on screen before you confirm." />
  <section className="bg-cream pb-[clamp(80px,10vw,140px)]"><div className="wrap grid gap-10 lg:grid-cols-12"><div className="lg:col-span-6"><Calc /></div>
    <div className="space-y-4 lg:col-span-5 lg:col-start-8">{[["Mid-market rate", "The rate banks use with each other. We add one flat 0.35% margin and show it."], ["No weekend mark-up", "Same margin on a Sunday night as on a Tuesday morning."], ["Seconds between Kova users", "Bank transfers show an estimated arrival before you send."]].map(([h, p]) => <div key={h} className="card-ui p-6"><p className="display text-[28px]">{h}</p><p className="mt-2 text-[15px] text-ink/65">{p}</p></div>)}</div></div></section></main>); }
