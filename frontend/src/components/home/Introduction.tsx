import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Wrench, Truck } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";

const quickLinks = [
  {
    icon: Package,
    title: "What We Make",
    description: "Precision-laser cut metal solutions for every space",
    href: "/products",
    cta: "Explore Products",
  },
  {
    icon: Wrench,
    title: "Custom Orders",
    description: "Each piece is made to your exact specifications",
    href: "/your-project",
    cta: "Start Your Project",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "7-10 day delivery across India without compromising quality",
    href: "/contact",
    cta: "Get Quote",
  },
];

export function Introduction() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Text */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              What We Make
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.1}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              ASDE LaserCuttings creates precision-laser cut metal railings, panels, and 
              architectural elements for residential, hospitality, and corporate environments. 
              Based in Satna, Madhya Pradesh, we deliver exceptional craftsmanship with faster 
              turnaround times than our competitors—all while maintaining the{" "}
              <strong className="text-foreground">superior finishing quality</strong> that sets us apart.
            </p>
          </ScrollReveal>
        </div>

        {/* Quick Links */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {quickLinks.map((item) => (
            <StaggerItem key={item.title}>
              <Card className="bg-card border-border hover:shadow-lg hover:border-gold/30 transition-all h-full group">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="h-14 w-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                    <item.icon className="h-7 w-7 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                    {item.description}
                  </p>
                  <Button variant="link" className="p-0 h-auto text-gold justify-start" asChild>
                    <Link to={item.href}>
                      {item.cta}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
