import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const galleryImages = [
  { src: gallery1, alt: "Beautiful makeup result", span: "row-span-2" },
  { src: gallery2, alt: "Elegant bridal hairstyle", span: "col-span-2" },
  { src: gallery3, alt: "Gold eye makeup", span: "row-span-2" },
  { src: gallery4, alt: "Luxury nail art", span: "col-span-2" },
  { src: gallery5, alt: "Salon interior", span: "row-span-2" },
  { src: gallery6, alt: "Hair coloring result", span: "col-span-2" },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="bg-black section-padding bg-background">
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
            OUR PORTFOLIO
          </span>
          <h2 className="mb-6 font-serif text-4xl font-semibold text-white md:text-5xl">
            Beauty Gallery
          </h2>
          <div className="luxury-divider mx-auto w-24" />
          <p className="mx-auto mt-6 max-w-2xl text-amber-50 opacity-50">
            Explore our stunning collection of transformations and artistry.
            Each image tells a story of beauty, elegance, and expert craftsmanship.
          </p>
        </motion.div>
  
        {/* Masonry Grid */}
        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[250px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative cursor-pointer overflow-hidden rounded-xl ${image.span}`}
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-charcoal/0 transition-all duration-300 group-hover:bg-charcoal/40" />
              
              {/* Gold border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-300 group-hover:border-gold/50" />
              
              {/* View icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/90">
                  <svg
                    className="h-5 w-5 text-background"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold backdrop-blur-sm transition-colors hover:bg-gold hover:text-background"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </motion.button>
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={selectedImage}
              alt="Gallery image"
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-luxury"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
