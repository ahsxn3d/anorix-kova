"use client";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/commerce/cart";
const I = {
  home: <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />,
  card: <><rect x="3" y="6" width="18" height="12" rx="2.5" /><path d="M3 10h18M7 15h4" /></>,
  send: <path d="M5 12h12M12 6l6 6-6 6" />,
  plan: <><circle cx="12" cy="12" r="8" /><path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1.2 0-2.2-.6-2.6-1.6M12 6.5v1.5M12 16v1.5" /></>,
  bag: <><path d="M6 8h12l-1 12H7z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
};
const items: [keyof typeof I, string, string][] = [["home", "Home", "/"], ["card", "Cards", "/cards"], ["send", "Send", "/send"], ["plan", "Plans", "/pricing"], ["bag", "Bag", "/cart"]];
export default function Dock() {
  const p = usePathname(), { count } = useCart();
  const act = (h: string) => (h === "/" ? p === "/" : p.startsWith(h));
  return (<>
    <a href="/" aria-label="Kova home" className="fixed left-[clamp(16px,3.4vw,48px)] top-5 z-50 rounded-full bg-paper/80 px-4 py-2 shadow-[0_8px_30px_-12px_rgba(23,18,31,.35)] backdrop-blur-md"><span className="display text-[24px]">kova</span></a>
    <nav aria-label="Primary" className="fixed inset-x-0 bottom-[max(14px,env(safe-area-inset-bottom))] z-50 flex justify-center px-3">
      <ul className="flex items-end gap-1 rounded-[30px] bg-ink/90 p-1.5 text-cream shadow-[0_24px_60px_-20px_rgba(23,18,31,.7)] ring-1 ring-cream/10 backdrop-blur-xl">
        {items.map(([k, l, h]) => { const on = act(h), mid = k === "send"; return (
          <li key={h}><a href={h} aria-current={on ? "page" : undefined} className={`group relative flex w-[62px] flex-col items-center gap-1 rounded-[24px] py-2 text-[10.5px] font-medium transition-colors sm:w-[72px] ${mid ? "-mt-5" : ""} ${on && !mid ? "bg-cream/12 text-cream" : "text-cream/65 hover:text-cream"}`}>
            <span className={`grid place-items-center rounded-full transition-transform duration-500 group-hover:-translate-y-0.5 ${mid ? "h-[52px] w-[52px] bg-flare text-ink shadow-[0_10px_30px_-8px_#ff5a36]" : "h-7 w-7"}`}>
              <svg viewBox="0 0 24 24" className={mid ? "h-6 w-6" : "h-[22px] w-[22px]"} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{I[k]}</svg></span>
            {l}{k === "bag" && count > 0 && <span className="absolute right-3 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-flare px-1 text-[9px] text-ink">{count}</span>}
            {on && <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-flare" />}</a></li>); })}
      </ul></nav></>);
}
