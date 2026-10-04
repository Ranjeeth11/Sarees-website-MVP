import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { catalogueKey, loadCatalogue } from "@/lib/catalogue";
import { site } from "@/data/site";
import { ProductGrid } from "@/components/store/ProductGrid";
import { ProductGallery } from "@/components/store/ProductGallery";
import { motion } from "framer-motion";
import { Sparkles, Truck, ShieldCheck } from "lucide-react";

const trustItems = [
  { icon: Sparkles, label: "Handpicked" },
  { icon: Truck, label: "Easy dispatch" },
  { icon: ShieldCheck, label: "Secure catalogue" },
];
export const Route = createFileRoute("/product/$id")({
  loader: async ({ params, context }) => {
    const products = await context.queryClient.fetchQuery({
      queryKey: catalogueKey,
      queryFn: loadCatalogue,
    });
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product, products };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.product.name} | The Saree Edit` : "Saree not found" },
      { name: "description", content: loaderData?.product.description ?? "" },
    ],
  }),
  component: ProductDetail,
});
function ProductDetail() {
  const { product, products } = Route.useLoaderData();
  const images = product.images?.length ? product.images : [product.image];
  const related = products.filter((item) => item.id !== product.id).slice(0, 3);
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-20 pt-24 md:px-8 md:pt-32">
      <nav
        aria-label="Breadcrumb"
        className="text-xs uppercase tracking-[0.15em] text-muted-foreground"
      >
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span className="px-2">/</span>
        <Link to="/collections" className="hover:text-primary">
          Sarees
        </Link>
      </nav>
      <div className="mt-7 grid gap-9 md:grid-cols-[1.05fr_.95fr] md:gap-16">
        <ProductGallery
          key={product.id}
          images={images}
          alt={`${product.name}, ${product.fabric}`}
          isPlaceholder={product.isPlaceholder}
        />
        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="min-w-0 md:pt-3"
        >
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {product.price === null ? "Ask price" : `₹${product.price}`}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            {product.description}
          </p>
          <a
            href={site.whatsAppUrl(`Hi, I'm interested in ${product.name}`)}
            className="luxury-button mt-8 flex min-h-14 w-full items-center justify-center rounded-sm bg-primary px-6 text-sm font-medium uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Order on WhatsApp <span className="ml-3 text-lg">↗</span>
          </a>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Message us to check availability, price and delivery.
          </p>
          <dl className="mt-9 grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-4 gap-y-3 border-t border-border pt-6 text-sm">
            <dt className="text-muted-foreground">Fabric</dt>
            <dd className="text-right">{product.fabric}</dd>
            <dt className="text-muted-foreground">Colour</dt>
            <dd className="text-right">{product.color}</dd>
            <dt className="text-muted-foreground">Availability</dt>
            <dd className="text-right">
              {product.available ? "Available to enquire" : "Sold out"}
            </dd>
          </dl>
          <div className="mt-8 grid grid-cols-3 gap-2 border-y border-border py-5 text-center">
            {trustItems.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 text-[0.58rem] uppercase tracking-[0.12em] text-muted-foreground"
              >
                <Icon size={18} strokeWidth={1.5} className="text-primary" />
                {label}
              </div>
            ))}
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-sm bg-secondary/60 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-primary">Details</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Blouse piece included where mentioned. Message us for exact measurements and
                availability.
              </p>
            </div>
            <div className="rounded-sm bg-secondary/60 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-primary">Care</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Store folded in a soft cloth and follow fabric-specific cleaning guidance.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      {related.length > 0 && (
        <section className="mt-20">
          <p className="eyebrow">More sarees</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">You may also like</h2>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
      <a
        href={site.whatsAppUrl(`Hi, I'm interested in ${product.name}`)}
        className="fixed inset-x-4 bottom-20 z-30 flex min-h-12 items-center justify-center rounded-sm bg-primary px-5 text-xs uppercase tracking-[0.16em] text-primary-foreground shadow-xl md:hidden"
      >
        Message about this saree <span className="ml-2">↗</span>
      </a>
    </div>
  );
}
