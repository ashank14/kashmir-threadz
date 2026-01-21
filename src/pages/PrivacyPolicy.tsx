import Layout from "@/components/layout/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="font-serif text-4xl font-semibold mb-6">Privacy Policy</h1>

        <p className="text-muted-foreground mb-4">
          We respect your privacy and are committed to protecting your personal
          information.
        </p>

        <h2 className="font-serif text-xl mt-6 mb-2">Information We Collect</h2>
        <p className="text-muted-foreground mb-4">
          We may collect your name, phone number, email address, delivery
          address, and browsing data for order processing and support.
        </p>

        <h2 className="font-serif text-xl mt-6 mb-2">How We Use Your Data</h2>
        <ul className="list-disc ml-6 text-muted-foreground space-y-2 mb-4">
          <li>To process and deliver your orders</li>
          <li>To provide customer support</li>
          <li>To improve our website</li>
          <li>To send order status updates</li>
        </ul>

        <h2 className="font-serif text-xl mt-6 mb-2">Third-Party Sharing</h2>
        <p className="text-muted-foreground mb-4">
          We do NOT sell your data. We only share necessary details with
          delivery partners and payment gateways for order completion.
        </p>

        <h2 className="font-serif text-xl mt-6 mb-2">Contact</h2>
        <p className="text-muted-foreground">
          Email: kanikaasethi@gmail.com <br />
          Phone: +91 9419143656
        </p>
      </div>
    </Layout>
  );
}
