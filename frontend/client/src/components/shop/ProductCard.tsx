import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ZoomIn } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/Types";
import { Lightbox } from "@/components/gallery/Lightbox";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const imagesList: string[] =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <Card className="group overflow-hidden border-border hover:border-gold/50 transition-all duration-300 hover:shadow-lg">
        <div
          role="button"
          tabIndex={0}
          aria-label={`Zoom image of ${product.name}`}
          onClick={() => {
            setCurrentImgIndex(0);
            setIsLightboxOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setCurrentImgIndex(0);
              setIsLightboxOpen(true);
            }
          }}
          className="relative aspect-square overflow-hidden bg-muted cursor-zoom-in"
        >
          <img
            src={imagesList[0] || product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover zoom indicator overlay */}
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-background/90 text-foreground shadow-md backdrop-blur-sm flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <ZoomIn className="h-5 w-5 text-gold" />
            </div>
          </div>

          {imagesList.length > 1 && (
            <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded-full z-10 pointer-events-none">
              1/{imagesList.length}
            </span>
          )}

          {product.status === "Out of Stock" && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center pointer-events-none z-10">
              <Badge variant="secondary" className="text-sm">
                Out of Stock
              </Badge>
            </div>
          )}
          {product.material && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground pointer-events-none z-10">
              {product.material}
            </Badge>
          )}
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
            <Link to={`/shop/${product._id || product.id}`}>
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

      <Lightbox
        images={imagesList.map((src, i) => ({
          src,
          alt: `${product.name} - view ${i + 1}`,
          title: product.name,
          category: `${product.category}${product.material ? ` • ${product.material}` : ""}`,
        }))}
        currentIndex={currentImgIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  );
}
