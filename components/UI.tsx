export function Head({ k, title, lead, tone = "cream" }: { k: string; title: React.ReactNode; lead?: string; tone?: "cream" | "plum" | "lilac" }) {
  const bg = tone === "plum" ? "bg-plum text-cream" : tone === "lilac" ? "bg-lilac text-ink" : "bg-cream text-ink";
  return (<section className={`${bg} pb-[clamp(48px,6vw,90px)] pt-[clamp(120px,12vw,170px)]`}><div className="wrap"><p className="text-[13px] uppercase tracking-[.14em] opacity-60">{k}</p><h1 className="display mt-5 text-[clamp(56px,8.4vw,140px)]">{title}</h1>{lead && <p className="mt-6 max-w-[52ch] text-[18px] leading-relaxed opacity-75">{lead}</p>}</div></section>);
}
