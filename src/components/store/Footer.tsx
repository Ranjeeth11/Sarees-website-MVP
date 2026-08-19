import { Link } from "@tanstack/react-router";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <p className="font-display text-2xl uppercase tracking-[0.14em]">{site.name}</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            {site.tagline}. A prototype boutique — brand name, story and catalogue are placeholders
            ready to be replaced.
          </p>
        </div>
        <nav aria-label="Shop">
          <p className="eyebrow">Shop</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/collections" search={{ category: "Sarees" }} className="hover:text-primary">Sarees</Link></li>
            <li><Link to="/collections" search={{ category: "Girls Dresses" }} className="hover:text-primary">Girls Dresses</Link></li>
            <li><Link to="/collections" search={{ collection: "Festive Edit" }} className="hover:text-primary">Festive Edit</Link></li>
            <li><Link to="/collections" search={{ collection: "New Arrivals" }} className="hover:text-primary">New Arrivals</Link></li>
            <li><Link to="/wishlist" className="hover:text-primary">Wishlist</Link></li>
          </ul>
        </nav>
        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>{site.contact.phone}</li>
            <li>{site.contact.email}</li>
            <li>{site.contact.address}</li>
          </ul>
          <ul className="mt-5 flex gap-4 text-xs uppercase tracking-[0.16em]">
            {site.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="hover:text-primary">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground md:px-8">
        Prototype design — details to be finalised with the boutique.
      </div>
    </footer>
  );
}