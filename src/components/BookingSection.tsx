import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, Sparkles } from "lucide-react";

const services = [
  "Hair Styling",
  "Hair Coloring",
  "Manicure",
  "Pedicure",
  "Makeup",
  "Skincare Facial",
  "Bridal Package",
  "Lash Extensions",
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

// Discord webhook URL
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1465660222512042005/DRj_Z_RY6xxia6scs-unlexhR-xwPd3RdtoBn4s0lpPBjQ7kjGWiVW4sPMZRoLUYq8lU";

const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    services: [] as string[],
    date: "",
    time: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const sendToDiscord = async (bookingData: typeof formData) => {
    const embed = {
      title: "🌟 New Booking Request",
      color: 0xD4AF37, // Gold color
      fields: [
        {
          name: "👤 Name",
          value: bookingData.name,
          inline: true
        },
        {
          name: "📱 Phone",
          value: bookingData.phone,
          inline: true
        },
        {
          name: "📧 Email",
          value: bookingData.email,
          inline: false
        },
        {
          name: "💅 Services Requested",
          value: bookingData.services.join(", "),
          inline: false
        },
        {
          name: "📅 Preferred Date",
          value: bookingData.date,
          inline: true
        },
        {
          name: "⏰ Preferred Time",
          value: bookingData.time,
          inline: true
        }
      ],
      footer: {
        text: "Moonlight Salon Booking System"
      },
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: "Moonlight Salon Bot",
          avatar_url: "https://i.imgur.com/4M34hi2.png", // Optional: Add your salon logo URL
          embeds: [embed]
        })
      });

      if (!response.ok) {
        throw new Error('Discord webhook failed');
      }

      return true;
    } catch (error) {
      console.error('Error sending to Discord:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Send to Discord webhook
    const discordSuccess = await sendToDiscord(formData);
    
    if (discordSuccess) {
      setSubmitStatus('success');
    } else {
      setSubmitStatus('error');
    }
    
    // Format services list for WhatsApp
    const servicesList = formData.services.join(" | ");
    
    // Create WhatsApp message
    const message = `Hello! i'm, *${formData.name}*. I'd like to book an appointment at *Moonlight Salon*.

• *Booking Details:*
• *Name:* ${formData.name}
• *Phone:* ${formData.phone}
• *Email:* ${formData.email}
• *Services:* ${servicesList} 
• *Date:* ${formData.date}
• *Time:* ${formData.time}

Please confirm my booking. Thank you!`;

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/+94704966675?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        phone: "",
        email: "",
        services: [],
        date: "",
        time: "",
      });
      setSubmitStatus('idle');
      setIsSubmitting(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  return (
    <section id="booking" className="section-padding relative overflow-hidden bg-black">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
      
      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm tracking-[0.3em] text-gold">
            RESERVE YOUR EXPERIENCE
          </span>
          <h2 className="mb-6 font-serif text-4xl font-semibold text-white md:text-5xl">
            Book Your Glow
          </h2>
          <div className="luxury-divider mx-auto w-24 bg-black" />
          
          <p className="mx-auto mt-6 max-w-2xl text-amber-50 opacity-50">
            Schedule your personalized beauty experience with our expert team.
            We'll confirm your appointment via WhatsApp.
          </p>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <div className="rounded-2xl border border-gray-800 bg-zinc-950 p-8 shadow-2xl md:p-12">
            {/* Success/Error Message */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-center text-green-500"
              >
                ✅ Booking received! Opening WhatsApp...
              </motion.div>
            )}
            
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-center text-red-500"
              >
                ⚠️ Notification failed, but continuing to WhatsApp...
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name & Phone */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative">
                  <label className="mb-2 block text-sm font-medium text-amber-50 opacity-50">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full rounded-xl border border-gray-800 bg-black py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="mb-2 block text-sm font-medium text-amber-50 opacity-50">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Your phone number"
                      className="w-full rounded-xl border border-gray-800 bg-black py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="relative">
                <label className="mb-2 block text-sm font-medium text-amber-50 opacity-50">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your email"
                    className="w-full rounded-xl border border-gray-800 bg-black py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                  />
                </div>
              </div>

              {/* Services - Checkboxes */}
              <div className="relative">
                <label className="mb-3 flex items-center gap-2 text-sm font-medium text-amber-50 opacity-50">
                  Select Services
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((service) => (
                    <label
                      key={service}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-800 bg-black px-4 py-3 transition-all hover:border-gold hover:bg-gold/5"
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="h-5 w-5 cursor-pointer rounded border-gray-700 bg-black text-gold focus:ring-2 focus:ring-gold/20 focus:ring-offset-0"
                      />
                      <span className="text-sm text-gray-300">{service}</span>
                    </label>
                  ))}
                </div>
                {formData.services.length === 0 && (
                  <p className="mt-2 text-xs text-gray-500">
                    Please select at least one service
                  </p>
                )}
              </div>

              {/* Row 3: Date & Time */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative">
                  <label className="mb-2 block text-sm font-medium text-amber-50 opacity-50">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-800 bg-black py-4 pl-12 pr-4 text-white focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="mb-2 block text-sm font-medium text-amber-50 opacity-50">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none rounded-xl border border-gray-800 bg-black py-4 pl-12 pr-10 text-white focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formData.services.length === 0 || isSubmitting}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gold px-8 py-4 font-medium text-charcoal transition-all duration-300 hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="flex items-center justify-center text-black">
                  <span>{isSubmitting ? 'Sending...' : 'Book via WhatsApp'}</span>
                  {!isSubmitting && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 74 74"
                      className="ml-3 h-[34px] w-[34px] transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                    >
                      <circle strokeWidth={3} stroke="black" r="35.5" cy={37} cx={37} />
                      <path
                        fill="black"
                        d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                      />
                    </svg>
                  )}
                </span>
              </button>
            </form>
          </div>
        </motion.div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-8 max-w-3xl text-center"
        >
          <p className="text-sm text-gray-500">
            Your booking details will be sent to our team for quick confirmation.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;