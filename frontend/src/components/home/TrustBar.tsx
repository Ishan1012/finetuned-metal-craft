import { CheckCircle2, Truck, Shield, Sparkles } from "lucide-react";

const trustItems = [
  { icon: CheckCircle2, text: "50K+ Happy Customers" },
  { icon: Truck, text: "All India Delivery" },
  { icon: Shield, text: "1 Year Warranty" },
  { icon: Sparkles, text: "Premium Finishing Guaranteed" },
];

export function TrustBar() {
  return (
    <section className="bg-secondary py-10 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {trustItems.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 text-foreground"
            >
              <item.icon className="h-5 w-5 text-gold" />
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
