import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";


interface ProductCardProps {
  product: any;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const imagePath = product.images?.[0];
  const imageUrl = imagePath
    ? `${imagePath}`
    : "/placeholder.jpg"; // optional fallback

  const isOutOfStock = product.stock_quantity <= 0;
  const isOnSale = product.on_sale && product.sale_price;
  const discountPercent =
  isOnSale
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0;


  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-sm bg-muted aspect-square mb-4">
        <img
          src={imageUrl}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isOnSale && (
            <Badge variant="destructive" className="text-xs font-medium">
              {discountPercent}% OFF
            </Badge>
          )}

        </div>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {product.categories?.slug}
        </p>

        <h3 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">
            ₹{(isOnSale ? product.sale_price : product.price) / 100}
          </span>

          {isOnSale && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.price / 100}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
