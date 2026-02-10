import Layout from "@/components/layout/Layout";

export default function Refund() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="font-serif text-4xl font-semibold mb-6">
          Refund, Return & Cancellation Policy
        </h1>

        <p className="text-muted-foreground mb-4">
          At KashmirThreadz, we take pride in offering premium handcrafted
          Kashmiri apparel. Each product is carefully inspected before dispatch.
          This policy outlines the conditions under which cancellations, returns,
          and refunds are accepted.
        </p>

        {/* CANCELLATION POLICY */}
        <h2 className="font-serif text-xl mt-6 mb-2">1. Cancellation Policy</h2>
        <p className="text-muted-foreground mb-4">
          Orders can be cancelled <strong>only before they are shipped.</strong>
          Once the order has been dispatched, it cannot be cancelled under any
          circumstances.
        </p>
        <p className="text-muted-foreground mb-4">
          To request cancellation, please contact us immediately with your order
          number.
        </p>

        {/* RETURN POLICY */}
        <h2 className="font-serif text-xl mt-6 mb-2">2. Return Policy</h2>
        <p className="text-muted-foreground mb-4">
          Due to the delicate and handcrafted nature of Kashmiri products, we
          accept returns only under the following conditions:
        </p>

        <ul className="list-disc ml-6 text-muted-foreground space-y-2 mb-4">
          <li>The product received is damaged or defective</li>
          <li>The product received is incorrect or not as described</li>
        </ul>

        <p className="text-muted-foreground mb-4">
          Returns are <strong>not accepted</strong> for the following:
        </p>
        <ul className="list-disc ml-6 text-muted-foreground space-y-2 mb-4">
          <li>Minor variations in color, texture, or handwork</li>
          <li>Products damaged due to improper handling after delivery</li>
          <li>Change of mind after receiving the product</li>
          <li>Used, washed, or altered products</li>
        </ul>

        <p className="text-muted-foreground mb-4">
          All return requests must be submitted within{" "}
          <strong>48 hours of delivery</strong>.  
          Requests made after this period will not be eligible.
        </p>

        <p className="text-muted-foreground mb-4">
          To request a return, please email us photos and videos of the issue as
          proof. Without proper evidence, the return request may be declined.
        </p>

        {/* REFUND POLICY */}
        <h2 className="font-serif text-xl mt-6 mb-2">3. Refund Policy</h2>
        <p className="text-muted-foreground mb-4">
          Once your return is received and inspected, we will notify you of the
          approval or rejection of your refund.
        </p>

        <p className="text-muted-foreground mb-4">
          If approved, the refund will be processed within{" "}
          <strong>5–7 business days</strong> to the original method of payment.
        </p>

        <p className="text-muted-foreground mb-4">
          Refunds will not include:
        </p>
        <ul className="list-disc ml-6 text-muted-foreground space-y-2 mb-4">
          <li>Shipping charges</li>
          <li>Any COD charges (if applicable)</li>
        </ul>

        <p className="text-muted-foreground mb-4">
          Refund processing time may vary depending on your bank or payment
          provider.
        </p>

        {/* EXCHANGE POLICY */}
        <h2 className="font-serif text-xl mt-6 mb-2">4. Exchange Policy</h2>
        <p className="text-muted-foreground mb-4">
          Exchanges are allowed only for incorrect or defective products.
          Exchange requests must also be raised within 48 hours of delivery.
        </p>

        {/* NON-RETURNABLE PRODUCTS */}
        <h2 className="font-serif text-xl mt-6 mb-2">
          5. Non-Returnable / Non-Refundable Items
        </h2>
        <p className="text-muted-foreground mb-4">The following are not eligible:</p>

        <ul className="list-disc ml-6 text-muted-foreground space-y-2 mb-4">
          <li>Customized or altered products</li>
          <li>Sale/discount items unless damaged</li>
          <li>Products with hygiene concerns (e.g., stoles/scarves once used)</li>
        </ul>

        {/* ORDER NOT DELIVERED / WRONG ADDRESS */}
        <h2 className="font-serif text-xl mt-6 mb-2">
          6. Order Not Delivered / Wrong Address
        </h2>
        <p className="text-muted-foreground mb-4">
          If the delivery fails due to an incorrect or incomplete address provided
          by the customer, the order will not be eligible for a refund. A
          re-delivery charge may apply.
        </p>

        {/* CONTACT */}
        <h2 className="font-serif text-xl mt-6 mb-2">7. Contact Us</h2>
        <p className="text-muted-foreground">
          For cancellations, returns, or refund-related queries, please contact:  
          <br />
          <br />
          📧 <strong>kanikaasethi@gmail.com</strong>
        </p>
      </div>
    </Layout>
  );
}
