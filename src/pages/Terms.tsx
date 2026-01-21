import Layout from "@/components/layout/Layout";

export default function Terms() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="font-serif text-4xl font-semibold mb-6">Terms & Conditions</h1>

        <p className="text-muted-foreground mb-4">
          By using our website, you agree to the following terms:
        </p>

        <ul className="list-disc ml-6 text-muted-foreground space-y-2 mb-4">
          <li>All products are handcrafted and may vary slightly.</li>
          <li>Prices may change without notice.</li>
          <li>Orders are confirmed only after successful payment.</li>
          <li>You are responsible for providing accurate delivery information.</li>
        </ul>

        <p className="text-muted-foreground">
          For any questions, contact us at: kanikaasethi@gmail.com
        </p>
      </div>
    </Layout>
  );
}
