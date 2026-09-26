import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { ServicesPreview } from '../components/sections/ServicesPreview';
import { FAQ } from '../components/sections/FAQ';
import { AppointmentSection } from '../components/sections/AppointmentSection';

export function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <WhyChooseUs />
        <ServicesPreview />
        <AppointmentSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
