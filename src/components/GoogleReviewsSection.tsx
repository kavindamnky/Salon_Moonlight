import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

// Configuration - Replace with your actual Google Places API key and Place ID
const GOOGLE_API_KEY = "YOUR_GOOGLE_PLACES_API_KEY";
const PLACE_ID = "YOUR_PLACE_ID";

const GoogleReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [placeDetails, setPlaceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    fetchGoogleReviews();
  }, []);

  const fetchGoogleReviews = async () => {
    try {
      setLoading(true);
      
      // Load Google Maps API
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
        script.async = true;
        document.head.appendChild(script);
        
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
      }

      // Create a map element (required by Places API)
      const mapDiv = document.createElement("div");
      const map = new window.google.maps.Map(mapDiv);

      // Create PlacesService
      const service = new window.google.maps.places.PlacesService(map);

      // Request place details
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
          
          // Sort reviews by rating and time
          const sortedReviews = (place.reviews || [])
            .sort((a, b) => b.rating - a.rating || b.time - a.time)
            .slice(0, 10); // Get top 10 reviews
          
          setReviews(sortedReviews);
          setLoading(false);
        } else {
          setError("Failed to load reviews. Please try again later.");
          setLoading(false);
        }
      });
    } catch (err) {
      setError("Error loading Google Reviews");
      setLoading(false);
      console.error("Google Reviews Error:", err);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating
                ? "fill-yellow-500 text-yellow-500"
                : "fill-zinc-800 text-zinc-800"
            }`}
          />
        ))}
      </div>
    );
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
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

  if (error) {
    return (
      <section className="section-padding bg-black">
        <div className="container-luxury">
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="section-padding bg-black relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,179,8,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(234,179,8,0.05),transparent_50%)]"></div>
      
      <div className="container-luxury relative z-10">
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
          <h2 className="mb-6 font-serif text-4xl font-semibold text-yellow-500 md:text-5xl">
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
                  {placeDetails.rating}
                </span>
                <div>
                  {renderStars(Math.round(placeDetails.rating))}
                  <p className="mt-1 text-sm text-gray-400">
                    Based on {placeDetails.totalReviews} reviews
                  </p>
                </div>
              </div>
              
              <a
                href={placeDetails.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 px-6 py-3 text-sm font-medium text-yellow-500 transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black hover:shadow-lg hover:shadow-yellow-500/50"
              >
                View All on Google
                <ExternalLink className="h-4 w-4" />
              </a>
            </motion.div>
          )}
        </motion.div>

        {/* Reviews Carousel */}
        {reviews.length > 0 && (
          <div className="relative">
            <div className="mx-auto max-w-4xl">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="bg-zinc-900 border border-yellow-500/20 rounded-2xl p-8 md:p-12 shadow-2xl shadow-yellow-500/10">
                  {/* Quote mark decoration */}
                  <div className="absolute -top-6 left-8 text-8xl font-serif text-yellow-500/20">
                    "
                  </div>
                  
                  <div className="relative z-10">
                    {/* Rating */}
                    <div className="mb-6">
                      {renderStars(reviews[currentIndex].rating)}
                    </div>

                    {/* Review text */}
                    <p className="mb-8 text-lg leading-relaxed text-gray-300 italic">
                      {reviews[currentIndex].text}
                    </p>

                    {/* Author info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={reviews[currentIndex].profile_photo_url}
                        alt={reviews[currentIndex].author_name}
                        className="h-14 w-14 rounded-full border-2 border-yellow-500/30 object-cover"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            reviews[currentIndex].author_name
                          )}&background=eab308&color=000&size=128`;
                        }}
                      />
                      <div>
                        <h4 className="font-semibold text-yellow-500">
                          {reviews[currentIndex].author_name}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {formatDate(reviews[currentIndex].time)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Navigation buttons */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={prevReview}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-500/30 text-yellow-500 transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black hover:shadow-lg hover:shadow-yellow-500/50"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Dots indicator */}
                <div className="flex gap-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "w-8 bg-yellow-500"
                          : "w-2 bg-yellow-500/30 hover:bg-yellow-500/60"
                      }`}
                      aria-label={`Go to review ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextReview}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-500/30 text-yellow-500 transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black hover:shadow-lg hover:shadow-yellow-500/50"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Review counter */}
              <p className="mt-6 text-center text-sm text-gray-400">
                Review {currentIndex + 1} of {reviews.length}
              </p>
            </div>
          </div>
        )}

        {/* Google Reviews Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-3 rounded-full bg-zinc-900 border border-yellow-500/20 px-6 py-3">
            <svg className="h-6 w-6" viewBox="0 0 24 24">
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
            <span className="text-sm font-medium text-gray-300">
              Verified Google Reviews
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;