import Layout from "@/components/layout/Layout";

export default function Refund() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="font-serif text-4xl font-semibold mb-6">
          Refund & Cancellation Policy
        </h1>

        <h2 className="font-serif text-xl mt-6 mb-2">Cancellations</h2>
        <p className="text-muted-foreground mb-4">
          Orders can be cancelled before they are shipped. Once shipped, they
          cannot be cancelled.
        </p>

        <h2 className="font-serif text-xl mt-6 mb-2">Returns</h2>
        <p className="text-muted-foreground mb-4">
          Due to the delicate nature of handcrafted Pashmina products, returns
          are accepted only if:
        </p>

        <ul className="list-disc ml-6 text-muted-foreground space-y-2 mb-4">
          <li>The product is damaged</li>
          <li>The product received is incorrect</li>
        </ul>

        <p className="text-muted-foreground mb-4">
          Return requests must be submitted within 48 hours of delivery.
        </p>

        <h2 className="font-serif text-xl mt-6 mb-2">Refunds</h2>
        <p className="text-muted-foreground mb-4">
          Refunds are processed within 5–7 business days after product review.
        </p>

        <p className="text-muted-foreground">
          Contact: kanikaasethi@gmail.com
        </p>
      </div>
    </Layout>
  );
}
