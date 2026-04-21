import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, ChevronDown } from "lucide-react";

// ── SERVICE CATEGORIES ──────────────────────────────────────────────────────
const serviceCategories = [
  {
    label: "Hair Treatments",
    emoji: "✦",
    services: [
      "Loreal Dandruff Treatment",
      "Protein Hair Spa Treatment",
      "Oil Treatment",
      "Hair Fall Treatment",
      "Hot Oil Treatment",
      "Hair Collagen Treatment",
      "Hair Moisturizer Treatment",
      "Keratin Rebonding & Aftercare",
      "Keratin",
      "Rebonding",
      "Gray Hair Color",
      "Fashion Hair Color",
      "Head Massage",
    ],
  },
  {
    label: "Hair Styling",
    emoji: "✦",
    services: [
      "Gent Hair Cut",
      "Gent Beard Trim",
      "Gent Hair Cut & Beard",
      "Kids Hair Cut",
      "Gent Gray Hair Color",
      "Ladies Hair Cut",
      "Braiding",
      "Extension",
    ],
  },
  {
    label: "Threading",
    emoji: "✦",
    services: ["Eyebrow", "Upper Lip", "Chin", "Full Face Threading"],
  },
  {
    label: "Wax",
    emoji: "✦",
    services: [
      "Full Body Wax",
      "Full Leg Wax",
      "Full Hand Wax",
      "Half Leg Wax",
      "Half Hand Wax",
      "Brazilia",
      "Under Arm",
      "Full Face Wax",
    ],
  },
  {
    label: "Normal Facial",
    emoji: "✦",
    services: [
      "Casmara Clean Up",
      "Casmara Facial",
      "Umi Care Facial",
      "Umi Care Clean Up",
      "Gold Facial",
      "Gold Clean Up",
      "Normal Pimple Treatment",
      "Foxc Peel (Pimple Treatment)",
      "FCR (Glow) Facial",
    ],
  },
  {
    label: "Hydra Facial",
    emoji: "✦",
    services: [
      "Hydra Oxy",
      "Casmara Advance",
      "Umicare Advance",
      "Vitamin C",
      "Pimple Treatment Advance",
      "Gold Facial Advance",
      "Gold Facial Treatment (Gold Foil)",
      "Hydra Whitening & Glow Facial",
    ],
  },
  {
    label: "Nail Art",
    emoji: "✦",
    services: [
      "Chrome / Cat Eye",
      "Hologram / Marble",
      "Basic Design",
      "3–5 Colour Omb",
      "3D Nail Art",
      "Foil Design",
      "Simple Rhine Stones",
      "Medium and Long Stones",
    ],
  },
  {
    label: "Nail Extension",
    emoji: "✦",
    services: [
      "Acrylic on Natural Over Layer (Normal Color)",
      "Acrylic Full Set with Tips (Normal Color)",
      "Acrylic Full Set with Tips (2 Color)",
      "Acrylic Full Set with Gel Color",
    ],
  },
  {
    label: "Dressing",
    emoji: "✦",
    services: [
      "Full Dressing Normal",
      "Full Dressing Advance",
      "Saree Draping",
      "Hair Setting",
      "Make-Up Normal",
      "Make-Up Advance",
    ],
  },
  {
    label: "Pedicure",
    emoji: "✦",
    services: [
      "Pedicure Full",
      "Pedicure + Gel Colour",
      "Pedicure + Gel French",
      "Pedicure Express",
      "Pedicure Express + Gel Colour",
      "Pedicure Express + Gel French",
    ],
  },
  {
    label: "Manicure",
    emoji: "✦",
    services: [
      "Manicure Full",
      "Manicure + Gel Colour",
      "Manicure + Gel French",
      "Manicure Express",
      "Manicure Express + Gel Colour",
      "Manicure Express + Gel French",
    ],
  },
];

const timeSlots = [
  "9:00 AM","10:00 AM","11:00 AM","12:00 PM",
  "1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM",
];

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1465660222512042005/DRj_Z_RY6xxia6scs-unlexhR-xwPd3RdtoBn4s0lpPBjQ7kjGWiVW4sPMZRoLUYq8lU";

