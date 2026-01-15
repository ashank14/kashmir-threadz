import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-2xl font-semibold mb-3">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any items yet.
            </p>
            <Button asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-2xl md:text-3xl font-semibold mb-8">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex gap-4 p-4 bg-card border rounded-sm"
              >
                {/* Image */}
                <Link
                  to={`/product/${item.productId}`}
                  className="w-24 h-24 rounded-sm overflow-hidden bg-muted shrink-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <Link
                        to={`/product/${item.productId}`}
                        className="font-medium hover:text-primary"
                      >
                        {item.name}
                      </Link>

                      {item.size && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Size: {item.size}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(item.productId, item.size)
                      }
                      className="p-1 hover:bg-muted rounded-sm"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Quantity + Price */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity - 1,
                            item.size
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 border rounded-sm flex items-center justify-center disabled:opacity-50"
                      >
                        <Minus className="h-3 w-3" />
                      </button>

                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity + 1,
                            item.size
                          )
                        }
                        className="w-8 h-8 border rounded-sm flex items-center justify-center"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <p className="font-medium">
                      ₹{((item.price * item.quantity) / 100).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border rounded-sm p-6">
              <h2 className="font-serif text-lg font-semibold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>₹{(totalPrice / 100).toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-sm mb-4">
                <span>Shipping</span>
                <span>
                  {totalPrice >= 500000 ? "Free" : "₹200"}
                </span>
              </div>

              <div className="flex justify-between font-semibold text-lg border-t pt-4">
                <span>Total</span>
                <span>
                  ₹{(
                    (totalPrice >= 500000
                      ? totalPrice
                      : totalPrice + 20000) / 100
                  ).toLocaleString()}
                </span>
              </div>

              <Button className="w-full mt-6" size="lg" asChild>
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
