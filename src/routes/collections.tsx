import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { categories, products } from "@/data/products";
import { ProductGrid } from "@/components/store/ProductGrid";
import { cn } from "@/lib/utils";

type Search = { category?: string | undefined };
export const Route = createFileRoute("/collections")({
  validateSearch: (search: Record<string, unknown>): Search => ({ category: typeof search["category"] === "string" ? search["category"] : undefined }),
  head: () => ({ meta: [{ title: "Sarees | The Saree Edit" }, { name: "description", content: "Browse sarees and order directly on WhatsApp." }] }), component: Collections,
});
function Collections() {
  const search = Route.useSearch(); const navigate = Route.useNavigate();
  const filtered = useMemo(() => products.filter((product) => !search.category || product.category === search.category), [search.category]);
  const select = (category?: string) => navigate({ to: ".", search: category ? { category } : {} });
  return <div className="mx-auto max-w-[1400px] px-4 pb-20 pt-24 md:px-8 md:pt-32"><p className="eyebrow">Saree collection</p><h1 className="mt-2 font-display text-4xl md:text-6xl">Find your next saree</h1><p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">Choose a style, then message us on WhatsApp to ask about price and availability.</p><div className="mt-8 flex flex-wrap gap-2"><button type="button" onClick={() => select()} className={cn("min-h-11 border px-5 text-xs uppercase tracking-[0.14em]", !search.category ? "border-primary bg-primary text-primary-foreground" : "border-border")}>All sarees</button>{categories.map((category) => <button key={category} type="button" onClick={() => select(search.category === category ? undefined : category)} className={cn("min-h-11 border px-5 text-xs uppercase tracking-[0.14em]", search.category === category ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary")}>{category}</button>)}</div><p className="mt-8 text-xs uppercase tracking-[0.15em] text-muted-foreground">{filtered.length} {filtered.length === 1 ? "saree" : "sarees"}</p><div className="mt-7"><ProductGrid products={filtered} /></div></div>;
}
