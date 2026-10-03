import { Link } from "@tanstack/react-router";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer id="contact" className="mt-16 overflow-hidden bg-foreground text-background">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-16 md:grid-cols-[1.2fr_.8fr] md:px-8 md:py-24">
        <div>
          <p className="eyebrow text-background/55">The Saree Edit</p>
          <p className="mt-4 max-w-xl font-display text-4xl leading-[1.05] md:text-6xl">
            Pieces with a point of view.
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-background/65">
            {site.tagline}. Browse the collection, then message us to check availability and place
            your order.
          </p>
          <Link
            to="/collections"
            className="mt-8 inline-flex items-center text-xs uppercase tracking-[0.16em] text-background transition-colors hover:text-primary"
          >
            Browse sarees <span className="ml-3 text-base">↗</span>
          </Link>
        </div>
        <div className="md:pt-8">
          <p className="eyebrow text-background/55">Contact & orders</p>
          <p className="mt-5 text-sm text-background/75">{site.contact.phone}</p>
          <p className="mt-1 text-sm text-background/55">{site.contact.address}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={site.whatsAppUrl("Hello, I would like to know more about your sarees.")}
              className="luxury-button inline-flex min-h-12 items-center rounded-sm bg-primary px-6 text-xs uppercase tracking-[0.16em] text-primary-foreground"
            >
              Chat on WhatsApp <span className="ml-2 text-base">↗</span>
            </a>
            <a
              href={site.callUrl}
              className="inline-flex min-h-12 items-center rounded-sm border border-background/35 px-6 text-xs uppercase tracking-[0.16em] text-background transition-colors hover:border-background hover:bg-background hover:text-foreground"
            >
              Call now
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-background/15 px-4 py-5 text-center text-[0.58rem] uppercase tracking-[0.2em] text-background/40 md:px-8">
        Designed for your beautiful moments · {new Date().getFullYear()}
      </div>
    </footer>
  );
}
