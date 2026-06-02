import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Lock, Shield, Eye, EyeOff, ChevronRight, AlertCircle } from "lucide-react";

type Lang = "en" | "hi";
type Role = "aww" | "beneficiary" | "supervisor";

interface Props {
  role: Role;
  lang: Lang;
  onNext: () => void;
  onBack: () => void;
}

const labels = {
  en: {
    heading: "Secure Aadhaar Login",
    subheading: "Your identity is verified via UIDAI — the national Aadhaar authority",
    roleLabels: { aww: "Anganwadi Worker", beneficiary: "Beneficiary", supervisor: "Supervisor / CDPO" },
    inputLabel: "Aadhaar Number",
    placeholder: "Enter 12-digit Aadhaar Number",
    hint: "Format: XXXX XXXX XXXX",
    verifyBtn: "Verify & Fetch Details",
    secureNote: "Your biometric data is encrypted and securely processed via UIDAI servers. We do not store your Aadhaar number.",
    termsNote: "By continuing, you agree to our Terms of Service and Privacy Policy.",
    consentLabel: "I consent to Aadhaar-based e-KYC verification",
    errorShort: "Please enter a valid 12-digit Aadhaar number",
  },
  hi: {
    heading: "सुरक्षित आधार लॉगिन",
    subheading: "आपकी पहचान UIDAI — राष्ट्रीय आधार प्राधिकरण द्वारा सत्यापित होती है",
    roleLabels: { aww: "आंगनवाड़ी कार्यकर्ता", beneficiary: "लाभार्थी", supervisor: "पर्यवेक्षक / CDPO" },
    inputLabel: "आधार संख्या",
    placeholder: "12 अंकों की आधार संख्या दर्ज करें",
    hint: "प्रारूप: XXXX XXXX XXXX",
    verifyBtn: "सत्यापित करें और विवरण लाएं",
    secureNote: "आपका बायोमेट्रिक डेटा UIDAI सर्वर के माध्यम से एन्क्रिप्टेड और सुरक्षित रूप से प्रोसेस किया जाता है। हम आपका आधार नंबर संग्रहीत नहीं करते।",
    termsNote: "जारी रखकर, आप हमारी सेवा की शर्तें और गोपनीयता नीति से सहमत हैं।",
    consentLabel: "मैं आधार-आधारित e-KYC सत्यापन के लिए सहमति देता/देती हूँ",
    errorShort: "कृपया एक वैध 12 अंकों का आधार नंबर दर्ज करें",
  },
};

const roleColors: Record<Role, { bg: string; text: string; border: string }> = {
  aww: { bg: "#EEF2FF", text: "#1A365D", border: "rgba(26,54,93,0.2)" },
  beneficiary: { bg: "#FEF3E7", text: "#9A4E0A", border: "rgba(224,123,42,0.3)" },
  supervisor: { bg: "#DCFCE7", text: "#15803D", border: "rgba(22,163,74,0.3)" },
};

const roleIcons: Record<Role, string> = { aww: "👩‍⚕️", beneficiary: "🤱", supervisor: "👩‍💼" };

function formatAadhaar(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 12);
  return digits.replace(/(\d{4})(\d{0,4})(\d{0,4})/, (_, a, b, c) =>
    [a, b, c].filter(Boolean).join(" ")
  );
}

