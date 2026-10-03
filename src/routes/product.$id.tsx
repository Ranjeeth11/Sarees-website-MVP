import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { catalogueKey, loadCatalogue } from "@/lib/catalogue";
import { site } from "@/data/site";
import { ProductGrid } from "@/components/store/ProductGrid";
import { ProductGallery } from "@/components/store/ProductGallery";
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
      <div className="mt-7 grid gap-9 md:grid-cols-2 md:gap-16">
        <ProductGallery
          key={product.id}
          images={images}
          alt={`${product.name}, ${product.fabric}`}
          isPlaceholder={product.isPlaceholder}
        />
        <div className="min-w-0 md:pt-3">
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
            className="mt-8 flex min-h-14 w-full items-center justify-center bg-primary px-6 text-sm font-medium uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Order on WhatsApp
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
            <dd className="text-right">{product.available ? "Available to enquire" : "Sold out"}</dd>
          </dl>
        </div>
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
    </div>
  );
}
