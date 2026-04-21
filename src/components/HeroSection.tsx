import { motion } from "framer-motion";
import bgVideo from "@/assets/bg.mp4";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
            {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="container-luxury relative z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 text-center max-w-5xl mx-auto">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="mx-auto mb-8 h-px w-24 bg-amber-500"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
          className="mb-4 text-sm tracking-[0.3em] text-amber-500 md:text-base"
        >
          WHERE STYLE MEETS ELEGENCE
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
          className="mb-6 font-serif text-5xl font-semibold leading-tight text-white md:text-7xl lg:text-8xl"
        >
          Moonlight
          <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Salon
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.4 }}
          className="mx-auto mb-10 max-w-xl text-base text-slate-300 md:text-lg"
        >
          Experience the ultimate in luxury beauty care. Our expert artisans 
          craft personalized experiences that illuminate your natural radiance.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.6 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <a 
            href="#booking" 
            className="group bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3 rounded-full text-white font-medium hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-amber-500/50 transition-all"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book Your Glow
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
          </a>
          <a 
            href="#services" 
            className="border-2 border-amber-500 px-8 py-3 rounded-full text-amber-500 font-medium hover:bg-amber-500 hover:text-white transition-all"
          >
            Explore Services
          </a>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 3.8 }}
          className="mx-auto mt-12 h-px w-24 bg-amber-500"
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest text-slate-400">
            SCROLL
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-amber-500 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;