import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Introduction } from "@/components/home/Introduction";
import { ValueProposition } from "@/components/home/ValueProposition";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { OurStory } from "@/components/home/OurStory";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { MaterialsPreview } from "@/components/home/MaterialsPreview";
import { CTA } from "@/components/home/CTA";

const Index = () => {
  return (
    <Layout>
      <Hero />
      {/* <TrustBar /> */}
      <Introduction />
      <ValueProposition />
      <ProductShowcase />
      <OurStory />
      <Process />
      <Testimonials />
      <MaterialsPreview />
      <CTA />
    </Layout>
  );
};

export default Index;
