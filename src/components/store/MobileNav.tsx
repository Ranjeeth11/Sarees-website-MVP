import { Link } from "@tanstack/react-router";
import { Grid2X2, Home, MessageCircle } from "lucide-react";
import { site } from "@/data/site";

export function MobileNav() {
  return (
    <>
      <div className="h-16 md:hidden" aria-hidden="true" />
      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid h-16 grid-cols-3 border-t border-border bg-background/95 px-3 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_30px_-24px_oklch(0.2_0.05_30/.7)] backdrop-blur-xl md:hidden"
        aria-label="Mobile navigation"
      >
        <Link
          to="/"
          className="flex min-h-12 flex-col items-center justify-center gap-1 text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
        >
          <Home size={18} strokeWidth={1.5} />
          Home
        </Link>
        <Link
          to="/collections"
          className="flex min-h-12 flex-col items-center justify-center gap-1 text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
        >
          <Grid2X2 size={18} strokeWidth={1.5} />
          Sarees
        </Link>
        <a
          href={site.whatsAppUrl("Hello, I would like to know more about your sarees.")}
          className="flex min-h-12 flex-col items-center justify-center gap-1 text-[0.58rem] uppercase tracking-[0.14em] text-primary transition-colors hover:text-primary/80"
        >
          <MessageCircle size={18} strokeWidth={1.5} />
          WhatsApp
        </a>
      </nav>
    </>
  );
}
