import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CartIcon } from "@/components/shop/CartIcon";

const whatWeMake = [
  { name: "Overview", href: "/products" },
  { name: "Metal Railings", href: "/products/railings" },
  { name: "Elevation & Cladding", href: "/products/elevation" },
  { name: "Name Plates & Signage", href: "/products/nameplates" },
  { name: "Gates & Grills", href: "/products/gates" },
  { name: "Room Dividers", href: "/products/dividers" },
  { name: "Custom Laser Cutting", href: "/products/custom" },
];

const yourProject = [
  { name: "Get Started", href: "/your-project" },
  { name: "Request a Quote", href: "/contact" },
  { name: "Materials Guide", href: "/your-project#materials" },
  { name: "Patterns & Finishes", href: "/your-project#patterns" },
];

const navigation = [
  { name: "What We Make", href: "/products", hasDropdown: true, items: whatWeMake },
  { name: "Shop", href: "/shop" },
  { name: "Your Project", href: "/your-project", hasDropdown: true, items: yourProject },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo3.png"
                alt="Finetuned Metal Craft Logo"
                className="h-[10vh] w-auto object-contain shrink-0"
              />
              <div className="hidden sm:block">
                <p className="text-lg font-bold text-foreground leading-tight">
                  ASDE LaserCuttings
                </p>
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-muted",
                    isActive(item.href) ? "text-gold" : "text-foreground hover:text-gold"
                  )}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                </Link>

                {/* Dropdown */}
                {item.hasDropdown && openDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-card rounded-lg shadow-xl border border-border py-2 min-w-[220px]">
                      {item.items?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className={cn(
                            "block px-4 py-2.5 text-sm transition-colors hover:bg-muted",
                            location.pathname === subItem.href
                              ? "text-gold bg-gold/5"
                              : "text-foreground"
                          )}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-3">
            <CartIcon />
            <Button variant="gold" size="default" asChild>
              <Link to="/contact">
                <Phone className="h-4 w-4" />
                Get Quote
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-[600px] pb-6" : "max-h-0"
          )}
        >
          <div className="space-y-1 pt-4">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.name ? null : item.name)
                      }
                      className={cn(
                        "w-full flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        isActive(item.href)
                          ? "bg-gold/10 text-gold"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {item.name}
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform",
                          openDropdown === item.name && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-200",
                        openDropdown === item.name ? "max-h-96" : "max-h-0"
                      )}
                    >
                      <div className="pl-4 py-2 space-y-1">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "block rounded-lg px-4 py-2.5 text-sm transition-colors",
                              location.pathname === subItem.href
                                ? "bg-gold/10 text-gold"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-gold/10 text-gold"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Button variant="gold" size="lg" className="w-full" asChild>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Phone className="h-4 w-4" />
                  Get Free Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
