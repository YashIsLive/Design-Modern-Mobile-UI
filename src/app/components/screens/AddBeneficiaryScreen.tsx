import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronRight, ChevronLeft, Calendar, ChevronDown, User, Sparkles, Baby } from "lucide-react";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="px-4 py-3" style={{ background: "#fff", borderBottom: "1px solid rgba(26,46,74,0.08)" }}>
      <div className="flex items-center justify-between mb-1.5">
        <p style={{ fontSize: "0.7rem", color: "#6B7A8D" }}>
          Step {current} of {total}{" "}
          <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>/ चरण {current} / {total}</span>
        </p>
        <p style={{ fontSize: "0.65rem", color: "#E86B2E", fontWeight: 600 }}>Personal Details / व्यक्तिगत विवरण</p>
      </div>
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex-1 flex flex-col gap-1">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                background: i < current ? "#E86B2E" : i === current - 1 ? "#E86B2E" : "rgba(26,46,74,0.12)",
              }}
            />
            <div className="flex items-center gap-1">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                style={{
                  background: i < current ? "#E86B2E" : "rgba(26,46,74,0.1)",
                  color: i < current ? "#fff" : "#6B7A8D",
                  fontSize: "0.5rem",
                }}
              >
                {i + 1}
              </div>
              <p style={{ fontSize: "0.5rem", color: i < current ? "#E86B2E" : "#6B7A8D" }}>
                {["Details", "KYC", "Review"][i]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const categories = [
  { id: "pregnant", label: "Pregnant", labelHi: "गर्भवती", icon: "🤰" },
  { id: "lactating", label: "Lactating", labelHi: "स्तनपान कराने वाली", icon: "👶" },
  { id: "child", label: "Child (0–6 yrs)", labelHi: "बालक (0–6 वर्ष)", icon: "🧒" },
];

export function AddBeneficiaryScreen({ onNext, onBack }: Props) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [category, setCategory] = useState("");
  const [showCatDrop, setShowCatDrop] = useState(false);
  const [mobile, setMobile] = useState("");
  const [hintIndex, setHintIndex] = useState(0);

  const hints = [
    {
      title: "Mobile Number Match",
      titleHi: "मोबाइल नंबर मिलान",
      text: "Ensure the mother's mobile number matches her government health card for seamless benefit routing.",
      textHi: "सुनिश्चित करें कि माँ का मोबाइल नंबर सरकारी हेल्थ कार्ड से मेल खाता हो।"
    },
    {
      title: "Date Verification",
      titleHi: "तारीख सत्यापन",
      text: "Enter the correct date of birth. This helps track developmental milestones and immunization schedules.",
      textHi: "सही जन्म तारीख दर्ज करें। यह विकासात्मक मील के पत्थर और टीकाकरण शेड्यूल ट्रैक करने में मदद करता है।"
    },
    {
      title: "Category Selection",
      titleHi: "श्रेणी चयन",
      text: "Correct category selection ensures beneficiaries receive age-appropriate health interventions and schemes.",
      textHi: "सही श्रेणी चयन यह सुनिश्चित करता है कि लाभार्थियों को उम्र-उपयुक्त स्वास्थ्य हस्तक्षेप और योजनाएं मिलें।"
    },
    {
      title: "Complete Information",
      titleHi: "पूर्ण जानकारी",
      text: "All fields are required to create a comprehensive health profile for better monitoring and support.",
      textHi: "बेहतर निगरानी और सहायता के लिए एक व्यापक स्वास्थ्य प्रोफ़ाइल बनाने के लिए सभी क्षेत्र आवश्यक हैं।"
    },
    {
      title: "Offline First",
      titleHi: "Offline sync",
      text: "If the network is weak, complete the registration now. Verified records will sync when connectivity returns.",
      textHi: "Save locally now; sync to the central database when network is available."
    },
    {
      title: "Aadhaar Readiness",
      titleHi: "Photo match",
      text: "Keep the Aadhaar-linked photo ready before identity verification to reduce retries during face matching.",
      textHi: "Use a clear face view for faster verification."
    },
    {
      title: "Growth Follow-Up",
      titleHi: "Next check",
      text: "For children under six, schedule the next weight check immediately after registration.",
      textHi: "This keeps growth monitoring on track."
    },
    {
      title: "High-Risk Flagging",
      titleHi: "Priority alerts",
      text: "Accurate category and birth details help generate urgent nutrition and pregnancy alerts correctly.",
      textHi: "Small details improve priority decisions."
    }
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHintIndex(prev => (prev + 1) % hints.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [hints.length]);

  const canProceed = name.trim() && dob && category;

  return (
    <div className="flex flex-col h-full" style={{ background: "#FDF6EE" }}>
      {/* Back + Title header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3" style={{ background: "#1A2E4A" }}>
        <button onClick={onBack}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
            <ArrowLeft size={16} color="#fff" />
          </div>
        </button>
        <div>
          <h2 className="text-white font-bold" style={{ fontSize: "1rem" }}>
            Register Beneficiary{" "}
            <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, fontSize: "0.8rem", opacity: 0.7 }}>/ लाभार्थी पंजीकरण</span>
          </h2>
        </div>
      </div>

      <StepProgress current={1} total={3} />

      {/* Scrollable form */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-4" style={{ scrollbarWidth: "none" }}>
        {/* Form Card */}
        <div
          className="bg-card rounded-2xl p-4 mb-4"
          style={{ boxShadow: "0 4px 20px rgba(26,46,74,0.08)", border: "1px solid rgba(26,46,74,0.06)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#FEF0E4" }}>
              <Baby size={16} color="#E86B2E" />
            </div>
            <div>
              <p className="font-semibold" style={{ fontSize: "0.82rem", color: "#1A2E4A" }}>Beneficiary Details</p>
              <p style={{ fontSize: "0.6rem", color: "#6B7A8D", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>लाभार्थी विवरण</p>
            </div>
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold" style={{ fontSize: "0.75rem", color: "#1A2E4A" }}>
              Full Name{" "}
              <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, color: "#6B7A8D", fontSize: "0.68rem" }}>/ पूरा नाम</span>
              <span style={{ color: "#EF4444" }}> *</span>
            </label>
            <div
              className="flex items-center gap-2 px-3 py-3 rounded-xl"
              style={{
                background: "#FDF6EE",
                border: `1.5px solid ${name ? "#E86B2E" : "rgba(26,46,74,0.12)"}`,
              }}
            >
              <User size={16} color="#6B7A8D" />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter full name / पूरा नाम लिखें"
                className="flex-1 bg-transparent outline-none"
                style={{ fontSize: "0.85rem", color: "#1A2E4A" }}
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold" style={{ fontSize: "0.75rem", color: "#1A2E4A" }}>
              Date of Birth{" "}
              <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, color: "#6B7A8D", fontSize: "0.68rem" }}>/ जन्म तिथि</span>
              <span style={{ color: "#EF4444" }}> *</span>
            </label>
            <div
              className="flex items-center gap-2 px-3 py-3 rounded-xl"
              style={{
                background: "#FDF6EE",
                border: `1.5px solid ${dob ? "#E86B2E" : "rgba(26,46,74,0.12)"}`,
              }}
            >
              <Calendar size={16} color="#E86B2E" />
              <input
                type="date"
                value={dob}
                onChange={e => setDob(e.target.value)}
                className="flex-1 bg-transparent outline-none"
                style={{ fontSize: "0.85rem", color: dob ? "#1A2E4A" : "#9CA3AF" }}
              />
            </div>
          </div>

          {/* Mobile */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold" style={{ fontSize: "0.75rem", color: "#1A2E4A" }}>
              Mother's Mobile{" "}
              <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, color: "#6B7A8D", fontSize: "0.68rem" }}>/ माँ का मोबाइल</span>
            </label>
            <div
              className="flex items-center rounded-xl overflow-hidden"
              style={{ border: `1.5px solid ${mobile ? "#E86B2E" : "rgba(26,46,74,0.12)"}` }}
            >
              <div className="px-2.5 py-3 flex-shrink-0" style={{ background: "#F5EDE2", borderRight: "1px solid rgba(26,46,74,0.1)" }}>
                <span style={{ fontSize: "0.8rem", color: "#1A2E4A", fontWeight: 600 }}>+91</span>
              </div>
              <input
                type="tel"
                value={mobile}
                onChange={e => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="00000 00000"
                className="flex-1 px-3 py-3 bg-transparent outline-none"
                style={{ fontSize: "0.85rem", color: "#1A2E4A", background: "#FDF6EE" }}
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="mb-2">
            <label className="block mb-1 font-semibold" style={{ fontSize: "0.75rem", color: "#1A2E4A" }}>
              Category{" "}
              <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, color: "#6B7A8D", fontSize: "0.68rem" }}>/ श्रेणी</span>
              <span style={{ color: "#EF4444" }}> *</span>
            </label>
            <button
              onClick={() => setShowCatDrop(d => !d)}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl"
              style={{
                background: "#FDF6EE",
                border: `1.5px solid ${category ? "#E86B2E" : "rgba(26,46,74,0.12)"}`,
              }}
            >
              {category ? (
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: "1rem" }}>{categories.find(c => c.id === category)?.icon}</span>
                  <span style={{ fontSize: "0.85rem", color: "#1A2E4A", fontWeight: 600 }}>
                    {categories.find(c => c.id === category)?.label}
                  </span>
                </div>
              ) : (
                <span style={{ fontSize: "0.82rem", color: "#9CA3AF" }}>Select category / श्रेणी चुनें</span>
              )}
              <ChevronDown size={16} color="#6B7A8D" style={{ transform: showCatDrop ? "rotate(180deg)" : "none", transition: "0.2s" }} />
            </button>

            {showCatDrop && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 rounded-xl overflow-hidden"
                style={{ border: "1.5px solid rgba(26,46,74,0.12)", background: "#fff", boxShadow: "0 6px 20px rgba(26,46,74,0.1)" }}
              >
                {categories.map((cat, i) => (
                  <button
                    key={cat.id}
                    onClick={() => { setCategory(cat.id); setShowCatDrop(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors text-left"
                    style={{ borderBottom: i < categories.length - 1 ? "1px solid rgba(26,46,74,0.07)" : "none" }}
                  >
                    <span style={{ fontSize: "1.1rem" }}>{cat.icon}</span>
                    <div>
                      <p style={{ fontSize: "0.82rem", color: "#1A2E4A", fontWeight: 500 }}>{cat.label}</p>
                      <p style={{ fontSize: "0.62rem", color: "#6B7A8D", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{cat.labelHi}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Smart Hints Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-4 mb-4 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #EEF2FF 0%, #E8F4FD 100%)",
            border: "1px solid rgba(99,102,241,0.2)",
            boxShadow: "0 0 0 3px rgba(99,102,241,0.06), 0 4px 16px rgba(99,102,241,0.1)",
          }}
        >
          {/* Carousel content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={hintIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #6366F1, #818CF8)" }}
              >
                <Sparkles size={17} color="#fff" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <p className="font-bold" style={{ fontSize: "0.72rem", color: "#4338CA" }}>
                    {hints[hintIndex].title}{" "}
                    <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, color: "#6366F1", fontSize: "0.65rem" }}>/ {hints[hintIndex].titleHi}</span>
                  </p>
                  <div
                    className="px-1.5 py-0.5 rounded-full"
                    style={{ background: "rgba(99,102,241,0.15)" }}
                  >
                    <span style={{ fontSize: "0.48rem", color: "#4338CA", fontWeight: 700 }}>HINT {hintIndex + 1}/{hints.length}</span>
                  </div>
                </div>
                <p style={{ fontSize: "0.7rem", color: "#3730A3", lineHeight: 1.6 }}>
                  {hints[hintIndex].text}
                </p>
                <p style={{ fontSize: "0.62rem", color: "#4338CA", fontFamily: "'Noto Sans Devanagari', sans-serif", lineHeight: 1.5, marginTop: 4, opacity: 0.8 }}>
                  {hints[hintIndex].textHi}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel controls */}
          <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(99,102,241,0.15)" }}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setHintIndex(prev => prev === 0 ? hints.length - 1 : prev - 1)}
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(99,102,241,0.2)" }}
              aria-label="Previous hint"
            >
              <ChevronLeft size={16} color="#4338CA" />
            </motion.button>
            
            {/* Dot indicators */}
            <div className="flex gap-1.5">
              {hints.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setHintIndex(i)}
                  animate={{
                    background: i === hintIndex ? "rgba(99,102,241,0.8)" : "rgba(99,102,241,0.25)",
                    scale: i === hintIndex ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-2 h-2 rounded-full"
                />
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setHintIndex(prev => prev === hints.length - 1 ? 0 : prev + 1)}
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(99,102,241,0.2)" }}
              aria-label="Next hint"
            >
              <ChevronRight size={16} color="#4338CA" />
            </motion.button>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={!canProceed}
          onClick={onNext}
          className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
          style={{
            background: canProceed ? "#E86B2E" : "#D4C4B5",
            color: "#fff",
            fontSize: "0.92rem",
            boxShadow: canProceed ? "0 6px 20px rgba(232,107,46,0.38)" : "none",
          }}
        >
          Next: Identity Verification{" "}
          <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, fontSize: "0.78rem", opacity: 0.85 }}>/ अगला</span>
          <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}
