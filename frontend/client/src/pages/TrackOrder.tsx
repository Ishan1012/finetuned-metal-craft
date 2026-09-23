import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageCircle,
  MapPin,
  CreditCard,
  Building2,
  Banknote,
  FileText
} from "lucide-react";
import { orderAPI } from "@/lib/api-services";
import { useToast } from "@/hooks/use-toast";

const statusSteps = [
  { key: "Created", label: "Order Placed", desc: "Order details received & verified" },
  { key: "Processing", label: "In Production", desc: "Laser cutting & surface finishing" },
  { key: "Shipped", label: "Dispatched / Shipped", desc: "In transit with courier partner" },
  { key: "Delivered", label: "Delivered", desc: "Safely delivered at destination" },
];

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [orderId, setOrderId] = useState(searchParams.get("id") || "");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchTrackOrder = async (searchId: string, searchEmail?: string) => {
    if (!searchId.trim()) {
      toast({
        title: "Order ID Required",
        description: "Please enter your order ID to track status.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setErrorMsg(null);
      setOrder(null);

      const res = await orderAPI.trackOrder(searchId.trim(), searchEmail?.trim());
      if (res.success && res.data) {
        setOrder(res.data);
      } else {
        setErrorMsg(res.message || "Order not found. Please verify your order ID.");
      }
    } catch (err: any) {
      console.error("Tracking lookup error:", err);
      setErrorMsg(
        err.response?.data?.message ||
        "Could not find an order with this ID and email combination. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initialId = searchParams.get("id");
    if (initialId) {
      fetchTrackOrder(initialId, searchParams.get("email") || undefined);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrackOrder(orderId, email);
  };

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const sequence = ["Created", "Paid", "Processing", "Shipped", "Delivered"];
    if (currentStatus === "Cancelled") return "cancelled";

    let effectiveCurrent = currentStatus === "Paid" ? "Processing" : currentStatus;
    let currentIndex = sequence.indexOf(effectiveCurrent);
    let stepIndex = sequence.indexOf(stepKey);

    if (currentIndex === -1) currentIndex = 0;
    if (stepIndex <= currentIndex) return "completed";
    return "upcoming";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price || 0);
  };

  return (
    <Layout>
      {/* Hero Header */}
      <section className="relative py-16 lg:py-24 gradient-hero overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-[url('/images/your_project.jpeg')] bg-cover bg-center bg-no-repeat opacity-25"
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">
              Real-Time Tracking
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-4">
              Track Your Metal Craft Order
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Enter your Order ID (from confirmation email or SMS) and billing email to view production & shipping status.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Lookup Card Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <ScrollReveal animation="fade-up">
            <Card className="shadow-lg border-border -mt-20 relative z-20 bg-card">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSearch} className="grid sm:grid-cols-12 gap-4 items-end">
                  <div className="sm:col-span-6 space-y-1.5">
                    <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Order ID *
                    </label>
                    <Input
                      placeholder="e.g. 64f8a... or Order ID"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      required
                      className="font-mono text-sm"
                    />
                  </div>
                  <div className="sm:col-span-4 space-y-1.5">
                    <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Billing Email (Optional)
                    </label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Button
                      variant="gold"
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-10"
                    >
                      {isLoading ? (
                        "Searching..."
                      ) : (
                        <>
                          <Search className="h-4 w-4 mr-1.5" />
                          Track
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Error Message */}
          {errorMsg && (
            <div className="mt-8 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-start gap-3 text-destructive">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">{errorMsg}</p>
                <p className="text-xs mt-1 text-muted-foreground">
                  Need assistance? Please reach out to our WhatsApp support at +91 93033 11384.
                </p>
              </div>
            </div>
          )}

          {/* Tracking Result View */}
          {order && (
            <div className="mt-10 space-y-8">
              {/* Status Header Card */}
              <ScrollReveal animation="fade-up">
                <Card className="border-border bg-card">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-bold text-foreground">
                            Order #{order._id ? order._id.slice(-6).toUpperCase() : "N/A"}
                          </h2>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                            order.status === "Delivered"
                              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                              : order.status === "Cancelled"
                              ? "bg-destructive/10 text-destructive border border-destructive/30"
                              : "bg-gold/15 text-gold border border-gold/40"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Placed on: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : order.date || "Recently"}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={`https://wa.me/919303311384?text=Hello%20ASDE%20Laser,%20inquiring%20about%20Order%20%23${order._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700"
                          >
                            <MessageCircle className="h-4 w-4" />
                            WhatsApp Support
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Visual Progress Stepper */}
                    {order.status === "Cancelled" ? (
                      <div className="py-8 text-center">
                        <div className="h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-3 text-destructive">
                          <AlertCircle className="h-8 w-8" />
                        </div>
                        <h3 className="text-lg font-bold text-destructive">This Order Has Been Cancelled</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          If this was unintended or if you require a refund status, contact our support team.
                        </p>
                      </div>
                    ) : (
                      <div className="py-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                          {statusSteps.map((step, idx) => {
                            const state = getStepStatus(step.key, order.status);
                            const isDone = state === "completed";
                            return (
                              <div key={step.key} className="flex flex-col items-center text-center relative z-10">
                                <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                                  isDone
                                    ? "bg-gold text-white shadow-md shadow-gold/20"
                                    : "bg-muted text-muted-foreground border border-border"
                                }`}>
                                  {idx === 0 && <Clock className="h-5 w-5" />}
                                  {idx === 1 && <Package className="h-5 w-5" />}
                                  {idx === 2 && <Truck className="h-5 w-5" />}
                                  {idx === 3 && <CheckCircle2 className="h-5 w-5" />}
                                </div>
                                <h4 className={`text-sm font-semibold ${isDone ? "text-foreground font-bold" : "text-muted-foreground"}`}>
                                  {step.label}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1 max-w-[150px]">
                                  {step.desc}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Order Summary & Shipping Details */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Items List */}
                <div className="md:col-span-2">
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Package className="h-5 w-5 text-gold" />
                        Ordered Items
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item: any, i: number) => {
                          const prod = item.product || {};
                          return (
                            <div key={i} className="flex items-center gap-4 py-2 border-b border-border last:border-0">
                              {prod.image && (
                                <div className="h-16 w-16 rounded-md overflow-hidden bg-muted shrink-0">
                                  <img
                                    src={prod.image}
                                    alt={prod.name || item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h5 className="font-semibold text-sm text-foreground line-clamp-1">
                                  {prod.name || item.name || "Laser Crafted Item"}
                                </h5>
                                <p className="text-xs text-muted-foreground">
                                  Quantity: {item.quantity || 1}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold text-foreground">
                                  {formatPrice((item.price || prod.price || 0) * (item.quantity || 1))}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-xs text-muted-foreground">Items summary not available.</p>
                      )}

                      <Separator />

                      <div className="space-y-1.5 text-sm pt-2">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Subtotal</span>
                          <span>{formatPrice(order.subtotal || order.totalAmount)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Shipping</span>
                          <span className="text-emerald-600 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border">
                          <span>Total</span>
                          <span className="text-gold">{formatPrice(order.totalAmount)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Details Column */}
                <div className="space-y-6">
                  {/* Shipping Info */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gold" />
                        Delivery Destination
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2 text-muted-foreground">
                      <p className="font-semibold text-foreground text-sm">{order.customerName}</p>
                      {order.shippingAddress ? (
                        <>
                          <p>{order.shippingAddress.address}</p>
                          <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pinCode}</p>
                        </>
                      ) : (
                        <p>No address recorded</p>
                      )}
                      <p className="pt-1">Phone: {order.phone}</p>
                      <p>Email: {order.email}</p>
                    </CardContent>
                  </Card>

                  {/* Payment Details */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-gold" />
                        Payment Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2 text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Payment Mode:</span>
                        <span className="font-semibold text-foreground uppercase">
                          {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod === "bank_transfer" ? "Bank Transfer" : "Razorpay Online"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Status:</span>
                        <span className={`font-semibold ${order.paymentStatus === "Paid" ? "text-emerald-600" : "text-amber-600"}`}>
                          {order.paymentStatus || (order.status === "Paid" ? "Paid" : "Pending")}
                        </span>
                      </div>
                      {order.orderNotes && (
                        <div className="pt-2 border-t border-border">
                          <span className="font-semibold text-foreground block mb-1">Notes:</span>
                          <p className="italic">{order.orderNotes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
