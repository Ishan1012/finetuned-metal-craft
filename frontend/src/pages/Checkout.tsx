import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpayScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePayment = async () => {
    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Load Razorpay SDK
    const isScriptLoaded = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!isScriptLoaded) {
      toast({
        title: "Connection Error",
        description: "Razorpay SDK failed to load. Are you online?",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    try {
      const orderResponse = await fetch("http://localhost:5000/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pinCode: formData.pincode,
          },
          items: items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
          })),
          subtotal: totalPrice,
          shippingFee: import.meta.env.VITE_SHIPPING_FEE || 0,
          totalAmount: totalPrice,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error("Failed to create order on the server");
      }

      const { order, dbOrderId } = orderData;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Your E-Commerce Store",
        description: "Order Checkout",
        order_id: order.id,

        // 4. Handle successful payment
        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch("http://localhost:5000/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                dbOrderId: dbOrderId,
                amount: totalPrice
              }),
            });

            const verifyResult = await verifyResponse.json();

            if (verifyResult.success) {
              toast({
                title: "Payment Successful!",
                description: "Thank you for your order. We have received your payment.",
              });
              clearCart();

              navigate("/receipt", {
                state: {
                  orderId: dbOrderId,
                  paymentId: response.razorpay_payment_id,
                  amount: totalPrice,
                  customerName: formData.name,
                  email: formData.email,
                  date: new Date().toLocaleDateString()
                }
              });
            } else {
              throw new Error("Payment verification failed on server.");
            }
          } catch (error) {
            toast({
              title: "Verification Error",
              description: "Payment succeeded but verification failed. Please contact support.",
              variant: "destructive",
            });
          } finally {
            setIsProcessing(false);
          }
        },

        // Auto-fill user details from your existing React state
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#d4af37", // Matches the 'gold' variant from your buttons
        },
      };

      // 5. Open the Razorpay checkout window
      const paymentObject = new window.Razorpay(options);

      // Handle when user closes the modal or payment fails
      paymentObject.on("payment.failed", function (response: any) {
        toast({
          title: "Payment Failed",
          description: response.error.description,
          variant: "destructive",
        });
        setIsProcessing(false);
      });

      // If user closes the window without paying, reset the processing state
      paymentObject.on("window.closed", function () {
        setIsProcessing(false);
      });

      paymentObject.open();

    } catch (error) {
      console.error("Checkout Error:", error);
      toast({
        title: "Checkout Error",
        description: "Something went wrong while initializing the payment.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
              <p className="text-muted-foreground mb-6">
                Add some products before checking out.
              </p>
              <Button variant="gold" asChild>
                <Link to="/shop">Browse Products</Link>
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
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/shop">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Checkout Form */}
            <ScrollReveal animation="fade-right">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address, apartment, etc."
                    />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">PIN Code *</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="400001"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Order Summary */}
            <ScrollReveal animation="fade-left">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-gold">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>

                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    {isProcessing ? "Processing..." : "Pay with Razorpay"}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4" />
                    Secure payment powered by Razorpay
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
