import productShawl1 from "@/assets/product-shawl-1.jpg";
import productShawl2 from "@/assets/product-shawl-2.jpg";
import productPheran1 from "@/assets/product-pheran-1.jpg";
import productStole1 from "@/assets/product-stole-1.jpg";
import categoryShawls from "@/assets/category-shawls.jpg";
import categoryPherans from "@/assets/category-pherans.jpg";
import categoryStoles from "@/assets/category-stoles.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  categorySlug: string;
  image: string;
  images: string[];
  description: string;
  details: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Pashmina Shawls",
    slug: "shawls",
    image: categoryShawls,
    description: "Handwoven pure Pashmina from the valleys of Kashmir",
    productCount: 24,
  },
  {
    id: "2",
    name: "Pherans",
    slug: "pherans",
    image: categoryPherans,
    description: "Traditional Kashmiri winter wear with intricate embroidery",
    productCount: 18,
  },
  {
    id: "3",
    name: "Stoles & Scarves",
    slug: "stoles",
    image: categoryStoles,
    description: "Delicate aari work stoles for everyday elegance",
    productCount: 32,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Sozni Embroidered Pashmina Shawl",
    price: 28500,
    originalPrice: 32000,
    category: "Pashmina Shawls",
    categorySlug: "shawls",
    image: productShawl1,
    images: [productShawl1, productShawl2],
    description: "Exquisite pure Pashmina shawl featuring traditional Sozni embroidery, handcrafted by master artisans from Srinagar. This timeless piece showcases intricate paisley patterns in rich maroon and cream.",
    details: [
      "100% Pure Pashmina",
      "Hand-embroidered Sozni work",
      "Size: 200cm x 80cm",
      "Origin: Srinagar, Kashmir",
      "Artisan: Mohammad Ashraf",
    ],
    isNew: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: "2",
    name: "Royal Blue Pheran with Tilla Work",
    price: 18500,
    category: "Pherans",
    categorySlug: "pherans",
    image: productPheran1,
    images: [productPheran1],
    description: "Traditional Kashmiri Pheran in deep royal blue, adorned with authentic Tilla (gold thread) embroidery around the neckline and sleeves. A statement piece for winter celebrations.",
    details: [
      "Premium wool blend",
      "Hand-embroidered Tilla work",
      "Available sizes: S, M, L, XL",
      "Origin: Anantnag, Kashmir",
      "Comes with matching inner layer",
    ],
    isFeatured: true,
    inStock: true,
  },
  {
    id: "3",
    name: "Blush Pink Aari Stole",
    price: 4500,
    originalPrice: 5200,
    category: "Stoles & Scarves",
    categorySlug: "stoles",
    image: productStole1,
    images: [productStole1],
    description: "Delicate stole featuring fine Aari embroidery in soft pink hues. Perfect for adding an elegant touch to any outfit, from casual wear to festive occasions.",
    details: [
      "Fine wool blend",
      "Hand-embroidered Aari work",
      "Size: 180cm x 70cm",
      "Origin: Budgam, Kashmir",
      "Lightweight and versatile",
    ],
    isNew: true,
    inStock: true,
  },
  {
    id: "4",
    name: "Forest Green Pashmina with Border",
    price: 22000,
    category: "Pashmina Shawls",
    categorySlug: "shawls",
    image: productShawl2,
    images: [productShawl2],
    description: "Luxurious forest green Pashmina featuring an elaborate golden border pattern. The rich color and intricate detailing make this a cherished heirloom piece.",
    details: [
      "100% Pure Pashmina",
      "Traditional border embroidery",
      "Size: 200cm x 80cm",
      "Origin: Srinagar, Kashmir",
      "Certificate of authenticity included",
    ],
    isFeatured: true,
    inStock: true,
  },
  {
    id: "5",
    name: "Ivory Bridal Pashmina",
    price: 45000,
    category: "Pashmina Shawls",
    categorySlug: "shawls",
    image: productShawl1,
    images: [productShawl1],
    description: "An heirloom-quality bridal Pashmina in pristine ivory, featuring the finest Sozni embroidery. Traditionally gifted to brides, this masterpiece takes months to complete.",
    details: [
      "100% Pure Pashmina (Grade A)",
      "Intricate Sozni embroidery",
      "Size: 200cm x 100cm",
      "Origin: Srinagar, Kashmir",
      "Handcrafted over 8 months",
    ],
    inStock: true,
  },
  {
    id: "6",
    name: "Maroon Pheran - Women's",
    price: 16500,
    category: "Pherans",
    categorySlug: "pherans",
    image: productPheran1,
    images: [productPheran1],
    description: "Classic women's Pheran in rich maroon with delicate chain stitch embroidery. Warm, comfortable, and perfect for Kashmiri winters.",
    details: [
      "Premium wool blend",
      "Chain stitch embroidery",
      "Available sizes: S, M, L, XL",
      "Origin: Srinagar, Kashmir",
      "Fully lined interior",
    ],
    isNew: true,
    inStock: true,
  },
];

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter((p) => p.categorySlug === categorySlug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.isFeatured);
};

export const getNewArrivals = (): Product[] => {
  return products.filter((p) => p.isNew);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};
