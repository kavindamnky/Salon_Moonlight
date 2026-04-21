import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = ["Home", "Services", "Gallery", "About", "Book Now", "Contact"];
  const services = ["Hair Styling", "Nail Artistry", "Makeup", "Skincare", "Bridal"];

  return (
    <footer className="bg-charcoal py-12 sm:py-16">
      <div className="container-luxury px-6 pr-10 sm:px-10 sm:pr-16 lg:px-16 lg:pr-24 mx-auto max-w-7xl">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 gap-6 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand — full width on mobile, spans 2 cols on lg */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2 overflow-hidden">
            <div className="mb-5 flex items-center">
              <img
                src="https://res.cloudinary.com/df5ahm9sm/image/upload/v1768989887/logo_moonlightlong_izcp91.png"
                alt="Moonlight Salon"
                className="h-10 w-auto sm:h-12 md:h-14 max-w-full"
                style={{ display: "block", minWidth: "120px", maxWidth: "200px" }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              {/* Fallback text logo if image fails */}
              <div
                style={{ display: "none" }}
                className="items-center gap-2"
              >
                <span className="font-serif text-xl font-bold tracking-widest text-gold sm:text-2xl">
                  MOONLIGHT
                </span>
                <span className="text-xs tracking-wider text-cream/50">
                  SALON
                </span>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-cream/70 sm:text-base">
              Where elegance meets beauty. Experience luxury beauty services
              that illuminate your natural radiance and leave you feeling
              absolutely radiant.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="mb-5 font-serif text-base font-semibold tracking-wide text-cream sm:text-lg">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
                    className="text-sm text-cream/70 transition-colors duration-200 hover:text-gold sm:text-base"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="mb-5 font-serif text-base font-semibold tracking-wide text-cream sm:text-lg">
              Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm text-cream/70 transition-colors duration-200 hover:text-gold sm:text-base"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-cream/10 sm:my-12" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-cream/50 sm:text-sm">
            © {currentYear}{" "}
            <a
              href="#"
              className="transition-colors duration-200 hover:text-sky-300"
            >
              {" "}Vikum Kavinda Narangoda.{" "}
            </a>
            All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-cream/50 sm:justify-end sm:gap-6 sm:text-sm">
            <a href="#" className="transition-colors duration-200 hover:text-gold">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors duration-200 hover:text-gold">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
