import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft, Share2, Check, ZoomIn } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import { ProductCard } from "@/components/shop/ProductCard";
import { productAPI } from "@/lib/api-services";
import { Product } from "@/types/Types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Lightbox } from "@/components/gallery/Lightbox";
import { cn } from "@/lib/utils";

export default function ShopDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrentSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    if (!product) return;
    const images = product.images && product.images.length > 0 ? product.images : [product.image];
    setLightboxIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevLightboxImage = () => {
    if (!product) return;
    const images = product.images && product.images.length > 0 ? product.images : [product.image];
    setLightboxIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        setCurrentSlide(0);
        setLightboxIndex(0);
        setLightboxOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });

        const result = await productAPI.getProductById(id);
        const data = await productAPI.getProducts();
        const data2 = await productAPI.getDigitalProducts();

        if (result) {
          setProduct(result);
          setRelated([ ...data, ...data2 ]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  useEffect(() => {
    if (api) {
      api.scrollTo(0);
      setCurrentSlide(0);
    }
  }, [id, api]);

  if (isLoading) {
    return (
      <Layout>
        <section className="section-padding text-center">
          <p className="text-muted-foreground">Loading product details...</p>
        </section>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
          </div>
        </section>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product);
    // Optional: Show toast notification
  };

  const handleShareProduct = async () => {
    const productUrl = `${window.location.origin}${location.pathname}`;
    
    try {
      // Try to use the native Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: productUrl,
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(productUrl);
        setIsCopied(true);
        
        toast({
          title: "Link Copied!",
          description: `Product link copied to clipboard: ${product.name}`,
        });

        // Reset the button after 2 seconds
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (error) {
      // If share or clipboard fails, at least notify the user
      toast({
        title: "Share Failed",
        description: "Could not share the product link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const relatedProducts = related
    .filter((p) => p._id !== product._id && p.category === product.category)
    .slice(0, 4);

  if (relatedProducts.length < 4) {
    const otherProducts = related
      .filter((p) => p._id !== product._id && p.category !== product.category)
      .slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...otherProducts);
  }

  return (
    <Layout>
      {/* Product Detail */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image Carousel */}
            <ScrollReveal animation="fade-right">
              {(() => {
                const productImages: string[] =
                  product.images && product.images.length > 0
                    ? product.images
                    : product.image
                    ? [product.image]
                    : [];

                return (
                  <div className="space-y-3">
                    {productImages.length > 1 ? (
                      <div className="relative group/carousel">
                        <Carousel
                          setApi={setApi}
                          opts={{
                            align: "start",
                            loop: true,
                          }}
                          className="w-full"
                        >
                          <CarouselContent>
                            {productImages.map((img, index) => (
                              <CarouselItem key={index} className="basis-full">
                                <div
                                  role="button"
                                  tabIndex={0}
                                  aria-label={`View enlarged ${product.name} image ${index + 1}`}
                                  onClick={() => openLightbox(index)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault();
                                      openLightbox(index);
                                    }
                                  }}
                                  className="relative aspect-square overflow-hidden rounded-2xl bg-muted border border-border/50 shadow-sm cursor-pointer group/img"
                                >
                                  <img
                                    src={img}
                                    alt={`${product.name} - view ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                                  />

                                  {/* Hover zoom indicator */}
                                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="h-10 w-10 rounded-full bg-background/90 text-foreground shadow-md backdrop-blur-sm flex items-center justify-center transform scale-75 group-hover/img:scale-100 transition-transform duration-300">
                                      <ZoomIn className="h-5 w-5 text-gold" />
                                    </div>
                                  </div>

                                  {product.status === "Out of Stock" && (
                                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                                      <Badge variant="secondary" className="text-lg px-6 py-2">
                                        Out of Stock
                                      </Badge>
                                    </div>
                                  )}
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>

                          {/* Navigation Arrows */}
                          <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-background/90 backdrop-blur-sm border-none shadow-md z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0" />
                          <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-background/90 backdrop-blur-sm border-none shadow-md z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0" />
                        </Carousel>

                        {/* Image Counter Badge */}
                        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full pointer-events-none z-10">
                          {currentSlide + 1} / {productImages.length}
                        </div>
                      </div>
                    ) : (
                      <div
                        role="button"
                        tabIndex={0}
                        aria-label={`View enlarged ${product.name} image`}
                        onClick={() => openLightbox(0)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            openLightbox(0);
                          }
                        }}
                        className="relative aspect-square overflow-hidden rounded-2xl bg-muted border border-border/50 shadow-sm cursor-pointer group/img"
                      >
                        <img
                          src={productImages[0] || product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="h-10 w-10 rounded-full bg-background/90 text-foreground shadow-md backdrop-blur-sm flex items-center justify-center transform scale-75 group-hover/img:scale-100 transition-transform duration-300">
                            <ZoomIn className="h-5 w-5 text-gold" />
                          </div>
                        </div>
                        {product.status === "Out of Stock" && (
                          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                            <Badge variant="secondary" className="text-lg px-6 py-2">
                              Out of Stock
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Thumbnails Row */}
                    {productImages.length > 1 && (
                      <div className="flex items-center gap-3 overflow-x-auto py-2 px-1">
                        {productImages.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => api?.scrollTo(idx)}
                            aria-label={`Select product image ${idx + 1}`}
                            className={cn(
                              "relative h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer",
                              currentSlide === idx
                                ? "border-gold ring-2 ring-gold/30 shadow-md scale-105"
                                : "border-border/60 opacity-60 hover:opacity-100 hover:border-gold/40"
                            )}
                          >
                            <img
                              src={img}
                              alt={`${product.name} thumbnail ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </ScrollReveal>

            {/* Product Info */}
            <ScrollReveal animation="fade-left">
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline">{product.category}</Badge>
                    <Badge className="bg-primary text-primary-foreground">
                      {product.material}
                    </Badge>
                  </div>

                  <h1 className="text-4xl font-bold text-foreground mb-4">
                    {product.name}
                  </h1>

                  <div className="mb-6 p-4 bg-muted rounded-lg">
                    <p className="text-3xl font-bold text-gold">
                      {formatPrice(product.price)}
                    </p>
                    {product.status === "Out of Stock" && (
                      <p className="text-sm text-destructive mt-2">
                        Currently out of stock
                      </p>
                    )}
                  </div>

                  <div className="prose prose-invert max-w-none mb-8">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Product Features */}
                  <Card className="bg-muted/50 border-border mb-8">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-foreground mb-4">
                        Product Details
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Product ID:</span>
                          <span className="font-mono text-foreground">{product._id || product.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Material:</span>
                          <span className="text-foreground">{product.material}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Category:</span>
                          <span className="text-foreground">{product.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Stock Status:</span>
                          <span className={product.status === "In Stock" ? "text-green-500" : "text-red-500"}>
                            {product.status}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={product.status === "Out of Stock"}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2" size={20} />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleShareProduct}
                    className={isCopied ? "border-green-500 text-green-500" : ""}
                  >
                    {isCopied ? (
                      <>
                        <Check className="mr-2" size={20} />
                        Link Copied!
                      </>
                    ) : (
                      <>
                        <Share2 className="mr-2" size={20} />
                        Share Product
                      </>
                    )}
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/shop")}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Related Products Section (Optional) */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up" className="mb-8">
            <h2 className="text-3xl font-bold mb-2">You might also like</h2>
            <p className="text-muted-foreground">
              {relatedProducts.length > 0
                ? `Explore more ${product.category} and similar products`
                : "Explore more products from our collection"}
            </p>
          </ScrollReveal>

          {relatedProducts.length > 0 ? (
            <StaggerContainer>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <StaggerItem key={relatedProduct._id || relatedProduct.id}>
                    <ProductCard product={relatedProduct} />
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          ) : (
            <Card className="bg-muted/50 border-border">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  No related products available at the moment.
                </p>
                <Button
                  variant="outline"
                  onClick={() => navigate("/shop")}
                >
                  Browse All Products
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {(() => {
        const productImages =
          product.images && product.images.length > 0
            ? product.images
            : product.image
            ? [product.image]
            : [];

        return (
          <Lightbox
            images={productImages.map((img, idx) => ({
              src: img,
              alt: `${product.name} - view ${idx + 1}`,
              title: product.name,
              category: `${product.category} • ${product.material || "Metal Craft"}`,
            }))}
            currentIndex={lightboxIndex}
            isOpen={lightboxOpen}
            onClose={closeLightbox}
            onNext={nextLightboxImage}
            onPrev={prevLightboxImage}
          />
        );
      })()}
    </Layout>
  );
}
