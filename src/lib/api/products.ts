import { supabase } from "@/lib/supabase";

const PRODUCTS_PER_PAGE = 8;

export async function fetchCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchProductsByCategory(
  slug: string | null,
  page: number
) {
  const from = (page - 1) * PRODUCTS_PER_PAGE;
  const to = from + PRODUCTS_PER_PAGE - 1;

  let query = supabase
    .from("products")
    .select("*, categories!inner(slug)", { count: "exact" })
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (slug) {
    query = query.eq("categories.slug", slug);
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    products: data,
    totalPages: Math.ceil((count || 0) / PRODUCTS_PER_PAGE),
    totalCount: count || 0,
  };
}
