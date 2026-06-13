import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";

// Import gallery images
import railingGeometric1 from "@/assets/gallery/railing-geometric-1.png";
import railingGeometric2 from "@/assets/gallery/railing-geometric-2.png";
import railingWoodMetal from "@/assets/gallery/railing-wood-metal.png";
import elevationOrganic from "@/assets/gallery/elevation-organic.png";
import elevationFloral from "@/assets/gallery/elevation-floral.png";

const showcaseImages = [
  { src: railingGeometric1, alt: "Geometric laser cut railing", category: "Railings" },
  { src: railingGeometric2, alt: "Triangle pattern staircase", category: "Railings" },
  { src: railingWoodMetal, alt: "Wood and metal railing", category: "Railings" },
  { src: elevationOrganic, alt: "Organic pattern elevation", category: "Elevation" },
  { src: elevationFloral, alt: "Floral geometric elevation", category: "Elevation" },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", alt: "Brass name plate", category: "Name Plates" },
];

export function ProductShowcase() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Our Products
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Explore Our Products
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="text-lg text-muted-foreground">
              Explore our range of metal railings, elevation panels, name plates, gates, 
              room dividers, and more—each custom-built with precision and superior finishing.
            </p>
          </ScrollReveal>
        </div>

        {/* Gallery Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 mb-10">
          {showcaseImages.map((image, index) => (
            <StaggerItem key={index}>
              <div className="group relative aspect-square overflow-hidden rounded-xl bg-muted">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4">
                    <span className="text-sm text-primary-foreground/80">{image.category}</span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <ScrollReveal animation="fade-up" className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/products">
              What We Make
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
