import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductSection from "@/components/home/ProductSection";
import TrustBanner from "@/components/home/TrustBanner";
import { supabase } from "@/lib/supabase";

const Index = () => {
  const [sections, setSections] = useState<any[]>([]);

  useEffect(() => {
    const fetchSections = async () => {
      const { data, error } = await supabase
        .from("homepage_sections")
        .select("*")
        .eq("is_active", true)
        .order("order_index");

      if (!error) setSections(data ?? []);
    };

    fetchSections();
  }, []);

  return (
    <Layout>
      {sections.map((section) => {
        switch (section.type) {
          case "hero":
            return (
              <HeroBanner
                key={section.id}
                title={section.title}
                subtitle={section.config.subtitle}
                config={section.config}

              />
            );

          case "trust":
            return <TrustBanner key={section.id} />;
            
          case "categories":
            return <CategoryGrid key={section.id} />;

          case "products":
            return (
              <ProductSection
                key={section.id}
                title={section.title}
                subtitle={section.config.subtitle}
                source={section.config.source}
                limit={section.config.limit}
                viewAllText={section.config.cta_text}
                viewAllLink={section.config.cta_link}
              />
            );

          case "trust":
            return <TrustBanner key={section.id} />;

          default:
            return null;
        }
      })}
    </Layout>
  );
};

export default Index;
