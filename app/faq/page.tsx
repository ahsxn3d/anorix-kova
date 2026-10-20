import { Head } from "@/components/UI";
import Faq from "@/components/Faq";
export const metadata = { title: "FAQ — Kova" };
export default function Page() { return <main><Head k="FAQ" title={<>Good<br /><span className="text-flare">questions.</span></>} /><section className="bg-cream pb-40"><div className="wrap max-w-[960px]"><Faq /></div></section></main>; }
