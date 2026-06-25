import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
  "Intricate patterns possible",
  "Weather-resistant",
  "Energy-efficient options",
  "Modern architectural appeal",
  "Custom designs available",
  "Multiple finish options",
];

const applications = [
  "Building facades",
  "Exterior accent walls",
  "Entrance features",
  "Parking structure screens",
  "Interior feature walls",
  "Reception backdrops",
];

const gallery = [
  { src: '/images/elevation.jpeg', alt: "elevation panel" },
];

export default function Elevation() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 gradient-hero overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-[url('/images/elevationcladding.jpeg')] bg-cover bg-center bg-no-repeat opacity-50"
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal animation="fade-up">
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                What We Make
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Metal Elevation & Cladding
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="text-xl text-primary-foreground/80">
                Transform building exteriors with stunning laser-cut metal facades and 
                decorative panels that marry aesthetics with functionality.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Gallery */}
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
                  Architectural Cladding Solutions
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Our metal elevation panels and cladding solutions bring modern architectural 
                  vision to life. From intricate pattern work to bold geometric designs, we 
                  create facades that make buildings stand out while maintaining code compliance 
                  and durability.
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
