import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Linkedin } from "lucide-react";

const navigation = {
  products: [
    { name: "Metal Railings", href: "/products/railings" },
    { name: "Name Plates", href: "/products/nameplates" },
    { name: "Metal Elevation", href: "/contact" },
    { name: "Gates & Grills", href: "/contact" },
    { name: "Custom Cutting", href: "/contact" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Process", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "YouTube", href: "#", icon: Youtube },
    { name: "LinkedIn", href: "#", icon: Linkedin },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex lg:flex-1 pb-4">
              <Link to="/" className="flex items-center gap-3">
                <img
                  src="/logo2.jpeg"
                  alt="Finetuned Metal Craft Logo"
                  className="h-[10vh] w-auto object-contain shrink-0 rounded-sm"
                />
                <div>
                  <p className="text-lg font-bold leading-tight">
                    ASDE LaserCuttings
                  </p>
                </div>
              </Link>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
              Premium CNC laser cutting with the finishing others skip.
              Delivering excellence in metal fabrication across India.
            </p>
            <div className="flex gap-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold hover:text-accent-foreground transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-gold mb-4 uppercase tracking-wider">
              Products
            </h3>
            <ul className="space-y-3">
              {navigation.products.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-primary-foreground/80 hover:text-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gold mb-4 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-primary-foreground/80 hover:text-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gold mb-4 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-primary-foreground/80">+91 93033 11384</p>
                  <p className="text-primary-foreground/80">+91 98066 80879</p>
                  <p className="text-primary-foreground/60 text-xs">Mon-Sat: 9AM - 7PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <a
                  href="mailto:contact@asdelasercuttings.com"
                  className="text-sm text-primary-foreground/80 hover:text-gold transition-colors"
                >
                  contact@asdelasercuttings.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <p className="text-sm text-primary-foreground/80">
                  Satna, Madhya Pradesh<br />
                  485001, India
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} Agrawal & Son Daughter Enterprises. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/60">
              Made with precision in Satna, MP 🇮🇳
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
