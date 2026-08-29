import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  useEffect(() => {
    if (!searchOpen) return undefined;
    setQuery("");
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [searchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) =>
      [p.name, p.category, p.collection, p.color, p.occasion].join(" ").toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Search"
          className="fixed inset-0 z-70 overflow-y-auto bg-background"
        >
          <div className="mx-auto max-w-3xl px-4 py-8 md:py-16">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Search</span>
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-secondary"
              >
                <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>
            <div className="mt-8 flex items-center gap-3 border-b border-border pb-4">
              <Search className="h-5 w-5 text-muted-foreground" strokeWidth={1.4} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Sarees, festive, girls dresses…"
                aria-label="Search products"
                className="w-full bg-transparent font-display text-2xl outline-none placeholder:text-muted-foreground/60 md:text-4xl"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="min-h-11 shrink-0 text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="mt-8">
              {!query && (
                <p className="text-sm text-muted-foreground">
                  Try “festive”, “silk”, “girls” or “everyday”.
                </p>
              )}
              {query && results.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No pieces match “{query}” yet.
                </p>
              )}
              <ul className="grid gap-6 sm:grid-cols-2">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      to="/product/$id"
                      params={{ id: p.id }}
                      onClick={() => setSearchOpen(false)}
                      className="group flex items-center gap-4"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        width={90}
                        height={120}
                        loading="lazy"
                        className="h-24 w-18 object-cover"
                      />
                      <span>
                        <span className="eyebrow block">{p.category}</span>
                        <span className="font-display text-xl group-hover:text-primary">{p.name}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}