import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { supabase } from "@/lib/supabase";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  source: "featured" | "new_arrivals";
  limit?: number;
  viewAllLink?: string;
  viewAllText?: string;
}

const ProductSection = ({
  title,
  subtitle,
  source,
  limit = 8,
  viewAllLink,
  viewAllText = "View All",
}: ProductSectionProps) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      let query = supabase
        .from("products")
        .select("*")
        .eq("is_active", true);

      if (source === "featured") {
        query = query.eq("is_featured", true);
      }

      if (source === "new_arrivals") {
        query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query.limit(limit);

      if (!error && data) {
        setProducts(data);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [source, limit]);

  if (loading || products.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-1">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            )}
          </div>

          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="hidden sm:flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
            >
              {viewAllText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            640: { slidesPerView: 2.2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile View All */}
        {viewAllLink && (
          <div className="mt-8 text-center sm:hidden">
            <Link
              to={viewAllLink}
              className="inline-flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
            >
              {viewAllText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
