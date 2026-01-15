import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Package, Clock, CheckCircle, Truck, LogIn } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

/* ---------- Helpers ---------- */

const getStatusIcon = (status: string) => {
  switch (status) {
    case "SHIPPED":
      return <Truck className="h-4 w-4 text-accent" />;
    case "PAID":
      return <Clock className="h-4 w-4 text-muted-foreground" />;
    case "CANCELLED":
      return <Package className="h-4 w-4 text-muted-foreground" />;
    default:
      return <CheckCircle className="h-4 w-4 text-green-600" />;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "SHIPPED":
      return "Shipped";
    case "PAID":
      return "Processing";
    case "CANCELLED":
      return "Cancelled";
    default:
      return "Delivered";
  }
};


/* ---------- Page ---------- */

const OrdersPage = () => {
  const { isAuthenticated, setShowLoginModal, user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------- Fetch Orders ---------- */
useEffect(() => {
  if (!isAuthenticated || !user) return;

  const fetchOrders = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        status,
        total_amount,
        created_at,
        order_items (
          id,
          quantity,
          price_at_purchase,
          size,
          products ( name )
        )
      `)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
    }

    setLoading(false);
  };

  fetchOrders();
}, [isAuthenticated, user]);


  /* ---------- Not Logged In ---------- */
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <LogIn className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="font-serif text-2xl font-semibold mb-4">
            Login to View Orders
          </h1>
          <p className="text-muted-foreground mb-6">
            Please login to view your order history.
          </p>
          <Button onClick={() => setShowLoginModal(true)} size="lg">
            Login with Phone
          </Button>
        </div>
      </Layout>
    );
  }

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          Loading orders...
        </div>
      </Layout>
    );
  }

  /* ---------- UI ---------- */
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-2xl md:text-3xl font-semibold mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-12">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Package className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-xl font-semibold mb-3">
              No orders yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Once you place an order, it will appear here.
            </p>
            <Button asChild>
              <Link to="/">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-card border border-border rounded-sm p-4 md:p-6"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Order #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Placed on{" "}
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="text-sm font-medium">
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="border-t border-border pt-4 space-y-2">
                  {order.order_items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >
                      <div>
                        <p className="font-medium">
                          {item.products?.name}
                        </p>
                        <p className="text-muted-foreground">
                          Qty: {item.quantity}
                          {item.size && ` • Size: ${item.size}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                  <span className="font-medium">
                    Total: {formatPrice(order.total_amount)}
                  </span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrdersPage;
