import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    stepNumber: "01",
    title: "Send Your Detailed Enquiry",
    description:
      "Please send us a detailed inquiry and drawing. Include specifics such as size, layout, dimensions, color, material, and finish that you want for your project.",
  },
  {
    stepNumber: "02",
    title: "Get A Quotation",
    description:
      "We will quote for you within 24 hours ! We have 400+ sale teams in designing and manufacturing for you .",
  },
  {
    stepNumber: "03",
    title: "Design for Free",
    description:
      "After sending us your design and specifics, our sales team and engineers will offer 2-3 product solutions depending on your design and budget, subject to final approval.",
  },
  {
    stepNumber: "04",
    title: "Custom & Manufacturing",
    description:
      "As soon as you approves, a contract shall be signed. From here, the customization and manufacturing process begin.And our sales people would send you pictures of the production process and the finished product.",
  },
  {
    stepNumber: "05",
    title: "Shipping & Delivery",
    description:
      "When your order completed and was packed, we would organize to load containers and shipping to your port .Even delivery to your warehouse.",
  },
];

export function Process() {
  return (
    <section className="py-20 lg:py-28 bg-[#faf9f6] text-neutral-900 overflow-hidden border-y border-neutral-200/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 text-center tracking-tight mb-14 lg:mb-20">
          Our One-Stop Service Ordering Process
        </h2>

        {/* Desktop View: Horizontal Connected Timeline (5 Columns) */}
        <div className="hidden lg:block">
          {/* Timeline Bar & Nodes */}
          <div className="relative mb-8">
            {/* Continuous horizontal amber line connecting center of node 1 to node 5 */}
            <div
              className="absolute top-1/2 left-[10%] right-[10%] h-[3px] bg-[#E4A143] -translate-y-1/2 z-0"
              aria-hidden="true"
            />

            {/* 5 Indicator Nodes */}
            <div className="grid grid-cols-5 relative z-10">
              {steps.map((_, idx) => (
                <div key={idx} className="flex justify-center items-center">
                  <div className="w-6 h-6 rounded-full border-[2.5px] border-[#E4A143] bg-white flex items-center justify-center shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#E4A143]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5 Columns with Titles and Descriptions */}
          <div className="grid grid-cols-5 gap-6 xl:gap-8 text-center">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center px-1">
                <h3 className="text-lg xl:text-xl font-bold text-neutral-900 mb-4 min-h-[56px] flex items-center justify-center leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet View: Vertical Connected Timeline */}
        <div className="lg:hidden max-w-xl mx-auto space-y-8 relative pl-6 sm:pl-8">
          {/* Vertical connecting line */}
          <div
            className="absolute top-4 bottom-4 left-[23px] sm:left-[27px] w-[3px] bg-[#E4A143] -translate-x-1/2"
            aria-hidden="true"
          />

          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-4 sm:gap-6">
              {/* Node */}
              <div className="shrink-0 w-6 h-6 rounded-full border-[2.5px] border-[#E4A143] bg-white flex items-center justify-center shadow-sm relative z-10 mt-1">
                <div className="w-2 h-2 rounded-full bg-[#E4A143]" />
              </div>

              {/* Text */}
              <div className="flex-1 pb-2">
                <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button: Get Quotation */}
        <div className="flex justify-center mt-14 sm:mt-18">
          <Button
            asChild
            className="bg-[#212121] hover:bg-neutral-800 text-white font-medium px-8 py-6 rounded-md shadow-md flex items-center gap-2.5 text-base transition-all duration-200"
          >
            <Link to="/your-project#quote">
              <span>Get Quotation</span>
              <Mail className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
