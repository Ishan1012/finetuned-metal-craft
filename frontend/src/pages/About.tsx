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
  Clock,
  MapPin,
  Heart,
  Sparkles,
  Truck,
  Shield,
  BadgeCheck,
  Award
} from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Quality First",
    description: "We don't skip steps. Our finishing process is non-negotiable, ensuring smooth, burr-free edges on every piece.",
  },
  {
    icon: Heart,
    title: "Customer Partnership",
    description: "Your satisfaction is our success. We work closely with you from concept to completion.",
  },
  {
    icon: Target,
    title: "Innovation & Tradition",
    description: "State-of-the-art CNC technology combined with traditional metalworking craftsmanship.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear communication, honest pricing, realistic timelines. No surprises.",
  },
  {
    icon: Award,
    title: "Continuous Improvement",
    description: "We're always learning, always improving, always raising our standards.",
  },
];

const whyChooseUs = [
  { icon: Sparkles, title: "Superior Finishing", description: "Our signature 3-step process ensures smooth, burr-free edges." },
  { icon: Truck, title: "Fast Delivery", description: "7-10 days across India without sacrificing quality." },
  { icon: Users, title: "Expert Team", description: "15+ years of combined experience in metal fabrication." },
  { icon: BadgeCheck, title: "Quality Materials", description: "Only premium-grade metals from certified suppliers." },
  { icon: Wrench, title: "Custom Solutions", description: "From simple name plates to complex architectural installations." },
  { icon: MapPin, title: "All-India Service", description: "Based in Satna, delivering everywhere." },
  { icon: Clock, title: "Competitive Pricing", description: "Fair pricing for premium quality. No hidden costs." },
  { icon: Shield, title: "1-Year Warranty", description: "We stand behind our work with comprehensive warranty." },
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
        <div
          className="absolute inset-0 z-0 bg-[url('/images/about.jpeg')] bg-cover bg-center bg-no-repeat opacity-50"
          aria-hidden="true"
        />
      </section>

      {/* Our Story */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal animation="fade-right">
              <div>
                <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                  The Beginning
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  A Family Legacy of Craftsmanship
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in Satna, Madhya Pradesh, ASDE LaserCuttings (Agrawal & Son
                    Daughter Enterprises) began with a simple philosophy: <strong className="text-foreground">never
                      compromise on quality</strong>. What started as a family workshop has grown
                    into one of Central India's most trusted names in precision CNC laser cutting.
                  </p>
                  <p>
                    The name "Son Daughter" reflects our inclusive family values—everyone in
                    the family contributes, and everyone's work matters equally. This philosophy
                    extends to our team and our customers: every project, large or small, receives
                    the same attention to detail and commitment to excellence.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-left" delay={0.2}>
              {/* Added rounded corners and overflow-hidden for a clean look, optional */}
              <div className="relative rounded-xl aspect-video overflow-hidden shadow-lg">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-cover"
                >
                  <source src="/videos/machine.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ScrollReveal animation="fade-up">
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                What Makes Us Different
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Quality is Not Expensive – It's Priceless
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                While others race to deliver quickly by cutting corners, we invest time
                in the one step that makes all the difference: finishing.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="scale">
            <Card className="bg-card border-border max-w-3xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                  Our Rigorous 3-Step Finishing Process
                </h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="h-12 w-12 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-3">
                      <span className="text-lg font-bold text-gold">1</span>
                    </div>
                    <p className="font-semibold text-foreground">Precision Cutting</p>
                    <p className="text-sm text-muted-foreground">0.1mm accuracy</p>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-3">
                      <span className="text-lg font-bold text-gold">2</span>
                    </div>
                    <p className="font-semibold text-foreground">Edge Smoothing</p>
                    <p className="text-sm text-muted-foreground">By skilled craftsmen</p>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-3">
                      <span className="text-lg font-bold text-gold">3</span>
                    </div>
                    <p className="font-semibold text-foreground">Quality Inspection</p>
                    <p className="text-sm text-muted-foreground">Multi-point check</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                Our Values
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                What We Stand For
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <Card className="bg-card border-border hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-8">
                    <div className="h-14 w-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                      <value.icon className="h-7 w-7 text-gold" />
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

      {/* Why Choose Us */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                Why Choose Us
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                The ASDE Advantage
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item) => (
              <StaggerItem key={item.title}>
                <div className="text-center p-6">
                  <div className="h-12 w-12 mx-auto rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
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
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                <div className="relative rounded-xl aspect-video overflow-hidden shadow-lg">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto object-cover"
                  >
                    <source src="/videos/machine.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-left" delay={0.2} className="order-1 lg:order-2">
              <div>
                <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                  Our Facility
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  State-of-the-Art Workshop
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Our 40,000+ square foot facility in Satna houses advanced CNC laser
                    cutting machines, precision equipment (accurate to 0.1mm), dedicated
                    finishing workshop, and quality control area.
                  </p>
                  <p>
                    We've invested in technology to ensure precision, but we've kept the
                    human touch where it matters most: in finishing and quality inspection.
                  </p>
                </div>
                <div className="mt-8 p-4 bg-gold/10 rounded-lg">
                  <p className="text-sm font-semibold text-foreground">
                    🏭 Want to visit? We welcome customers to tour our facility!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    See our process firsthand. Schedule a visit via the contact page.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal animation="fade-up">
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                Our Promise
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Our Commitment to You
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                When you choose ASDE LaserCuttings, you're getting:
              </p>
            </ScrollReveal>
            <StaggerContainer className="grid sm:grid-cols-2 gap-4 text-left">
              {commitments.map((commitment) => (
                <StaggerItem key={commitment}>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
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
                Join 50K+ satisfied customers who chose quality over shortcuts.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="gold" size="lg" asChild>
                  <Link to="/contact">
                    Get in Touch
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/gallery">
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
