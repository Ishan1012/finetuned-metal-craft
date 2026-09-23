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
  FileText,
  Sparkles,
  Copy,
  Check,
  Layers,
  Ruler,
  ExternalLink,
  Calendar,
  Compass
} from "lucide-react";
import { orderAPI } from "@/lib/api-services";
import { useToast } from "@/hooks/use-toast";

const orderStatusSteps = [
  { key: "Created", label: "Order Placed", desc: "Order details received & verified" },
  { key: "Processing", label: "In Production", desc: "Laser cutting & surface finishing" },
  { key: "Shipped", label: "Dispatched / Shipped", desc: "In transit with courier partner" },
  { key: "Delivered", label: "Delivered", desc: "Safely delivered at destination" },
];

const quoteStatusSteps = [
  { key: "Submitted", label: "Request Received", desc: "Project specs & drawing recorded" },
  { key: "Under Review", label: "Engineering Review", desc: "CAD tolerance & laser path analysis" },
  { key: "Estimated", label: "Quotation Prepared", desc: "Pricing & turnaround estimated" },
  { key: "Approved", label: "Approved for Production", desc: "Approved & scheduled on CNC machines" },
];

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [orderId, setOrderId] = useState(searchParams.get("id") || "");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isNewQuote = searchParams.get("new") === "true";

  const fetchTrackItem = async (searchId: string, searchEmail?: string) => {
    if (!searchId.trim()) {
      toast({
        title: "Tracking ID Required",
        description: "Please enter your Order ID or Quote Tracking ID to track status.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setErrorMsg(null);
      setItem(null);

      const res = await orderAPI.trackOrder(searchId.trim(), searchEmail?.trim());
      if (res.success && res.data) {
        setItem({
          ...res.data,
          isQuote: res.type === "quote" || res.data.projectType !== undefined,
        });
      } else {
        setErrorMsg(res.message || "No record found. Please verify your Tracking ID.");
      }
    } catch (err: any) {
      console.error("Tracking lookup error:", err);
      setErrorMsg(
        err.response?.data?.message ||
        "Could not find an order or quote with this ID. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initialId = searchParams.get("id");
    if (initialId) {
      fetchTrackItem(initialId, searchParams.get("email") || undefined);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrackItem(orderId, email);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Tracking ID copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
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

  const getQuoteStepStatus = (stepKey: string, currentStatus: string) => {
    const sequence = ["Submitted", "Under Review", "Estimated", "Approved"];
    if (currentStatus === "Cancelled" || currentStatus === "Rejected") return "cancelled";

    let currentIndex = sequence.indexOf(currentStatus);
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
              Live Production & Quote Tracker
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-4">
              Track Your Order or Quote
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Enter your Order ID or Quote Tracking ID to monitor fabrication progress, design reviews, and shipping status.
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
                      Order or Quote Tracking ID *
                    </label>
                    <Input
                      placeholder="e.g. 64f8a... or Tracking ID"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      required
                      className="font-mono text-sm"
                    />
                  </div>
                  <div className="sm:col-span-4 space-y-1.5">
                    <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Email Address (Optional)
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

          {/* New Quote Submission Celebration Banner */}
          {item && item.isQuote && isNewQuote && (
            <div className="mt-8 p-6 rounded-2xl bg-amber-500/10 border-2 border-gold/40 text-foreground shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gold font-bold text-lg">
                    <Sparkles className="h-5 w-5" />
                    <span>Quote Request Received Successfully!</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Your custom laser cutting request is logged in our system. A confirmation email has been dispatched to <strong>{item.email}</strong>.
                  </p>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="px-3 py-2 bg-background border border-border rounded-lg font-mono text-xs sm:text-sm font-bold text-gold break-all">
                    {item._id}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(item._id)}
                    className="shrink-0"
                  >
                    {copied ? <Check className="h-4 w-4 mr-1 text-emerald-600" /> : <Copy className="h-4 w-4 mr-1" />}
                    {copied ? "Copied" : "Copy ID"}
                  </Button>
                </div>
              </div>
            </div>
          )}

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
          {item && (
            <div className="mt-10 space-y-8">
              {/* Status Header Card */}
              <ScrollReveal animation="fade-up">
                <Card className="border-border bg-card">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-bold text-foreground">
                            {item.isQuote ? "Custom Quote" : "Order"} #{item._id ? item._id.slice(-6).toUpperCase() : "N/A"}
                          </h2>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                            item.status === "Delivered" || item.status === "Approved"
                              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                              : item.status === "Cancelled" || item.status === "Rejected"
                              ? "bg-destructive/10 text-destructive border border-destructive/30"
                              : "bg-gold/15 text-gold border border-gold/40"
                          }`}>
                            {item.status || (item.isQuote ? "Submitted" : "Created")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>Tracking ID: <code className="font-mono text-foreground font-semibold">{item._id}</code></span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(item._id)}
                            className="hover:text-gold transition-colors inline-flex items-center"
                            title="Copy Tracking ID"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                          <span>•</span>
                          <span>Submitted: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : item.date || "Recently"}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={`https://wa.me/919303311384?text=Hello%20ASDE%20Laser,%20inquiring%20about%20${item.isQuote ? 'Quote' : 'Order'}%20%23${item._id}`}
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

                    {/* Progress Stepper */}
                    {item.status === "Cancelled" || item.status === "Rejected" ? (
                      <div className="py-8 text-center">
                        <div className="h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-3 text-destructive">
                          <AlertCircle className="h-8 w-8" />
                        </div>
                        <h3 className="text-lg font-bold text-destructive">This {item.isQuote ? "Quote" : "Order"} Has Been Cancelled</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          If this was unintended or if you require clarification, contact our support team on WhatsApp.
                        </p>
                      </div>
                    ) : (
                      <div className="py-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                          {(item.isQuote ? quoteStatusSteps : orderStatusSteps).map((step, idx) => {
                            const state = item.isQuote
                              ? getQuoteStepStatus(step.key, item.status || "Submitted")
                              : getStepStatus(step.key, item.status || "Created");
                            const isDone = state === "completed";

                            return (
                              <div key={step.key} className="flex flex-col items-center text-center relative z-10">
                                <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                                  isDone
                                    ? "bg-gold text-white shadow-md shadow-gold/20"
                                    : "bg-muted text-muted-foreground border border-border"
                                }`}>
                                  {item.isQuote ? (
                                    idx === 0 ? <FileText className="h-5 w-5" /> :
                                    idx === 1 ? <Compass className="h-5 w-5" /> :
                                    idx === 2 ? <Clock className="h-5 w-5" /> :
                                    <CheckCircle2 className="h-5 w-5" />
                                  ) : (
                                    idx === 0 ? <Clock className="h-5 w-5" /> :
                                    idx === 1 ? <Package className="h-5 w-5" /> :
                                    idx === 2 ? <Truck className="h-5 w-5" /> :
                                    <CheckCircle2 className="h-5 w-5" />
                                  )}
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

              {/* Conditional View: Quote Specifications VS Ecommerce Order Details */}
              {item.isQuote ? (
                /* ================= CUSTOM QUOTE DETAILS ================= */
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <Card className="border-border bg-card">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Layers className="h-5 w-5 text-gold" />
                          Custom Project Specifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4 text-sm">
                          <div className="p-3 rounded-xl bg-muted/40 border border-border">
                            <span className="text-xs text-muted-foreground block mb-0.5">Project Category</span>
                            <span className="font-semibold text-foreground">{item.projectType || "Custom Fabrication"}</span>
                          </div>
                          <div className="p-3 rounded-xl bg-muted/40 border border-border">
                            <span className="text-xs text-muted-foreground block mb-0.5">Material Preference</span>
                            <span className="font-semibold text-foreground">{item.material || "Metal"}</span>
                          </div>
                          <div className="p-3 rounded-xl bg-muted/40 border border-border">
                            <span className="text-xs text-muted-foreground block mb-0.5">Dimensions (LxW)</span>
                            <span className="font-semibold text-foreground">{item.length || 0}m × {item.width || 0}m</span>
                          </div>
                          <div className="p-3 rounded-xl bg-muted/40 border border-border">
                            <span className="text-xs text-muted-foreground block mb-0.5">Quantity</span>
                            <span className="font-semibold text-foreground">{item.quantity || 1} units</span>
                          </div>
                          <div className="p-3 rounded-xl bg-muted/40 border border-border">
                            <span className="text-xs text-muted-foreground block mb-0.5">Target Timeline</span>
                            <span className="font-semibold text-foreground">{item.timeline || "Flexible"}</span>
                          </div>
                          <div className="p-3 rounded-xl bg-muted/40 border border-border">
                            <span className="text-xs text-muted-foreground block mb-0.5">Budget Expectation</span>
                            <span className="font-semibold text-gold">{item.budget ? '₹' + item.budget : "Under Estimation"}</span>
                          </div>
                        </div>

                        {item.design && (
                          <div className="p-3 rounded-xl bg-muted/40 border border-border text-sm">
                            <span className="text-xs text-muted-foreground block mb-0.5">Design Style / Pattern</span>
                            <span className="font-semibold text-foreground">{item.design}</span>
                          </div>
                        )}

                        {item.details && (
                          <div className="p-4 rounded-xl bg-muted/30 border border-border text-sm">
                            <span className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-1">
                              Additional Requirements / Notes:
                            </span>
                            <p className="text-muted-foreground leading-relaxed">{item.details}</p>
                          </div>
                        )}

                        {item.image && item.image !== "/images/placeholder.png" && (
                          <div className="pt-2">
                            <span className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
                              Attached Drawing / Reference
                            </span>
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/40 border border-border">
                              <img
                                src={item.image}
                                alt="Drawing Attachment"
                                className="h-16 w-16 rounded-lg object-cover bg-background border border-border shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-foreground truncate">Drawing Attachment File</p>
                                <a
                                  href={item.image}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-gold hover:underline inline-flex items-center gap-1 mt-1 font-semibold"
                                >
                                  Open High-Resolution Drawing <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Customer Info Card */}
                  <div className="space-y-6">
                    <Card className="border-border bg-card">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gold" />
                          Client Contact Info
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-2 text-muted-foreground">
                        <p className="font-semibold text-foreground text-sm">{item.name}</p>
                        <p>Location: <strong className="text-foreground">{item.location}</strong></p>
                        <p>Phone: <strong className="text-foreground">{item.phone}</strong></p>
                        <p>Email: <strong className="text-foreground">{item.email}</strong></p>

                        <div className="pt-4 border-t border-border space-y-2">
                          <Button variant="outline" className="w-full text-xs" asChild>
                            <a
                              href={`https://wa.me/919303311384?text=Hello%20ASDE%20Laser,%20inquiring%20about%20my%20Quote%20%23${item._id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-600 hover:text-emerald-700"
                            >
                              <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                              Chat on WhatsApp
                            </a>
                          </Button>
                          <Button variant="ghost" className="w-full text-xs" asChild>
                            <Link to="/your-project#quote">
                              Submit Another Quote →
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                /* ================= E-COMMERCE ORDER DETAILS ================= */
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
                        {item.items && item.items.length > 0 ? (
                          item.items.map((cartItem: any, i: number) => {
                            const prod = cartItem.product || {};
                            return (
                              <div key={i} className="flex items-center gap-4 py-2 border-b border-border last:border-0">
                                {prod.image && (
                                  <div className="h-16 w-16 rounded-md overflow-hidden bg-muted shrink-0">
                                    <img
                                      src={prod.image}
                                      alt={prod.name || cartItem.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-semibold text-sm text-foreground line-clamp-1">
                                    {prod.name || cartItem.name || "Laser Crafted Item"}
                                  </h5>
                                  <p className="text-xs text-muted-foreground">
                                    Quantity: {cartItem.quantity || 1}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-bold text-foreground">
                                    {formatPrice((cartItem.price || prod.price || 0) * (cartItem.quantity || 1))}
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
                            <span>{formatPrice(item.subtotal || item.totalAmount)}</span>
                          </div>
                          <div className="flex justify-between text-muted-foreground">
                            <span>Shipping</span>
                            <span className="text-emerald-600 font-medium">Free</span>
                          </div>
                          <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border">
                            <span>Total</span>
                            <span className="text-gold">{formatPrice(item.totalAmount)}</span>
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
                        <p className="font-semibold text-foreground text-sm">{item.customerName}</p>
                        {item.shippingAddress ? (
                          <>
                            <p>{item.shippingAddress.address}</p>
                            <p>{item.shippingAddress.city}, {item.shippingAddress.state} - {item.shippingAddress.pinCode}</p>
                          </>
                        ) : (
                          <p>No address recorded</p>
                        )}
                        <p className="pt-1">Phone: {item.phone}</p>
                        <p>Email: {item.email}</p>
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
                            {item.paymentMethod === "cod" ? "Cash on Delivery" : item.paymentMethod === "bank_transfer" ? "Bank Transfer" : "Razorpay Online"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payment Status:</span>
                          <span className={`font-semibold ${item.paymentStatus === "Paid" ? "text-emerald-600" : "text-amber-600"}`}>
                            {item.paymentStatus || (item.status === "Paid" ? "Paid" : "Pending")}
                          </span>
                        </div>
                        {item.orderNotes && (
                          <div className="pt-2 border-t border-border">
                            <span className="font-semibold text-foreground block mb-1">Notes:</span>
                            <p className="italic">{item.orderNotes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
