import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { ProductGrid } from "@/components/store/ProductGrid";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist | The Saree Edit" },
      {
        name: "description",
        content: "The sarees and girls' dresses you've saved to revisit at The Saree Edit.",
      },
      { property: "og:title", content: "Your Wishlist | The Saree Edit" },
      { property: "og:description", content: "Pieces you've saved from the boutique edit." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-32 md:px-8 md:pt-40">
      <p className="eyebrow">Saved</p>
      <h1 className="mt-2 font-display text-4xl md:text-6xl">Your wishlist</h1>

      {saved.length === 0 ? (
        <div className="py-20">
          <p className="text-sm text-muted-foreground">
            Nothing saved yet. Tap the heart on any piece to keep it here.
          </p>
          <Link
            to="/collections"
            search={{}}
            className="mt-8 inline-flex min-h-11 items-center bg-primary px-7 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Browse the edit
          </Link>
        </div>
      ) : (
        <div className="mt-12">
          <ProductGrid products={saved} />
        </div>
      )}
    </div>
  );
}
