import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle2, 
  ArrowRight, 
  Star,
  Home,
  Building2,
  Store,
  Sparkles,
  Palette,
  Languages
} from "lucide-react";

const plateTypes = [
  {
    icon: Home,
    title: "Residential Name Plates",
    description: "Welcome guests with style. Custom designs featuring family names, house numbers, and decorative elements. Weather-resistant and beautiful for years.",
  },
  {
    icon: Building2,
    title: "Corporate Name Plates",
    description: "Professional signage for offices, cabins, and conference rooms. Clean designs that match your corporate identity. Bulk orders welcome.",
  },
  {
    icon: Store,
    title: "Business Signage",
    description: "Make your business stand out with premium metal signage. Shop names, business logos, directional signs – all laser-cut with precision.",
  },
  {
    icon: Sparkles,
    title: "Custom Name Plates",
    description: "Have a unique requirement? From wedding gifts to memorial plaques, we create custom pieces for every occasion.",
  },
];

const materials = [
  {
    name: "Brass",
    description: "Classic golden appearance with premium look and feel. Ages beautifully over time.",
    bestFor: "Traditional homes, luxury settings",
  },
  {
    name: "Copper",
    description: "Unique reddish-brown color that develops attractive patina. Antibacterial properties.",
    bestFor: "Distinctive, artistic designs",
  },
  {
    name: "Stainless Steel",
    description: "Modern, sleek appearance. Rust-proof, durable, and easy to maintain.",
    bestFor: "Contemporary settings, outdoor use",
  },
  {
    name: "Mild Steel",
    description: "Cost-effective option that can be painted or powder coated any color.",
    bestFor: "Business signage, bulk orders",
  },
  {
    name: "Aluminium",
    description: "Lightweight, corrosion-resistant with modern appearance.",
    bestFor: "Indoor signage, budget-friendly",
  },
];

const finishes = [
  { name: "Polished/Mirror", description: "High-shine finish with luxurious appearance" },
  { name: "Satin/Brushed", description: "Subtle sheen, hides fingerprints better" },
  { name: "Antique/Oxidized", description: "Aged appearance with character" },
  { name: "Powder Coated", description: "Colored finish, durable and weather-resistant" },
  { name: "Painted", description: "Custom colors to match your branding" },
];

const useCases = [
  {
    category: "Homes",
    items: ["Main entrance name plates", "Apartment door numbers", "House name signs", "Family name with address"],
  },
  {
    category: "Offices",
    items: ["Cabin name plates (CEO, Manager)", "Department signage", "Conference room names", "Reception desk signage"],
  },
  {
    category: "Businesses",
    items: ["Shop name boards", "Service counters", "Directional signs", "Logo displays"],
  },
  {
    category: "Special Occasions",
    items: ["Wedding gifts", "New home inauguration", "Business opening plaques", "Memorial plaques"],
  },
];

const pricingGuide = [
  { type: "Residential Name Plates", price: "Starting from ₹800 (basic) to ₹5,000+ (brass, intricate)" },
  { type: "Corporate Name Plates", price: "₹500 - ₹2,000 per piece (bulk discounts available)" },
  { type: "Business Signage", price: "₹2,000 - ₹15,000+ (depending on size)" },
];

const testimonials = [
  {
    content: "Ordered brass name plate for our new home. The quality is outstanding! Every visitor compliments it.",
    author: "Kavita & Rohit Jain",
    location: "Satna",
  },
  {
    content: "We ordered 50 cabin name plates for our new office. Perfect quality, delivered on time, and the bulk discount was great!",
    author: "TechCorp Solutions",
    location: "Bhopal",
  },
  {
    content: "The custom design they created for our shop name board is exactly what we envisioned. Professional work!",
    author: "Sharma Jewellers",
    location: "Jabalpur",
  },
];

