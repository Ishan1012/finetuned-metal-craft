import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-full sm:w-[420px] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-6 py-4 border-b border-border">
            <SheetTitle className="flex items-center gap-2 text-xl text-left">
              <ShoppingBag className="h-5 w-5" />
              Shopping Cart
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12 px-6">
              <ShoppingBag className="h-20 w-20 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground text-center">
                Add some products to get started
              </p>
              <Button 
                variant="gold" 
                asChild 
                onClick={() => setIsCartOpen(false)}
                className="w-full"
              >
                <Link to="/shop">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 p-3 rounded-lg bg-muted border border-border"
                    >
                      {/* Product Image */}
                      <Link
                        to={`/shop/${item.product.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="flex-shrink-0"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-md object-cover hover:opacity-80 transition-opacity"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/shop/${item.product.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="hover:text-gold transition-colors"
                        >
                          <h4 className="font-semibold text-sm line-clamp-2 hover:underline">
                            {item.product.name}
                          </h4>
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.product.material}
                        </p>
                        <p className="text-sm font-bold text-gold mt-1">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                        onClick={() => removeFromCart(item.product.id)}
                        title="Remove from cart"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Quantity Adjustment */}
                <div className="space-y-3 pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground font-semibold mt-3">Adjust Quantities</p>
                  {items.map((item) => (
                    <div
                      key={`qty-${item.product.id}`}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/50 border border-border"
                    >
                      <span className="text-xs text-muted-foreground line-clamp-1 flex-1">
                        {item.product.name}
                      </span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-border px-6 py-4 space-y-3">
                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-xs text-muted-foreground">At checkout</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-base font-bold">
                    <span>Total</span>
                    <span className="text-gold text-lg">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-2">
                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full"
                    asChild
                    onClick={() => setIsCartOpen(false)}
                  >
                    <Link to="/checkout">Checkout</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
