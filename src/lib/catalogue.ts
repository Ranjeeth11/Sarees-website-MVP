import { createClient } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { categories, products, type Product } from "@/data/products";

const url = import.meta.env["VITE_SUPABASE_URL"];
const key = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
export const supabase =
  url && key
    ? createClient(url, key, {
        auth: {
          persistSession: typeof window !== "undefined",
          autoRefreshToken: typeof window !== "undefined",
          detectSessionInUrl: typeof window !== "undefined",
        },
      })
    : null;

export const catalogueKey = ["catalogue"];
export const categoriesKey = ["categories"];
export type CatalogueCategory = { id: string; name: string };
export async function loadCategories(): Promise<CatalogueCategory[]> {
  if (!supabase) return categories.map((name) => ({ id: name, name }));
  const { data, error } = await supabase.from("categories").select("id, name").order("name");
  if (error) throw new Error("Unable to load categories. Please try again.");
  return data;
}
export function useCategories() {
  return useQuery({ queryKey: categoriesKey, queryFn: loadCategories, staleTime: 30_000 });
}
export async function loadCatalogue(): Promise<Product[]> {
  if (!supabase) return products;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error("Unable to load sarees. Please try again.");
  // Keep the original showcase catalogue visible until the first real products
  // are added in Admin. Once Supabase has any products, it becomes the source
  // of truth for the storefront.
  if (data.length === 0) return products;
  const productIds = data.map((row) => row.id);
  const { data: galleryRows, error: galleryError } = await supabase
    .from("product_images")
    .select("product_id, image_path, sort_order")
    .in("product_id", productIds)
    .order("sort_order", { ascending: true });
  if (galleryError && galleryError.code !== "42P01")
    throw new Error("Unable to load saree images. Please try again.");
  return data.map((row) => {
    const paths = (galleryRows ?? [])
      .filter((image) => image.product_id === row.id)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((image) => image.image_path);
    const imagePaths = paths.length ? paths : [row.image_path];
    const primaryPath = imagePaths[0] ?? row.image_path;
    const images = imagePaths.map(
      (path) => supabase!.storage.from("saree-images").getPublicUrl(path).data.publicUrl,
    );
    const primaryImage =
      images[0] ??
      supabase!.storage.from("saree-images").getPublicUrl(row.image_path).data.publicUrl;
    return {
      id: row.id,
      name: row.name,
      category: row.category,
      fabric: row.fabric,
      price: row.price,
      description: row.description,
      color: row.color,
      available: row.available,
      featured: row.featured,
      isPlaceholder: false,
      imagePath: primaryPath,
      image: primaryImage,
      images,
    };
  });
}
export function useCatalogue() {
  return useQuery({ queryKey: catalogueKey, queryFn: loadCatalogue, staleTime: 30_000 });
}
