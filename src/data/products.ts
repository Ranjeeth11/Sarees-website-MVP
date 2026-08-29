import silk1 from "@/assets/placeholders/placeholder-silk-1.webp";
import silk2 from "@/assets/placeholders/placeholder-silk-2.webp";
import silk3 from "@/assets/placeholders/placeholder-silk-3.webp";
import silk4 from "@/assets/placeholders/placeholder-silk-4.webp";
import cotton1 from "@/assets/placeholders/placeholder-cotton-1.webp";
import cotton2 from "@/assets/placeholders/placeholder-cotton-2.webp";
import cotton3 from "@/assets/placeholders/placeholder-cotton-3.webp";
import cotton4 from "@/assets/placeholders/placeholder-cotton-4.webp";
import party1 from "@/assets/placeholders/placeholder-party-wear-1.webp";
import party2 from "@/assets/placeholders/placeholder-party-wear-2.webp";
import party3 from "@/assets/placeholders/placeholder-party-wear-3.webp";
import party4 from "@/assets/placeholders/placeholder-party-wear-4.webp";
import daily1 from "@/assets/placeholders/placeholder-daily-wear-1.webp";
import daily2 from "@/assets/placeholders/placeholder-daily-wear-2.webp";
import daily3 from "@/assets/placeholders/placeholder-daily-wear-3.webp";
import daily4 from "@/assets/placeholders/placeholder-daily-wear-4.webp";

export const categories = ["Silk", "Cotton", "Party Wear", "Daily Wear"] as const;
export type Category = (typeof categories)[number];

export type Product = {
  id: string;
  name: string;
  category: Category;
  fabric: string;
  price: number | null;
  image: string;
  description: string;
  color: string;
  available: boolean;
  featured: boolean;
  isPlaceholder: true;
};

// PLACEHOLDER - replace with real photos
export const products: Product[] = [
  { id: "silk-kanjivaram", name: "Magenta Kanjivaram Silk", category: "Silk", fabric: "Pure silk with zari border", price: 18990, image: silk1, description: "A rich magenta silk saree with a classic gold zari border.", color: "Magenta", available: true, featured: true, isPlaceholder: true },
  { id: "silk-mustard", name: "Mustard Temple Silk", category: "Silk", fabric: "Pure silk", price: 16490, image: silk2, description: "Mustard silk with a deep green temple-inspired border.", color: "Mustard", available: true, featured: true, isPlaceholder: true },
  { id: "silk-emerald", name: "Emerald Banarasi Silk", category: "Silk", fabric: "Banarasi silk", price: 21490, image: silk3, description: "A luminous emerald silk saree for special occasions.", color: "Emerald green", available: true, featured: true, isPlaceholder: true },
  { id: "silk-plum", name: "Plum Zari Silk", category: "Silk", fabric: "Art silk with zari", price: 14990, image: silk4, description: "Plum silk finished with a statement gold zari border.", color: "Plum", available: true, featured: false, isPlaceholder: true },
  { id: "cotton-checks", name: "Ivory Check Handloom Cotton", category: "Cotton", fabric: "Handloom cotton", price: 2990, image: cotton1, description: "Lightweight ivory cotton with cheerful woven checks.", color: "Ivory", available: true, featured: true, isPlaceholder: true },
  { id: "cotton-mustard", name: "Mustard Border Cotton", category: "Cotton", fabric: "Mercerised cotton", price: 3290, image: cotton2, description: "A comfortable cotton saree with a deep green contrast border.", color: "Mustard", available: true, featured: false, isPlaceholder: true },
  { id: "cotton-indigo", name: "Indigo Block Print Cotton", category: "Cotton", fabric: "Printed cotton", price: 2790, image: cotton3, description: "Indigo block print cotton made for easy, everyday drapes.", color: "Indigo", available: true, featured: true, isPlaceholder: true },
  { id: "cotton-sage", name: "Sage Woven Stripe Cotton", category: "Cotton", fabric: "Handloom cotton", price: 3490, image: cotton4, description: "Subtle woven stripes in a soft sage green cotton.", color: "Sage green", available: true, featured: false, isPlaceholder: true },
  { id: "party-wine", name: "Wine Motif Organza", category: "Party Wear", fabric: "Organza with woven motifs", price: 8990, image: party1, description: "Wine organza scattered with delicate gold motifs.", color: "Wine", available: true, featured: true, isPlaceholder: true },
  { id: "party-magenta", name: "Magenta Sequin Drape", category: "Party Wear", fabric: "Sequin georgette", price: 10990, image: party2, description: "A vivid magenta saree with a subtle evening shimmer.", color: "Magenta", available: true, featured: true, isPlaceholder: true },
  { id: "party-green", name: "Deep Green Shimmer Saree", category: "Party Wear", fabric: "Georgette", price: 9490, image: party3, description: "Deep green georgette with a luminous party-ready border.", color: "Deep green", available: true, featured: false, isPlaceholder: true },
  { id: "party-plum", name: "Plum Tissue Saree", category: "Party Wear", fabric: "Tissue silk", price: 11990, image: party4, description: "Plum tissue with a metallic pallu for celebrations.", color: "Plum", available: true, featured: true, isPlaceholder: true },
  { id: "daily-mustard", name: "Mustard Printed Saree", category: "Daily Wear", fabric: "Soft cotton blend", price: 1990, image: daily1, description: "An easy mustard printed saree for regular wear.", color: "Mustard", available: true, featured: false, isPlaceholder: true },
  { id: "daily-green", name: "Deep Green Floral Saree", category: "Daily Wear", fabric: "Viscose blend", price: 2290, image: daily2, description: "A deep green floral saree with a soft fall.", color: "Deep green", available: true, featured: true, isPlaceholder: true },
  { id: "daily-magenta", name: "Magenta Motif Saree", category: "Daily Wear", fabric: "Cotton blend", price: 2190, image: daily3, description: "Magenta everyday saree finished with small woven motifs.", color: "Magenta", available: true, featured: false, isPlaceholder: true },
  { id: "daily-cream", name: "Cream Maroon Stripe Saree", category: "Daily Wear", fabric: "Cotton blend", price: 2090, image: daily4, description: "Classic cream and maroon stripes for an effortless drape.", color: "Cream", available: true, featured: true, isPlaceholder: true },
];

export const getProduct = (id: string) => products.find((product) => product.id === id);
