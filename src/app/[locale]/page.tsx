import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Services from '@/components/Services';
import HowItWorks from '@/components/HowItWorks';
import Calculator from '@/components/Calculator';
import Stats from '@/components/Stats';
import PropertyTypes from '@/components/PropertyTypes';
import BeforeAfter from '@/components/BeforeAfter';
import WhyUs from '@/components/WhyUs';
import Process from '@/components/Process';
import Areas from '@/components/Areas';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <HowItWorks />
      <Calculator />
      <PropertyTypes />
      <Stats />
      <BeforeAfter />
      <WhyUs />
      <Process />
      <Areas />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
