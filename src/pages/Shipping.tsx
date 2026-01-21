import Layout from "@/components/layout/Layout";

export default function Shipping() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="font-serif text-4xl font-semibold mb-6">Shipping Information</h1>

        <p className="text-muted-foreground mb-4">
          We ship across India via trusted courier partners.
        </p>

        <h2 className="font-serif text-xl mt-6 mb-2">Shipping Time</h2>
        <p className="text-muted-foreground mb-4">
          Orders are dispatched within 24–48 hours. Delivery usually takes 4–7
          business days depending on location.
        </p>

        <h2 className="font-serif text-xl mt-6 mb-2">Shipping Charges</h2>
        <p className="text-muted-foreground mb-4">
          Shipping charges are calculated at checkout.
        </p>

        <h2 className="font-serif text-xl mt-6 mb-2">Tracking</h2>
        <p className="text-muted-foreground mb-4">
          You will receive tracking details via SMS/email after dispatch.
        </p>
      </div>
    </Layout>
  );
}
