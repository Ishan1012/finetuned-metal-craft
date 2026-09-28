import { MapPin, Navigation, ExternalLink, Clock, Phone, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/common/ScrollReveal";

interface LocationMapSectionProps {
  subtitle?: string;
  title?: string;
  description?: string;
  bgColor?: string;
}

export const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/WBTBwFTsUWKj3r8k7";
export const GOOGLE_MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.2384!2d80.790349!3d24.576221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398381f545592571%3A0x5bdd271618db574a!2sASDE%20Lasercuttings%20-%20Agrawal%20and%20Son%20Daughter%20Enterprises!5e0!3m2!1sen!2sin!4v1700000000000";

export function LocationMapSection({
  subtitle = "Our Location",
  title = "Visit Our Factory & Workshop",
  description = "Tour our precision CNC fabrication workshop in Satna. See our cutting-edge machinery and meet our team of metal craftsmen.",
  bgColor = "bg-background",
}: LocationMapSectionProps) {
  return (
    <section className={`section-padding ${bgColor}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">
              {subtitle}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="bg-card border border-border rounded-2xl md:rounded-3xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-0">
              {/* Address and Details Column */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-card border-b lg:border-b-0 lg:border-r border-border">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gold/10 text-gold mb-6 border border-gold/20">
                    <Building2 className="h-3.5 w-3.5" />
                    <span>Manufacturing Facility</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                    ASDE LaserCuttings
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-gold font-semibold mb-6">
                    Agrawal & Son Daughter Enterprises
                  </p>

                  <div className="space-y-5">
                    <div className="flex items-start gap-3.5">
                      <div className="h-9 w-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="h-5 w-5 text-gold" />
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold text-foreground">Factory Address</p>
                        <p className="text-muted-foreground leading-relaxed mt-1">
                          Agrawal Tower, Opposite to Maruti Nexa Showroom,<br />
                          Panna Road, Amoudha,<br />
                          Satna (M.P.) - 485001
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="h-9 w-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="h-5 w-5 text-gold" />
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold text-foreground">Operational Hours</p>
                        <p className="text-muted-foreground mt-1">Monday – Saturday: 9:00 AM – 7:00 PM</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Sunday: By Prior Appointment</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="h-9 w-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Phone className="h-5 w-5 text-gold" />
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold text-foreground">Phone & WhatsApp</p>
                        <p className="text-muted-foreground mt-1">+91 93033 11384 &nbsp;|&nbsp; +91 98066 80879</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-border space-y-3">
                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2 text-sm shadow-md"
                    asChild
                  >
                    <a
                      href={GOOGLE_MAPS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="h-4 w-4" />
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="h-3.5 w-3.5 ml-1 opacity-70" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Interactive Google Map Box */}
              <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] w-full bg-muted">
                <iframe
                  title="ASDE Lasercuttings Location Map"
                  src={GOOGLE_MAPS_EMBED_SRC}
                  className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] block border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-border shadow-md text-xs font-medium text-foreground hover:text-gold transition-colors flex items-center gap-1.5 z-10"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-gold" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
