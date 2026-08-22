import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";
import saree3 from "@/assets/saree-3.jpg";
import saree4 from "@/assets/saree-4.jpg";
import saree5 from "@/assets/saree-5.jpg";
import saree6 from "@/assets/saree-6.jpg";
import girl1 from "@/assets/girl-1.jpg";
import girl2 from "@/assets/girl-2.jpg";
import girl3 from "@/assets/girl-3.jpg";
import girl4 from "@/assets/girl-4.jpg";
import heroDetail from "@/assets/hero-detail.jpg";
import heroGirl from "@/assets/hero-girl.jpg";

export type Product = {
  id: string;
  name: string;
  category: Category;
  collection: Collection;
  /** null = price on request until the real catalogue is supplied */
  price: number | null;
  compareAtPrice: number | null;
  images: string[];
  description: string;
  color: string;
  occasion: Occasion;
  sizes: string[];
  available: boolean;
  featured: boolean;
};

const sareeSizes = ["Free Size"];
const girlSizes = ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"];

export const products: Product[] = [
  {
    id: "classic-silk-saree",
    name: "Classic Silk Saree",
    category: "Sarees",
    collection: "Celebration",
    price: null,
    compareAtPrice: null,
    images: [saree1, heroDetail],
    description:
      "A deep wine silk drape finished with a woven gold border — made for the occasions you dress up for.",
    color: "Plum",
    occasion: "Wedding Guest",
    sizes: sareeSizes,
    available: true,
    featured: true,
  },
  {
    id: "soft-festive-saree",
    name: "Soft Festive Saree",
    category: "Sarees",
    collection: "Festive Edit",
    price: null,
    compareAtPrice: null,
    images: [saree2, heroDetail],
    description:
      "A gentle dusty rose drape with fine tonal embroidery, light enough to wear through a long celebration.",
    color: "Rose",
    occasion: "Festive",
    sizes: sareeSizes,
    available: true,
    featured: true,
  },
  {
    id: "printed-everyday-saree",
    name: "Printed Everyday Saree",
    category: "Sarees",
    collection: "Everyday",
    price: null,
    compareAtPrice: null,
    images: [saree3],
    description:
      "A breathable printed cotton saree in ivory and charcoal — easy mornings, effortless evenings.",
    color: "Ivory",
    occasion: "Everyday Elegance",
    sizes: sareeSizes,
    available: true,
    featured: true,
  },
  {
    id: "celebration-edit-saree",
    name: "Celebration Edit Saree",
    category: "Sarees",
    collection: "Festive Edit",
    price: null,
    compareAtPrice: null,
    images: [saree4],
    description:
      "Champagne gold silk with a contrast pallu, styled for weddings and family celebrations.",
    color: "Gold",
    occasion: "Family Celebration",
    sizes: sareeSizes,
    available: true,
    featured: true,
  },
  {
    id: "contemporary-saree",
    name: "Contemporary Saree",
    category: "Sarees",
    collection: "New Arrivals",
    price: null,
    compareAtPrice: null,
    images: [saree5],
    description:
      "A quiet, modern drape in warm charcoal with a fine rose selvedge for understated evenings.",
    color: "Charcoal",
    occasion: "Everyday Elegance",
    sizes: sareeSizes,
    available: false,
    featured: false,
  },
  {
    id: "graceful-occasion-saree",
    name: "Graceful Occasion Saree",
    category: "Sarees",
    collection: "New Arrivals",
    price: null,
    compareAtPrice: null,
    images: [saree6],
    description:
      "Sheer plum organza scattered with gold motifs — light, luminous and quietly festive.",
    color: "Plum",
    occasion: "Festive",
    sizes: sareeSizes,
    available: true,
    featured: true,
  },
  {
    id: "girls-festive-dress",
    name: "Girls Festive Dress",
    category: "Girls Dresses",
    collection: "Festive Edit",
    price: null,
    compareAtPrice: null,
    images: [girl1, heroGirl],
    description:
      "An ivory and gold festive set with a soft twirl, made for temple mornings and family evenings.",
    color: "Ivory",
    occasion: "Festive",
    sizes: girlSizes,
    available: true,
    featured: true,
  },
  {
    id: "girls-ethnic-set",
    name: "Girls Ethnic Set",
    category: "Ethnic Wear",
    collection: "Everyday",
    price: null,
    compareAtPrice: null,
    images: [girl2],
    description:
      "A dusty rose kurta set with a light dupatta — comfortable enough for a whole day of visiting.",
    color: "Rose",
    occasion: "Family Celebration",
    sizes: girlSizes,
    available: true,
    featured: true,
  },
  {
    id: "girls-party-dress",
    name: "Girls Party Dress",
    category: "Girls Dresses",
    collection: "Celebration",
    price: null,
    compareAtPrice: null,
    images: [girl3],
    description:
      "A layered party frock with delicate embroidery for birthdays and celebrations.",
    color: "Plum",
    occasion: "Family Celebration",
    sizes: girlSizes,
    available: true,
    featured: true,
  },
  {
    id: "girls-traditional-wear",
    name: "Girls Traditional Wear",
    category: "Ethnic Wear",
    collection: "New Arrivals",
    price: null,
    compareAtPrice: null,
    images: [girl4],
    description:
      "A classic ivory pattu pavadai with a gold border — the one that ends up in every photograph.",
    color: "Ivory",
    occasion: "Wedding Guest",
    sizes: girlSizes,
    available: true,
    featured: true,
  },
  {
    id: "family-celebration-look",
    name: "Family Celebration Look",
    category: "Girls Dresses",
    collection: "Celebration",
    price: null,
    compareAtPrice: null,
    images: [heroGirl, girl1],
    description:
      "A soft floral lehenga set styled to sit beautifully alongside a mother's saree.",
    color: "Rose",
    occasion: "Family Celebration",
    sizes: girlSizes,
    available: true,
    featured: false,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const categories = ["Sarees", "Girls Dresses", "Ethnic Wear"] as const;
export const collections = [
  "Festive Edit",
  "New Arrivals",
  "Everyday",
  "Celebration",
] as const;
export const occasions = [
  "Festive",
  "Wedding Guest",
  "Family Celebration",
  "Everyday Elegance",
] as const;
export const colors = ["Plum", "Rose", "Ivory", "Gold", "Charcoal"] as const;