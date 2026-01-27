import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "About", href: "#about" },
  { name: "Book Now", href: "#booking" },
  { name: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 2.5 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? " bg-black shadow-soft backdrop-blur-lg"
            : "bg-transparen"
        }`}
      >
        <div className="container-luxury flex items-center justify-between px-4 py-4 md:px-8 md:py-6">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">

          <a href="#home" className="flex items-center">
            <img 
              src="https://res.cloudinary.com/df5ahm9sm/image/upload/v1768989887/logo_moonlightlong_izcp91.png" 
              alt="Moonlight Salon" 
              className="h-12 w-auto md:h-14"
            />
          </a>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isScrolled 
                    ? "text-white hover:text-gold" 
                    : "text-amber-50 hover:text-gold"
                } ${
                  link.name === "Book Now"
                    ? "btn-luxury px-6 py-2 text-xs"
                    : ""
                }`}
              >
                {link.name !== "Book Now" && (
                  <>
                    {link.name}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 hover:w-full" />
                  </>
                )}
                {link.name === "Book Now" && <span className="relative z-10">{link.name}</span>}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 lg:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-gold" />
            ) : (
              <Menu className="h-5 w-5 text-gold" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-background lg:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-serif text-2xl tracking-wide ${
                    link.name === "Book Now"
                      ? "btn-luxury mt-4 px-8 py-3"
                      : "text-foreground transition-colors hover:text-gold"
                  }`}
                >
                  {link.name === "Book Now" ? (
                    <span className="relative z-10">{link.name}</span>
                  ) : (
                    link.name
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;