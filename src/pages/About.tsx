import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import { 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Target, 
  Eye,
  Wrench,
  Award,
  Clock,
  MapPin,
  Heart
} from "lucide-react";

const values = [
  {
    icon: Wrench,
    title: "The Extra Step",
    description: "While most manufacturers deliver rough-cut pieces, we go further. Our finishing process ensures every edge is smooth, every corner is perfect.",
  },
  {
    icon: Heart,
    title: "Family Values, Professional Results",
    description: "As a family business, your satisfaction is our reputation. We're not a faceless corporation – we're your partners in creating something beautiful.",
  },
  {
    icon: Target,
    title: "Modern Technology, Traditional Craftsmanship",
    description: "We combine state-of-the-art CNC laser cutting technology with traditional metalworking expertise. The best of both worlds.",
  },
  {
    icon: Eye,
    title: "Transparent Communication",
    description: "From quote to delivery, you'll always know where your project stands. We provide photos, updates, and direct access to our team.",
  },
  {
    icon: Clock,
    title: "Commitment to Deadlines",
    description: "We understand project timelines matter. Our efficient process ensures 7-10 day delivery across India without compromising quality.",
  },
];

const stats = [
  { value: "15+", label: "Years Experience", description: "Combined expertise in metal fabrication" },
  { value: "500+", label: "Projects Completed", description: "Successfully delivered across India" },
  { value: "50+", label: "Cities Served", description: "Nationwide delivery network" },
  { value: "10,000+", label: "Sq.Ft Cut", description: "Of metal masterfully finished" },
  { value: "98%", label: "Satisfaction Rate", description: "Happy customers trust us" },
  { value: "1 Year", label: "Warranty", description: "On all our products" },
];

