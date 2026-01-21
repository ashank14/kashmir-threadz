import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import api from "@/lib/api";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const orderId = params.get("orderId");

  useEffect(() => {
    if (!orderId) return;

    const confirmOrder = async () => {
      const { data } = await api.get(`/api/orders/by-payment-ref/${orderId}`);

      if (data?.status === "PAID") {
        clearCart();
        navigate(`/orders/${data.public_order_id}`);
      } else {
        navigate("/payment-failed");
      }
    };

    confirmOrder();
  }, [orderId]);

  return <p>Confirming payment...</p>;
};

export default PaymentSuccess;
