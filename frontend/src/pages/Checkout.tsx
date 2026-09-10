import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Building2,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Tag
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { usePayment } from "@/contexts/PaymentContext";
import { useToast } from "@/hooks/use-toast";
import { orderAPI } from "@/lib/api-services";

export default function Checkout() {
  const {
    items,
    totalPrice,
    discountAmount,
    couponCode,
    finalPrice,
    clearCart
  } = useCart();
  const { isProcessing, processPayment } = usePayment();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod" | "bank_transfer">("razorpay");
  const [orderNotes, setOrderNotes] = useState("");
  const [isSubmittingOffline, setIsSubmittingOffline] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const effectiveTotal = finalPrice !== undefined ? finalPrice : totalPrice;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRazorpayPayment = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping fields.",
        variant: "destructive"
      });
      return;
    }

    processPayment({
      formData,
      items,
      totalPrice: effectiveTotal,
      subtotal: totalPrice,
      clearCart,
      orderNotes,
    });
  };

  const handleOfflineOrder = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmittingOffline(true);
      const payload = {
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
          product: item.product._id || item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          name: item.product.name,
        })),
        subtotal: totalPrice,
        shippingFee: 0,
        totalAmount: effectiveTotal,
        paymentMethod,
        orderNotes,
      };

      const res = await orderAPI.createOfflineOrder(payload);
      if (res.success) {
        toast({
          title: "Order Placed Successfully!",
          description: paymentMethod === "cod"
            ? "Your Cash on Delivery order has been registered."
            : "Your Bank Transfer order has been placed. Please complete payment via UPI/Bank.",
        });

        clearCart();
        navigate("/receipt", {
          state: {
            orderId: res.orderId || (res.data && res.data._id),
            paymentMethod,
            paymentId: paymentMethod === "cod" ? "CASH_ON_DELIVERY" : "BANK_TRANSFER_PENDING",
            amount: effectiveTotal,
            customerName: formData.name,
            email: formData.email,
            date: new Date().toLocaleDateString(),
            orderNotes,
          }
        });
      } else {
        throw new Error(res.message || "Failed to place order");
      }
    } catch (err: any) {
      console.error("Offline order placement error:", err);
      toast({
        title: "Order Placement Error",
        description: err.response?.data?.message || err.message || "Something went wrong while placing your order.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingOffline(false);
    }
  };

  const handleSubmit = () => {
    if (paymentMethod === "razorpay") {
      handleRazorpayPayment();
    } else {
      handleOfflineOrder();
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
            <Button variant="ghost" asChild className="mb-6 -ml-3">
              <Link to="/cart">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cart
              </Link>
            </Button>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column: Shipping & Payment Method */}
            <div className="space-y-6">
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
                        placeholder="Street address, building, apartment"
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
                          placeholder="485001"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <Label htmlFor="orderNotes">Order Notes / Special Instructions (Optional)</Label>
                      <Textarea
                        id="orderNotes"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="e.g., Specific finish preference, delivery gate instructions, or custom laser engraving notes..."
                        rows={3}
                        className="resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Payment Method Selector */}
              <ScrollReveal animation="fade-right" delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle>Select Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Method 1: Razorpay */}
                    <div
                      onClick={() => setPaymentMethod("razorpay")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                        paymentMethod === "razorpay"
                          ? "border-gold bg-gold/5"
                          : "border-border hover:border-muted-foreground/50"
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-gold/10 text-gold shrink-0">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">Razorpay (Online Payment)</h4>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                              Testing Mode
                            </span>
                          </div>
                          {paymentMethod === "razorpay" && (
                            <CheckCircle2 className="h-5 w-5 text-gold" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          UPI (GPay, PhonePe, Paytm), Cards, NetBanking.
                        </p>
                        {paymentMethod === "razorpay" && (
                          <div className="mt-2.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300">
                            <strong>UPI Test Mode:</strong> In the Razorpay modal, choose <em>UPI</em> and enter <code className="font-mono font-bold bg-amber-500/20 px-1 py-0.5 rounded">success@razorpay</code> to simulate an instant successful payment.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Method 2: Cash on Delivery */}
                    <div
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                        paymentMethod === "cod"
                          ? "border-gold bg-gold/5"
                          : "border-border hover:border-muted-foreground/50"
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0">
                        <Banknote className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-foreground">Cash on Delivery (COD)</h4>
                          {paymentMethod === "cod" && (
                            <CheckCircle2 className="h-5 w-5 text-gold" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Pay in cash when your metal pieces are safely delivered to your doorstep.
                        </p>
                      </div>
                    </div>

                    {/* Method 3: Direct Bank Transfer */}
                    <div
                      onClick={() => setPaymentMethod("bank_transfer")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                        paymentMethod === "bank_transfer"
                          ? "border-gold bg-gold/5"
                          : "border-border hover:border-muted-foreground/50"
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 shrink-0">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">Direct Bank Transfer / UPI</h4>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                              Testing Mode
                            </span>
                          </div>
                          {paymentMethod === "bank_transfer" && (
                            <CheckCircle2 className="h-5 w-5 text-gold" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Simulate direct IMPS/NEFT or UPI transfers for institutional and test orders.
                        </p>
                      </div>
                    </div>

                    {/* Bank Details Display when Bank Transfer selected */}
                    {paymentMethod === "bank_transfer" && (
                      <div className="p-4 rounded-xl bg-slate-900 text-slate-100 space-y-3 mt-4 text-xs border border-amber-500/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gold font-bold text-sm">
                            <QrCode className="h-4 w-4" />
                            Company Bank & UPI (Testing Mode)
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-semibold uppercase">
                            Sandbox / Test Mode
                          </span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-2 text-slate-300">
                          <div>
                            <span className="text-slate-400 block">Bank Name:</span>
                            State Bank of India (SBI Test Branch)
                          </div>
                          <div>
                            <span className="text-slate-400 block">Beneficiary:</span>
                            Agrawal & Son Daughter Enterprises
                          </div>
                          <div>
                            <span className="text-slate-400 block">Test Account Number:</span>
                            <span className="font-mono text-gold font-bold">38920194820</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">IFSC Code:</span>
                            <span className="font-mono">SBIN0001234</span>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="text-slate-400 block">Test UPI ID:</span>
                            <span className="font-mono text-gold font-bold">asdelaser@testupi</span>
                            <span className="text-[11px] text-slate-400 ml-2">(or simulate with success@razorpay)</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-amber-300 pt-2 border-t border-slate-800">
                          * Testing Mode: You can submit this order to test the pipeline without sending actual funds.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>

            {/* Right Column: Order Summary & Action */}
            <div className="space-y-6">
              <ScrollReveal animation="fade-left">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                      {items.map((item) => (
                        <div key={item.product._id || item.product.id} className="flex gap-4">
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
                            <p className="text-xs text-muted-foreground">
                              {item.product.material || "Standard"}
                            </p>
                          </div>
                          <p className="text-sm font-medium">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>

                      {discountAmount > 0 && (
                        <div className="flex justify-between text-sm text-emerald-600 font-medium">
                          <span className="flex items-center gap-1">
                            <Tag className="h-3.5 w-3.5" />
                            Coupon ({couponCode})
                          </span>
                          <span>-{formatPrice(discountAmount)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping Fee</span>
                        <span className="text-emerald-600 font-medium">Free</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Payment Mode</span>
                        <span className="font-medium capitalize">
                          {paymentMethod === "razorpay" ? "Razorpay Online" : paymentMethod === "cod" ? "Cash on Delivery" : "Bank Transfer"}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total Payable</span>
                        <span className="text-gold text-2xl">{formatPrice(effectiveTotal)}</span>
                      </div>
                    </div>

                    <Button
                      variant="gold"
                      size="lg"
                      className="w-full text-base font-semibold"
                      onClick={handleSubmit}
                      disabled={isProcessing || isSubmittingOffline}
                    >
                      {isProcessing || isSubmittingOffline ? (
                        "Processing Order..."
                      ) : paymentMethod === "razorpay" ? (
                        <>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay with Razorpay ({formatPrice(effectiveTotal)})
                        </>
                      ) : paymentMethod === "cod" ? (
                        <>
                          <Banknote className="h-4 w-4 mr-2" />
                          Place COD Order ({formatPrice(effectiveTotal)})
                        </>
                      ) : (
                        <>
                          <Building2 className="h-4 w-4 mr-2" />
                          Place Bank Transfer Order ({formatPrice(effectiveTotal)})
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-gold" />
                      Encrypted & Secure 256-bit Checkout
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

