import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductGrid } from "@/components/store/ProductGrid";
import { useCatalogue, useCategories } from "@/lib/catalogue";
import { CatalogueStatus } from "@/components/store/CatalogueStatus";
import heroSaree from "@/assets/hero-saree.jpg";
import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Saree Edit | Handpicked Sarees" },
      {
        name: "description",
        content:
          "Browse handpicked silk, cotton, party wear and daily wear sarees. Order simply on WhatsApp.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: products = [], isPending, isError, refetch } = useCatalogue();
  const {
    data: categoryRows = [],
    isPending: categoriesPending,
    isError: categoriesError,
    refetch: refetchCategories,
  } = useCategories();
  const categories = categoryRows.map((category) => category.name);
  const categoryTiles = categories.map((category) => ({
    label: category,
    image: products.find((product) => product.category === category)?.image ?? heroSaree,
    placeholder: products.find((product) => product.category === category)?.isPlaceholder ?? false,
  }));
  return (
    <div>
      <section className="relative min-h-[78vh] overflow-hidden pt-16 md:pt-20">
        <img
          src={heroSaree}
          alt="Silk saree with a richly woven border"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,12,16,.78),rgba(25,12,16,.2)_65%,rgba(25,12,16,.12))]" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="relative mx-auto flex min-h-[78vh] max-w-[1400px] items-end px-4 pb-14 md:px-8 md:pb-20"
        >
          <div className="max-w-2xl text-background">
            <p className="eyebrow text-background/75">The edit · 2026 collection</p>
            <h1 className="mt-4 max-w-xl font-display text-5xl leading-[.98] md:text-8xl">
              A saree for every beautiful moment.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-background/80 md:text-base">
              Explore a small, thoughtful collection and order directly with us on WhatsApp.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/collections"
                className="luxury-button inline-flex min-h-12 items-center rounded-sm bg-primary px-7 text-xs uppercase tracking-[0.18em] text-primary-foreground"
              >
                Browse sarees <span className="ml-3 text-base">↗</span>
              </Link>
              <Link
                to="/collections"
                className="inline-flex min-h-12 items-center rounded-sm border border-background/50 px-7 text-xs uppercase tracking-[0.18em] text-background transition-colors hover:bg-background hover:text-foreground"
              >
                Explore the edit
              </Link>
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 right-8 hidden h-28 w-28 items-center justify-center rounded-full border border-background/40 text-center text-[0.6rem] uppercase tracking-[0.2em] text-background/80 md:flex"
          >
            Made for
            <br />
            your moment
          </motion.div>
        </motion.div>
      </section>
      <div className="overflow-hidden border-y border-border bg-secondary/55 py-3 text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
        <div className="animate-[marquee_24s_linear_infinite] whitespace-nowrap">
          Handpicked sarees <span className="mx-8 text-primary">✦</span> Thoughtful details{" "}
          <span className="mx-8 text-primary">✦</span> Made to be remembered{" "}
          <span className="mx-8 text-primary">✦</span> Handpicked sarees{" "}
          <span className="mx-8 text-primary">✦</span> Thoughtful details{" "}
          <span className="mx-8 text-primary">✦</span>
        </div>
      </div>
      <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <p className="eyebrow">Find your favourite</p>
        <h2 className="mt-2 font-display text-4xl md:text-6xl">Shop by category</h2>
        <CatalogueStatus
          loading={categoriesPending}
          error={categoriesError}
          retry={() => {
            void refetchCategories();
          }}
        />
        <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categoryTiles.map((category) => (
            <Link
              key={category.label}
              to="/collections"
              search={{ category: category.label }}
              className="group relative overflow-hidden rounded-sm bg-secondary shadow-[0_22px_45px_-34px_oklch(0.2_0.08_30/.9)]"
            >
              <img
                src={category.image}
                alt={`${category.label} saree sample image`}
                width={800}
                height={1067}
                sizes="(min-width: 768px) 23vw, 46vw"
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
              />
              {category.placeholder && (
                <span className="pointer-events-none absolute right-0 top-0 z-10 bg-primary px-3 py-1.5 text-[0.55rem] font-semibold tracking-[0.14em] text-primary-foreground">
                  SAMPLE IMAGE
                </span>
              )}
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent px-4 pb-5 pt-16 font-display text-xl text-background">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-[1400px] px-4 pb-20 md:px-8 md:pb-28">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Available now</p>
            <h2 className="mt-2 font-display text-4xl md:text-6xl">Our sarees</h2>
          </div>
          <Link to="/collections" className="text-xs uppercase tracking-[0.16em] text-primary">
            View all
          </Link>
        </div>
        <div className="mt-9">
          <CatalogueStatus
            loading={isPending}
            error={isError}
            retry={() => {
              void refetch();
            }}
          />
          {!isPending &&
            !isError &&
            (products.length ? (
              <ProductGrid
                products={
                  products.some((p) => p.featured) ? products.filter((p) => p.featured) : products
                }
              />
            ) : (
              <p className="py-12 text-muted-foreground">Our new collection is coming soon.</p>
            ))}
        </div>
      </section>
    </div>
  );
}
