import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Minus, Plus, Check, Truck, Shield, MapPin } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";


const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name, slug)")
        .eq("id", id)
        .single();

      if (!error && data) {
        setProduct(data);
        setSelectedImage(data.images?.[0] ?? null);
      }

      setLoading(false);
    }

    fetchProduct();
  }, [id]);

const sizeInventory = product?.size_inventory ?? null;

const sizes: string[] | null = sizeInventory
  ? Object.keys(sizeInventory)
  : null;

const handleAddToCart = () => {
  // SIZE PRODUCTS
  if (sizes) {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const availableStock = sizeInventory[selectedSize];

    if (availableStock <= 0) {
      toast.error("Selected size is out of stock");
      return;
    }

    if (quantity > availableStock) {
      toast.error(`Only ${availableStock} items available for this size`);
      return;
    }
  }

    // NON-SIZE PRODUCTS
    if (!sizes) {
      if (product.stock_quantity <= 0) {
        toast.error("Product is out of stock");
        return;
      }

      if (quantity > product.stock_quantity) {
        toast.error(`Only ${product.stock_quantity} items available`);
        return;
      }
    }

    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: displayPrice,
      quantity,
      size: selectedSize ?? undefined,
    });

    toast.success(`${product.name} added to cart`);
  };


  /* ---------- States ---------- */

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          Loading product...
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-semibold mb-4">Product Not Found</h1>
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  /* ---------- Derived values ---------- */

  const imageUrls: string[] = product.images || [];
  const isOnSale = product.on_sale && product.sale_price;
  const displayPrice = isOnSale ? product.sale_price : product.price;

      const isSizeProduct = sizes !== null;
      const isOutOfStock = isSizeProduct
      ? false // handled per size
      : product.stock_quantity <= 0;





  /* ---------- Render ---------- */

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link
            to={`/category/${product.categories.slug}`}
            className="hover:text-foreground"
          >
            {product.categories.name}
          </Link>
          <span>/</span>
          <span className="text-foreground line-clamp-1">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square bg-muted rounded-sm overflow-hidden mb-4">
              <img
                src={selectedImage || imageUrls[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {imageUrls.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {imageUrls.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-square rounded-sm overflow-hidden border-2 transition-colors
                      ${
                        selectedImage === img
                          ? "border-primary"
                          : "border-transparent hover:border-muted-foreground"
                      }
                    `}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sm text-muted-foreground uppercase mb-2">
              {product.categories.name}
            </p>

            <h1 className="text-3xl font-semibold mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-semibold text-foreground">
                ₹{(displayPrice / 100).toLocaleString()}
              </span>

              {isOnSale && (
                <span className="text-lg text-muted-foreground line-through">
                  ₹{(product.price / 100).toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6">
              {product.description}
            </p>
            {/* Size Selection */}
            {sizes && (
              <div className="mb-6">
                <p className="text-sm font-medium text-foreground mb-3">Size</p>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((size) => {
                    const available = sizeInventory[size] > 0;

                    return (
                      <button
                        key={size}
                        disabled={!available}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-sm border text-sm font-medium transition-colors
                          ${
                            selectedSize === size
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:border-foreground text-foreground"
                          }
                          ${!available && "opacity-40 cursor-not-allowed"}
                        `}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}


            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border rounded-sm flex items-center justify-center"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border rounded-sm flex items-center justify-center"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full mb-6 font-medium"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>

            {/* Trust Section */}
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" /> 100% Authentic Kashmiri Product
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Handcrafted in Kashmir
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" /> Free shipping above ₹5,000
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" /> Easy 7-day returns
              </div>
            </div>
                        {/* Product Details */}
            {product.details && product.details.length > 0 && (
              <div className="py-6 border-t border-border">
                <h3 className="font-medium text-foreground mb-4">
                  Product Details
                </h3>

                <ul className="space-y-2">
                  {product.details.map((detail: string, i: number) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
