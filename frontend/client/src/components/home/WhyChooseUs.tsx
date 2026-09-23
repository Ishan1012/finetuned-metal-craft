import { Sparkles, Truck, BadgeCheck, Users, MapPin, Shield } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";

const reasons = [
  {
    icon: Sparkles,
    title: "Superior Finishing",
    description: "We don't just cut – we perfect. Our 3-step finishing process ensures smooth, burr-free edges on every piece. This is the step most manufacturers skip.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quality doesn't have to mean slow. We deliver across India in 7-10 days without compromising on our finishing standards.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Materials",
    description: "We work with premium grades of Stainless Steel (SS 304, SS 316), Mild Steel, Aluminium, Brass, and Copper.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "With over 15 years of combined experience, our skilled craftsmen bring expertise to every project.",
  },
  {
    icon: MapPin,
    title: "All-India Service",
    description: "Based in Satna, Madhya Pradesh, but serving customers across India. We deliver everywhere with careful packaging.",
  },
  {
    icon: Shield,
    title: "1-Year Warranty",
    description: "We stand behind our work with a comprehensive 1-year warranty. Your satisfaction is our success.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              The Difference
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Choose Agrawal & Son Daughter?
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="text-lg text-muted-foreground">
              When quality matters, choose the manufacturer that doesn't take shortcuts.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {reasons.map((reason) => (
            <StaggerItem key={reason.title}>
              <div className="flex gap-5">
                {/* Icon */}
                <div className="shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-gold/10 flex items-center justify-center">
                    <reason.icon className="h-6 w-6 text-gold" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
