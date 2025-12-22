import { useState, useEffect } from 'react';
import { Home, Package, Star, ShoppingCart, Menu, X, ChevronDown, Check, Sparkles, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import logoImage from "figma:asset/818829501cedeb820f5ccbf0b91d00471cd30d00.png";
import productImage from "figma:asset/49783c90300998d3eed63fd1286720512a30a8a8.png";
import productImageWhite from "figma:asset/fd2bffc8e2d2d62513edbd2c304fa4749fb67358.png";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const features = [
    {
      icon: Home,
      title: 'Hygienisch & durchdacht',
      description: 'Hochwertige, waschbare Oxford 600D Taschen für maximale Hygiene. Bleibt stets frisch und geruchsfrei.'
    },
    {
      icon: Package,
      title: 'Flexible Mobilität',
      description: 'Mit Rollen ausgestattet – perfekt für den täglichen Gebrauch und beim Umzug. Leicht zu bewegen.'
    },
    {
      icon: Star,
      title: 'Ästhetischer Stauraum',
      description: 'Elegante Holzablage und Stahlrahmen – sieht aus wie ein hochwertiges Möbelstück für dein Zuhause.'
    }
  ];

  const benefits = [
    '4 abnehmbare Oxford 600D Taschen',
    '200 Liter Gesamtvolumen',
    'Stabile Holzablage oben',
    'Leichtgängige Rollen',
    'Robuster Stahlrahmen',
    'Perfekt sortiert: Black, White, Hot, Colored'
  ];

  const specs = [
    { label: 'Volumen', value: '200 Liter', icon: '📦' },
    { label: 'Fächer', value: '4 abnehmbare Taschen', icon: '🗂️' },
    { label: 'Material', value: 'Oxford 600D', icon: '🧵' },
    { label: 'Rahmen', value: 'Stabiler Stahlrahmen', icon: '🔩' },
    { label: 'Mobilität', value: 'Mit Rollen', icon: '🛞' },
    { label: 'Ablage', value: 'Holz-Ablagefläche', icon: '🪵' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <img src={logoImage} alt="WEISSHEIM" className="h-32 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('produkt')} className="text-gray-700 hover:text-gray-900 transition-colors">
                Produkt
              </button>
              <button onClick={() => scrollToSection('vorteile')} className="text-gray-700 hover:text-gray-900 transition-colors">
                Vorteile
              </button>
              <button onClick={() => scrollToSection('details')} className="text-gray-700 hover:text-gray-900 transition-colors">
                Details
              </button>
              <button onClick={() => scrollToSection('kontakt')} className="text-gray-700 hover:text-gray-900 transition-colors">
                Kontakt
              </button>
              <a 
                href="https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                Jetzt kaufen
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 border-t"
            >
              <div className="flex flex-col gap-4">
                <button onClick={() => scrollToSection('produkt')} className="text-gray-700 hover:text-gray-900 transition-colors text-left">
                  Produkt
                </button>
                <button onClick={() => scrollToSection('vorteile')} className="text-gray-700 hover:text-gray-900 transition-colors text-left">
                  Vorteile
                </button>
                <button onClick={() => scrollToSection('details')} className="text-gray-700 hover:text-gray-900 transition-colors text-left">
                  Details
                </button>
                <button onClick={() => scrollToSection('kontakt')} className="text-gray-700 hover:text-gray-900 transition-colors text-left">
                  Kontakt
                </button>
                <a 
                  href="https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 hover:shadow-lg transition-all text-center"
                >
                  Jetzt kaufen
                </a>
              </div>
            </motion.nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-44 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl mb-6 text-gray-900">
                Wäschesammler mit System
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Der WEISSHEIM Wäschesammler 4 Fächer – 200 L Volumen mit abnehmbaren Taschen. Wäschekorb 2 Fächer, Wäscheschrank, Wäschesortierer mit Rollen für flexible Mobilität.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Zu Amazon
                </motion.a>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('details')}
                  className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-xl hover:bg-gray-900 hover:text-white transition-all"
                >
                  Mehr erfahren
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img 
                src={productImage} 
                alt="WEISSHEIM Wäschesammler" 
                className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="vorteile" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4 text-gray-900">
              Warum WEISSHEIM?
            </h2>
            <p className="text-xl text-gray-600">
              Die perfekte Lösung für organisierte Wäscheverwaltung
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section id="details" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img 
                src={productImageWhite} 
                alt="WEISSHEIM Wäschesammler Weiße Variante" 
                className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-6xl mb-6 text-gray-900">
                WEISSHEIM Wäschesammler mit System
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Der WEISSHEIM Wäschesammler 4 Fächer mit großzügigem 200 L Volumen kombiniert intelligentes Sortier-System mit elegantem Design. Dank des smarten Haken-Systems und abnehmbaren Oxford 600D Taschen wird deine Wäscheverwaltung stressfrei und effizient.
              </p>

              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-white" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 hover:shadow-xl transition-all"
              >
                <ShoppingCart size={20} />
                Jetzt auf Amazon kaufen
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="produkt" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4 text-gray-900">
              Technische Details
            </h2>
            <p className="text-xl text-gray-600">
              Hochwertige Materialien und durchdachte Konstruktion
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specs.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-3">{spec.icon}</div>
                <p className="text-sm text-gray-500 mb-1">{spec.label}</p>
                <p className="text-xl text-gray-900">{spec.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Hast du Fragen? */}
      <section id="kontakt" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Mail size={40} className="text-gray-900" />
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl mb-6 text-gray-900">
              Hast du Fragen?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Wir sind für dich da. Kontaktiere uns gern bei Fragen zu unseren Produkten oder deiner Bestellung.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const form = document.getElementById('contact-form');
                if (form) {
                  form.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 hover:shadow-xl transition-all inline-flex items-center gap-2"
            >
              Kontakt aufnehmen
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl mb-8 text-center text-gray-900">Kontaktformular</h3>
            <form className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                  placeholder="Dein Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                  placeholder="deine@email.de"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm mb-2 text-gray-700">
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none"
                  placeholder="Deine Nachricht an uns..."
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 hover:shadow-xl transition-all"
              >
                Nachricht senden
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl mb-6 text-gray-900">
              Bereit für eine organisierte Wäscheverwaltung?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Bestellen Sie jetzt Ihren WEISSHEIM Wäschesammler und erleben Sie den Unterschied
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Jetzt auf Amazon kaufen
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <img src={logoImage} alt="WEISSHEIM" className="h-16 w-auto mb-4" />
              <p className="text-gray-600">
                Premium Wäschesammler & Wäschesortierer für mehr Ordnung.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-gray-900">Links</h3>
              <div className="flex flex-col gap-2">
                <button onClick={() => scrollToSection('produkt')} className="text-gray-600 hover:text-gray-900 transition-colors text-left">
                  Produkt
                </button>
                <button onClick={() => scrollToSection('vorteile')} className="text-gray-600 hover:text-gray-900 transition-colors text-left">
                  Vorteile
                </button>
                <button onClick={() => scrollToSection('details')} className="text-gray-600 hover:text-gray-900 transition-colors text-left">
                  Über uns
                </button>
                <button onClick={() => scrollToSection('kontakt')} className="text-gray-600 hover:text-gray-900 transition-colors text-left">
                  Kontakt
                </button>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-gray-900">Rechtliches</h3>
              <div className="flex flex-col gap-2">
                <a href="#impressum" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Impressum
                </a>
                <a href="#datenschutz" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Datenschutzerklärung
                </a>
                <a href="#agb" className="text-gray-600 hover:text-gray-900 transition-colors">
                  AGB / Hinweise
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t text-center text-gray-600">
            <p>© 2024 WEISSHEIM. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {scrolled && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-gray-900 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all z-40"
        >
          <ChevronDown size={24} className="rotate-180" />
        </motion.button>
      )}
    </div>
  );
}