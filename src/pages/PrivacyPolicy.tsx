import Layout from "@/components/layout/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="font-serif text-4xl font-semibold mb-6">Privacy Policy</h1>

        <p className="text-muted-foreground mb-4">
          At KashmirThreadz, we respect your privacy and are committed to
          protecting the personal information you share with us. This policy
          explains how we collect, use, store, and safeguard your data when you
          browse our website or shop with us.
        </p>

        {/* 1. Information We Collect */}
        <h2 className="font-serif text-xl mt-6 mb-2">1. Information We Collect</h2>
        <p className="text-muted-foreground mb-4">
          We may collect the following information when you interact with our
          website:
        </p>
        <ul className="list-disc ml-6 text-muted-foreground space-y-2 mb-4">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, billing and shipping address.
          </li>
          <li>
            <strong>Order Details:</strong> Items purchased, payment details
            (processed securely through third-party gateways).
          </li>
          <li>
            <strong>Account Information:</strong> Login credentials if you
            create an account.
          </li>
          <li>
            <strong>Device & Browsing Data:</strong> IP address, browser type,
            pages visited, and other analytics data to improve user experience.
          </li>
        </ul>

        {/* 2. How We Use Your Information */}
        <h2 className="font-serif text-xl mt-6 mb-2">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc ml-6 text-muted-foreground space-y-2 mb-4">
          <li>To process and fulfill your orders</li>
          <li>To send order confirmations, updates, and notifications</li>
          <li>To improve website functionality and enhance user experience</li>
          <li>To respond to customer service inquiries</li>
          <li>To prevent fraudulent activities and ensure secure transactions</li>
        </ul>

        {/* 3. How We Protect Your Data */}
        <h2 className="font-serif text-xl mt-6 mb-2">3. How We Protect Your Data</h2>
        <ul className="list-disc ml-6 text-muted-foreground space-y-2 mb-4">
          <li>SSL encryption for all sensitive transactions</li>
          <li>Restricted access to customer information</li>
          <li>Regular security checks and updates</li>
        </ul>

        {/* 4. Sharing Your Information */}
        <h2 className="font-serif text-xl mt-6 mb-2">4. Sharing Your Information</h2>
        <p className="text-muted-foreground mb-4">
          We do <strong>not</strong> sell, trade, or rent your personal
          information. We only share necessary information with:
        </p>
        <ul className="list-disc ml-6 text-muted-foreground space-y-2 mb-4">
          <li>Trusted service providers such as couriers and payment gateways</li>
          <li>Legal authorities when required by law</li>
        </ul>

      

        {/* 6. Third-Party Links */}
        <h2 className="font-serif text-xl mt-6 mb-2">5. Third-Party Links</h2>
        <p className="text-muted-foreground mb-4">
          Our website may contain links to external sites. We are not
          responsible for the privacy practices or content of those websites.
        </p>

        {/* 7. Your Rights */}
        <h2 className="font-serif text-xl mt-6 mb-2">6. Your Rights</h2>
        <ul className="list-disc ml-6 text-muted-foreground space-y-2 mb-4">
          <li>Request access to the personal information we hold about you</li>
          <li>Ask for updates or corrections to your information</li>
          <li>Request deletion of your personal data</li>
          <li>Opt out of marketing emails anytime</li>
        </ul>

        {/* 8. Contact Us */}
        <h2 className="font-serif text-xl mt-6 mb-2">7. Contact Us</h2>
        <p className="text-muted-foreground">
          If you have any questions about this Privacy Policy or how we handle
          your data, please contact us:
          <br />
          <br />
          📧 <strong>kanikaasethi@gmail.com</strong>
          <br />
          📞 <strong>+91 9419143656</strong>
        </p>
      </div>
    </Layout>
  );
}
