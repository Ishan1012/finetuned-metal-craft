import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Lightbox, GalleryImage } from "@/components/gallery/Lightbox";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import { cn } from "@/lib/utils";

// Import gallery images
import railingGeometric1 from "@/assets/gallery/railing-geometric-1.png";
import railingGeometric2 from "@/assets/gallery/railing-geometric-2.png";
import railingWoodMetal from "@/assets/gallery/railing-wood-metal.png";
import elevationOrganic from "@/assets/gallery/elevation-organic.png";
import elevationFloral from "@/assets/gallery/elevation-floral.png";

// Gallery project data
const projects = [
  {
    id: 1,
    src: railingGeometric1,
    alt: "Geometric pattern laser cut staircase railing",
    title: "Laser Cut Geometric Railing",
    category: "Railings",
    location: "Bhopal",
  },
  {
    id: 2,
    src: railingGeometric2,
    alt: "Modern geometric staircase railing with triangle pattern",
    title: "Triangle Pattern Staircase",
    category: "Railings",
    location: "Indore",
  },
  {
    id: 3,
    src: railingWoodMetal,
    alt: "Contemporary wood and metal railing design",
    title: "Wood & Metal Railing",
    category: "Railings",
    location: "Jabalpur",
  },
  {
    id: 4,
    src: elevationOrganic,
    alt: "Organic pattern laser cut elevation panel",
    title: "Organic Pattern Elevation",
    category: "Elevation",
    location: "Delhi",
  },
  {
    id: 5,
    src: elevationFloral,
    alt: "Floral geometric elevation panel design",
    title: "Floral Geometric Elevation",
    category: "Elevation",
    location: "Mumbai",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    alt: "Brass name plate for residence",
    title: "Premium Brass Name Plate",
    category: "Name Plates",
    location: "Satna",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
    alt: "Custom gate design",
    title: "Ornate Entry Gate",
    category: "Gates",
    location: "Rewa",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    alt: "Corporate name plate signage",
    title: "Corporate Office Signage",
    category: "Name Plates",
    location: "Delhi",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    alt: "Window grill with intricate pattern",
    title: "Decorative Window Grill",
    category: "Grills",
    location: "Pune",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    alt: "Metal art installation",
    title: "Custom Laser Cut Art",
    category: "Custom",
    location: "Bangalore",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80",
    alt: "Main entrance gate",
    title: "Villa Main Gate",
    category: "Gates",
    location: "Chennai",
  },
];

const categories = ["All", "Railings", "Name Plates", "Gates", "Grills", "Elevation", "Custom"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === filteredProjects.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? filteredProjects.length - 1 : prev - 1
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, filteredProjects.length]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 gradient-hero overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[hsl(38_70%_50%_/_0.1)] rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal animation="fade-up">
              <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
                Our Work
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[hsl(40_20%_98%)] mb-6">
                Project Gallery
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="text-xl text-[hsl(40_20%_98%_/_0.8)]">
                Explore our completed projects across India. Each piece showcases 
                our commitment to precision and premium finishing.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-40 backdrop-blur-md bg-background/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  selectedCategory === category
                    ? "bg-[hsl(38_70%_50%)] text-[hsl(240_15%_13%)] shadow-[0_4px_20px_-4px_hsl(38_70%_50%_/_0.3)]"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length > 0 ? (
            <>
              <ScrollReveal animation="fade">
                <p className="text-center text-muted-foreground mb-8">
                  Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
                  {selectedCategory !== "All" && ` in ${selectedCategory}`}
                </p>
              </ScrollReveal>
              <StaggerContainer 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                staggerDelay={0.08}
              >
                {filteredProjects.map((project, index) => (
                  <StaggerItem key={project.id}>
                    <GalleryImage
                      src={project.src}
                      alt={project.alt}
                      title={project.title}
                      category={`${project.category} • ${project.location}`}
                      onClick={() => openLightbox(index)}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[hsl(40_30%_95%)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Projects Completed" },
              { value: "50+", label: "Cities Served" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "15+", label: "Years Experience" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <p className="text-3xl sm:text-4xl font-bold text-[hsl(38_70%_50%)]">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="scale" className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's create something beautiful together. Get a free quote and 
              see your vision come to life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-md text-base font-semibold bg-[hsl(38_70%_50%)] text-[hsl(240_15%_13%)] hover:bg-[hsl(36_75%_40%)] shadow-[0_4px_20px_-4px_hsl(38_70%_50%_/_0.3)] transition-all duration-300"
              >
                Get Free Quote
              </a>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-md text-base font-semibold border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                WhatsApp Us
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={filteredProjects.map((p) => ({
          src: p.src,
          alt: p.alt,
          title: p.title,
          category: `${p.category} • ${p.location}`,
        }))}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </Layout>
  );
}
