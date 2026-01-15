import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type HeroConfig = {
  image?: string;
  subtitle?: string;
  cta_text?: string;
  cta_link?: string;
};

type HeroBannerProps = {
  title?: string;
  subtitle?: string;
  config?: HeroConfig;
};

const HeroBanner = ({ title, subtitle, config }: HeroBannerProps) => {
  const image =
    config?.image ||
    "https://placehold.co/1600x900?text=Hero+Image";

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
        {/* Background Image */}
        <img
          src={image}
          alt={title || "Hero banner"}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              {subtitle && (
                <p className="text-sm uppercase tracking-widest text-secondary mb-3 font-medium">
                  {subtitle}
                </p>
              )}

              {title && (
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-card leading-tight mb-4">
                  {title}
                </h1>
              )}

              {config?.cta_text && config?.cta_link && (
                <div className="mt-6">
                  <Button size="lg" asChild className="font-medium">
                    <Link to={config.cta_link}>
                      {config.cta_text}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
