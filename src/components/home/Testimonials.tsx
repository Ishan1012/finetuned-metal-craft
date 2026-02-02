import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";

const testimonials = [
  {
    content: "The finishing quality is unmatched! We compared 3 different manufacturers, and Agrawal & Son Daughter's work was clearly superior. Worth every rupee.",
    author: "Rajesh Sharma",
    role: "Architect",
    location: "Jabalpur",
    rating: 5,
  },
  {
    content: "Fast delivery and excellent communication throughout. The railing they made for our home is beautiful and perfectly finished. Highly recommended!",
    author: "Priya & Amit Patel",
    role: "Homeowners",
    location: "Bhopal",
    rating: 5,
  },
  {
    content: "We've ordered name plates for 5 of our office locations. Consistent quality every time. They're now our go-to supplier.",
    author: "Suresh Kumar",
    role: "Corporate Client",
    location: "Delhi",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Testimonials
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What Our Customers Say
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="text-lg text-muted-foreground">
              Join 500+ satisfied customers who chose quality over shortcuts.
            </p>
          </ScrollReveal>
        </div>

        {/* Testimonials Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.author}>
              <Card className="bg-card border-border hover-lift h-full">
                <CardContent className="p-8">
                  {/* Quote icon */}
                  <Quote className="h-10 w-10 text-gold/30 mb-4" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-foreground leading-relaxed mb-6">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full gradient-gold flex items-center justify-center">
                      <span className="text-lg font-bold text-accent-foreground">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
