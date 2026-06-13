import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function ValueProposition() {
  return (
    <section className="section-padding bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Architectural Metal Solutions
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Bold, Beautiful Spaces Deserve Premium Metal Work
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              ASDE LaserCuttings creates design-forward metal railings, elevation panels, 
              name plates, and custom installations that elevate offices, hotels, restaurants, 
              and upscale homes. Whether you're looking for a single name plate or a large-scale 
              architectural facade, our team provides precision craftsmanship, superior finishing, 
              and unmatched dedication to quality.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.3}>
            <Button variant="gold" size="lg" asChild>
              <Link to="/gallery">
                View Our Portfolio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
