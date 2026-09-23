import { Product } from "@/types/Types";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  couponCode: string | null;
  discountPercent: number;
  discountAmount: number;
  finalPrice: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "asde-cart";
const COUPON_STORAGE_KEY = "asde-coupon";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);

  // Load cart and coupon from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
    const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
    if (storedCoupon) {
      setCouponCode(storedCoupon);
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Save coupon
  useEffect(() => {
    if (couponCode) {
      localStorage.setItem(COUPON_STORAGE_KEY, couponCode);
    } else {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  }, [couponCode]);

  const addToCart = (product: Product, quantity = 1) => {
    const prodId = product._id || product.id;
    setItems((prev) => {
      const existing = prev.find((item) => (item.product._id || item.product.id) === prodId);
      if (existing) {
        return prev.map((item) =>
          (item.product._id || item.product.id) === prodId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => (item.product._id || item.product.id) !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        (item.product._id || item.product.id) === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode(null);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Calculate discount based on active coupon
  let discountPercent = 0;
  let discountAmount = 0;

  if (couponCode) {
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === "WELCOME10" || cleanCode === "ASDE10") {
      discountPercent = 10;
      discountAmount = Math.round(totalPrice * 0.1);
    } else if (cleanCode === "ASDE15") {
      discountPercent = 15;
      discountAmount = Math.round(totalPrice * 0.15);
    } else if (cleanCode === "FLAT500") {
      if (totalPrice >= 2000) {
        discountAmount = 500;
        discountPercent = Math.round((500 / totalPrice) * 100);
      }
    }
  }

  const finalPrice = Math.max(0, totalPrice - discountAmount);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "WELCOME10" || clean === "ASDE10") {
      setCouponCode(clean);
      return { success: true, message: `Coupon ${clean} applied! 10% discount activated.` };
    } else if (clean === "ASDE15") {
      setCouponCode(clean);
      return { success: true, message: `Coupon ${clean} applied! 15% discount activated.` };
    } else if (clean === "FLAT500") {
      if (totalPrice < 2000) {
        return { success: false, message: "FLAT500 requires a minimum order value of ₹2,000." };
      }
      setCouponCode(clean);
      return { success: true, message: "Coupon FLAT500 applied! ₹500 off your order." };
    } else {
      return { success: false, message: "Invalid coupon code. Try WELCOME10 for 10% off." };
    }
  };

  const removeCoupon = () => {
    setCouponCode(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        couponCode,
        discountPercent,
        discountAmount,
        finalPrice,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
