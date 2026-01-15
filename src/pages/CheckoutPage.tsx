import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, CreditCard, Smartphone, Banknote, LogIn } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

type Step = "address" | "payment" | "confirmation";
type PaymentMethod = "upi" | "card" | "cod";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user, setShowLoginModal } = useAuth();

  const [currentStep, setCurrentStep] = useState<Step>("address");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const finalTotal = totalPrice >= 5000 ? totalPrice : totalPrice + 200;

  /* ---------- Guards ---------- */

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <LogIn className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="font-serif text-2xl font-semibold mb-4">
            Login to Continue
          </h1>
          <p className="text-muted-foreground mb-6">
            Please login with your phone number to proceed.
          </p>
          <Button onClick={() => setShowLoginModal(true)} size="lg">
            Login with Phone
          </Button>
        </div>
      </Layout>
    );
  }

  if (items.length === 0 && currentStep !== "confirmation") {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-serif text-2xl font-semibold mb-4">
            Your cart is empty
          </h1>
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  /* ---------- Address Submit ---------- */

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !address.name ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.pincode
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      // Save name to public.users
      await api.post("api/user/update-name", {
        userId: user.id,
        fullName: address.name,
      });

      setCurrentStep("payment");
    } catch {
      toast.error("Failed to save user details");
    }
  };

  /* ---------- Payment ---------- */

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      const orderId = crypto.randomUUID();

      // 1️⃣ Create order + order_items
      await api.post("/api/orders/create", {
        orderId,
        items,
        totalAmount: finalTotal,
        address,
        paymentMethod,
      });

      // 2️⃣ COD FLOW
      if (paymentMethod === "cod") {
        clearCart();
        setCurrentStep("confirmation");
        toast.success("Order placed successfully (COD)");
        return;
      }

      // 3️⃣ ONLINE PAYMENT (Paytm)
      const { data } = await api.post("/api/paytm/create-order", {
        orderId,
        amount: finalTotal,
        userId: user.id,
      });

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://securegw-stage.paytm.in/order/process";

      form.innerHTML = `
        <input type="hidden" name="mid" value="${data.mid}" />
        <input type="hidden" name="orderId" value="${data.orderId}" />
        <input type="hidden" name="txnToken" value="${data.txnToken}" />
      `;

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  /* ---------- UI ---------- */

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* ADDRESS */}
        {currentStep === "address" && (
          <div className="bg-card border rounded-sm p-6">
            <h2 className="font-serif text-xl font-semibold mb-6">
              Delivery Address
            </h2>

            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <Label>Full Name *</Label>
              <Input
                value={address.name}
                onChange={(e) =>
                  setAddress({ ...address, name: e.target.value })
                }
              />

              <Label>Phone *</Label>
              <Input
                value={address.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
              />

              <Label>Address *</Label>
              <Input
                value={address.address}
                onChange={(e) =>
                  setAddress({ ...address, address: e.target.value })
                }
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="City"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
                <Input
                  placeholder="PIN Code"
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress({ ...address, pincode: e.target.value })
                  }
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Continue to Payment
              </Button>
            </form>
          </div>
        )}

        {/* PAYMENT */}
        {currentStep === "payment" && (
          <div className="bg-card border rounded-sm p-6">
            <h2 className="font-serif text-xl font-semibold mb-6">
              Payment Method
            </h2>

            {[
              { id: "upi", label: "UPI", icon: Smartphone },
              { id: "card", label: "Card", icon: CreditCard },
              { id: "cod", label: "Cash on Delivery", icon: Banknote },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setPaymentMethod(m.id as PaymentMethod)}
                className={`w-full flex items-center gap-3 p-4 border rounded-sm mb-3 ${
                  paymentMethod === m.id
                    ? "border-primary bg-primary/5"
                    : ""
                }`}
              >
                <m.icon className="h-5 w-5" />
                {m.label}
                {paymentMethod === m.id && (
                  <Check className="ml-auto text-primary" />
                )}
              </button>
            ))}

            <div className="border-t mt-6 pt-4">
              <div className="flex justify-between text-sm">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full mt-6"
              size="lg"
            >
              {isProcessing
                ? "Processing..."
                : `Pay ${formatPrice(finalTotal)}`}
            </Button>
          </div>
        )}

        {/* CONFIRMATION */}
        {currentStep === "confirmation" && (
          <div className="bg-card border rounded-sm p-8 text-center">
            <Check className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-semibold mb-2">
              Order Confirmed
            </h2>
            <p className="text-muted-foreground mb-6">
              Thank you for shopping with us.
            </p>
            <Button asChild>
              <Link to="/orders">View Orders</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CheckoutPage;
