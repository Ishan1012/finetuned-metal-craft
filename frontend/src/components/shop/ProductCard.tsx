import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/admin";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden border-border hover:border-gold/50 transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.status === "Out of Stock" && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="secondary" className="text-sm">
              Out of Stock
            </Badge>
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {product.material}
        </Badge>
      </div>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gold">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center gap-2">
            <Link to={`/shop/${product._id}`}>
              <Button
                variant="outline"
                size="sm"
              >
                View
              </Button>
            </Link>
            <Button
              variant="gold"
              size="sm"
              disabled={product.status === "Out of Stock"}
              onClick={() => addToCart(product)}
              title={product.status === "Out of Stock" ? "Product out of stock" : "Add to cart"}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
