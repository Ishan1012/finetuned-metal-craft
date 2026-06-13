import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const capabilities = [
  "Decorative wall art",
  "Custom furniture accents",
  "Signage and logos",
  "Architectural elements",
  "Artistic installations",
  "Product prototypes",
  "Cabinet and door inserts",
  "Unique gift items",
];

const specs = [
  { label: "Materials", value: "Any metal - SS, MS, Aluminium, Brass, Copper" },
  { label: "Thickness", value: "Up to 25mm" },
  { label: "Maximum Size", value: "4 feet × 8 feet panels" },
  { label: "Accuracy", value: "0.1mm precision" },
];

export default function CustomCutting() {

  const gallery = [
    { src: '/images/custom2.jpeg', alt: "Custom Cutting 2" },
    { src: '/images/custom.jpeg', alt: "Custom Cutting 1" },
  ];
  return (
    <Layout>
      {/* Hero */}
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
                Custom Laser Cutting
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="text-xl text-primary-foreground/80">
                Have a unique design in mind? We bring your vision to life with precision
                CNC laser cutting. No design too complex, no project too ambitious.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Image */}
            <ScrollReveal animation="fade-right">
              <div className="space-y-4">
                {gallery.map((img, i) => (
                  <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Details */}
            <ScrollReveal animation="fade-left" delay={0.2}>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Your Vision, Our Precision
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  From intricate wall art to functional architectural elements, our
                  custom laser cutting service brings any design to life. Share your
                  concept—whether it's a rough sketch, a CAD file, or just an idea—and
                  we'll work with you to create something truly unique.
                </p>

                <div className="mb-8">
                  <p className="text-sm font-semibold text-foreground mb-4">What We Can Create:</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {capabilities.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button variant="gold" size="lg" asChild>
                    <Link to="/contact">
                      Send Your Design
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/your-project">Learn More</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                Technical Specifications
              </p>
              <h2 className="text-3xl font-bold text-foreground">
                Our Capabilities
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {specs.map((spec) => (
              <StaggerItem key={spec.label}>
                <Card className="bg-card border-border text-center h-full">
                  <CardContent className="p-6">
                    <p className="text-sm font-semibold text-gold uppercase mb-2">{spec.label}</p>
                    <p className="text-foreground font-medium">{spec.value}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="scale">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Ready to Create Something Unique?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Share your design or idea with us. We'll provide a free consultation
                and quote within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="gold" size="lg" asChild>
                  <a href="https://wa.me/919303311384" target="_blank" rel="noopener noreferrer">
                    WhatsApp Your Design
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Request Quote</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
