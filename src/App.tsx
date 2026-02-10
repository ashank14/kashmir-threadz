import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import OTPLoginModal from "@/components/auth/OTPLoginModal";
import Index from "./pages/Index";
import CategoryPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import NotFound from "./pages/NotFound";
import { CategoriesProvider } from "@/context/CategoriesContext";
import ProductListingPage from "./pages/ProductListingPage";

import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import About from "./pages/About";
import Refund from "./pages/Refund";
import Shipping from "./pages/Shipping";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CategoriesProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <OTPLoginModal />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/products" element={<ProductListingPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-failed" element={<PaymentFailed />} />
              <Route path="/about" element={<About />} />
              <Route path="/refund-policy" element={<Refund />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
      </CategoriesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
