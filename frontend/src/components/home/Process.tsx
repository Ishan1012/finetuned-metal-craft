import { PenTool, Crosshair, Sparkles, Package, PersonStanding } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";

const steps = [
  {
    icon: PenTool,
    step: "01",
    title: "Review Drawings",
    description: "Send us your project drawings and requirements.",
  },
  {
    icon: Crosshair,
    step: "02",
    title: "Proposals & quotes",
    description: "Receive design proposals and quotes within 24 hours.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Confirm production",
    description: "Once you confirm the plan, we will arrange production immediately.",
  },
  {
    icon: Package,
    step: "04",
    title: "End-to-end logistics",
    description: "We handle all logistics from the factory to the port.",
  },
  {
    icon: PersonStanding,
    step: "05",
    title: "Easy on-site installation",
    description: "Send us your project drawings and requirements.",
  },
];

export function Process() {
  return (
    <section className="section-padding gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Our Process
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              How We Work
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="text-lg text-primary-foreground/80">
              From concept to delivery, every step is crafted for perfection.
            </p>
          </ScrollReveal>
        </div>

        {/* Steps */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8" staggerDelay={0.15}>
          {steps.map((item, index) => (
            <StaggerItem key={item.title}>
              <div className="relative h-full">
                {/* Connector line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-primary-foreground/20 -translate-x-1/2 z-0" />
                )}

                <div className="relative bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-8 border border-primary-foreground/10 hover:border-gold/50 transition-colors h-full">
                  {/* Step number */}
                  <span className="absolute -top-4 -right-4 h-10 w-10 rounded-full gradient-gold flex items-center justify-center text-sm font-bold text-accent-foreground">
                    {item.step}
                  </span>

                  {/* Icon */}
                  <div className="h-14 w-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center mb-6">
                    <item.icon className="h-7 w-7 text-gold" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-primary-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-primary-foreground/70 leading-relaxed">
                    {item.description}
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
