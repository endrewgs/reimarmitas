import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { KitsSection } from '@/components/KitsSection';
import { HowItWorks } from '@/components/HowItWorks';
import { DeliveryInfo } from '@/components/DeliveryInfo';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProductGrid />
        <KitsSection />
        <HowItWorks />
        <DeliveryInfo />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
