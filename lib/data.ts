import type { Finish } from "@/components/Card3D";
export type Product = { slug: string; name: string; finish: Finish; price: number; per: string; kind: string; line: string; body: string; specs: [string, string][]; perks: string[] };
export const products: Product[] = [
  { slug: "standard", name: "Kova Standard", finish: "flare", price: 0, per: "free", kind: "Card", line: "The everyday card. Virtual in a tap, plastic in the post.", body: "A recycled-PVC card in flare orange that spends from whichever balance matches the till. Add it to your phone wallet the moment you open your account.", specs: [["Material", "Recycled PVC"], ["Delivery", "Free, 3–7 days"], ["ATM", "€200/month without a fee"], ["Virtual cards", "3 included"]], perks: ["Spend in 40+ currencies", "Freeze in one tap", "Instant spend alerts"] },
  { slug: "metal", name: "Kova Metal card", finish: "metal", price: 89, per: "one-off", kind: "Card", line: "18 grams of brushed steel in deep plum.", body: "A stainless-steel core with a plum finish and a laser-etched number on the back edge. Same account, same app, heavier hello at the counter.", specs: [["Material", "Stainless steel, 18 g"], ["Delivery", "Tracked, 3–5 days"], ["ATM", "€600/month without a fee"], ["Virtual cards", "10 included"]], perks: ["Everything in Standard", "Higher free ATM limit", "Priority support in the app"] },
  { slug: "multi-currency", name: "Multi-currency plan", finish: "lilac", price: 6, per: "/mo", kind: "Plan", line: "Local account details in five currencies.", body: "Get paid like a local in EUR, USD, GBP, AED and PKR, hold up to 40 balances and swap between them at the mid-market rate plus one flat, visible margin.", specs: [["Local details", "EUR, USD, GBP, AED, PKR"], ["Balances", "Up to 40"], ["FX margin", "0.35%, shown upfront"], ["Weekend mark-up", "None"]], perks: ["Lilac card included", "Scheduled transfers", "Rate alerts"] },
  { slug: "business", name: "Business account", finish: "ink", price: 19, per: "/mo", kind: "Account", line: "For freelancers and small teams paid across borders.", body: "Invoices in any currency, cards for each teammate with their own limits, and exports your accountant will actually open.", specs: [["Team cards", "Up to 10"], ["Invoicing", "Any currency"], ["Exports", "CSV, Xero, QuickBooks"], ["Approvals", "Two-person rule option"]], perks: ["Ink card for every teammate", "Spend limits per card", "Receipt capture"] },
];
export const getProduct = (s: string) => products.find((p) => p.slug === s);
// Demo rates per 1 EUR (illustrative, not live).
export const rates: Record<string, number> = { EUR: 1, USD: 1.08, GBP: .85, PKR: 301.2, AED: 3.97, INR: 90.1, JPY: 162.4, TRY: 35.2, CAD: 1.47, SGD: 1.45 };
export const MARGIN = .0035;
export const faq: [string, string][] = [
  ["Is Kova a bank?", "No. Kova is a concept by Anorix and not a real financial institution. Nothing on this site moves real money."],
  ["What does sending cost?", "The mid-market rate plus one flat 0.35% margin, shown before you confirm. No weekend mark-ups."],
  ["How fast are transfers?", "Between Kova users, seconds. To banks, it depends on the destination; the app shows an estimate before you send."],
  ["Can I freeze my card?", "Yes, from the card screen. Unfreeze the same way. Lost cards can be replaced in two taps."],
  ["Which currencies can I hold?", "Up to 40 balances. Local account details are available for EUR, USD, GBP, AED and PKR on the Multi-currency plan."],
  ["How do I cancel?", "Plans are monthly. Cancel in the app and you keep access until the end of the period."],
];
