import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle2, 
  ArrowRight, 
  Star,
  Fence,
  Building,
  Home,
  Ruler,
  Shield,
  Clock,
  Sparkles
} from "lucide-react";
import heroRailings from "@/assets/hero-railings.jpg";

const railingTypes = [
  {
    icon: Home,
    title: "Staircase Railings",
    description: "Safety meets style with our staircase railings. Custom designs to match your interior, available in modern, traditional, and contemporary patterns. Strong, secure, and beautifully finished.",
  },
  {
    icon: Building,
    title: "Balcony Railings",
    description: "Protect your balcony without sacrificing aesthetics. From minimalist designs to intricate patterns, we create railings that enhance your building's look while ensuring safety.",
  },
  {
    icon: Fence,
    title: "Terrace Railings",
    description: "Weather-resistant railings for your terrace or rooftop. Rust-proof materials and durable finishes ensure years of maintenance-free beauty.",
  },
];

const materials = [
  {
    name: "Stainless Steel (SS 304, SS 316)",
    features: ["Rust-proof and corrosion-resistant", "Modern, sleek appearance", "Easy to maintain", "Perfect for coastal areas", "Mirror or satin finish options"],
    bestFor: "Contemporary designs, outdoor use",
  },
  {
    name: "Mild Steel (MS)",
    features: ["Strong and durable", "Cost-effective option", "Can be painted any color", "Powder coating available"],
    bestFor: "Traditional designs, budget projects",
  },
  {
    name: "Aluminium",
    features: ["Lightweight yet strong", "Naturally corrosion-resistant", "Won't rust", "Easy installation"],
    bestFor: "Large installations, quick projects",
  },
];

const features = [
  { icon: Ruler, text: "Custom Designs – Any pattern, any style" },
  { icon: CheckCircle2, text: "Precise Measurements – Cut to 0.1mm accuracy" },
  { icon: Sparkles, text: "Smooth Finishing – No sharp edges or burrs" },
  { icon: Shield, text: "Safety Compliant – Meets building safety standards" },
  { icon: Clock, text: "7-10 Day Delivery – Across India" },
  { icon: Star, text: "1-Year Warranty – Comprehensive coverage" },
];

const designs = [
  { name: "Modern Minimalist", description: "Clean lines, simple geometry. Perfect for contemporary homes and offices." },
  { name: "Traditional Ornate", description: "Intricate patterns inspired by traditional Indian designs. Timeless elegance." },
  { name: "Geometric Patterns", description: "Modern geometric designs that create visual interest while maintaining functionality." },
  { name: "Nature-Inspired", description: "Floral and nature motifs for those who love organic designs." },
  { name: "Custom Designs", description: "Have something specific in mind? Send us your design – we'll make it happen!" },
];

const testimonials = [
  {
    content: "The staircase railing is absolutely perfect! The finishing is so smooth, and the installation was easy with their detailed guide.",
    author: "Neha Verma",
    location: "Indore",
  },
  {
    content: "We ordered balcony railings for our entire apartment complex. Consistent quality across all 24 units. Impressive!",
    author: "Anand Society",
    location: "Rewa",
  },
];

