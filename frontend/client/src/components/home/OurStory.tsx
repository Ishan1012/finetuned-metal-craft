import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function OurStory() {
  return (
    <section className="section-padding bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image placeholder */}
          <ScrollReveal animation="fade-right">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
              <img
                src="/images/home.jpeg"
                alt="Decorative metal gate"
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal animation="fade-left" delay={0.2}>
            <div>
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                The ASDE Story
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Crafting Excellence Since Day One
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded as a family workshop in Satna, ASDE LaserCuttings (Agrawal & Son Daughter
                  Enterprises) has grown from a small operation to Madhya Pradesh's premier CNC laser
                  cutting specialist.
                </p>
                <p>
                  The name "Son Daughter" reflects our inclusive family values—everyone's work
                  matters equally, and every project receives the same dedication.
                </p>
              </div>
              <div className="mt-8">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/about">
                    About Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
