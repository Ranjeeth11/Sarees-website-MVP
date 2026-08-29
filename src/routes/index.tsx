import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, products } from "@/data/products";
import { ProductGrid } from "@/components/store/ProductGrid";
import heroSaree from "@/assets/hero-saree.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "The Saree Edit | Handpicked Sarees" }, { name: "description", content: "Browse handpicked silk, cotton, party wear and daily wear sarees. Order simply on WhatsApp." }] }),
  component: Index,
});

const categoryTiles = categories.map((category) => ({ label: category, image: products.find((product) => product.category === category)?.image ?? "" }));

function Index() {
  return <div>
    <section className="relative min-h-[72vh] pt-16 md:pt-20"><img src={heroSaree} alt="Silk saree with a richly woven border" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-foreground/55" /><div className="relative mx-auto flex min-h-[72vh] max-w-[1400px] items-end px-4 pb-14 md:px-8 md:pb-20"><div className="max-w-xl text-background"><p className="eyebrow text-background/80">Handpicked sarees</p><h1 className="mt-3 font-display text-5xl leading-[1.02] md:text-7xl">A saree for every beautiful moment.</h1><p className="mt-5 max-w-md text-sm leading-relaxed text-background/85 md:text-base">Explore a small, thoughtful collection and order directly with us on WhatsApp.</p><Link to="/collections" className="mt-8 inline-flex min-h-12 items-center bg-primary px-7 text-xs uppercase tracking-[0.18em] text-primary-foreground">Browse Sarees</Link></div></div></section>
    <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24"><p className="eyebrow">Find your favourite</p><h2 className="mt-2 font-display text-4xl md:text-5xl">Shop by category</h2><div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">{categoryTiles.map((category) => <Link key={category.label} to="/collections" search={{ category: category.label }} className="group relative overflow-hidden"><img src={category.image} alt={`${category.label} saree sample image`} width={800} height={1067} sizes="(min-width: 768px) 23vw, 46vw" loading="lazy" decoding="async" className="aspect-3/4 w-full object-cover transition-transform duration-500 group-hover:scale-105" /><span className="pointer-events-none absolute right-0 top-0 z-10 bg-primary px-3 py-1.5 text-[0.55rem] font-semibold tracking-[0.14em] text-primary-foreground">SAMPLE IMAGE</span><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/75 to-transparent px-4 pb-4 pt-12 font-display text-xl text-background">{category.label}</span></Link>)}</div></section>
    <section className="mx-auto max-w-[1400px] px-4 pb-16 md:px-8 md:pb-24"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Available now</p><h2 className="mt-2 font-display text-4xl md:text-5xl">Our sarees</h2></div><Link to="/collections" className="text-xs uppercase tracking-[0.16em] text-primary">View all</Link></div><div className="mt-9"><ProductGrid products={products} /></div></section>
  </div>;
}
