import { useParams, Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const PRODUCTS_PER_PAGE = 8;

type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export default function ProductListingPage() {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter"); // featured | new | sale

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // reset page on change
  useEffect(() => {
    setCurrentPage(1);
  }, [slug, filter]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        // 1️⃣ Fetch category (if slug exists)
        if (slug) {
          const { data, error } = await supabase
            .from("categories")
            .select("*")
            .eq("slug", slug)
            .single();

          if (error) throw error;
          setCategory(data);
        } else {
          setCategory(null);
        }

        // 2️⃣ Pagination
        const from = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const to = from + PRODUCTS_PER_PAGE - 1;

        let query = supabase
          .from("products")
          .select("*, categories!inner(slug)", { count: "exact" })
          .eq("is_active", true)
          .range(from, to);

        // category filter
        if (slug) {
          query = query.eq("categories.slug", slug);
        }

        // product filters
        if (filter === "featured") {
          query = query.eq("is_featured", true);
        }

        if (filter === "sale") {
          query = query.eq("on_sale", true); // or discount > 0
        }

        if (filter === "new") {
          query = query.order("created_at", { ascending: false });
        } else {
          query = query.order("created_at", { ascending: false });
        }

        const { data, error, count } = await query;

        if (error) throw error;

        setProducts(data ?? []);
        setTotalCount(count ?? 0);
        setTotalPages(Math.ceil((count ?? 0) / PRODUCTS_PER_PAGE));
      } catch (err) {
        console.error("Product listing error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug, filter, currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // 🧠 Dynamic title & subtitle
  const title =
    category?.name ??
    (filter === "featured"
      ? "Featured Products"
      : filter === "new"
      ? "New Arrivals"
      : filter === "sale"
      ? "On Sale"
      : "All Products");

  const subtitle =
    filter === "featured"
      ? "Handpicked customer favorites"
      : filter === "new"
      ? "Fresh from our artisans"
      : filter === "sale"
      ? "Limited-time offers"
      : category?.description ??
        "Explore our complete collection of authentic Kashmiri clothing.";

  return (
    <Layout>
      {/* Header */}
      <section className="bg-card border-b border-border py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">{title}</span>
          </nav>

          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2">
            {title}
          </h1>
          <p className="text-muted-foreground max-w-lg">{subtitle}</p>
        </div>
      </section>

      {/* Products */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          {!loading && (
            <p className="text-sm text-muted-foreground mb-6">
              Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–
              {Math.min(currentPage * PRODUCTS_PER_PAGE, totalCount)} of{" "}
              {totalCount} products
            </p>
          )}

          {loading ? (
            <p className="text-muted-foreground">Loading products...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="icon"
                    onClick={() => goToPage(page)}
                    className="w-10"
                  >
                    {page}
                  </Button>
                )
              )}

              <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
