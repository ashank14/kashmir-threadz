import Layout from "@/components/layout/Layout";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-lg">
        <h1 className="font-serif text-4xl font-semibold mb-6">Contact Us</h1>

        <ul className="space-y-6 text-muted-foreground">

          <li className="flex gap-3">
            <MapPin className="h-5 w-5 text-foreground shrink-0" />
            <span>
              Shop no 12, adjoining Geetanjali Salon,<br />
              Sector 2, Channi Himat,<br />
              Jammu, Jammu and Kashmir 180015
            </span>
          </li>

          <li className="flex gap-3">
            <Phone className="h-5 w-5 text-foreground shrink-0" />
            <span>+91 9419143656</span>
          </li>

          <li className="flex gap-3">
            <Mail className="h-5 w-5 text-foreground shrink-0" />
            <span>kanikaasethi@gmail.com</span>
          </li>

        </ul>
      </div>
    </Layout>
  );
}
