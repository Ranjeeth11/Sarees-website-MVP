import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { getProduct, products } from "@/data/products";
import { site } from "@/data/site";
import { useStore } from "@/context/StoreContext";
import { WishlistButton } from "@/components/store/WishlistButton";
import { ProductGrid } from "@/components/store/ProductGrid";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Piece not found | The Saree Edit" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} | The Saree Edit`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addToCart, setCartOpen } = useStore();
  const [size, setSize] = useState(product.sizes[0]);
  const [activeImage, setActiveImage] = useState(0);

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-24 md:px-8 md:pt-32">
      <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="px-2">/</span>
        <Link to="/collections" search={{ category: product.category }} className="hover:text-primary">
          {product.category}
        </Link>
      </nav>

      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <motion.img
            key={activeImage}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            src={product.images[activeImage]}
            alt={product.name}
            className="aspect-3/4 w-full object-cover"
          />
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={cn(
                    "w-20 border transition-colors",
                    i === activeImage ? "border-primary" : "border-transparent",
                  )}
                >
                  <img src={img} alt="" className="aspect-3/4 w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="md:pt-4">
          <p className="eyebrow">{product.collection}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {product.price === null ? site.priceLabel : `₹${product.price}`}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            {product.description}
          </p>

          <div className="mt-9">
            <p className="eyebrow">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={cn(
                    "min-h-11 border px-5 text-xs uppercase tracking-[0.16em] transition-colors",
                    s === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-9 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                addToCart(product.id, size);
                setCartOpen(true);
                toast.success(`${product.name} added to bag`);
              }}
              className="min-h-12 flex-1 bg-primary px-8 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Add to bag
            </button>
            <WishlistButton id={product.id} label={product.name} className="border border-border" />
          </div>

          <dl className="mt-10 space-y-3 border-t border-border pt-6 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Colour</dt>
              <dd>{product.color}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Occasion</dt>
              <dd>{product.occasion}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Availability</dt>
              <dd>{product.available ? "In boutique" : "Made to order"}</dd>
            </div>
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <p className="eyebrow">You may also like</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">More from {product.category}</h2>
          <div className="mt-10">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}
