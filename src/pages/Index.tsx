import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import BookingSection from "@/components/BookingSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";


const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Preloader />
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <AboutSection />
        <BookingSection />
        <GoogleReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
