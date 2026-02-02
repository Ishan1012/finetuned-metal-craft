import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import heroImage from "@/assets/hero-homepage.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="CNC laser cutting machine in action with sparks"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(240_15%_13%_/_0.95)] via-[hsl(240_15%_13%_/_0.85)] to-[hsl(240_15%_13%_/_0.6)]" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 text-gold mb-8 animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            <span className="text-sm font-medium">Based in Satna, Madhya Pradesh</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Premium CNC Laser Cutting with{" "}
            <span className="text-gradient-gold">Finishing Others Skip</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Delivering Excellence in Metal Fabrication Across India. 
            Every edge smoothed, every piece perfection-tested.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Get Free Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/products/railings">
                <Eye className="h-5 w-5" />
                View Our Work
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 pt-12 border-t border-primary-foreground/10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {[
              { value: "500+", label: "Happy Customers" },
              { value: "50+", label: "Cities Served" },
              { value: "15+", label: "Years Experience" },
              { value: "1 Year", label: "Warranty" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-bold text-gold">{stat.value}</p>
                <p className="text-sm text-primary-foreground/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
