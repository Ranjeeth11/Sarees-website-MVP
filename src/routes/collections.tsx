import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/store/ProductGrid";
import { useCatalogue, useCategories } from "@/lib/catalogue";
import { CatalogueStatus } from "@/components/store/CatalogueStatus";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductGridSkeleton } from "@/components/store/ProductGridSkeleton";

type Sort = "newest" | "price-low" | "price-high" | "featured";
type SearchParams = { category?: string; q?: string; sort?: Sort };
export const Route = createFileRoute("/collections")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    ...(typeof search["category"] === "string" ? { category: search["category"] } : {}),
    ...(typeof search["q"] === "string" ? { q: search["q"] } : {}),
    ...(["newest", "price-low", "price-high", "featured"].includes(String(search["sort"]))
      ? { sort: search["sort"] as Sort }
      : {}),
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
  const [query, setQuery] = useState(search.q ?? "");
  const buildSearch = (category?: string, q?: string, sort?: Sort): SearchParams => ({
    ...(category ? { category } : {}),
    ...(q ? { q } : {}),
    ...(sort ? { sort } : {}),
  });
  const filtered = useMemo(() => {
    const normalized = (search.q ?? "").trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesCategory = !search.category || product.category === search.category;
      const matchesQuery =
        !normalized ||
        `${product.name} ${product.category} ${product.fabric} ${product.color}`
          .toLowerCase()
          .includes(normalized);
      return matchesCategory && matchesQuery;
    });
    return [...result].sort((a, b) => {
      if (search.sort === "price-low") return (a.price ?? Infinity) - (b.price ?? Infinity);
      if (search.sort === "price-high") return (b.price ?? -1) - (a.price ?? -1);
      if (search.sort === "featured") return Number(b.featured) - Number(a.featured);
      return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
    });
  }, [search.category, search.q, search.sort, products]);
  const select = (category?: string) =>
    navigate({ to: ".", search: buildSearch(category, search.q, search.sort) });
  const applyQuery = () =>
    navigate({
      to: ".",
      search: buildSearch(search.category, query.trim(), search.sort),
    });
  const categoryCount = (category: string) =>
    products.filter((product) => product.category === category).length;
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
          All sarees <span className="ml-2 opacity-60">{products.length}</span>
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
            {category} <span className="ml-2 opacity-60">{categoryCount(category)}</span>
          </button>
        ))}
      </div>
      <div className="mt-7 grid gap-3 md:grid-cols-[1fr_auto]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            applyQuery();
          }}
          className="relative"
        >
          <Search
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, fabric or colour"
            className="min-h-12 w-full rounded-full border border-border bg-background pl-11 pr-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </form>
        <label className="relative flex min-h-12 items-center gap-3 rounded-full border border-border px-4 text-xs uppercase tracking-[0.14em]">
          <SlidersHorizontal size={16} className="text-primary" />
          <span className="sr-only">Sort sarees</span>
          <select
            value={search.sort ?? "newest"}
            onChange={(event) =>
              navigate({
                to: ".",
                search: buildSearch(search.category, search.q, event.target.value as Sort),
              })
            }
            className="appearance-none bg-transparent pr-5 text-xs uppercase tracking-[0.14em] outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="featured">Featured first</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
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
        {isPending ? (
          <ProductGridSkeleton />
        ) : (
          !isError &&
          (filtered.length ? (
            <ProductGrid products={filtered} />
          ) : (
            <p className="py-12 text-muted-foreground">No sarees in this category yet.</p>
          ))
        )}
      </div>
    </div>
  );
}
