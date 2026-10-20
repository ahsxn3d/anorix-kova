import { Head } from "@/components/UI";
import Contact from "@/components/Contact";
export const metadata = { title: "Contact — Kova" };
export default function Page() { return <main><Head k="Contact" title={<>Talk to<br /><span className="text-flare">a human.</span></>} lead="In the real app, support lives behind the chat bubble. Here, it's a form." /><section className="bg-cream pb-40"><div className="wrap max-w-[960px]"><Contact /></div></section></main>; }
