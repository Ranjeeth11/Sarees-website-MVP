import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";
import saree3 from "@/assets/saree-3.jpg";
import saree4 from "@/assets/saree-4.jpg";
import saree5 from "@/assets/saree-5.jpg";
import saree6 from "@/assets/saree-6.jpg";
import heroDetail from "@/assets/hero-detail.jpg";
import saree7 from "@/assets/saree-7.jpg";
import saree8 from "@/assets/saree-8.jpg";
import saree9 from "@/assets/saree-9.jpg";
import lehenga1 from "@/assets/lehenga-1.jpg";
import kurta1 from "@/assets/kurta-1.jpg";
import blouse1 from "@/assets/blouse-1.jpg";
import accessory1 from "@/assets/accessory-1.jpg";

export const categories = [
  "Sarees",
  "Lehengas",
  "Kurta Sets",
  "Blouses",
  "Ethnic Wear",
  "Accessories",
] as const;

export const collections = [
  "Festive Edit",
  "New Arrivals",
  "Everyday",
  "Celebration",
  "Bridal Heirloom",
  "Temple Silk",
  "Summer Cottons",
] as const;

export const occasions = [
  "Festive",
  "Wedding Guest",
  "Family Celebration",
  "Everyday Elegance",
  "Bridal",
  "Reception",
  "Puja & Temple",
] as const;

export type Category = (typeof categories)[number];
export type Collection = (typeof collections)[number];
export type Occasion = (typeof occasions)[number];

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
    id: "bridal-kanjivaram-saree",
    name: "Bridal Kanjivaram Saree",
    category: "Sarees",
    collection: "Bridal Heirloom",
    price: null,
    compareAtPrice: null,
    images: [saree7, heroDetail],
    description:
      "A crimson pure-silk Kanjivaram with a broad zari border — the heirloom drape for the wedding day itself.",
    color: "Red",
    occasion: "Bridal",
    sizes: sareeSizes,
    available: true,
    featured: true,
  },
  {
    id: "temple-border-silk-saree",
    name: "Temple Border Silk Saree",
    category: "Sarees",
    collection: "Temple Silk",
    price: null,
    compareAtPrice: null,
    images: [saree8],
    description:
      "Mustard silk with a plum temple border, woven for morning prayers and quiet festive days.",
    color: "Gold",
    occasion: "Puja & Temple",
    sizes: sareeSizes,
    available: true,
    featured: true,
  },
  {
    id: "handloom-cotton-saree",
    name: "Handloom Cotton Saree",
    category: "Sarees",
    collection: "Summer Cottons",
    price: null,
    compareAtPrice: null,
    images: [saree9],
    description:
      "A featherlight ivory handloom cotton with rose checks — the easiest drape for warm afternoons.",
    color: "Ivory",
    occasion: "Everyday Elegance",
    sizes: sareeSizes,
    available: true,
    featured: true,
  },
  {
    id: "champagne-embroidered-lehenga",
    name: "Champagne Embroidered Lehenga",
    category: "Lehengas",
    collection: "Bridal Heirloom",
    price: null,
    compareAtPrice: null,
    images: [lehenga1],
    description:
      "Champagne net with plum velvet borders and fine zardozi — cut for receptions and sangeet evenings.",
    color: "Gold",
    occasion: "Reception",
    sizes: ["XS", "S", "M", "L", "XL"],
    available: true,
    featured: true,
  },
  {
    id: "rose-kurta-palazzo-set",
    name: "Rose Kurta & Palazzo Set",
    category: "Kurta Sets",
    collection: "Everyday",
    price: null,
    compareAtPrice: null,
    images: [kurta1],
    description:
      "A dusty rose kurta with palazzo and dupatta, tonal embroidery throughout — comfort that still looks considered.",
    color: "Rose",
    occasion: "Everyday Elegance",
    sizes: ["XS", "S", "M", "L", "XL"],
    available: true,
    featured: true,
  },
  {
    id: "plum-zari-blouse",
    name: "Plum Zari Blouse",
    category: "Blouses",
    collection: "Festive Edit",
    price: null,
    compareAtPrice: null,
    images: [blouse1],
    description:
      "A plum silk blouse with gold zari motifs, made to finish the sarees you already love.",
    color: "Plum",
    occasion: "Festive",
    sizes: ["30", "32", "34", "36", "38", "40"],
    available: true,
    featured: false,
  },
  {
    id: "temple-jewellery-set",
    name: "Temple Jewellery & Potli Set",
    category: "Accessories",
    collection: "Temple Silk",
    price: null,
    compareAtPrice: null,
    images: [accessory1],
    description:
      "Gold-tone jhumkas, bangles and an ivory silk potli — the small things that finish a look.",
    color: "Gold",
    occasion: "Puja & Temple",
    sizes: ["One Size"],
    available: true,
    featured: false,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const colors = ["Plum", "Rose", "Ivory", "Gold", "Charcoal", "Red"] as const;