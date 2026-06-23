import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CAROUSEL_IMAGES = ["/images/hero1.jpeg", "/images/img3.jpeg", "/images/img4.jpeg"];
const SLIDE_DURATION = 3000;

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_IMAGES.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden py-7">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIndex}
            src={CAROUSEL_IMAGES[currentIndex]}
            alt="CNC laser cutting machine background"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }} // Smooth fade + slight zoom effect
            className="w-full h-full object-cover absolute inset-0"
          />
        </AnimatePresence>
        
        {/* Dark Gradient Overlay (Maintains high text legibility) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(240_15%_13%_/_0.95)] via-[hsl(240_15%_13%_/_0.85)] to-[hsl(240_15%_13%_/_0.6)] z-10" />
      </div>

      {/* Decorative radial blur elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl z-10" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-2xl z-10" />

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 text-gold mb-8"
          >
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            <span className="text-sm font-medium">Based in Satna, Madhya Pradesh</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
          >
            Precision CNC Laser Cutting with{" "}
            <span className="text-gradient-gold">Superior Finishing</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl"
          >
            Creating architectural metal solutions for modern homes, offices, and 
            commercial spaces across India. Every edge smoothed, every piece perfection-tested.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/shop">
                Visit Shop
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/gallery">
                <Eye className="h-5 w-5" />
                View Our Work
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 pt-12 border-t border-primary-foreground/10"
          >
            {[
              { value: "50K+", label: "Happy Customers" },
              { value: "5Lakh+", label: "Sqft of Metal finished" },
              { value: "5+", label: "Years Experience" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <p className="text-3xl sm:text-4xl font-bold text-gold">{stat.value}</p>
                <p className="text-sm text-primary-foreground/60 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}