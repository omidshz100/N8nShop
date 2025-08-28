import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Steps } from '@/components/Steps';
import { Catalog } from '@/components/Catalog';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
  <Hero />
  <Catalog />
  <Steps />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}