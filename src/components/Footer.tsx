import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal py-16">
      <div className="container-luxury">
        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">

              <img
                src="https://res.cloudinary.com/df5ahm9sm/image/upload/v1768989887/logo_moonlightlong_izcp91.png"
                alt="Moonlight Salon"
                className="h-12 w-auto md:h-14"
              />


            </div>
            <p className="max-w-sm text-cream/70 leading-relaxed">
              Where elegance meets beauty. Experience luxury beauty services
              that illuminate your natural radiance and leave you feeling
              absolutely radiant.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-semibold text-cream">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Home", "Services", "Gallery", "About", "Book Now", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="text-cream/70 transition-colors hover:text-gold"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-semibold text-cream">
              Services
            </h3>
            <ul className="space-y-3">
              {["Hair Styling", "Nail Artistry", "Makeup", "Skincare", "Bridal"].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-cream/70 transition-colors hover:text-gold"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px w-full bg-cream/10" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-cream/50">
            © {currentYear}
              <a href="#" className="transition-colors hover:text-sky-300">
                  VikumKavindaNarangoda.
              </a>
            All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-cream/50">
            <a href="#" className="transition-colors hover:text-gold">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-gold">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
