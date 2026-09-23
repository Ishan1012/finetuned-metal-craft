import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";

const materials = [
  { name: "Stainless Steel", grades: "SS 304, SS 316", color: "from-gray-300 to-gray-400" },
  { name: "Mild Steel", grades: "Powder Coated", color: "from-gray-500 to-gray-600" },
  { name: "Aluminium", grades: "Anodized Options", color: "from-slate-300 to-slate-400" },
  { name: "Brass", grades: "Premium Finish", color: "from-yellow-500 to-yellow-600" },
  { name: "Copper", grades: "Natural Patina", color: "from-orange-400 to-orange-500" },
];

const finishes = [
  "Brushed/Satin",
  "Mirror Polish",
  "Powder Coated",
  "Oil Rubbed",
  "Natural Patina",
];

export function MaterialsPreview() {
  return (
    <section className="section-padding bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <ScrollReveal animation="fade-up">
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                Materials & Finishes
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Premium Materials, Exquisite Finishes
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Choose from our range of premium materials and finishes to create 
                a truly bespoke design that matches your vision perfectly.
              </p>
            </ScrollReveal>

            {/* Finishes List */}
            <ScrollReveal animation="fade-up" delay={0.3}>
              <div className="mb-8">
                <p className="text-sm font-semibold text-foreground mb-3">Available Finishes:</p>
                <div className="flex flex-wrap gap-2">
                  {finishes.map((finish) => (
                    <span
                      key={finish}
                      className="px-3 py-1 bg-background rounded-full text-sm text-muted-foreground border border-border"
                    >
                      {finish}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.4}>
              <Button variant="gold" size="lg" asChild>
                <Link to="/your-project#materials">
                  Explore Options
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>

          {/* Materials Grid */}
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {materials.map((material) => (
              <StaggerItem key={material.name}>
                <div className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${material.color}`} />
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <p className="font-bold text-primary-foreground">{material.name}</p>
                      <p className="text-sm text-primary-foreground/80">{material.grades}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-sm font-semibold text-white drop-shadow-lg">{material.name}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
