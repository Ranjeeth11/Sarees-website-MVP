import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { site } from "@/data/site";
import { useStore } from "@/context/StoreContext";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, setCartOpen } = useStore();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
    >
      <div className="relative overflow-hidden bg-secondary">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          aria-label={`View ${product.name}`}
          className="block"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            width={900}
            height={1200}
            loading="lazy"
            className="aspect-3/4 w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
          />
        </Link>
        <WishlistButton id={product.id} label={product.name} className="absolute right-3 top-3" />
        {!product.available && (
          <span className="absolute left-3 top-3 bg-card/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            Made to order
          </span>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
          <button
            type="button"
            onClick={() => {
              addToCart(product.id, product.sizes[0]);
              setCartOpen(true);
              toast.success(`${product.name} added to bag`);
            }}
            className="pointer-events-auto min-h-11 w-full bg-primary px-4 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Add to bag
          </button>
        </div>
      </div>
      <div className="pt-4">
        <p className="eyebrow">{product.category}</p>
        <h3 className="mt-1 font-display text-xl leading-snug">
          <Link to="/product/$id" params={{ id: product.id }} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {product.price === null ? site.priceLabel : `₹${product.price}`}
        </p>
      </div>
    </motion.article>
  );
}