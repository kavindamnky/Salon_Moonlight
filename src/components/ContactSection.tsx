import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["110/9 Mahamegawaththa place, Maharagama", "Sri Lanka"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+94 78 617 3173", "+94 71 150 5214"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@moonlightsalon.com", "bookings@moonlightsalon.com"],
  },
  {
    icon: Clock,
    title: "Opening Hours",
    details: ["Mon - Sat: 08:00 AM - 10:00 PM", "Sunday: 09:00 AM - 10:00 PM"],
  },
];

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/moonlight_salon_lk/", label: "Instagram" },
  
  { icon: Facebook, href: "https://www.facebook.com/moonlightsalonlk", label: "Facebook" },
];

const ContactSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding bg-black">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm tracking-[0.3em] text-yellow-500">
            GET IN TOUCH
          </span>
          <h2 className="mb-6 font-serif text-4xl font-semibold text-white md:text-5xl">
            Contact Us
          </h2>
          <div className="luxury-divider mx-auto w-24 bg-gradient-to-r from-transparent via-yellow-500 to-transparent h-px" />
          <p className="mx-auto mt-6 max-w-2xl text-amber-50 opacity-50">
            We'd love to hear from you. Reach out to us through any of the 
            channels below or visit our salon for a personalized consultation.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 text-center bg-zinc-900 border border-yellow-500/20 rounded-lg hover:border-yellow-500/60 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/30">
                <item.icon className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="mb-3 font-serif text-lg font-semibold text-yellow-500">
                {item.title}
              </h3>
              {item.details.map((detail, i) => (
                <p key={i} className="text-sm text-gray-300">
                  {detail}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-sm tracking-widest text-gray-400">
            FOLLOW US
          </p>
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-500/30 text-yellow-500 transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black hover:shadow-lg hover:shadow-yellow-500/50"
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
            {/* WhatsApp */}
            <a
              href="https://wa.me/+94786173173"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-500/30 text-yellow-500 transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black hover:shadow-lg hover:shadow-yellow-500/50"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;