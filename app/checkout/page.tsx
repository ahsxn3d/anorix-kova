import Checkout from "@/components/Checkout";
export const metadata = { title: "Checkout — Kova" };
export default function Page() { return <main className="min-h-[70svh] bg-cream pb-40 pt-[clamp(110px,11vw,160px)]"><div className="wrap"><h1 className="display mb-10 text-[clamp(56px,8vw,128px)]">Checkout.</h1><Checkout /></div></main>; }
