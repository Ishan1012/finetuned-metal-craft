import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// Import images
import railingGeometric1 from "@/assets/gallery/railing-geometric-1.png";
import elevationOrganic from "@/assets/gallery/elevation-organic.png";

const products = [
  {
    id: "railings",
    title: "Metal Railings",
    description: "Enhance staircases, balconies, terraces, and mezzanines with durable, aesthetically striking railings. Available in Stainless Steel, Mild Steel, and Aluminium with custom designs.",
    image: railingGeometric1,
    features: ["Custom designs - traditional to contemporary", "Safety-compliant", "Weather-resistant options", "Easy installation"],
    applications: ["Staircases", "Balconies", "Terraces", "Mezzanines"],
    href: "/products/railings",
  },
  {
    id: "elevation",
    title: "Metal Elevation & Cladding",
    description: "Transform building exteriors with stunning laser-cut metal facades and decorative panels. Architectural cladding that marries aesthetics, code compliance, and visual impact.",
    image: elevationOrganic,
    features: ["Intricate patterns possible", "Weather-resistant", "Energy-efficient options", "Modern architectural appeal"],
    applications: ["Building facades", "Exterior accent walls", "Entrance features", "Parking screens"],
    href: "/products/elevation",
  },
  {
    id: "nameplates",
    title: "Name Plates & Signage",
    description: "Make a lasting impression with precision-cut name plates for homes and businesses. Laser-cut precision in Brass, Copper, Stainless Steel, and more.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    features: ["Custom fonts and designs", "Multi-language support", "Logo integration", "Weather-proof options"],
    applications: ["Residential", "Corporate signage", "Hotel room numbers", "Memorial plaques"],
    href: "/products/nameplates",
  },
  {
    id: "gates",
    title: "Gates & Grills",
    description: "Secure and stylish entry solutions, perfect for private communities, retail spaces, or estates. Custom-designed gates and window grills that combine security with aesthetics.",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
    features: ["High security", "Decorative designs", "Motorization-ready", "Rust-proof options"],
    applications: ["Main entrance gates", "Compound gates", "Window grills", "Safety grills"],
    href: "/products/gates",
  },
  {
    id: "dividers",
    title: "Room Dividers & Partitions",
    description: "Segment open-concept layouts with functional, artful metal partitions. Perfect for creating privacy while maintaining visual flow in modern spaces.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    features: ["Custom patterns", "Freestanding or fixed", "Acoustic options available", "Easy maintenance"],
    applications: ["Office space division", "Restaurant privacy screens", "Hotel lobby dividers", "Retail displays"],
    href: "/products/dividers",
  },
  {
    id: "custom",
    title: "Custom Laser Cutting",
    description: "Have a unique design in mind? We bring your vision to life with precision CNC laser cutting. No design too complex, no project too ambitious.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    features: ["Decorative wall art", "Custom furniture accents", "Signage and logos", "Artistic installations"],
    applications: ["Any metal - SS, MS, Aluminium, Brass, Copper", "Thickness up to 25mm", "Size up to 4ft × 8ft panels"],
    href: "/products/custom",
  },
];

export default function Products() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 gradient-hero overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal animation="fade-up">
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                What We Make
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Precision Metal Solutions
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="text-xl text-primary-foreground/80">
                Precision-laser cut metal solutions for residential, commercial, and corporate spaces. 
                Every piece crafted with our signature superior finishing.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Products List */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {products.map((product, index) => (
              <ScrollReveal 
                key={product.id} 
                animation={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  {/* Image */}
                  <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                      {product.title}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-foreground mb-3">Features:</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {product.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Applications */}
                    <div className="mb-8">
                      <p className="text-sm font-semibold text-foreground mb-3">Applications:</p>
                      <div className="flex flex-wrap gap-2">
                        {product.applications.map((app) => (
                          <span
                            key={app}
                            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4">
                      <Button variant="gold" asChild>
                        <Link to={product.href}>
                          View Gallery
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/contact">Get Quote</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="scale">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
                Don't See What You Need?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                We specialize in custom work. If you can envision it, we can create it. 
                Let's discuss your unique requirements.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contact">
                    Request Custom Quote
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <a href="https://wa.me/919303311384" target="_blank" rel="noopener noreferrer">
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
