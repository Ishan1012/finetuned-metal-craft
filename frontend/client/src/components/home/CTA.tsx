import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, FileText } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function CTA() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="scale">
          <div className="relative rounded-3xl gradient-hero overflow-hidden p-8 sm:p-12 lg:p-16 border border-gold/20 shadow-2xl">
            {/* CNC Perforated Sheet Geometric Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, #d4af37 1.5px, transparent 1.5px), radial-gradient(circle, #d4af37 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 12px 12px'
              }}
              aria-hidden="true"
            />

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-2xl" />

            <div className="relative max-w-3xl mx-auto text-center">
              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Start Your Project?
              </h2>

              {/* Description */}
              <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                Get a free consultation and quote within 24 hours. Let's discuss 
                how we can bring your vision to life with precision and quality.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <a href="https://wa.me/919303311384" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Us
                  </a>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <a href="tel:+919303311384">
                    <Phone className="h-5 w-5" />
                    Call Now
                  </a>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/contact">
                    <FileText className="h-5 w-5" />
                    Request Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
