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
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <div className="h-24 w-24 mx-auto rounded-2xl gradient-gold flex items-center justify-center mb-6">
                  <span className="text-4xl font-bold text-accent-foreground">A</span>
                </div>
                <p className="text-xl font-bold text-foreground">Family-Owned</p>
                <p className="text-muted-foreground">Since Day One</p>
              </div>
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
                  What sets us apart isn't just our state-of-the-art equipment—it's our commitment 
                  to the <strong className="text-foreground">finishing process that others skip</strong>. 
                  Our signature 3-step finishing ensures every piece leaves our facility smooth, 
                  safe, and installation-ready.
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