export default function NamePlates() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={'/images/nameplate.jpeg'}
            alt="Premium brass name plate on slate wall"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(240_15%_13%_/_0.95)] via-[hsl(240_15%_13%_/_0.85)] to-[hsl(240_15%_13%_/_0.5)]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
              Our Products
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[hsl(40_20%_98%)] mb-6">
              Premium Name Plates & Signage
            </h1>
            <p className="text-xl text-[hsl(40_20%_98%_/_0.8)] mb-8">
              Laser-cut name plates that make a lasting impression. 
              For homes, offices, and businesses across India.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Design Your Name Plate
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your name plate is often the first thing visitors notice. Make it count 
              with our precision laser-cut name plates. Available in various metals 
              and designs, each piece is a perfect blend of functionality and artistry. 
              From elegant residential name plates to professional corporate signage, 
              we create pieces that reflect your identity and stand the test of time.
            </p>
          </div>
        </div>
      </section>

      {/* Types of Name Plates */}
      <section className="section-padding bg-[hsl(40_30%_95%)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
              Product Types
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Types of Name Plates
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plateTypes.map((type) => (
              <Card key={type.title} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-[hsl(38_70%_50%_/_0.1)] flex items-center justify-center mb-4">
                    <type.icon className="h-6 w-6 text-[hsl(38_70%_50%)]" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {type.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {type.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
              Material Options
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Materials Available
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <div
                key={material.name}
                className="bg-card rounded-xl p-6 border border-border hover:border-[hsl(38_70%_50%_/_0.5)] transition-colors"
              >
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {material.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {material.description}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-[hsl(38_70%_50%)]">Best for:</span>{" "}
                  <span className="text-muted-foreground">{material.bestFor}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Options */}
      <section className="section-padding gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
                Design Options
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(40_20%_98%)] mb-6">
                Endless Design Possibilities
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Palette className="h-5 w-5 text-[hsl(38_70%_50%)] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[hsl(40_20%_98%)]">Classic to Modern</p>
                    <p className="text-sm text-[hsl(40_20%_98%_/_0.7)]">Traditional patterns to contemporary minimalist styles</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-[hsl(38_70%_50%)] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[hsl(40_20%_98%)]">Logo Integration</p>
                    <p className="text-sm text-[hsl(40_20%_98%_/_0.7)]">Incorporate family crests, business logos, or custom symbols</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Languages className="h-5 w-5 text-[hsl(38_70%_50%)] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[hsl(40_20%_98%)]">Multi-Language Support</p>
                    <p className="text-sm text-[hsl(40_20%_98%_/_0.7)]">Hindi, English, or both. Regional languages also supported</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
                Finishing Options
              </p>
              <div className="space-y-3">
                {finishes.map((finish) => (
                  <div
                    key={finish.name}
                    className="bg-[hsl(0_0%_100%_/_0.05)] rounded-lg p-4"
                  >
                    <p className="font-semibold text-[hsl(40_20%_98%)]">{finish.name}</p>
                    <p className="text-sm text-[hsl(40_20%_98%_/_0.7)]">{finish.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
              Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              What You Get
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle2, text: "Precision Cutting – Intricate details executed perfectly" },
              { icon: Sparkles, text: "Smooth Finishing – Professional appearance" },
              { icon: Star, text: "Weather Resistant – Suitable for outdoor use" },
              { icon: CheckCircle2, text: "Quick Turnaround – 5-7 days for most orders" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-[hsl(40_30%_95%)] rounded-lg p-4"
              >
                <feature.icon className="h-5 w-5 text-[hsl(38_70%_50%)] shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-[hsl(40_30%_95%)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
              Applications
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Popular Use Cases
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase) => (
              <Card key={useCase.category} className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {useCase.category}
                  </h3>
                  <ul className="space-y-2">
                    {useCase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[hsl(38_70%_50%)] shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Guide */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
                Pricing
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Pricing Guide
              </h2>
              <p className="text-muted-foreground mt-4">
                Prices vary based on material, size, and design complexity
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {pricingGuide.map((item, index) => (
                <div
                  key={item.type}
                  className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-2 ${
                    index !== pricingGuide.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="font-medium text-foreground">{item.type}</span>
                  <span className="text-muted-foreground text-sm sm:text-right">{item.price}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              * Prices are indicative. Contact for accurate quote based on your requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="section-padding bg-[hsl(40_30%_95%)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
                Technical Details
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Specifications
              </h2>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {[
                { label: "Size Range", value: "4\" × 6\" to 36\" × 24\" (custom sizes available)" },
                { label: "Thickness", value: "1mm to 3mm depending on size and material" },
                { label: "Font Options", value: "50+ fonts or use your own" },
                { label: "Language Support", value: "Hindi, English, regional languages" },
                { label: "Mounting", value: "Pre-drilled holes or adhesive backing" },
                { label: "Delivery Time", value: "5-7 days standard, 7-10 for custom" },
                { label: "Minimum Order", value: "1 piece (no minimum!)" },
              ].map((spec, index) => (
                <div
                  key={spec.label}
                  className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-2 ${
                    index !== 6 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="font-medium text-foreground">{spec.label}</span>
                  <span className="text-muted-foreground text-sm sm:text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
              Customer Reviews
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[hsl(38_70%_50%)] text-[hsl(38_70%_50%)]" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-4 text-sm">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[hsl(38_70%_50%)] to-[hsl(40_65%_60%)] flex items-center justify-center">
                      <span className="text-sm font-bold text-[hsl(240_15%_13%)]">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[hsl(40_30%_95%)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Get Your Custom Name Plate
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Ready in Just 3 Easy Steps:
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <div className="text-center">
                <span className="inline-flex h-8 w-8 rounded-full bg-[hsl(38_70%_50%)] text-[hsl(240_15%_13%)] font-bold items-center justify-center text-sm">1</span>
                <p className="text-sm text-muted-foreground mt-2">Share requirements</p>
              </div>
              <div className="hidden sm:block text-muted-foreground">→</div>
              <div className="text-center">
                <span className="inline-flex h-8 w-8 rounded-full bg-[hsl(38_70%_50%)] text-[hsl(240_15%_13%)] font-bold items-center justify-center text-sm">2</span>
                <p className="text-sm text-muted-foreground mt-2">Approve design</p>
              </div>
              <div className="hidden sm:block text-muted-foreground">→</div>
              <div className="text-center">
                <span className="inline-flex h-8 w-8 rounded-full bg-[hsl(38_70%_50%)] text-[hsl(240_15%_13%)] font-bold items-center justify-center text-sm">3</span>
                <p className="text-sm text-muted-foreground mt-2">Receive in 5-7 days!</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="gold" size="lg" asChild>
                <Link to="/contact">
                  Design Your Name Plate
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