// ── CATEGORY ACCORDION ──────────────────────────────────────────────────────
const CategoryAccordion = ({
  category,
  selectedServices,
  onToggle,
}: {
  category: (typeof serviceCategories)[0];
  selectedServices: string[];
  onToggle: (s: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const selectedCount = category.services.filter((s) =>
    selectedServices.includes(s)
  ).length;

  return (
    <div
      style={{
        border: `1px solid ${open ? "rgba(212,175,55,0.5)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 12,
        overflow: "hidden",
        transition: "border-color 0.25s",
        background: open ? "rgba(212,175,55,0.04)" : "rgba(255,255,255,0.02)",
      }}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#D4AF37", fontSize: 11, letterSpacing: 2 }}>
            {category.emoji}
          </span>
          <span
            style={{
              color: "#fff",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {category.label}
          </span>
          {selectedCount > 0 && (
            <span
              style={{
                background: "#D4AF37",
                color: "#000",
                borderRadius: 999,
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 8px",
                letterSpacing: 0,
              }}
            >
              {selectedCount}
            </span>
          )}
        </div>
        <ChevronDown
          size={16}
          color="rgba(255,255,255,0.4)"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s",
          }}
        />
      </button>

      {/* Services Grid */}
      {open && (
        <div
          style={{
            padding: "0 18px 16px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 8,
          }}
        >
          {category.services.map((service) => {
            const checked = selectedServices.includes(service);
            return (
              <label
                key={service}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: `1px solid ${checked ? "rgba(212,175,55,0.6)" : "rgba(255,255,255,0.06)"}`,
                  background: checked ? "rgba(212,175,55,0.08)" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.18s",
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    border: `1.5px solid ${checked ? "#D4AF37" : "rgba(255,255,255,0.25)"}`,
                    background: checked ? "#D4AF37" : "transparent",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.18s",
                  }}
                  onClick={() => onToggle(service)}
                >
                  {checked && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path
                        d="M1 3.5L3.5 6L8 1"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: checked ? "#fff" : "rgba(255,255,255,0.55)",
                    lineHeight: 1.4,
                    transition: "color 0.18s",
                  }}
                >
                  {service}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── FIELD WRAPPER ────────────────────────────────────────────────────────────
const Field = ({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <label
      style={{
        fontSize: 11,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.35)",
        fontWeight: 500,
      }}
    >
      {label}
    </label>
    <div style={{ position: "relative" }}>
      {Icon && (
        <Icon
          size={16}
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "rgba(255,255,255,0.25)",
            pointerEvents: "none",
          }}
        />
      )}
      {children}
    </div>
  </div>
);

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  padding: "14px 16px 14px 44px",
  color: "#fff",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
};

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
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
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const sendToDiscord = async (bookingData: typeof formData) => {
    try {
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Moonlight Salon Bot",
          embeds: [
            {
              title: "🌟 New Booking Request",
              color: 0xd4af37,
              fields: [
                { name: "👤 Name", value: bookingData.name, inline: true },
                { name: "📱 Phone", value: bookingData.phone, inline: true },
                { name: "📧 Email", value: bookingData.email, inline: false },
                {
                  name: "💅 Services",
                  value: bookingData.services.join(", "),
                  inline: false,
                },
                { name: "📅 Date", value: bookingData.date, inline: true },
                { name: "⏰ Time", value: bookingData.time, inline: true },
              ],
              footer: { text: "Moonlight Salon Booking System" },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const discordSuccess = await sendToDiscord(formData);
    setSubmitStatus(discordSuccess ? "success" : "error");

    const servicesList = formData.services.join(" | ");
    const message = `Hello! I'm *${formData.name}*. I'd like to book an appointment at *Moonlight Salon*.

• *Name:* ${formData.name}
• *Phone:* ${formData.phone}
• *Email:* ${formData.email}
• *Services:* ${servicesList}
• *Date:* ${formData.date}
• *Time:* ${formData.time}

Please confirm my booking. Thank you!`;

    window.open(`https://wa.me/+94786173173?text=${encodeURIComponent(message)}`, "_blank");

    setTimeout(() => {
      setFormData({ name: "", phone: "", email: "", services: [], date: "", time: "" });
      setSubmitStatus("idle");
      setIsSubmitting(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleServiceToggle = (service: string) =>
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));

  return (
    <section
      id="booking"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0a0a0a",
        padding: "100px 0",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(212,175,55,0.05) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#D4AF37",
              marginBottom: 16,
            }}
          >
            Reserve Your Experience
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontFamily: "Georgia, serif",
              fontWeight: 400,
              color: "#fff",
              margin: "0 0 20px",
              lineHeight: 1.15,
            }}
          >
            Book Your Glow
          </h2>
          {/* Gold line */}
          <div
            style={{
              width: 48,
              height: 1,
              background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
              margin: "0 auto 20px",
            }}
          />
          <p style={{ color: "rgba(255,255,255,0.35)", maxWidth: 480, margin: "0 auto", fontSize: 14, lineHeight: 1.8 }}>
            Schedule your personalized beauty experience with our expert team.
            We'll confirm your appointment via WhatsApp.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: "clamp(28px, 5vw, 52px)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Status */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginBottom: 24,
                  borderRadius: 10,
                  padding: "14px 18px",
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  color: "#4ade80",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                ✅ Booking received! Opening WhatsApp…
              </motion.div>
            )}
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginBottom: 24,
                  borderRadius: 10,
                  padding: "14px 18px",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#f87171",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                ⚠️ Notification failed, but continuing to WhatsApp…
              </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Row 1 */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
                <Field label="Full Name" icon={User}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </Field>
                <Field label="Phone Number" icon={Phone}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Your phone number"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </Field>
              </div>

              {/* Email */}
              <Field label="Email Address" icon={Mail}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </Field>

              {/* Services */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <p
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.35)",
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    Select Services
                  </p>
                  {formData.services.length > 0 && (
                    <span style={{ fontSize: 12, color: "#D4AF37" }}>
                      {formData.services.length} selected
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {serviceCategories.map((cat) => (
                    <CategoryAccordion
                      key={cat.label}
                      category={cat}
                      selectedServices={formData.services}
                      onToggle={handleServiceToggle}
                    />
                  ))}
                </div>
                {formData.services.length === 0 && (
                  <p style={{ marginTop: 10, fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
                    Please select at least one service
                  </p>
                )}
              </div>

              {/* Date & Time */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
                <Field label="Preferred Date" icon={Calendar}>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, colorScheme: "dark" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </Field>
                <Field label="Preferred Time" icon={Clock}>
                  <div style={{ position: "relative" }}>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      style={{
                        ...inputStyle,
                        appearance: "none",
                        WebkitAppearance: "none",
                        paddingRight: 40,
                        cursor: "pointer",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    >
                      <option value="" style={{ background: "#111" }}>
                        Select time
                      </option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t} style={{ background: "#111" }}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      style={{
                        position: "absolute",
                        right: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "rgba(255,255,255,0.25)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                </Field>
              </div>

              {/* Submit */}
              <div style={{ paddingTop: 8 }}>
                <button
                  type="submit"
                  disabled={formData.services.length === 0 || isSubmitting}
                  style={{
                    width: "100%",
                    padding: "18px 32px",
                    borderRadius: 999,
                    border: "none",
                    background:
                      formData.services.length === 0 || isSubmitting
                        ? "rgba(212,175,55,0.3)"
                        : "#D4AF37",
                    color: "#000",
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor:
                      formData.services.length === 0 || isSubmitting
                        ? "not-allowed"
                        : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    transition: "all 0.25s",
                    fontFamily: "inherit",
                  }}
                >
                  {isSubmitting ? (
                    "Sending…"
                  ) : (
                    <>
                      <span>Book via WhatsApp</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            textAlign: "center",
            marginTop: 28,
            fontSize: 12,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.04em",
          }}
        >
          Your booking details will be sent to our team for quick confirmation.
        </motion.p>
      </div>
    </section>
  );
};

export default BookingSection;