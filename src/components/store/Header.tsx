import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { site } from "@/data/site";
import { useStore } from "@/context/StoreContext";
import { cn } from "@/lib/utils";

const nav = [
  { label: "New Arrivals", search: { collection: "New Arrivals" } },
  { label: "Sarees", search: { category: "Sarees" } },
  { label: "Girls", search: { category: "Girls Dresses" } },
  { label: "Festive", search: { collection: "Festive Edit" } },
  { label: "Collections", search: {} },
] as const;

export function Header() {
  const { cartCount, wishlist, setCartOpen, setSearchOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const iconBtn =
    "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-secondary";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-background/95 shadow-[0_1px_0_0_var(--border)] backdrop-blur-md" : "bg-background/20 backdrop-blur-[2px]",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <button
          type="button"
          className={cn(iconBtn, "md:hidden")}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="h-5 w-5" strokeWidth={1.4} />
        </button>

        <Link
          to="/"
          className="font-display text-xl tracking-[0.14em] uppercase max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2 md:text-2xl"
        >
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to="/collections"
              search={item.search}
              className="relative py-2 text-xs uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className={cn(iconBtn, "max-md:hidden")}
            aria-label="Search products"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" strokeWidth={1.4} />
          </button>
          <Link to="/wishlist" className={cn(iconBtn, "relative")} aria-label="View wishlist">
            <Heart className="h-5 w-5" strokeWidth={1.4} />
            {wishlist.length > 0 && <Dot>{wishlist.length}</Dot>}
          </Link>
          <button
            type="button"
            className={cn(iconBtn, "relative")}
            aria-label="Open shopping bag"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.4} />
            {cartCount > 0 && <Dot>{cartCount}</Dot>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/30 md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-[82%] max-w-sm bg-background p-6"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg uppercase tracking-[0.14em]">{site.name}</span>
                <button
                  type="button"
                  className={iconBtn}
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <X className="h-5 w-5" strokeWidth={1.4} />
                </button>
              </div>
              <nav aria-label="Mobile" className="mt-10 flex flex-col">
                {nav.map((item) => (
                  <Link
                    key={item.label}
                    to="/collections"
                    search={item.search}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-border py-4 font-display text-2xl"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="mt-8 inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-[0.18em]"
              >
                <Search className="h-4 w-4" strokeWidth={1.4} /> Search
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Dot({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.6rem] leading-none text-primary-foreground">
      {children}
    </span>
  );
}