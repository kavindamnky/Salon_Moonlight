import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ExternalLink, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

// Configuration - Replace with your actual Google Places API key and Place ID
const GOOGLE_API_KEY = "YOUR_GOOGLE_PLACES_API_KEY";
const PLACE_ID = "YOUR_PLACE_ID";
const USE_GOOGLE_API = false; // Set to true when you have valid API credentials
const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds per slide
const REVIEWS_PER_SLIDE = 3; // Number of reviews to show at once

// Custom reviews - Edit these with your actual reviews
const CUSTOM_REVIEWS = [
  {
    author_name: "Natasha Madurapperuma",
    rating: 4.9,
    text: "Asha did my acrylic nails beautifully. She chose the cat-eye design for me, and it was done perfectly. Very nice customer service, and the place is highly recommended. The vibe and location are really nice.Pavani did my pedicure and nail shaping perfectly. She did my nails so nicely very happy with the service. Highly recommended 😊",
    time: Date.now() / 1000 - 86400 * 7,
    profile_photo_url: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=eab308&color=000&size=128",
    location: "Maharagama, SriLanka",
    source: "custom"
  },
  {
    author_name: "Tharusha Madushan",
    rating: 5,
    text: "Highly appreciate your service! 💅 I got a pedicure done at Moonlight Salon by tharindu, and he did an amazing job. Very professional, friendly, and perfect with his work. I’m really happy with the result — highly recommend this salon! ❤️✨Also, a special thank you to Sayuri for recommending this place to me — truly appreciate it! 🙏💖",
    time: Date.now() / 1000 - 86400 * 14,
    profile_photo_url: "https://ui-avatars.com/api/?name=Michael+Chen&background=eab308&color=000&size=128",
    location: "Los Angeles, America",
    source: "custom"
  },
  {
    author_name: "Taneesha Shahani Madurapperuma",
    rating: 5,
    text: "I visited Moon Light Unisex Salon for my bridal nails and pedicure, and it was a wonderful experience. Asha and Pawani were very friendly, provided excellent service, and did amazingly creative nail work. I highly recommend this salon ❤️❤️",
    time: Date.now() / 1000 - 86400 * 21,
    profile_photo_url: "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=eab308&color=000&size=128",
    location: "Miami, America",
    source: "custom"
  },
  {
    author_name: "Krisanthi Vitharana",
    rating: 5,
    text: "🌙✨ I recently visited Moon Light and I’m beyond impressed! The staff, especially Sayuri and Sameera, took their service to the next level with so much care and professionalism. The salon itself is so attractive, calm, and quiet — the perfect environment to relax. I’m really happy with the experience and have decided to choose Moon Light as my new beauty culture partner. 💇‍♀️💅🏾 Well done Sayuri & the team ! keep it up and fly high! 🌟",
    time: Date.now() / 1000 - 86400 * 30,
    profile_photo_url: "https://ui-avatars.com/api/?name=David+Thompson&background=eab308&color=000&size=128",
    location: "Chicago, America",
    source: "custom"
  },
  {
    author_name: "Sudara Chathuranga",
    rating: 5,
    text: "I absolutely love this salon! From the warm welcome to the final look, everything was perfect. The staff really listened to what I wanted feel so comfortable.",
    time: Date.now() / 1000 - 86400 * 45,
    profile_photo_url: "https://ui-avatars.com/api/?name=Jessica+Williams&background=eab308&color=000&size=128",
    location: "Boston, America",
    source: "custom"
  },
  {
    author_name: "Dilumi Punsala Amarasinghe",
    rating: 5,
    text: "Absolutely loved my nails which is done by MOONLIGHT ! They were done beautifully with so much care and attention to detail. The customer service was superb✨friendly, professional, and made me feel really comfortable. Highly recommended👍",
    time: Date.now() / 1000 - 86400 * 60,
    profile_photo_url: "https://ui-avatars.com/api/?name=Robert+Martinez&background=eab308&color=000&size=128",
    location: "Dallas, America",
    source: "custom"
  }
];

// Custom place details
const CUSTOM_PLACE_DETAILS = {
  name: "Our Business",
  rating: 5.0,
  totalReviews: CUSTOM_REVIEWS.length,
  googleUrl: null
};

const GoogleReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [placeDetails, setPlaceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [reviewSource, setReviewSource] = useState("loading");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const autoSlideRef = useRef(null);

  const totalSlides = Math.ceil(reviews.length / REVIEWS_PER_SLIDE);

  useEffect(() => {
    if (USE_GOOGLE_API && GOOGLE_API_KEY !== "YOUR_GOOGLE_PLACES_API_KEY" && PLACE_ID !== "YOUR_PLACE_ID") {
      fetchGoogleReviews();
    } else {
      loadCustomReviews();
    }
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (isAutoPlaying && !isPaused && reviews.length > 0) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, AUTO_SLIDE_INTERVAL);
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [isAutoPlaying, isPaused, reviews.length, totalSlides]);

  const loadCustomReviews = () => {
    setTimeout(() => {
      setReviews(CUSTOM_REVIEWS);
      setPlaceDetails(CUSTOM_PLACE_DETAILS);
      setReviewSource("custom");
      setLoading(false);
    }, 300);
  };

  const fetchGoogleReviews = async () => {
    try {
      setLoading(true);

      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
        script.async = true;
        document.head.appendChild(script);

        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          setTimeout(() => reject(new Error("Script load timeout")), 10000);
        });
      }

      const mapDiv = document.createElement("div");
      const map = new window.google.maps.Map(mapDiv);
      const service = new window.google.maps.places.PlacesService(map);

      const request = {
        placeId: PLACE_ID,
        fields: ["name", "rating", "reviews", "user_ratings_total", "url"],
      };

      service.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaceDetails({
            name: place.name,
            rating: place.rating,
            totalReviews: place.user_ratings_total,
            googleUrl: place.url,
          });

          const sortedReviews = (place.reviews || [])
            .map(review => ({ ...review, source: "google" }))
            .sort((a, b) => b.rating - a.rating || b.time - a.time)
            .slice(0, 12);

          setReviews(sortedReviews);
          setReviewSource("google");
          setLoading(false);
        } else {
          console.warn("Google Places API failed, using custom reviews");
          loadCustomReviews();
        }
      });
    } catch (err) {
      console.error("Google Reviews Error:", err);
      loadCustomReviews();
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  if (loading) {
    return (
      <section className="section-padding bg-black">
        <div className="container-luxury">
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  const getCurrentReviews = () => {
    const start = currentSlide * REVIEWS_PER_SLIDE;
    return reviews.slice(start, start + REVIEWS_PER_SLIDE);
  };

  return (
    <section id="reviews" className="section-padding bg-black relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,179,8,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(234,179,8,0.05),transparent_50%)]"></div>

      <div className="container-luxury relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm tracking-[0.3em] text-yellow-500">
            TESTIMONIALS
          </span>
          <h2 className="mb-6 font-serif text-4xl font-semibold text-white md:text-5xl">
            What Our Clients Say
          </h2>
          <div className="luxury-divider mx-auto w-24 bg-gradient-to-r from-transparent via-yellow-500 to-transparent h-px" />

          {placeDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-5xl font-bold text-yellow-500">
                  {placeDetails.rating.toFixed(1)}
                </span>
                <div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.round(placeDetails.rating)
                            ? "fill-yellow-500 text-yellow-500"
                            : "fill-zinc-800 text-zinc-800"
                          }`}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-gray-400">
                    Based on {placeDetails.totalReviews} reviews
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Reviews Grid */}
        {reviews.length > 0 && (
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-yellow-500/30 bg-black text-yellow-500 transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black hover:shadow-lg hover:shadow-yellow-500/50 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous reviews"
              disabled={totalSlides <= 1}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-yellow-500/30 bg-black text-yellow-500 transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black hover:shadow-lg hover:shadow-yellow-500/50 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next reviews"
              disabled={totalSlides <= 1}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Reviews Cards */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {getCurrentReviews().map((review, index) => (
                <motion.div
                  key={`${currentSlide}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-zinc-900 border border-yellow-500/20 rounded-2xl p-8 shadow-2xl shadow-yellow-500/10 hover:shadow-yellow-500/20 transition-all duration-300 relative"
                >
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-7xl text-yellow-500/20 font-serif leading-none">
                    "
                  </div>

                  {/* Review Text */}
                  <div className="relative z-10 mb-6">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {review.text}
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 pt-6 border-t border-yellow-500/10">
                    <img
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      className="h-12 w-12 rounded-full object-cover border-2 border-yellow-500/30"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          review.author_name
                        )}&background=eab308&color=000&size=128`;
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-yellow-500 text-sm">
                        {review.author_name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {review.location || "Verified Customer"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Dots Indicator */}
            {totalSlides > 1 && (
              <div className="flex items-center justify-center gap-3 mt-12">
                {[...Array(totalSlides)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                        ? "w-8 bg-yellow-500"
                        : "w-2.5 bg-yellow-500/30 hover:bg-yellow-500/60"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}

                {/* Auto-play toggle */}
                {/* <button
                  onClick={toggleAutoPlay}
                  className="ml-4 flex h-8 w-8 items-center justify-center rounded-full border border-yellow-500/30 bg-black text-yellow-500 transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black"
                  aria-label={isAutoPlaying ? "Pause autoplay" : "Play autoplay"}
                >
                  {isAutoPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </button> */}
              </div>
            )}
          </div>
        )}

        {/* Reviews Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          {reviewSource === "google" && placeDetails?.googleUrl ? (
            <a
              href={placeDetails.googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-zinc-900 border border-yellow-500/20 px-6 py-3 text-sm font-medium text-gray-300 transition-all duration-300 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/20"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Verified Google Reviews</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : (
            <div className="flex items-center gap-3 rounded-full bg-zinc-900 border border-yellow-500/20 px-6 py-3">
              <Star className="h-6 w-6 fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-medium text-gray-300">
                Verified Customer Reviews
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;