import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Package, Scissors, Sparkles } from "lucide-react";
import { products, collections } from "@/data/products";
import { site } from "@/data/site";
import { ProductGrid } from "@/components/store/ProductGrid";
import { ProductCard } from "@/components/store/ProductCard";
import heroSaree from "@/assets/hero-saree.jpg";
import heroDetail from "@/assets/hero-detail.jpg";
import heroGirl from "@/assets/hero-girl.jpg";
import editorial from "@/assets/editorial-story.jpg";
import occasionFestive from "@/assets/occasion-festive.jpg";
import occasionWedding from "@/assets/occasion-wedding.jpg";
import occasionFamily from "@/assets/occasion-family.jpg";
import occasionEveryday from "@/assets/occasion-everyday.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Saree Edit — Handloom Sarees & Girls Ethnic Wear" },
      {
        name: "description",
        content:
          "A boutique edit of handloom sarees and girls' ethnic wear in earthy terracotta and sage — festive days, weddings and everyday elegance.",
      },
      { property: "og:title", content: "The Saree Edit — Grace in every drape" },
      {
        property: "og:description",
        content:
          "Handpicked sarees and girls' ethnic wear for festive days and quiet everyday moments.",
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

const promises = [
  { icon: Scissors, title: "Handloom first", copy: "Woven in small runs by weaver families." },
  { icon: Leaf, title: "Natural fibres", copy: "Cotton, silk and blends that breathe all day." },
  { icon: Package, title: "Boutique packing", copy: "Each piece wrapped in reusable cotton." },
  { icon: Sparkles, title: "Styling help", copy: "Drape and pairing advice on every order." },
] as const;

const marquee = [
  "Handloom weaves",
  "Mother & daughter sets",
  "Temple silk",
  "Summer cottons",
  "Made to order blouses",
  "Festive edit",
];

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

function Index() {
  const featured = products.filter((p) => p.featured).slice(0, 6);
  const girls = products.filter((p) => p.category === "Girls Dresses").slice(0, 2);
  const newIn = products.filter((p) => p.collection === "New Arrivals").slice(0, 3);

  return (
    <div>
      {/* SPLIT-SCREEN HERO */}
      <section className="grid min-h-[92vh] grid-cols-1 pt-16 md:grid-cols-2 md:pt-0">
        <div className="order-2 flex items-center bg-secondary/60 px-6 py-16 md:order-1 md:px-14 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg"
          >
            <p className="eyebrow">{site.announcement}</p>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] md:text-6xl lg:text-7xl">
              {site.tagline}
              <span className="text-primary">.</span>
            </h1>
            <div className="hairline my-8 max-w-[220px]" />
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              An earthy, considered edit of handloom sarees and girls' ethnic wear — clay-warm
              colour, sage calm and pieces meant to be worn again and again.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/collections"
                search={{ category: "Sarees" }}
                className="group inline-flex min-h-12 items-center gap-2 bg-primary px-8 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Shop Sarees
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/collections"
                search={{ category: "Girls Dresses" }}
                className="inline-flex min-h-12 items-center border border-foreground/25 px-8 text-xs uppercase tracking-[0.2em] transition-colors hover:border-primary hover:text-primary"
              >
                Shop Girlswear
              </Link>
            </div>
            <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                ["20+", "Curated pieces"],
                ["7", "Categories"],
                ["8", "Collections"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl text-primary">{n}</dt>
                  <dd className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        <div className="relative order-1 min-h-[52vh] overflow-hidden md:order-2 md:min-h-[92vh]">
          <img
            src={heroSaree}
            alt="Model wearing a handloom silk saree with a woven border"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 to-transparent" />
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            src={heroDetail}
            alt="Close-up of woven zari border detail"
            className="absolute bottom-8 left-8 hidden h-40 w-32 object-cover shadow-[var(--shadow-lift)] lg:block"
          />
        </div>
      </section>

      {/* MARQUEE RIBBON */}
      <div className="overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <span key={dup} className="flex shrink-0">
              {marquee.map((m) => (
                <span
                  key={`${dup}-${m}`}
                  className="mx-8 text-[0.7rem] uppercase tracking-[0.3em]"
                >
                  {m} <span className="ml-8 opacity-60">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* NEW IN — split editorial */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.6fr]">
          <motion.div {...fadeUp} className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">Just landed</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">New arrivals</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Fresh weaves added to the boutique this season — limited pieces, restocked rarely.
            </p>
            <Link
              to="/collections"
              search={{ collection: "New Arrivals" }}
              className="group mt-8 inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary"
            >
              View all new
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
            {newIn.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Shop by occasion</p>
              <h2 className="mt-2 font-display text-4xl md:text-5xl">Dressed for the day</h2>
            </div>
            <Link
              to="/collections"
              search={{}}
              className="min-h-11 self-end text-xs uppercase tracking-[0.2em] text-primary hover:opacity-70"
            >
              Browse everything
            </Link>
          </div>
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
                  className="group block"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.label}
                      loading="lazy"
                      className="aspect-3/4 w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-4">
                      <p className="font-display text-xl text-background">{card.label}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <motion.div {...fadeUp} className="flex flex-wrap items-end justify-between gap-4">
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
        </motion.div>
        <div className="mt-12">
          <ProductGrid products={featured} />
        </div>
      </section>

      {/* COLLECTION CHIPS */}
      <section className="mx-auto max-w-[1400px] px-4 pb-4 md:px-8">
        <div className="hairline mb-10" />
        <p className="eyebrow text-center">Explore the collections</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {collections.map((c) => (
            <Link
              key={c}
              to="/collections"
              search={{ collection: c }}
              className="inline-flex min-h-11 items-center rounded-full border border-border px-6 text-xs uppercase tracking-[0.18em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* EDITORIAL SPLIT */}
      <section className="mt-20 bg-secondary/60 md:mt-28">
        <div className="mx-auto grid max-w-[1400px] items-stretch gap-0 md:grid-cols-2">
          <img
            src={editorial}
            alt="A family dressed in coordinated festive Indian wear"
            loading="lazy"
            className="h-full min-h-[420px] w-full object-cover"
          />
          <motion.div {...fadeUp} className="flex items-center px-6 py-16 md:px-14 lg:px-20">
            <div className="max-w-md">
              <p className="eyebrow">The edit</p>
              <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
                Made for mothers and daughters
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                Every drape and every little dress is chosen the same way — for the hand of the
                fabric, the fall of the pleat and how it feels after six hours of celebration.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Pricing is shared on request while the boutique catalogue is finalised.
              </p>
              <Link
                to="/collections"
                search={{ collection: "Mother & Daughter" }}
                className="group mt-9 inline-flex min-h-12 items-center gap-2 bg-primary px-8 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Shop matching sets
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROMISES */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <p.icon className="h-6 w-6 text-primary" strokeWidth={1.3} />
              <h3 className="mt-4 font-display text-2xl">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GIRLSWEAR SPLIT */}
      <section className="mx-auto max-w-[1400px] px-4 pb-24 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative">
            <img
              src={heroGirl}
              alt="Young girl in a festive ethnic dress"
              loading="lazy"
              className="aspect-4/5 w-full object-cover"
            />
            <div className="absolute -bottom-6 left-6 hidden bg-background px-8 py-6 shadow-[var(--shadow-soft)] md:block">
              <p className="eyebrow">Girlswear</p>
              <p className="mt-1 font-display text-2xl">Little celebration dresses</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6">
            {girls.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
