import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Home", to: "/" },
  { label: "Sarees", to: "/collections" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        scrolled
          ? "border-border/80 bg-background/95 shadow-[0_12px_40px_-28px_oklch(0.2_0.05_30/.6)] backdrop-blur-xl"
          : "border-transparent bg-background/70 backdrop-blur-md",
      )}
    >
      <div className="hidden h-7 items-center justify-center bg-foreground px-4 text-[0.58rem] uppercase tracking-[0.28em] text-background/80 md:flex">
        Complimentary styling assistance · Orders via WhatsApp
      </div>
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:h-[4.5rem] md:px-8">
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center md:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link
          to="/"
          className="font-display text-lg uppercase tracking-[0.16em] max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2 md:text-[1.65rem]"
        >
          {site.name}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="relative py-2 text-[0.65rem] uppercase tracking-[0.24em] transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-primary after:transition-transform hover:text-primary hover:after:origin-left hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/#contact"
            className="relative py-2 text-[0.65rem] uppercase tracking-[0.24em] transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-primary after:transition-transform hover:text-primary hover:after:origin-left hover:after:scale-x-100"
          >
            Contact
          </a>
        </nav>
        <a
          href={site.whatsAppUrl("Hello, I would like to know more about your sarees.")}
          className="luxury-button hidden min-h-11 items-center bg-primary px-6 text-[0.65rem] uppercase tracking-[0.2em] text-primary-foreground hover:bg-plum md:inline-flex"
        >
          WhatsApp <span className="ml-3 text-lg leading-none">↗</span>
        </a>
        <span className="w-11 md:hidden" />
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] min-h-[100dvh] bg-foreground/60 md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-h-[100dvh] w-[86%] max-w-sm overflow-y-auto bg-background px-6 py-6 text-foreground shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="pr-12 font-display text-lg uppercase tracking-[0.12em]">{site.name}</p>
              <button
                type="button"
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
              <nav aria-label="Mobile" className="mt-10 flex flex-col">
                {nav.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-border py-4 font-display text-2xl"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-border py-4 font-display text-2xl"
                >
                  Contact
                </a>
              </nav>
              <a
                href={site.whatsAppUrl("Hello, I would like to know more about your sarees.")}
                className="mt-8 flex min-h-12 items-center justify-center bg-primary px-5 text-xs uppercase tracking-[0.15em] text-primary-foreground"
              >
                Message on WhatsApp
              </a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
