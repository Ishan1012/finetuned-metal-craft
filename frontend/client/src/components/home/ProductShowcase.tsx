import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ZoomIn } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { Lightbox } from "@/components/gallery/Lightbox";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

const showcaseImages = [
  { src: "/images/product1.jpeg", alt: "Geometric laser cut railing", title: "Geometric Laser Cut Railing", category: "Railings" },
  { src: "/images/product2.jpeg", alt: "Modern metal railing", title: "Modern Metal Railing", category: "Railings" },
  { src: "/images/product3.jpeg", alt: "Laser cut elevation panel", title: "Laser Cut Elevation Panel", category: "Elevation" },
  { src: "/images/product4.jpeg", alt: "Architectural metal screen", title: "Architectural Metal Screen", category: "Custom Laser Cut" },
  { src: "/images/product5.jpeg", alt: "Balcony safety railing", title: "Balcony Safety Railing", category: "Railings" },
  { src: "/images/product6.jpeg", alt: "Precision laser cut grill", title: "Precision Cut Metal Grill", category: "Gates & Grills" },
  { src: "/images/product7.jpeg", alt: "Decorative building facade", title: "Decorative Exterior Facade", category: "Elevation" },
  { src: "/images/product8.jpeg", alt: "Interior metal divider", title: "Interior Room Divider", category: "Room Dividers" },
  { src: "/images/product9.jpeg", alt: "Staircase ornamental railing", title: "Staircase Ornamental Railing", category: "Railings" },
  { src: "/images/product10.jpeg", alt: "Contemporary laser cut railing", title: "Contemporary Laser Cut Railing", category: "Railings" },
];

export function ProductShowcase() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === showcaseImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? showcaseImages.length - 1 : prev - 1
    );
  };

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
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${img.title || img.alt}`}
                      onClick={() => openLightbox(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openLightbox(i);
                        }
                      }}
                      className="aspect-[4/3] rounded-xl overflow-hidden bg-muted group relative cursor-pointer shadow-sm border border-border/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Hover Overlay with Zoom Icon */}
                      <div className="absolute inset-0 bg-primary/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="h-10 w-10 rounded-full bg-background/90 text-foreground shadow-md backdrop-blur-sm flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <ZoomIn className="h-5 w-5 text-gold" />
                        </div>
                      </div>
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

      {/* Lightbox Modal */}
      <Lightbox
        images={showcaseImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
}
