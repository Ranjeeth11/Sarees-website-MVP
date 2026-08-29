import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { site } from "@/data/site";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const titleId = `product-${product.id}`;

  return <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }} className="group relative flex flex-col">
    <Link to="/product/$id" params={{ id: product.id }} aria-labelledby={titleId} className="overflow-hidden bg-secondary"><img src={product.image} alt={`${product.name}, ${product.fabric}`} width={800} height={1067} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 31vw, 46vw" loading="lazy" decoding="async" className="aspect-3/4 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></Link>
    {product.isPlaceholder && <span className="pointer-events-none absolute right-0 top-0 z-10 bg-primary px-3 py-1.5 text-[0.55rem] font-semibold tracking-[0.14em] text-primary-foreground">SAMPLE IMAGE</span>}
    <div className="flex flex-1 flex-col pt-3"><h3 id={titleId} className="font-display text-lg leading-snug"><Link to="/product/$id" params={{ id: product.id }} className="hover:text-primary">{product.name}</Link></h3><p className="mt-1 text-sm text-muted-foreground">{product.price === null ? "Ask price" : `₹${product.price}`}</p>
      <a href={site.whatsAppUrl(`Hi, I'm interested in ${product.name}`)} className="mt-3 flex min-h-12 items-center justify-center bg-primary px-3 text-center text-[0.65rem] font-medium uppercase tracking-[0.12em] text-primary-foreground transition-opacity hover:opacity-90">Order on WhatsApp</a>
    </div>
  </motion.article>;
}
