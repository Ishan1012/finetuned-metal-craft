import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { ArrowLeft, ArrowRight, Minus, Plus, Trash2, ShoppingBag, Tag, Check, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    couponCode,
    discountPercent,
    discountAmount,
    finalPrice,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const { toast } = useToast();
  const [couponInput, setCouponInput] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (res.success) {
      toast({
        title: "Coupon Applied!",
        description: res.message,
      });
      setCouponInput("");
    } else {
      toast({
        title: "Coupon Error",
        description: res.message,
        variant: "destructive",
      });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast({
      title: "Coupon Removed",
      description: "Coupon discount removed from your cart.",
    });
  };

  if (items.length === 0) {
    return (
      <Layout>
        <section className="section-padding bg-background min-h-[60vh] flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto text-center py-16">
              <div className="h-20 w-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-10 w-10 text-gold" />
              </div>
              <h1 className="text-3xl font-bold mb-3 text-foreground">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-8 text-base">
                Looks like you haven't added any laser-cut products or architectural pieces yet.
              </p>
              <Button variant="gold" size="lg" asChild>
                <Link to="/shop">
                  Explore Products
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <Button variant="ghost" asChild className="mb-2 -ml-3">
                  <Link to="/shop">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Shopping Cart</h1>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="text-muted-foreground hover:text-destructive hover:border-destructive self-start sm:self-auto"
              >
                Clear Cart
              </Button>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <ScrollReveal animation="fade-right">
                <div className="space-y-4">
                  {items.map((item) => {
                    const prodId = item.product._id || item.product.id;
                    return (
                    <Card key={prodId} className="overflow-hidden border-border bg-card">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                          {/* Image */}
                          <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/shop/${prodId}`}
                              className="font-semibold text-foreground hover:text-gold transition-colors text-base line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-xs text-muted-foreground mt-1">
                              Material: <span className="text-foreground">{item.product.material || "Standard Grade"}</span>
                            </p>
                            <p className="text-sm font-semibold text-gold mt-1 sm:hidden">
                              {formatPrice(item.product.price)} each
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-border rounded-lg bg-background">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => updateQuantity(prodId, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-10 text-center text-sm font-semibold">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => updateQuantity(prodId, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            {/* Total for item */}
                            <div className="text-right min-w-[90px] hidden sm:block">
                              <p className="text-base font-bold text-foreground">
                                {formatPrice(item.product.price * item.quantity)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatPrice(item.product.price)} / unit
                              </p>
                            </div>

                            {/* Remove */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                              onClick={() => removeFromCart(prodId)}
                              title="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    );
                  })}
                </div>
              </ScrollReveal>

              {/* Coupon Code Section */}
              <ScrollReveal animation="fade-up" delay={0.1}>
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="h-4 w-4 text-gold" />
                      <h3 className="font-semibold text-sm">Have a coupon code?</h3>
                    </div>
                    {couponCode ? (
                      <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-emerald-600" />
                          <div>
                            <span className="font-bold text-emerald-700 uppercase">{couponCode}</span>
                            <span className="text-xs text-emerald-600 ml-2">
                              ({discountPercent > 0 ? `${discountPercent}% off` : formatPrice(discountAmount) + " off"})
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveCoupon}
                          className="text-xs text-muted-foreground hover:text-destructive h-7"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <Input
                          placeholder="Try WELCOME10 or ASDE10"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          className="max-w-xs uppercase"
                        />
                        <Button variant="gold" type="submit">
                          Apply Coupon
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <ScrollReveal animation="fade-left">
                <Card className="border-border bg-card sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-xl">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">{formatPrice(totalPrice)}</span>
                      </div>

                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-600 font-medium">
                          <span>Coupon Discount</span>
                          <span>-{formatPrice(discountAmount)}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-emerald-600 font-medium">Free</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-baseline">
                      <span className="text-base font-bold">Estimated Total</span>
                      <span className="text-2xl font-bold text-gold">{formatPrice(finalPrice)}</span>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Taxes calculated at checkout. Free shipping across India.
                    </p>

                    <Button variant="gold" size="lg" className="w-full" asChild>
                      <Link to="/checkout">
                        Proceed to Checkout
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>

                    <div className="pt-4 border-t border-border space-y-2 text-xs text-muted-foreground">
                      <p>✓ 100% Secure Checkout</p>
                      <p>✓ Razorpay, COD & Bank Transfer accepted</p>
                      <p>✓ Precision CNC Finished Quality</p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
