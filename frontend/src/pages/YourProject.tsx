import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import {
  PenTool,
  Crosshair,
  Sparkles,
  Package,
  CheckCircle2,
  Send,
  PersonStanding
} from "lucide-react";
import { quoteAPI } from "@/lib/api-services";
import { useLocation } from "react-router-dom";
import { Quote } from "@/types/Types";

const processSteps = [
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

const materials = [
  {
    name: "Stainless Steel (SS 304, SS 316)",
    description: "Our most popular choice for outdoor applications.",
    advantages: ["Rust-proof and corrosion-resistant", "Modern, sleek appearance", "Easy to maintain", "Perfect for coastal areas"],
    bestFor: "Outdoor railings, facades, name plates exposed to weather",
    finishes: "Mirror, Satin, Brushed",
    thickness: "1.5mm - 6mm",
  },
  {
    name: "Mild Steel (MS)",
    description: "Strong, durable, and economical option.",
    advantages: ["Cost-effective", "Very strong", "Can be painted any color", "Powder coating available"],
    bestFor: "Indoor applications, painted finishes, budget projects",
    finishes: "Powder coated, Painted",
    thickness: "2mm - 10mm",
    note: "Must be coated or painted to prevent rust",
  },
  {
    name: "Aluminium",
    description: "Lightweight yet durable choice.",
    advantages: ["Naturally corrosion-resistant", "Won't rust", "Lightweight (easy installation)", "Modern appearance"],
    bestFor: "Large installations, facades, room dividers",
    finishes: "Anodized, Powder coated, Natural",
    thickness: "2mm - 8mm",
  },
  {
    name: "Brass",
    description: "Premium, luxurious metal with warm tones.",
    advantages: ["Rich golden color", "Premium look and feel", "Ages beautifully", "Develops natural patina"],
    bestFor: "Name plates, decorative elements, high-end projects",
    finishes: "Polished, Brushed, Oil Rubbed, Natural Patina",
    thickness: "1mm - 4mm",
  },
  {
    name: "Copper",
    description: "Unique aesthetic with distinctive color.",
    advantages: ["Beautiful reddish-brown color", "Develops attractive patina", "Unique character", "Premium appearance"],
    bestFor: "Artistic installations, name plates, decorative panels",
    finishes: "Polished, Brushed, Natural Patina",
    thickness: "1mm - 4mm",
  },
];

const patterns = [
  { name: "Geometric Patterns", description: "Modern, clean lines. Perfect for contemporary spaces." },
  { name: "Traditional Patterns", description: "Indian motifs. Classic designs with timeless elegance." },
  { name: "Custom Patterns", description: "Your logo, specific designs, architectural elements." },
  { name: "Abstract & Artistic", description: "Unique creations. One-of-a-kind statement pieces." },
];

const finishes = [
  { name: "Brushed/Satin", description: "Subtle sheen with visible brush marks. Modern look, hides fingerprints." },
  { name: "Mirror Polish", description: "High-shine finish that reflects light. Luxurious appearance." },
  { name: "Powder Coated", description: "Colored finish in any shade. Most durable and weather-resistant." },
  { name: "Oil Rubbed", description: "Dark, aged appearance. Sophisticated and rich." },
  { name: "Natural Patina", description: "Allows metal to age naturally. Develops unique character." },
];

export default function YourProject() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const [formData, setFormData] = useState<Quote>({
    name: "",
    email: "",
    phone: "",
    location: "",
    projectType: "",
    material: "",
    length: 0,
    width: 0,
    quantity: 0,
    design: "",
    timeline: "",
    budget: 0,
    details: "",
    image: "/images/placeholder.png"
  });

  useEffect(() => {
    if (location.hash) {
      // Remove the '#' to get the exact id
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);

      if (element) {
        // Small timeout ensures animations/DOM rendering don't block the scroll
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = await quoteAPI.createQuote(formData);

      if (data.success) {
        toast({
          title: `Quote Request Sent for ${data.name}!`,
          description: "We'll get back to you within 24 hours with a detailed quote.",
        });
      }
      else {
        throw new Error(data.message);
      }
      setFormData({
        name: "", email: "", phone: "", location: "", projectType: "",
        material: "", length: 0, width: 0, quantity: 0, design: "",
        timeline: "", budget: 0, details: "", image: "/images/placeholder.png"
      });
    } catch (error) {
      toast({ title: "Falied to submit", description: "Some error has occured in submitting the form.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openCloudinaryWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'], // What options the user sees
        multiple: false, // Only one image per product for now
        maxFiles: 1,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          console.log("Upload successful! URL: ", result.info.secure_url);
          // Update the form state with the secure Cloudinary URL
          if (formData) {
            setFormData({ ...formData, image: result.info.secure_url });
          }
        }
      }
    );

    widget.open();
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 gradient-hero overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-[url('/images/your_project.jpeg')] bg-cover bg-center bg-no-repeat opacity-30"
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal animation="fade-up">
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                Your Project
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Your Project, Our Expertise
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="text-xl text-primary-foreground/80">
                Made to order. Every detail matters. Let us bring your vision to life.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* Quote Form */}
      <section id="quote" className="section-padding bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal animation="fade-up">
              <div className="text-center mb-12">
                <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                  Request a Quote
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Get Your Custom Quote
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours with a detailed quote.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.1}>
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Info */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="mt-1.5"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your@email.com"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="City, State"
                          className="mt-1.5"
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="projectType">Project Type</Label>
                        <Input
                          id="projectType"
                          required
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          placeholder="e.g., Railing, Name Plate, Gate"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="material">Material Preference</Label>
                        <Input
                          id="material"
                          value={formData.material}
                          onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                          placeholder="e.g., Stainless Steel, Brass"
                          className="mt-1.5"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="design">Design</Label>
                        <Input
                          id="design"
                          required
                          value={formData.design}
                          onChange={(e) => setFormData({ ...formData, design: e.target.value })}
                          placeholder="e.g., Minimalistic, etc"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="budget">Budget</Label>
                        <Input
                          id="budget"
                          type="number"
                          value={formData.budget === 0 ? "" : formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value === "" ? 0 : Number(e.target.value) })}
                          placeholder="In Rupees"
                          className="mt-1.5"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="length">Length</Label>
                          <Input
                            id="length"
                            type="number"
                            value={formData.length === 0 ? "" : formData.length}
                            onChange={(e) => setFormData({ ...formData, length: e.target.value === "" ? 0 : Number(e.target.value) })}
                            placeholder="In meters"
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="width">Width</Label>
                          <Input
                            id="width"
                            type="number"
                            value={formData.width === 0 ? "" : formData.width}
                            onChange={(e) => setFormData({ ...formData, width: e.target.value === "" ? 0 : Number(e.target.value) })}
                            placeholder="In meters"
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                          id="quantity"
                          type="number"
                          value={formData.quantity === 0 ? "" : formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value === "" ? 0 : Number(e.target.value) })}
                          placeholder="Number of pieces"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="timeline">Timeline</Label>
                        <Input
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          placeholder="When needed"
                          className="mt-1.5"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="details">Additional Details (optional)</Label>
                      <Textarea
                        id="details"
                        rows={4}
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        placeholder="Tell us about your project requirements, design preferences, etc."
                        className="mt-1.5 resize-none"
                      />
                    </div>

                    <div>
                      <Label htmlFor="details ">Upload an Image (optional)</Label>
                      <div className="flex items-center gap-4 mt-3">
                        {/* Shows a preview of the existing or newly uploaded image */}
                        {formData.image && (
                          <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded border border-gray-200 shadow-sm" />
                        )}

                        <Button
                          type="button"
                          className="bg-[#E4A143] hover:bg-[#D29D5B] text-white rounded-xl"
                          variant="outline"
                          onClick={openCloudinaryWidget}
                        >
                          Upload Image
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="gold"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Submit Quote Request"}
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                How It Works
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                From Concept to Delivery
              </h2>
              <p className="text-muted-foreground">
                Total Timeline: 2-3 weeks from approval to delivery
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((item) => (
              <StaggerItem key={item.title}>
                <div className="relative h-full">
                  <Card className="bg-card border-border h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <span className="absolute -top-4 -right-4 h-10 w-10 rounded-full gradient-gold flex items-center justify-center text-sm font-bold text-accent-foreground">
                        {item.step}
                      </span>
                      <div className="h-14 w-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                        <item.icon className="h-7 w-7 text-gold" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Materials Guide */}
      <section id="materials" className="section-padding bg-cream scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                Materials Guide
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Choose the Right Material
              </h2>
              <p className="text-muted-foreground">
                We'll guide you based on application (indoor/outdoor), budget, and aesthetic preferences.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="space-y-6">
            {materials.map((material) => (
              <StaggerItem key={material.name}>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 lg:p-8">
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {material.name}
                        </h3>
                        <p className="text-muted-foreground mb-4">{material.description}</p>
                        <div className="grid sm:grid-cols-2 gap-2 mb-4">
                          {material.advantages.map((adv) => (
                            <div key={adv} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{adv}</span>
                            </div>
                          ))}
                        </div>
                        {material.note && (
                          <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
                            Note: {material.note}
                          </p>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase">Best For</p>
                          <p className="text-sm text-foreground">{material.bestFor}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase">Finishes</p>
                          <p className="text-sm text-foreground">{material.finishes}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase">Thickness</p>
                          <p className="text-sm text-foreground">{material.thickness}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Patterns */}
      <section id="patterns" className="section-padding bg-background scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Patterns */}
            <div>
              <ScrollReveal animation="fade-right">
                <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                  Choose Your Pattern
                </p>
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Pattern Options
                </h2>
              </ScrollReveal>
              <StaggerContainer className="space-y-4">
                {patterns.map((pattern) => (
                  <StaggerItem key={pattern.name}>
                    <Card className="bg-card border-border">
                      <CardContent className="p-5">
                        <h4 className="font-bold text-foreground">{pattern.name}</h4>
                        <p className="text-sm text-muted-foreground">{pattern.description}</p>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Finishes */}
            <div>
              <ScrollReveal animation="fade-left">
                <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                  Choose Your Finish
                </p>
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Finish Options
                </h2>
              </ScrollReveal>
              <StaggerContainer className="space-y-4">
                {finishes.map((finish) => (
                  <StaggerItem key={finish.name}>
                    <Card className="bg-card border-border">
                      <CardContent className="p-5">
                        <h4 className="font-bold text-foreground">{finish.name}</h4>
                        <p className="text-sm text-muted-foreground">{finish.description}</p>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="scale">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Prefer to Talk?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Call us or WhatsApp for a quick discussion about your project.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="gold" size="lg" asChild>
                  <a href="https://wa.me/919303311384" target="_blank" rel="noopener noreferrer">
                    WhatsApp Us
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="tel:+919303311384">
                    Call +91 93033 11384
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
