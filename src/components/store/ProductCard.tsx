import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { site } from "@/data/site";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const titleId = `product-${product.id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col"
    >
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        aria-labelledby={titleId}
        className="relative overflow-hidden rounded-sm bg-secondary shadow-[0_18px_35px_-30px_oklch(0.2_0.05_30/.8)] transition-shadow duration-500 group-hover:shadow-[0_28px_55px_-32px_oklch(0.2_0.08_30/.9)]"
      >
        <img
          src={product.image}
          alt={`${product.name}, ${product.fabric}`}
          width={800}
          height={1067}
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 31vw, 46vw"
          loading="lazy"
          decoding="async"
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
        />
        <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute bottom-4 right-4 translate-y-3 text-xs uppercase tracking-[0.18em] text-background opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          View piece ↗
        </span>
      </Link>
      {product.isPlaceholder && (
        <span className="pointer-events-none absolute right-0 top-0 z-10 rounded-bl-sm bg-primary px-3 py-1.5 text-[0.55rem] font-semibold tracking-[0.14em] text-primary-foreground">
          SAMPLE IMAGE
        </span>
      )}
      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-[0.58rem] uppercase tracking-[0.2em] text-primary">
              {product.category}
            </p>
            <h3 id={titleId} className="font-display text-xl leading-snug">
              <Link
                to="/product/$id"
                params={{ id: product.id }}
                className="transition-colors hover:text-primary"
              >
                {product.name}
              </Link>
            </h3>
          </div>
          <p className="shrink-0 pt-1 text-sm text-muted-foreground">
            {product.price === null ? "Ask price" : `₹${product.price.toLocaleString("en-IN")}`}
          </p>
        </div>
        <a
          href={site.whatsAppUrl(`Hi, I'm interested in ${product.name}`)}
          className="luxury-button mt-4 flex min-h-12 items-center justify-center rounded-sm border border-primary/40 px-3 text-center text-[0.62rem] font-medium uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Enquire on WhatsApp <span className="ml-2 text-base">↗</span>
        </a>
      </div>
    </motion.article>
  );
}
