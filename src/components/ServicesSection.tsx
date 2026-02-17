import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import serviceHair from "@/assets/service-hair.jpg";
import serviceNails from "@/assets/service-nails.jpg";
import serviceMakeup from "@/assets/service-makeup.jpg";
import serviceSkincare from "@/assets/service-skincare.jpg";
import serviceBridal from "@/assets/service-bridal.jpg";
import serviceFacial from "@/assets/service-facial.jpg";
// Add your new service image import here
// import serviceSpa from "@/assets/service-spa.jpg";

const services = [
  {
    title: "Hair Treatments",
    description: "Expert cuts, colors, Threading and treatments for your perfect look",
    image: serviceHair,
    price: "From rs.1,500",
  },
    {
    title: "Facial",
    description: "Rejuvenating facials and premium skin treatments",
    image: serviceFacial,
    price: "From rs.5,000",
  },
  {
    title: "Nail Artistry",
    description: "Luxury manicures, pedicures, and custom nail designs",
    image: serviceNails,
    price: "From rs.1,000",
  },
  // {
  //   title: "Makeup",
  //   description: "Professional makeup for every occasion",
  //   image: serviceMakeup,
  //   price: "From $120",
  // },
  // {
  //   title: "Skincare",
  //   description: "Rejuvenating facials and premium skin treatments",
  //   image: serviceSkincare,
  //   price: "From $95",
  // },
  {
    title: "Dressing",
    description: "Personalized styling and wardrobe consultations to elevate your fashion game",
    image: serviceBridal,
    price: "From rs.2,000",
  },
  {
    title: "Manicure/Pedicure",
    description: "Luxurious nail care and pampering for your hands and feet-",
    image: serviceSkincare, // Replace with serviceSpa when you add the image
    price: "From rs.1,500",
  },
];

const ServiceCard = ({ service }: { service: typeof services[0] }) => {
  return (
    <div className="group relative flex-shrink-0 overflow-hidden rounded-2xl bg-card gold-glow-hover w-[280px] sm:w-[320px]">
      
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
        
        {/* Gold border glow on hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-gold/50" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-serif text-xl font-semibold text-card-foreground md:text-2xl" style={{ color: 'white' }}>
            {service.title}
          </h3>
          <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-gold backdrop-blur-sm">
            {service.price}
          </span>
        </div>
        <p className="text-sm text-card-foreground/80" style={{ color: 'rgba(255,255,255,0.8)' }}>
          {service.description}
        </p>
        
        {/* Hover Arrow */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="mt-4 flex items-center gap-2 text-gold opacity-0 transition-opacity group-hover:opacity-100"
        >
          <span className="text-sm font-medium">Learn More</span>
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate services for seamless loop
  const duplicatedServices = [...services, ...services, ...services];

  return (
    <section id="services" className="bg-black section-padding overflow-hidden">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm tracking-[0.3em] text-gold">
            OUR EXPERTISE
          </span>
          <h2 className="mb-6 font-serif text-4xl font-semibold text-white md:text-5xl">
            Luxury Services
          </h2>
          <div className="luxury-divider mx-auto w-24" />
          <p className="mx-auto mt-6 max-w-2xl text-amber-50 opacity-50">
            Discover our curated collection of premium beauty services, 
            each designed to enhance your natural beauty and leave you feeling radiant.
          </p>
        </motion.div>

        {/* Services Slider - Right to Left */}
        <div 
          className="relative -mx-4 sm:-mx-6 lg:-mx-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-6"
            animate={{
              x: isPaused ? undefined : [0, -((280 + 24) * services.length)],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {duplicatedServices.map((service, index) => (
              <ServiceCard key={`${service.title}-${index}`} service={service} />
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a 
            href="#booking" 
            className=" group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gold px-8 py-4 font-medium text-charcoal transition-all duration-300 hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Services
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gold via-yellow-500 to-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;