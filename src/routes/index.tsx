import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { site } from "@/data/site";
import { ProductGrid } from "@/components/store/ProductGrid";
import heroSaree from "@/assets/hero-saree.jpg";
import heroGirl from "@/assets/hero-girl.jpg";
import editorial from "@/assets/editorial-story.jpg";
import occasionFestive from "@/assets/occasion-festive.jpg";
import occasionWedding from "@/assets/occasion-wedding.jpg";
import occasionFamily from "@/assets/occasion-family.jpg";
import occasionEveryday from "@/assets/occasion-everyday.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Saree Edit — Handpicked Sarees & Girls Ethnic Wear" },
      {
        name: "description",
        content:
          "A boutique edit of sarees and girls' ethnic wear for festive days, weddings and everyday elegance.",
      },
      { property: "og:title", content: "The Saree Edit — Grace in every drape" },
      {
        property: "og:description",
        content: "Handpicked sarees and girls' ethnic wear for festive days and quiet everyday moments.",
      },
    ],
  }),
  component: Index,
});

const occasionCards = [
  { label: "Festive", image: occasionFestive, occasion: "Festive" },
  { label: "Wedding Guest", image: occasionWedding, occasion: "Wedding Guest" },
  { label: "Family Celebration", image: occasionFamily, occasion: "Family Celebration" },
  { label: "Everyday Elegance", image: occasionEveryday, occasion: "Everyday Elegance" },
] as const;

function Index() {
  const featured = products.filter((p) => p.featured).slice(0, 6);
  const girls = products.filter((p) => p.category === "Girls Dresses").slice(0, 3);

  return (
    <div>
      <section className="relative min-h-[92vh] w-full overflow-hidden">
        <img
          src={heroSaree}
          alt="Model wearing a plum silk saree with a woven gold border"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/55 via-foreground/25 to-transparent" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-[1400px] items-end px-4 pb-20 md:items-center md:px-8 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl text-background"
          >
            <p className="eyebrow text-background/80">{site.announcement}</p>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] md:text-7xl">
              {site.tagline}
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-background/85 md:text-base">
              A small, considered edit of sarees and girls' ethnic wear — woven textures, quiet
              colour and pieces meant to be worn again and again.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/collections"
                search={{ category: "Sarees" }}
                className="inline-flex min-h-11 items-center bg-background px-7 text-xs uppercase tracking-[0.2em] text-foreground transition-opacity hover:opacity-90"
              >
                Shop Sarees
              </Link>
              <Link
                to="/collections"
                search={{ category: "Girls Dresses" }}
                className="inline-flex min-h-11 items-center border border-background/70 px-7 text-xs uppercase tracking-[0.2em] text-background transition-colors hover:bg-background hover:text-foreground"
              >
                Shop Girlswear
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Curated</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Featured pieces</h2>
          </div>
          <Link
            to="/collections"
            search={{}}
            className="min-h-11 self-end text-xs uppercase tracking-[0.2em] text-primary hover:opacity-70"
          >
            View all
          </Link>
        </div>
        <div className="mt-12">
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="eyebrow">Shop by occasion</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Dressed for the day</h2>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {occasionCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to="/collections"
                  search={{ occasion: card.occasion }}
                  className="group block overflow-hidden"
                >
                  <div className="overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.label}
                      loading="lazy"
                      className="aspect-3/4 w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 font-display text-xl group-hover:text-primary">{card.label}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-20 md:grid-cols-2 md:px-8 md:py-28">
        <img
          src={editorial}
          alt="A family dressed in coordinated festive Indian wear"
          loading="lazy"
          className="aspect-4/5 w-full object-cover"
        />
        <div className="md:pl-8">
          <p className="eyebrow">The edit</p>
          <h2 className="mt-2 font-display text-4xl leading-tight md:text-5xl">
            Made for mothers and daughters
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            Every drape and every little dress is chosen the same way — for the hand of the fabric,
            the fall of the pleat and how it will feel after six hours of celebration.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Pricing is shared on request while the boutique catalogue is finalised.
          </p>
          <Link
            to="/collections"
            search={{ collection: "Festive Edit" }}
            className="mt-9 inline-flex min-h-11 items-center bg-primary px-7 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore the festive edit
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-24 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div>
            <img
              src={heroGirl}
              alt="Young girl in a festive ethnic dress"
              loading="lazy"
              className="aspect-3/4 w-full object-cover"
            />
            <p className="eyebrow mt-5">Girlswear</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Little celebration dresses</h2>
          </div>
          <ProductGrid products={girls} />
        </div>
      </section>
    </div>
  );
}
