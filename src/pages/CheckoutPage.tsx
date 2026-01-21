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
import { z } from "zod";



const CheckoutPage = () => {
  const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid Indian phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "PIN code must be 6 digits"),
});
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user, setShowLoginModal } = useAuth();

  const [isProcessing, setIsProcessing] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const finalTotal = totalPrice >= 5000 ? totalPrice : totalPrice + 0;

  /* ---------- Guards ---------- */

//  if (!isAuthenticated) {
//    return (
//      <Layout>
//        <div className="container mx-auto px-4 py-16 text-center max-w-md">
//          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
//            <LogIn className="h-8 w-8 text-muted-foreground" />
//          </div>
//          <h1 className="font-serif text-2xl font-semibold mb-4">
//            Login to Continue
//          </h1>
//          <p className="text-muted-foreground mb-6">
//            Please login with your phone number to proceed.
//          </p>
//          <Button onClick={() => setShowLoginModal(true)} size="lg">
//            Login with Phone
//         </Button>
//       </div>
//      </Layout>
//    );
//  }

  if (items.length === 0) {
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

    const result = checkoutSchema.safeParse(address);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    // Valid → continue
    await handlePayment();
  };



  /* ---------- Payment ---------- */

const handlePayment = async () => {
  try {
    setIsProcessing(true);

    // 1️⃣ Create pending order in backend
    const { data } = await api.post("https://kashmir-threadz-backend-production.up.railway.app/api/paytm/create-order", {
      userId: user?.id || "7f3c0c8e-0b7a-4d59-9c26-2fb0b6b0c9c1",
      address,
      items,
      amount: finalTotal,
    });

    const config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: data.orderId,    // Paytm orderId
        token: data.paytmToken,   // TXN_TOKEN
        tokenType: "TXN_TOKEN",
        amount: data.amount,
      },
      handler: {
        notifyMerchant(eventName, eventData) {
          console.log("Event:", eventName, eventData);
        },
      },
    };

    await window.Paytm.CheckoutJS.init(config);
    window.Paytm.CheckoutJS.invoke();

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
        {(
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

      </div>
    </Layout>
  );
};

export default CheckoutPage;
