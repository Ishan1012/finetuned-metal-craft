import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Welcome() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section label */}
          <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
            Welcome to Our Workshop
          </p>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Welcome to Agrawal & Son Daughter Enterprises
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            We are a family-owned metal fabrication business specializing in premium 
            CNC laser cutting services. What sets us apart? <strong className="text-foreground">We don't skip 
            the finishing steps that others do.</strong> Every edge we cut, every piece we 
            deliver undergoes our rigorous 3-step finishing process to ensure smooth, 
            burr-free, installation-ready products.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            From intricate name plates to large-scale metal elevation projects, we 
            deliver quality that speaks for itself. Based in Satna, Madhya Pradesh, 
            we ship across India with fast 7-10 day delivery times.
          </p>

          {/* CTA */}
          <Button variant="default" size="lg" asChild>
            <Link to="/about">
              Learn More About Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
