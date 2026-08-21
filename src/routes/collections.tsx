import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  products,
  categories,
  collections as collectionList,
  occasions,
} from "@/data/products";
import { ProductGrid } from "@/components/store/ProductGrid";
import collectionBanner from "@/assets/collection-banner.jpg";
import { cn } from "@/lib/utils";

type Search = {
  category?: string;
  collection?: string;
  occasion?: string;
};

export const Route = createFileRoute("/collections")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    category: typeof search.category === "string" ? search.category : undefined,
    collection: typeof search.collection === "string" ? search.collection : undefined,
    occasion: typeof search.occasion === "string" ? search.occasion : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Collections — Sarees & Girls Ethnic Wear | The Saree Edit" },
      {
        name: "description",
        content:
          "Browse the full boutique edit: sarees, girls' dresses and ethnic wear filtered by collection and occasion.",
      },
      { property: "og:title", content: "Collections | The Saree Edit" },
      {
        property: "og:description",
        content: "Browse sarees and girls' ethnic wear by collection and occasion.",
      },
    ],
  }),
  component: Collections,
});

function Collections() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (!search.category || p.category === search.category) &&
          (!search.collection || p.collection === search.collection) &&
          (!search.occasion || p.occasion === search.occasion),
      ),
    [search],
  );

  const setFilter = (key: keyof Search, value?: string) =>
    navigate({
      to: ".",
      search: (prev) => ({ ...prev, [key]: prev[key] === value ? undefined : value }),
    });

  const active = search.category || search.collection || search.occasion;

  const chip = (label: string, isActive: boolean, onClick: () => void) => (
    <button
      key={label}
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 border px-5 text-xs uppercase tracking-[0.16em] transition-colors",
        isActive
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border hover:border-primary hover:text-primary",
      )}
    >
      {label}
    </button>
  );

  return (
    <div>
      <section className="relative h-[46vh] min-h-72 overflow-hidden">
        <img
          src={collectionBanner}
          alt="Folded silk sarees in plum and champagne tones"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="relative mx-auto flex h-full max-w-[1400px] items-end px-4 pb-10 md:px-8">
          <div className="text-background">
            <p className="eyebrow text-background/80">Collections</p>
            <h1 className="mt-2 font-display text-4xl md:text-6xl">
              {active ?? "The full edit"}
            </h1>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8 md:py-16">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) =>
              chip(c, search.category === c, () => setFilter("category", c)),
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {collectionList.map((c) =>
              chip(c, search.collection === c, () => setFilter("collection", c)),
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {occasions.map((o) =>
              chip(o, search.occasion === o, () => setFilter("occasion", o)),
            )}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
          {active && (
            <button
              type="button"
              onClick={() => navigate({ to: ".", search: {} })}
              className="min-h-11 text-xs uppercase tracking-[0.16em] text-primary hover:opacity-70"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="mt-10">
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  );
}