export default function Railings() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroRailings}
            alt="Elegant stainless steel staircase railing"
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
              Premium Metal Railings
            </h1>
            <p className="text-xl text-[hsl(40_20%_98%_/_0.8)] mb-8">
              Precision-cut railings for staircases, balconies, and terraces. 
              Every edge smoothed, every piece installation-ready.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Get Free Quote
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
              Transform your spaces with our precision-cut metal railings. Whether 
              you're securing a staircase, beautifying a balcony, or adding elegance 
              to a terrace, our railings combine safety with stunning design. Available 
              in multiple materials and finishes, each railing is custom-cut to your 
              exact specifications and undergoes our signature finishing process for 
              smooth, splinter-free edges.
            </p>
          </div>
        </div>
      </section>

      {/* Types of Railings */}
      <section className="section-padding bg-[hsl(40_30%_95%)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
              Railing Types
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Types of Railings
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {railingTypes.map((type) => (
              <Card key={type.title} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="h-14 w-14 rounded-xl bg-[hsl(38_70%_50%_/_0.1)] flex items-center justify-center mb-6">
                    <type.icon className="h-7 w-7 text-[hsl(38_70%_50%)]" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {type.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
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

          <div className="grid md:grid-cols-3 gap-8">
            {materials.map((material) => (
              <Card key={material.name} className="bg-card border-border">
                <CardContent className="p-8">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {material.name}
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {material.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[hsl(38_70%_50%)] shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm">
                      <span className="font-semibold text-foreground">Best for:</span>{" "}
                      <span className="text-muted-foreground">{material.bestFor}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
              Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(40_20%_98%)]">
              Features & Benefits
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.text}
                className="flex items-center gap-4 bg-[hsl(0_0%_100%_/_0.05)] rounded-lg p-4"
              >
                <div className="h-10 w-10 rounded-lg bg-[hsl(38_70%_50%_/_0.2)] flex items-center justify-center shrink-0">
                  <feature.icon className="h-5 w-5 text-[hsl(38_70%_50%)]" />
                </div>
                <span className="text-[hsl(40_20%_98%)]">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Finishing Difference */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
                The Difference
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Why Our Railings Are Different
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">The Finishing Difference:</strong> Most 
                  manufacturers deliver rough-cut railings with sharp edges that need 
                  on-site finishing. Not us.
                </p>
                <p>Our 3-step finishing process means:</p>
                <ul className="space-y-2">
                  {[
                    "All edges are smooth and safe to touch",
                    "No burrs or sharp corners",
                    "Professional appearance from day one",
                    "Installation-ready without additional work",
                    "Saves time and additional labor costs",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[hsl(38_70%_50%)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[hsl(40_15%_92%)] to-[hsl(40_10%_85%)] flex items-center justify-center">
                <div className="text-center p-8">
                  <Sparkles className="h-20 w-20 mx-auto text-[hsl(38_70%_50%)] mb-4" />
                  <p className="text-2xl font-bold text-foreground">Premium Finishing</p>
                  <p className="text-muted-foreground">Every Edge Perfected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Designs */}
      <section className="section-padding bg-[hsl(40_30%_95%)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
              Design Options
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Popular Designs
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map((design) => (
              <div
                key={design.name}
                className="bg-card rounded-xl p-6 border border-border hover:border-[hsl(38_70%_50%_/_0.5)] transition-colors"
              >
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {design.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {design.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="section-padding bg-background">
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
                { label: "Material Options", value: "SS 304, SS 316, MS, Aluminium" },
                { label: "Finish Options", value: "Mirror, Satin, Powder Coated, Painted" },
                { label: "Thickness Range", value: "1.5mm to 3mm (depending on design)" },
                { label: "Height Customization", value: "Any height up to 4 feet" },
                { label: "Design Complexity", value: "From simple to highly intricate" },
                { label: "Warranty", value: "1 year against manufacturing defects" },
                { label: "Delivery Time", value: "7-10 days across India" },
              ].map((spec, index) => (
                <div
                  key={spec.label}
                  className={`flex justify-between items-center p-4 ${
                    index !== 6 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="font-medium text-foreground">{spec.label}</span>
                  <span className="text-muted-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-[hsl(40_30%_95%)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
              Customer Reviews
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author} className="bg-card border-border">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[hsl(38_70%_50%)] text-[hsl(38_70%_50%)]" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-6">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[hsl(38_70%_50%)] to-[hsl(40_65%_60%)] flex items-center justify-center">
                      <span className="font-bold text-[hsl(240_15%_13%)]">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Enhance Your Space?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get a free quote and design consultation. Premium railings delivered in 7-10 days.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="gold" size="lg" asChild>
                <Link to="/contact">
                  Get Free Quote
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
