import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom"; 
import { useToast } from "@/components/ui/use-toast"; 
import { paymentAPI } from "@/lib/api-services";

// 1. Define Types
interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface PaymentPayload {
  formData: FormData;
  items: any[];
  totalPrice: number;
  clearCart: () => void;
}

interface PaymentContextType {
  isProcessing: boolean;
  processPayment: (payload: PaymentPayload) => Promise<void>;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

// 2. Create Context
const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// Helper function to load the script
const loadRazorpayScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// 3. Create Provider
export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const processPayment = async ({ formData, items, totalPrice, clearCart }: PaymentPayload) => {
    // 1. Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      toast({ title: "Missing Information", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    setIsProcessing(true);

    const isScriptLoaded = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!isScriptLoaded) {
      toast({ title: "Connection Error", description: "Razorpay SDK failed to load.", variant: "destructive" });
      setIsProcessing(false);
      return;
    }

    try {
      // 2. Call the API Service for Checkout
      const checkoutPayload = {
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pincode,
        },
        // Security Polish: Removed 'isDigital'. Let the server figure that out from the product ID!
        items: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price
        })),
        subtotal: totalPrice,
        shippingFee: import.meta.env.VITE_SHIPPING_FEE || 0,
        totalAmount: totalPrice,
      };

      const orderData = await paymentAPI.checkout(checkoutPayload);

      if (!orderData.success) throw new Error("Failed to create order on the server");

      const { order, dbOrderId } = orderData;

      // 3. Setup Razorpay Options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "ASDE LaserCuttings",
        description: "Order Checkout",
        order_id: order.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#d4af37" },

        handler: async function (response: any) {
          try {
            const verifyPayload = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              dbOrderId: dbOrderId,
              amount: totalPrice
            };

            // This hits your newly updated secure backend controller
            const verifyResult = await paymentAPI.verify(verifyPayload);

            if (verifyResult.success) {
              toast({ title: "Payment Successful!", description: "Thank you for your order." });
              clearCart();
              
              // Safely grab the decrypted links provided by the server
              const secureDownloads = verifyResult.digitalItems || [];
              
              navigate("/receipt", {
                state: {
                  orderId: dbOrderId,
                  paymentId: response.razorpay_payment_id,
                  amount: totalPrice,
                  customerName: formData.name,
                  email: formData.email,
                  date: new Date().toLocaleDateString(),
                  digitalItems: secureDownloads
                }
              });
            } else {
              throw new Error("Payment verification failed on server.");
            }
          } catch (error) {
            toast({ title: "Verification Error", description: "Payment succeeded but verification failed.", variant: "destructive" });
          } finally {
            setIsProcessing(false);
          }
        },
      };

      // 4. Open Razorpay Modal
      const paymentObject = new window.Razorpay(options);

      paymentObject.on("payment.failed", function (response: any) {
        toast({ title: "Payment Failed", description: response.error.description, variant: "destructive" });
        setIsProcessing(false);
      });

      paymentObject.on("window.closed", function () {
        setIsProcessing(false);
      });

      paymentObject.open();

    } catch (error) {
      console.error("Checkout Error:", error);
      toast({ title: "Checkout Error", description: "Something went wrong while initializing the payment.", variant: "destructive" });
      setIsProcessing(false);
    }
  };

  return (
    <PaymentContext.Provider value={{ isProcessing, processPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};

// 4. Create Custom Hook
export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};