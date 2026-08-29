import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useStore } from "@/context/StoreContext";
import { getProduct } from "@/data/products";
import { site } from "@/data/site";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, removeFromCart } = useStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCartOpen]);

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 bg-foreground/30"
          onClick={() => setCartOpen(false)}
        >
          <motion.aside
            role="dialog"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="ml-auto flex h-full w-full max-w-md flex-col bg-background"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-display text-2xl">Your Bag</h2>
              <button
                type="button"
                aria-label="Close bag"
                onClick={() => setCartOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-secondary"
              >
                <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <p className="font-display text-xl">Your bag is empty</p>
                <p className="text-sm text-muted-foreground">
                  Discover sarees and girlswear made for the moments you remember.
                </p>
                <Link
                  to="/collections"
                  search={{}}
                  onClick={() => setCartOpen(false)}
                  className="mt-2 inline-flex min-h-11 items-center bg-primary px-6 text-xs uppercase tracking-[0.2em] text-primary-foreground"
                >
                  Browse the edit
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
                  {cart.map((item) => {
                    const product = getProduct(item.id);
                    if (!product) return null;
                    return (
                      <li key={`${item.id}-${item.size}`} className="flex gap-4 py-5">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          width={90}
                          height={120}
                          loading="lazy"
                          className="h-28 w-21 shrink-0 object-cover"
                        />
                        <div className="flex flex-1 flex-col">
                          <p className="font-display text-lg leading-tight">{product.name}</p>
                          <p className="eyebrow mt-1">{item.size}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{site.priceLabel}</p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center border border-border">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                className="flex h-11 w-11 items-center justify-center"
                                onClick={() => setQty(item.id, item.size, item.qty - 1)}
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-8 text-center text-sm">{item.qty}</span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                className="flex h-11 w-11 items-center justify-center"
                                onClick={() => setQty(item.id, item.size, item.qty + 1)}
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id, item.size)}
                              className="min-h-11 text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t border-border px-6 py-6">
                  <div className="flex items-baseline justify-between">
                    <span className="eyebrow">Subtotal</span>
                    <span className="font-display text-xl">{site.priceLabel}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Pricing and delivery details will be confirmed with you directly.
                  </p>
                  <button
                    type="button"
                    onClick={() => toast("Checkout is not connected in this prototype.")}
                    className="mt-5 min-h-12 w-full bg-primary text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Proceed to checkout
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}