import { Link } from "react-router-dom";
import { ArrowRight, Fence, Building2, Award, DoorOpen, Scissors } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";

const services = [
  {
    icon: Fence,
    title: "Metal Railings",
    description: "Transform your staircases, balconies, and terraces with our precision-cut metal railings. Available in Stainless Steel, Mild Steel, and Aluminium with custom designs.",
    href: "/products/railings",
  },
  {
    icon: Building2,
    title: "Metal Elevation & Cladding",
    description: "Elevate your building's exterior with stunning laser-cut metal facades and decorative panels. Perfect for modern architecture and commercial buildings.",
    href: "/contact",
  },
  {
    icon: Award,
    title: "Name Plates & Signage",
    description: "Make a lasting impression with premium name plates for homes and businesses. Laser-cut precision in Brass, Copper, Stainless Steel, and more.",
    href: "/products/nameplates",
  },
  {
    icon: DoorOpen,
    title: "Gates & Grills",
    description: "Secure and beautify your property with custom-designed gates and window grills. Strong, durable, and aesthetically pleasing.",
    href: "/contact",
  },
  {
    icon: Scissors,
    title: "Custom Laser Cutting",
    description: "Have a unique design in mind? We bring your vision to life with precision CNC laser cutting. No design too complex!",
    href: "/contact",
  },
];

export function Services() {
  return (
    <section className="section-padding bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              What We Offer
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our Products & Services
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="text-lg text-muted-foreground">
              From residential projects to commercial installations, we deliver premium 
              metal fabrication solutions with unmatched finishing quality.
            </p>
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <Card className="group bg-card border-border hover-lift cursor-pointer overflow-hidden h-full">
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className="h-14 w-14 rounded-xl gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-7 w-7 text-accent-foreground" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Link */}
                  <Link
                    to={service.href}
                    className="inline-flex items-center text-gold font-semibold hover:gap-3 gap-2 transition-all"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
