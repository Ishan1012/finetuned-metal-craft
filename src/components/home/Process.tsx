import { PenTool, Crosshair, Sparkles, Package } from "lucide-react";

const steps = [
  {
    icon: PenTool,
    step: "01",
    title: "Design",
    description: "Share your requirements or design. Our team helps refine and optimize for laser cutting if needed.",
  },
  {
    icon: Crosshair,
    step: "02",
    title: "Precision Cutting",
    description: "State-of-the-art CNC laser cutting ensures accuracy within 0.1mm. Complex designs executed flawlessly.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Premium Finishing",
    description: "This is where we shine! Every piece undergoes smoothing, deburring, and quality inspection. No rough edges, no shortcuts.",
  },
  {
    icon: Package,
    step: "04",
    title: "Delivery",
    description: "Careful packaging and fast shipping across India. Your piece arrives installation-ready.",
  },
];

export function Process() {
  return (
    <section className="section-padding gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
            Our Process
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            How We Work
          </h2>
          <p className="text-lg text-primary-foreground/80">
            From concept to delivery, every step is crafted for perfection.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div
              key={item.title}
              className="relative"
            >
              {/* Connector line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-primary-foreground/20 -translate-x-1/2 z-0" />
              )}

              <div className="relative bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-8 border border-primary-foreground/10 hover:border-gold/50 transition-colors">
                {/* Step number */}
                <span className="absolute -top-4 -right-4 h-10 w-10 rounded-full gradient-gold flex items-center justify-center text-sm font-bold text-accent-foreground">
                  {item.step}
                </span>

                {/* Icon */}
                <div className="h-14 w-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center mb-6">
                  <item.icon className="h-7 w-7 text-gold" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-primary-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-primary-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