export function AadhaarScreen({ role, lang, onNext, onBack }: Props) {
  const tx = labels[lang];
  const [raw, setRaw] = useState("");
  const [masked, setMasked] = useState(true);
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState(false);

  const digits = raw.replace(/\D/g, "");
  const isValid = digits.length === 12;
  const showError = touched && !isValid;
  const rc = roleColors[role];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 12);
    setRaw(val);
  };

  const displayValue = masked && digits.length > 0
    ? formatAadhaar("••••" + digits.slice(4)).replace(/•/g, "•")
    : formatAadhaar(raw);

  const maskedDisplay = masked && digits.length >= 8
    ? "•••• •••• " + digits.slice(8)
    : formatAadhaar(raw);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="relative overflow-hidden px-5 pt-10 pb-6"
        style={{ background: "linear-gradient(145deg, #1A365D 0%, #243F6E 100%)" }}
      >
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full" style={{ background: "rgba(224,123,42,0.12)" }} />
        <button onClick={onBack} className="flex items-center gap-2 mb-4 relative z-10">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
            <ArrowLeft size={16} color="#fff" />
          </div>
        </button>

        <div className="flex items-start gap-3 relative z-10">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
            <Shield size={22} color="#fff" />
          </div>
          <div>
            <h2 className="text-white font-bold mb-0.5" style={{ fontSize: "1.1rem" }}>{tx.heading}</h2>
            <p className="text-blue-200" style={{ fontSize: "0.65rem", lineHeight: 1.5 }}>{tx.subheading}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ background: "#F0F4FA", scrollbarWidth: "none" }}>

        {/* Role badge */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl mb-4"
          style={{ background: rc.bg, border: `1px solid ${rc.border}` }}
        >
          <span style={{ fontSize: "0.85rem" }}>{roleIcons[role]}</span>
          <span style={{ fontSize: "0.72rem", color: rc.text, fontWeight: 600 }}>
            {tx.roleLabels[role]}
          </span>
        </div>

        {/* Aadhaar Input Card */}
        <div className="bg-card rounded-2xl p-4 mb-3" style={{ boxShadow: "0 2px 16px rgba(26,54,93,0.08)" }}>
          <label
            className="block mb-1.5 font-semibold"
            style={{ fontSize: "0.78rem", color: "#0F1F3D" }}
          >
            {tx.inputLabel}
          </label>

          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl mb-1 transition-all"
            style={{
              background: "#F0F4FA",
              border: `2px solid ${showError ? "#DC2626" : isValid && touched ? "#16A34A" : "rgba(26,54,93,0.12)"}`,
            }}
          >
            {/* Hidden real input */}
            <input
              type="tel"
              value={raw}
              onChange={handleChange}
              onBlur={() => setTouched(true)}
              className="sr-only"
              id="aadhaar-real"
              maxLength={12}
            />
            {/* Visual display */}
            <label
              htmlFor="aadhaar-real"
              className="flex-1 font-mono cursor-text select-none"
              style={{
                fontSize: "1rem",
                color: digits.length ? "#0F1F3D" : "#9BACC0",
                letterSpacing: "0.15em",
              }}
            >
              {digits.length === 0
                ? tx.placeholder
                : maskedDisplay || <span style={{ color: "#9BACC0" }}>{tx.placeholder}</span>}
            </label>

            <button
              onClick={() => setMasked(m => !m)}
              className="flex-shrink-0"
              style={{ color: "#5A6A85" }}
            >
              {masked ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-0.5 rounded-full transition-all"
                style={{
                  background: i < digits.length
                    ? isValid ? "#16A34A" : "#1A365D"
                    : "rgba(26,54,93,0.12)",
                }}
              />
            ))}
          </div>

          {showError && (
            <div className="flex items-center gap-1.5 mb-2">
              <AlertCircle size={13} color="#DC2626" />
              <p style={{ fontSize: "0.65rem", color: "#DC2626" }}>{tx.errorShort}</p>
            </div>
          )}

          {/* Consent checkbox */}
          <div className="flex items-start gap-2.5 mt-3">
            <button
              onClick={() => setConsent(c => !c)}
              className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center mt-0.5 transition-all"
              style={{
                background: consent ? "#1A365D" : "transparent",
                border: `2px solid ${consent ? "#1A365D" : "rgba(26,54,93,0.25)"}`,
              }}
            >
              {consent && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.8 7L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <p style={{ fontSize: "0.65rem", color: "#5A6A85", lineHeight: 1.55 }}>{tx.consentLabel}</p>
          </div>
        </div>

        {/* Security note card */}
        <div
          className="flex gap-3 p-3.5 rounded-2xl mb-4"
          style={{ background: "#EEF2FF", border: "1px solid rgba(26,54,93,0.12)" }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#1A365D" }}
          >
            <Lock size={16} color="#fff" />
          </div>
          <p style={{ fontSize: "0.65rem", color: "#1A365D", lineHeight: 1.6 }}>{tx.secureNote}</p>
        </div>

        {/* Verify button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={!isValid || !consent}
          onClick={onNext}
          className="w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all mb-3"
          style={{
            background: isValid && consent
              ? "linear-gradient(135deg, #1A365D 0%, #243F6E 100%)"
              : "#D1D9E6",
            color: isValid && consent ? "#fff" : "#8FA0B8",
            fontSize: "0.9rem",
            boxShadow: isValid && consent ? "0 4px 18px rgba(26,54,93,0.28)" : "none",
          }}
        >
          <Shield size={17} /> {tx.verifyBtn} <ChevronRight size={16} />
        </motion.button>

        <p className="text-center" style={{ fontSize: "0.58rem", color: "#8FA0B8", lineHeight: 1.5 }}>
          {tx.termsNote}
        </p>

        {/* UIDAI badge */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: "#EEF2FF", border: "1px solid rgba(26,54,93,0.12)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" fill="#FF6B00" />
              <text x="8" y="11.5" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="bold">A</text>
            </svg>
            <span style={{ fontSize: "0.62rem", color: "#1A365D", fontWeight: 600 }}>Powered by UIDAI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
