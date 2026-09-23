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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

const showcaseImages = [
  { src: "/images/product1.jpeg", alt: "Geometric laser cut railing"},
  { src: "/images/product2.jpeg", alt: "Geometric laser cut railing"},
  { src: "/images/product3.jpeg", alt: "Geometric laser cut railing"},
  { src: "/images/product4.jpeg", alt: "Geometric laser cut railing"},
  { src: "/images/product5.jpeg", alt: "Geometric laser cut railing"},
  { src: "/images/product6.jpeg", alt: "Geometric laser cut railing"},
  { src: "/images/product7.jpeg", alt: "Geometric laser cut railing"},
  { src: "/images/product8.jpeg", alt: "Geometric laser cut railing"},
  { src: "/images/product9.jpeg", alt: "Geometric laser cut railing"},
  { src: "/images/product10.jpeg", alt: "Geometric laser cut railing"},
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
        <ScrollReveal animation="fade-right" className="flex justify-center align-center">
          <div className="w-[90%] relative px-0 sm:px-2 mb-5">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full group/carousel"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {showcaseImages.map((img, i) => (
                  <CarouselItem key={i} className="pl-2 md:pl-4 basis-[50%]">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted group relative cursor-pointer shadow-sm border border-border/50">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation Arrows - Floated inward with better styling */}
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-background/90 border-none shadow-md backdrop-blur-sm z-10 opacity-0 transition-opacity group-hover/carousel:opacity-100 disabled:opacity-0" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-background/90 border-none shadow-md backdrop-blur-sm z-10 opacity-0 transition-opacity group-hover/carousel:opacity-100 disabled:opacity-0" />
            </Carousel>
          </div>
        </ScrollReveal>

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