const commitments = [
  "Honest Pricing – No hidden costs, transparent quotes",
  "Quality Guarantee – 1-year warranty on all products",
  "Timely Delivery – 7-10 days across India",
  "Expert Guidance – Free design consultation",
  "Premium Materials – Only the best grades",
  "Superior Finishing – Our signature 3-step process",
  "After-Sales Support – We're here even after delivery",
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 gradient-hero overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[hsl(38_70%_50%_/_0.1)] rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal animation="fade-up" delay={0}>
              <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
                About Us
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[hsl(40_20%_98%)] mb-6">
                About Agrawal & Son Daughter Enterprises
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="text-xl text-[hsl(40_20%_98%_/_0.8)]">
                Crafting Excellence in Metal with Precision and Care
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal animation="fade-right">
              <div>
                <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
                  Our Story
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  A Family Legacy of Craftsmanship
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Agrawal & Son Daughter Enterprises began as a small workshop in 
                    Satna with a simple philosophy: <strong className="text-foreground">never compromise on quality</strong>. 
                    What started as a family passion for metalwork has grown into one of 
                    Madhya Pradesh's most trusted names in CNC laser cutting and metal fabrication.
                  </p>
                  <p>
                    As a family-run business, we treat every project with the care and 
                    attention we'd give our own home. The name "Son Daughter" reflects 
                    our inclusive family values – everyone in the family contributes, 
                    and everyone's work matters equally.
                  </p>
                  <p>
                    Over the years, we've served over 500 happy customers across India, 
                    from individual homeowners to large construction companies. But our 
                    commitment remains the same: premium finishing, honest pricing, and 
                    customer satisfaction above all.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-left" delay={0.2}>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[hsl(40_15%_92%)] to-[hsl(40_10%_85%)] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="h-24 w-24 mx-auto rounded-2xl bg-gradient-to-br from-[hsl(38_70%_50%)] to-[hsl(40_65%_60%)] flex items-center justify-center mb-6">
                      <Users className="h-12 w-12 text-[hsl(240_15%_13%)]" />
                    </div>
                    <p className="text-xl font-bold text-foreground">Family-Owned</p>
                    <p className="text-muted-foreground">Since Day One</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-xl bg-gradient-to-br from-[hsl(38_70%_50%)] to-[hsl(40_65%_60%)] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[hsl(240_15%_13%)]">500+</p>
                    <p className="text-xs text-[hsl(240_15%_13%_/_0.8)]">Customers</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-[hsl(40_30%_95%)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal animation="fade-up">
              <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
                Our Philosophy
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Quality is Not Expensive – It's Priceless
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                This belief guides everything we do. While others race to the bottom 
                with cheaper prices and corner-cutting, we invest time in the one step 
                that makes all the difference: finishing.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="scale" delay={0.2}>
              <div className="bg-card rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Our Rigorous 3-Step Finishing Process
                </h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="h-12 w-12 mx-auto rounded-full bg-[hsl(38_70%_50%_/_0.1)] flex items-center justify-center mb-3">
                      <span className="text-lg font-bold text-[hsl(38_70%_50%)]">1</span>
                    </div>
                    <p className="font-semibold text-foreground">Precision Cutting</p>
                    <p className="text-sm text-muted-foreground">0.1mm accuracy</p>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 mx-auto rounded-full bg-[hsl(38_70%_50%_/_0.1)] flex items-center justify-center mb-3">
                      <span className="text-lg font-bold text-[hsl(38_70%_50%)]">2</span>
                    </div>
                    <p className="font-semibold text-foreground">Edge Smoothing</p>
                    <p className="text-sm text-muted-foreground">By skilled craftsmen</p>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 mx-auto rounded-full bg-[hsl(38_70%_50%_/_0.1)] flex items-center justify-center mb-3">
                      <span className="text-lg font-bold text-[hsl(38_70%_50%)]">3</span>
                    </div>
                    <p className="font-semibold text-foreground">Quality Inspection</p>
                    <p className="text-sm text-muted-foreground">Multi-point check</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
                Our Difference
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                What Makes Us Different
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <StaggerItem key={value.title}>
                <Card className="bg-card border-border hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-8">
                    <div className="h-14 w-14 rounded-xl bg-[hsl(38_70%_50%_/_0.1)] flex items-center justify-center mb-6">
                      <value.icon className="h-7 w-7 text-[hsl(38_70%_50%)]" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* By The Numbers */}
      <section className="section-padding gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
                Our Journey
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(40_20%_98%)] mb-6">
                Our Journey in Numbers
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-[hsl(38_70%_50%)]">{stat.value}</p>
                  <p className="text-sm font-semibold text-[hsl(40_20%_98%)] mt-2">{stat.label}</p>
                  <p className="text-xs text-[hsl(40_20%_98%_/_0.6)] mt-1">{stat.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Facility */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal animation="fade-right" className="order-2 lg:order-1">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-[hsl(40_15%_92%)] to-[hsl(40_10%_85%)] flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="h-16 w-16 mx-auto text-[hsl(38_70%_50%)] mb-4" />
                  <p className="text-xl font-bold text-foreground">Our Workshop</p>
                  <p className="text-muted-foreground">Satna, Madhya Pradesh</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-left" delay={0.2} className="order-1 lg:order-2">
              <div>
                <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
                  Our Facility
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  State-of-the-Art Facility in Satna
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Located in Satna, Madhya Pradesh, our facility is equipped with 
                    modern CNC laser cutting machines, finishing equipment, and a 
                    dedicated quality control area.
                  </p>
                  <p>
                    We've invested in technology to ensure precision, but we've kept 
                    the human touch where it matters – in finishing and quality inspection.
                  </p>
                  <p>
                    Our workshop is where innovation meets craftsmanship. Every team 
                    member takes pride in their work, knowing that their attention to 
                    detail is what makes Agrawal & Son Daughter Enterprises special.
                  </p>
                </div>
                <div className="mt-8 p-4 bg-[hsl(38_70%_50%_/_0.1)] rounded-lg">
                  <p className="text-sm font-semibold text-foreground">
                    🏭 Want to visit? We welcome customers to tour our facility!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    See our process firsthand and understand why our finishing makes all the difference.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="section-padding bg-[hsl(40_30%_95%)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal animation="fade-up">
              <p className="text-sm font-semibold text-[hsl(38_70%_50%)] uppercase tracking-wider mb-4">
                Our Promise
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Our Commitment to You
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                When you choose Agrawal & Son Daughter Enterprises, you're getting:
              </p>
            </ScrollReveal>
            <StaggerContainer className="grid sm:grid-cols-2 gap-4 text-left">
              {commitments.map((commitment) => (
                <StaggerItem key={commitment}>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(38_70%_50%)] shrink-0 mt-0.5" />
                    <span className="text-foreground">{commitment}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="scale">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Ready to Experience the Difference?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join 500+ satisfied customers who chose quality over shortcuts.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="gold" size="lg" asChild>
                  <Link to="/contact">
                    Get in Touch
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/products/railings">
                    See Our Work
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
