import { Shield, Truck, Award, Heart } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "100% Authentic",
    description: "Genuine Kashmiri craftsmanship with certificate",
  },
  {
    icon: Heart,
    title: "Handmade with Love",
    description: "Each piece crafted by master artisans",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description: "Free shipping on orders above ₹5,000",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "UPI, cards, and COD available",
  },
];

const TrustBanner = () => {
  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-4">
                <feature.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-1 text-sm">
                {feature.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
