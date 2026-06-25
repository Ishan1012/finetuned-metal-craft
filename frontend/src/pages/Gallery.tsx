import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbox, GalleryImage } from "@/components/gallery/Lightbox";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { projectAPI } from "@/lib/api-services";
import { Project } from "@/types/Types";

export default function Gallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [selectedProjectType, setSelectedProjectType] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const data = await projectAPI.getProjects();
        
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(projects.map(p => p.category).filter(Boolean));
    return ["All", ...uniqueCategories].slice(0, 6);
  }, [projects]);

  const materials = useMemo(() => {
    const uniqueMaterials = new Set(projects.map(p => p.material).filter(Boolean));
    return ["All", ...uniqueMaterials].slice(0, 5);
  }, [projects]);

  const projectTypes = useMemo(() => {
    const uniqueTypes = new Set(projects.map(p => p.projectType).filter(Boolean));
    return ["All", ...uniqueTypes].slice(0, 5);
  }, [projects]);

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
        <div
          className="absolute inset-0 z-0 bg-[url('/images/img11.jpeg')] bg-cover bg-center bg-no-repeat opacity-30"
          aria-hidden="true"
        />
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

          {/* Handle Loading State */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
              <p className="text-muted-foreground">Loading portfolio...</p>
            </div>
          ) : error ? (
            < div className="text-center py-16">
              <p className="text-destructive text-lg mb-4">Something went wrong: {error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Try Again
              </Button>
            </div>
          ) : filteredProjects.length > 0 ? (
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
                  <StaggerItem key={index}>
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
    </Layout >
  );
}
