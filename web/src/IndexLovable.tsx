import { useState } from "react";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import Features from "./components/sections/Features";
import ProductSection from "./components/sections/ProductSection";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import CTASection from "./components/sections/CTASection";
import Footer from "./components/sections/Footer";
import ScrollToTop from "./components/sections/ScrollToTop";
import ContactForm from "./components/ContactForm";

const Index = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const openContact = () => setContactFormOpen(true);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onContactOpen={openContact} />
      <Hero />
      <Features />
      <ProductSection />
      <AboutSection />
      <ContactSection onContactOpen={openContact} />
      <CTASection />
      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
      <ScrollToTop />
      <Footer onContactOpen={openContact} />
    </div>
  );
};

export default Index;
