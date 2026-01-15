import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { supabase } from "@/lib/supabase";

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
  limit = 4,
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

      if (!error) {
        setProducts(data || []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [source, limit]);

  if (loading || products.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-1">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            )}
          </div>

          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {viewAllText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {viewAllLink && (
          <div className="mt-8 text-center sm:hidden">
            <Link
              to={viewAllLink}
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
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
