import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { ProductGrid } from "@/components/store/ProductGrid";
import { useCatalogue, useCategories } from "@/lib/catalogue";
import { CatalogueStatus } from "@/components/store/CatalogueStatus";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Search = { category?: string | undefined };
export const Route = createFileRoute("/collections")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    category: typeof search["category"] === "string" ? search["category"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sarees | The Saree Edit" },
      { name: "description", content: "Browse sarees and order directly on WhatsApp." },
    ],
  }),
  component: Collections,
});
function Collections() {
  const { data: products = [], isPending, isError, refetch } = useCatalogue();
  const {
    data: categoryRows = [],
    isPending: categoriesPending,
    isError: categoriesError,
    refetch: refetchCategories,
  } = useCategories();
  const categories = categoryRows.map((category) => category.name);
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const filtered = useMemo(
    () => products.filter((product) => !search.category || product.category === search.category),
    [search.category, products],
  );
  const select = (category?: string) => navigate({ to: ".", search: category ? { category } : {} });
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-24 md:px-8 md:pt-36">
      <p className="eyebrow">Saree collection</p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-3 max-w-3xl font-display text-5xl leading-[.98] md:text-8xl"
      >
        Find your next saree
      </motion.h1>
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
        Choose a style, then message us on WhatsApp to ask about price and availability.
      </p>
      <CatalogueStatus
        loading={categoriesPending}
        error={categoriesError}
        retry={() => {
          void refetchCategories();
        }}
      />
      <div className="mt-10 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => select()}
          className={cn(
            "min-h-11 rounded-full border px-5 text-xs uppercase tracking-[0.14em] transition-all duration-300",
            !search.category
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border",
          )}
        >
          All sarees
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => select(search.category === category ? undefined : category)}
            className={cn(
              "min-h-11 rounded-full border px-5 text-xs uppercase tracking-[0.14em] transition-all duration-300",
              search.category === category
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary",
            )}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-12 flex items-center justify-between border-y border-border py-4">
        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "saree" : "sarees"}
        </p>
        <span className="text-xs uppercase tracking-[0.15em] text-primary">Curated for you</span>
      </div>
      <div className="mt-7">
        <CatalogueStatus
          loading={isPending}
          error={isError}
          retry={() => {
            void refetch();
          }}
        />
        {!isPending &&
          !isError &&
          (filtered.length ? (
            <ProductGrid products={filtered} />
          ) : (
            <p className="py-12 text-muted-foreground">No sarees in this category yet.</p>
          ))}
      </div>
    </div>
  );
}
