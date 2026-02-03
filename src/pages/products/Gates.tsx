import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
  "High security construction",
  "Decorative custom designs",
  "Motorization-ready options",
  "Rust-proof materials available",
  "Weather-resistant finishes",
  "Variety of styles",
];

const applications = [
  "Main entrance gates",
  "Compound gates",
  "Window grills",
  "Safety grills",
  "Ventilation grills",
  "Balcony grills",
];

export default function Gates() {
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
                Gates & Grills
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="text-xl text-primary-foreground/80">
                Secure and stylish entry solutions that combine security with aesthetics. 
                Custom-designed for homes, offices, and commercial spaces.
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
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                <img 
                  src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80" 
                  alt="Decorative metal gate" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </ScrollReveal>

            {/* Details */}
            <ScrollReveal animation="fade-left" delay={0.2}>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Security Meets Style
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Our gates and grills are designed to provide maximum security without 
                  compromising on aesthetics. From ornate traditional designs to sleek 
                  modern patterns, we create entry solutions that make a statement while 
                  keeping your property safe.
                </p>

                <div className="mb-8">
                  <p className="text-sm font-semibold text-foreground mb-4">Features:</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-sm font-semibold text-foreground mb-4">Applications:</p>
                  <div className="flex flex-wrap gap-2">
                    {applications.map((app) => (
                      <span key={app} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button variant="gold" size="lg" asChild>
                    <Link to="/contact">
                      Get Quote
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/gallery">View Gallery</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
