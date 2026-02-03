import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
} from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    primary: "+91 93033 11384",
    secondary: "+91 98066 80879",
    description: "Mon-Sat: 9:00 AM - 7:00 PM",
    action: "tel:+919303311384",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    primary: "+91 93033 11384",
    secondary: "Fastest way to reach us!",
    description: "Share photos, get instant quotes",
    action: "https://wa.me/919303311384",
  },
  {
    icon: Mail,
    title: "Email Us",
    primary: "info@asdelasercutting.com",
    secondary: "quotes@asdelasercutting.com",
    description: "Response within 24 hours",
    action: "mailto:info@asdelasercutting.com",
  },
  {
    icon: MapPin,
    title: "Visit Our Factory",
    primary: "ASDE LaserCuttings",
    secondary: "Agrawal Tower, Market Nexus Showroom",
    description: "Patra Road, Amodha, Satna, MP - 485001",
    action: null,
  },
];

const faqs = [
  {
    category: "General",
    items: [
      {
        question: "What's your minimum order quantity?",
        answer: "No minimum! We handle single-piece orders with the same care as bulk projects.",
      },
      {
        question: "How long does it take?",
        answer: "Typically 2-3 weeks from design approval to delivery. Rush orders available.",
      },
      {
        question: "Do you ship internationally?",
        answer: "Currently all-India only. International shipping on request for large orders.",
      },
      {
        question: "Can you match a design I've seen?",
        answer: "Yes! Share a photo or description, and we'll recreate or improve upon it.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    items: [
      {
        question: "How is pricing calculated?",
        answer: "Based on material, size, design complexity, quantity, and finish. Request a quote for exact pricing.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "Bank transfer, UPI, cheques, cash (local). 50% advance, 50% before dispatch.",
      },
      {
        question: "Do you offer discounts?",
        answer: "Yes! Bulk order discounts, repeat customer benefits, seasonal offers.",
      },
    ],
  },
  {
    category: "Materials & Quality",
    items: [
      {
        question: "How do I choose the right material?",
        answer: "We'll guide you based on application (indoor/outdoor), budget, and aesthetic preferences.",
      },
      {
        question: "What's the warranty?",
        answer: "1-year comprehensive warranty against manufacturing defects.",
      },
      {
        question: "Do you provide installation?",
        answer: "We provide detailed installation guides. Professional installation available in Satna, Rewa, Jabalpur areas.",
      },
    ],
  },
];

const serviceAreas = {
  primary: ["Satna", "Rewa", "Jabalpur", "Bhopal", "Indore", "Gwalior", "Ujjain"],
  national: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"],
};

const social = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", phone: "", product: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 gradient-hero overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal animation="fade-up" delay={0}>
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                Get In Touch
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Let's Bring Your Vision to Life
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="text-xl text-primary-foreground/80">
                Get a free consultation and quote within 24 hours.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method) => (
              <StaggerItem key={method.title}>
                <Card className="bg-card border-border hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6 text-center">
                    <div className="h-14 w-14 mx-auto rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                      <method.icon className="h-7 w-7 text-gold" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{method.title}</h3>
                    {method.action ? (
                      <a
                        href={method.action}
                        target={method.action.startsWith("http") ? "_blank" : undefined}
                        rel={method.action.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-gold hover:underline font-medium block"
                      >
                        {method.primary}
                      </a>
                    ) : (
                      <p className="font-medium text-foreground">{method.primary}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">{method.secondary}</p>
                    <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <ScrollReveal animation="fade-right">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you within 24 hours 
                  with a detailed quote.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="bg-card mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="bg-card mt-1.5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="bg-card mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="product">Product Interest</Label>
                    <Input
                      id="product"
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      placeholder="e.g., Railing, Name Plate, Custom Design"
                      className="bg-card mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project requirements, dimensions, material preferences, etc."
                      className="bg-card resize-none mt-1.5"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      variant="gold"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <a href="https://wa.me/919303311384" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp Instead
                      </a>
                    </Button>
                  </div>
                </form>
              </div>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal animation="fade-left" delay={0.2}>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Business Hours
                </h2>
                <Card className="bg-card border-border mb-8">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Clock className="h-6 w-6 text-gold shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-foreground">Monday to Saturday</p>
                        <p className="text-muted-foreground">9:00 AM - 7:00 PM</p>
                        <p className="font-semibold text-foreground mt-3">Sunday</p>
                        <p className="text-muted-foreground">By Appointment Only</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <h3 className="text-xl font-bold text-foreground mb-4">
                  What Happens After You Contact Us?
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full gradient-gold flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-accent-foreground">1</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Within 2 Hours</p>
                      <p className="text-sm text-muted-foreground">We acknowledge your inquiry</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full gradient-gold flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-accent-foreground">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Within 24 Hours</p>
                      <p className="text-sm text-muted-foreground">Detailed quote with pricing & timeline</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full gradient-gold flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-accent-foreground">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">After Approval</p>
                      <p className="text-sm text-muted-foreground">Design mockup & production begins</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4">
                  Connect With Us
                </h3>
                <div className="flex gap-4">
                  {social.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-gold hover:text-accent-foreground transition-colors"
                    >
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                Service Areas
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                We Deliver Across India
              </h2>
              <p className="text-muted-foreground">
                No matter where you are in India, we deliver!
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <StaggerItem>
              <Card className="bg-card border-border h-full">
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-4">Primary Service Area (Madhya Pradesh)</h3>
                  <div className="flex flex-wrap gap-2">
                    {serviceAreas.primary.map((city) => (
                      <span
                        key={city}
                        className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="bg-card border-border h-full">
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-4">National Delivery</h3>
                  <div className="flex flex-wrap gap-2">
                    {serviceAreas.national.map((city) => (
                      <span
                        key={city}
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                      >
                        {city}
                      </span>
                    ))}
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                      + 500 more cities
                    </span>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                FAQs
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-8">
            {faqs.map((category) => (
              <ScrollReveal key={category.category} animation="fade-up">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">{category.category}</h3>
                  <div className="space-y-4">
                    {category.items.map((faq) => (
                      <Card key={faq.question} className="bg-card border-border">
                        <CardContent className="p-6">
                          <h4 className="font-bold text-foreground mb-2">{faq.question}</h4>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="scale">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Get a free consultation and quote within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <a href="https://wa.me/919303311384" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Us
                  </a>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <a href="tel:+919303311384">
                    <Phone className="h-5 w-5" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
