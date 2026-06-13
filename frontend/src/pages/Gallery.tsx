import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbox, GalleryImage } from "@/components/gallery/Lightbox";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

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
    material: "Stainless Steel",
    projectType: "Residential",
    location: "Bhopal",
  },
  {
    id: 2,
    src: railingGeometric2,
    alt: "Modern geometric staircase railing with triangle pattern",
    title: "Triangle Pattern Staircase",
    category: "Railings",
    material: "Stainless Steel",
    projectType: "Residential",
    location: "Indore",
  },
  {
    id: 3,
    src: railingWoodMetal,
    alt: "Contemporary wood and metal railing design",
    title: "Wood & Metal Railing",
    category: "Railings",
    material: "Mild Steel",
    projectType: "Residential",
    location: "Jabalpur",
  },
  {
    id: 4,
    src: elevationOrganic,
    alt: "Organic pattern laser cut elevation panel",
    title: "Organic Pattern Elevation",
    category: "Elevation",
    material: "Aluminium",
    projectType: "Commercial",
    location: "Delhi",
  },
  {
    id: 5,
    src: elevationFloral,
    alt: "Floral geometric elevation panel design",
    title: "Floral Geometric Elevation",
    category: "Elevation",
    material: "Stainless Steel",
    projectType: "Corporate",
    location: "Mumbai",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    alt: "Brass name plate for residence",
    title: "Premium Brass Name Plate",
    category: "Name Plates",
    material: "Brass",
    projectType: "Residential",
    location: "Satna",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
    alt: "Custom gate design",
    title: "Ornate Entry Gate",
    category: "Gates",
    material: "Mild Steel",
    projectType: "Residential",
    location: "Rewa",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    alt: "Corporate name plate signage",
    title: "Corporate Office Signage",
    category: "Name Plates",
    material: "Stainless Steel",
    projectType: "Corporate",
    location: "Delhi",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    alt: "Window grill with intricate pattern",
    title: "Decorative Window Grill",
    category: "Grills",
    material: "Mild Steel",
    projectType: "Residential",
    location: "Pune",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    alt: "Metal art installation",
    title: "Custom Laser Cut Art",
    category: "Custom",
    material: "Copper",
    projectType: "Commercial",
    location: "Bangalore",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80",
    alt: "Main entrance gate",
    title: "Villa Main Gate",
    category: "Gates",
    material: "Stainless Steel",
    projectType: "Residential",
    location: "Chennai",
  },
];

const categories = ["All", "Railings", "Name Plates", "Gates", "Grills", "Elevation", "Custom"];
const materials = ["All", "Stainless Steel", "Mild Steel", "Aluminium", "Brass", "Copper"];
const projectTypes = ["All", "Residential", "Commercial", "Corporate"];

const caseStudies = [
  {
    title: "Luxury Residential Complex",
    location: "Jabalpur",
    description: "Complete railing solution for 24-unit residential complex including staircase, balcony, and terrace railings.",
    image: railingGeometric1,
    material: "SS 304, Satin Finish",
  },
  {
    title: "Corporate Office Elevation",
    location: "Bhopal",
    description: "Exterior facade with laser-cut panels featuring company logo pattern for 3-story corporate office.",
    image: elevationOrganic,
    material: "Aluminium, Powder Coated",
  },
  {
    title: "Hotel Signage Collection",
    location: "Indore",
    description: "200+ custom name plates for boutique hotel including room numbers, directional signage, and amenity markers.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    material: "Brass, Brushed Finish",
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [selectedProjectType, setSelectedProjectType] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = projects.filter((p) => {
    const categoryMatch = selectedCategory === "All" || p.category === selectedCategory;
    const materialMatch = selectedMaterial === "All" || p.material === selectedMaterial;
    const projectTypeMatch = selectedProjectType === "All" || p.projectType === selectedProjectType;
    return categoryMatch && materialMatch && projectTypeMatch;
  });

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
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal animation="fade-up">
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                Our Work Portfolio
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                50K+ Happy Customers Across India
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="text-xl text-primary-foreground/80">
                Explore our completed projects. Each piece showcases our commitment 
                to precision and premium finishing.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-40 backdrop-blur-md bg-background/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {/* Category Filter */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                      selectedCategory === category
                        ? "bg-gold text-accent-foreground shadow-sm"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Material & Project Type Filters */}
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Material</p>
                <div className="flex flex-wrap gap-2">
                  {materials.map((material) => (
                    <button
                      key={material}
                      onClick={() => setSelectedMaterial(material)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
                        selectedMaterial === material
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Project Type</p>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedProjectType(type)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
                        selectedProjectType === type
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
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
                      category={`${project.category} • ${project.material}`}
                      onClick={() => openLightbox(index)}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No projects found matching your filters.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedMaterial("All");
                  setSelectedProjectType("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                Featured Projects
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Recent Case Studies
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <StaggerItem key={study.title}>
                <Card className="bg-card border-border overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <p className="text-xs font-semibold text-gold uppercase mb-2">
                      {study.location}
                    </p>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {study.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {study.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold">Material:</span> {study.material}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-3 md:grid-cols-3 gap-8 text-center">
            {[
              { value: "50K+", label: "Projects Completed" },
              { value: "5+", label: "Years Experience" },
              { value: "5Lakh+", label: "Sqft of Metal finished" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <p className="text-3xl sm:text-4xl font-bold text-gold">
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
              <Button variant="gold" size="lg" asChild>
                <Link to="/contact">
                  Get Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://wa.me/919303311384" target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </Button>
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
          category: `${p.category} • ${p.material} • ${p.location}`,
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
