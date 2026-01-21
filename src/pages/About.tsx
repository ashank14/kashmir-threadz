import Layout from "@/components/layout/Layout";

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="font-serif text-4xl font-semibold mb-6">About Us</h1>

        <p className="text-muted-foreground leading-relaxed mb-4">
          KashmirThreadz is a family-run boutique bringing authentic Kashmiri
          craftsmanship directly from Srinagar to your home.
        </p>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Every piece is handwoven, hand-embroidered, and created by artisans
          who have been practicing this craft for generations.
        </p>

        <p className="text-muted-foreground leading-relaxed mb-4">
          We believe in preserving our heritage and offering customers genuine,
          high-quality Pashmina shawls, pherans, stoles, and embroidered
          accessories.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          Thank you for supporting our artisan community and choosing handmade
          Kashmiri craftsmanship.
        </p>
      </div>
    </Layout>
  );
}
