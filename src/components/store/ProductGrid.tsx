import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">No sarees match this category yet. Please choose another category or message us on WhatsApp for help.</p>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );
}
