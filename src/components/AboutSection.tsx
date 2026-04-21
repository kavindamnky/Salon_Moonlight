import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { number: 2, suffix: "+", label: "Years Experience" },
  { number: 5000, suffix: "+", label: "Happy Clients", prefix: "" },
  { number: 10, suffix: "", label: "Expert Artists" },
  { number: 1, suffix: "+", label: "Beauty Awards" },
];

// Counter animation hook
const useCountAnimation = (end: number, duration: number = 2000, isInView: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);

  return count;
};

const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountAnimation(stat.number, 2000, isInView);

  // Format large numbers (e.g., 5000 -> 5K)
  const formatNumber = (num: number) => {
    if (stat.number >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "K";
    }
    return num.toString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-charcoal/80 backdrop-blur-sm p-8 text-center border border-gold/20 hover:border-gold/50 transition-all duration-500"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <span className="font-serif text-4xl font-bold text-gold md:text-5xl block">
          {stat.prefix}{formatNumber(count)}{stat.suffix}
        </span>
        <p className="mt-3 text-sm text-amber-50/70 tracking-wider uppercase">
          {stat.label}
        </p>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 h-20 w-20 bg-gold/5 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />
    </motion.div>
  );
};

const AboutSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
      
      <div className="container-luxury relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Content */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block text-sm tracking-[0.3em] text-gold">
              OUR STORY
            </span>
            <h2 className="mb-6 font-serif text-4xl font-semibold text-white md:text-5xl">
              Where Beauty
              <span className="block text-gold-gradient">Becomes Art</span>
            </h2>
            <div className="luxury-divider w-24 mb-8" />
            
            <div className="space-y-6 text-amber-50 opacity-50">
              <p className="text-lg leading-relaxed">
                Founded in 2025, Moonlight Salon emerged from a vision to create 
                a sanctuary where beauty and tranquility intertwine. Our name draws 
                inspiration from the gentle, transformative glow of moonlight—soft 
                yet powerful, illuminating natural beauty.
              </p>
              <p className="leading-relaxed">
                Every treatment at Moonlight is a curated experience, blending 
                traditional techniques with modern innovation. Our team of 
                internationally trained artists brings decades of combined 
                expertise to every service.
              </p>
              <p className="leading-relaxed">
                We believe in sustainable luxury—using premium, ethically-sourced 
                products that deliver exceptional results while caring for our planet.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-12 bg-gold" />
              <div>
                <p className="font-serif text-lg text-gold">Sandhunika Pabasarani</p>
                <p className="text-sm text-gold opacity-50 ">Founder & Creative Director</p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;