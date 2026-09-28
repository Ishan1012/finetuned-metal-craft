import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";

const quickLinks = [
  {
    image: "/images/home.jpeg",
    alt: "A collection of precision laser-cut architectural metalwork",
    title: "What We Make",
    description: "Precision-laser cut metal solutions for every space",
    href: "/products#hero",
    cta: "Explore Products",
  },
  {
    image: "/images/your_project.jpeg",
    alt: "Decorative laser-cut patterns available for custom projects",
    title: "Custom Orders",
    description: "Each piece is made to your exact specifications",
    href: "/your-project",
    cta: "Start Your Project",
  },
  {
    image: "/images/contact.jpeg",
    alt: "Customer arranging a project delivery by phone",
    title: "Fast Delivery",
    description: "7-10 day delivery across India without compromising quality",
    href: "/contact",
    cta: "Get Quote",
  },
];

export function Introduction() {
  return (
    <section className="section-padding overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <ScrollReveal animation="fade-up">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              What We Make
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.1}>
            <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Metalwork shaped around your space
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              From precision-cut architectural details to made-to-measure pieces, we combine
              thoughtful design, superior finishing, and dependable delivery.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {quickLinks.map((item) => (
            <StaggerItem key={item.title}>
              <article className="group flex h-full flex-col overflow-hidden border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-elevated">
                <Link to={item.href} className="relative block aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gold transition-all duration-500 group-hover:h-2" />
                  <div className="absolute right-4 top-4 flex h-9 min-w-9 items-center justify-center border border-primary-foreground/20 bg-primary/80 px-2 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
                    0{quickLinks.indexOf(item) + 1}
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-6 sm:p-7 lg:p-8">
                  <h3 className="mb-3 text-xl font-bold text-foreground sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mb-6 flex-1 leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <Button variant="link" className="p-0 h-auto text-gold justify-start" asChild>
                    <Link to={item.href}>
                      {item.cta}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
