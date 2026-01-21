import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-semibold text-foreground">
                KashmirThreadz
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Authentic Kashmiri craftsmanship, passed down through generations.
              Every piece tells a story of our heritage.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-serif text-lg font-medium text-foreground mb-4">
              Collections
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/category/shawls"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Pashmina Shawls
                </Link>
              </li>
              <li>
                <Link
                  to="/category/pherans"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Pherans
                </Link>
              </li>
              <li>
                <Link
                  to="/category/stoles"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Stoles & Scarves
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-serif text-lg font-medium text-foreground mb-4">
              Help
            </h4>
            <ul className="space-y-2">

              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/orders"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Track Order
                </Link>
              </li>

              <li>
                <Link
                  to="/shipping"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Shipping Info
                </Link>
              </li>

              <li>
                <Link
                  to="/refund-policy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Refund & Cancellation
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-medium text-foreground mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  Shop no 12, adjoining Geetanjali Salon,<br />
                  Sector 2, Channi Himat,<br />
                  Jammu, Jammu and Kashmir 180015
                </span>
              </li>

              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+91 9419143656</span>
              </li>

              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>kanikaasethi@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              100% Authentic Kashmiri Craft
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              Secure Payments (UPI, Cards)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              Family-run since 1985
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} KashmirThreadz. Handcrafted with love in Kashmir.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
