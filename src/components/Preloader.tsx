import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-black-80 via-yellow-50 to-amber-50"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Logo with Loading Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1, 1.05, 1],
                opacity: [0, 1, 1, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="relative"
            >
              {/* Glow effect */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 blur-xl bg-amber-500/20 rounded-full"
              />
              
              <img 
                src="https://res.cloudinary.com/df5ahm9sm/image/upload/v1768990002/color_enhance_qfv2ke.png" 
                alt="Moonlight Salon" 
                className="relative h-40 w-auto md:h-48"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;