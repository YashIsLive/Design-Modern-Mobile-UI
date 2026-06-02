import { useState } from "react";
import { motion } from "motion/react";
import { Shield, Phone, Lock } from "lucide-react";

interface Props {
  onNext: () => void;
}

function MoWCDFullEmblem() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <circle cx="36" cy="36" r="35" fill="#1A2E4A" />
      <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <circle cx="36" cy="36" r="20" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      {/* 24 spokes */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * 15 * Math.PI) / 180;
        const x1 = 36 + 10 * Math.cos(a); const y1 = 36 + 10 * Math.sin(a);
        const x2 = 36 + 18 * Math.cos(a); const y2 = 36 + 18 * Math.sin(a);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />;
      })}
      <circle cx="36" cy="36" r="5" fill="#E86B2E" />
      <circle cx="36" cy="36" r="2.5" fill="#fff" />
      {/* Mother holding child icon */}
      <circle cx="36" cy="12" r="4" fill="rgba(255,255,255,0.9)" />
      <path d="M31 15 Q36 22 41 15" fill="rgba(255,255,255,0.7)" />
      <circle cx="41" cy="10" r="2.5" fill="rgba(232,107,46,0.9)" />
      {/* Bottom text */}
      <text x="36" y="66" textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,0.85)" fontFamily="sans-serif" fontWeight="600">INDIA</text>
    </svg>
  );
}

export function LoginScreen({ onNext }: Props) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = useState<(HTMLInputElement | null)[]>([null, null, null, null])[0];

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp]; next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 3) (document.getElementById(`otp-${i + 1}`) as HTMLInputElement)?.focus();
  };

  const handleOtpKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      const next = [...otp]; next[i - 1] = "";
      setOtp(next);
      (document.getElementById(`otp-${i - 1}`) as HTMLInputElement)?.focus();
    }
  };

  const canSubmit = mobile.replace(/\D/g, "").length === 10 && otp.every(d => d);

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "#FDF6EE", scrollbarWidth: "none" }}>
      {/* Top decorative header area */}
      <div
        className="relative overflow-hidden flex flex-col items-center pt-10 pb-8 px-6"
        style={{ background: "linear-gradient(170deg, #1A2E4A 0%, #253D5E 70%, #2E4F78 100%)" }}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10" style={{ background: "#E86B2E" }} />
        <div className="absolute bottom-0 left-0 right-0 h-8 rounded-t-3xl" style={{ background: "#FDF6EE" }} />

        {/* Emblems row */}
        <div className="flex items-center gap-6 mb-4 relative z-10">
          <MoWCDFullEmblem />
          <div className="w-px h-14" style={{ background: "rgba(255,255,255,0.2)" }} />
          {/* Angansakhi logo */}
          <div className="flex flex-col items-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="#E86B2E" />
              {/* Lotus petals */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <ellipse key={i} cx="32" cy="20" rx="5" ry="12"
                  fill={i % 2 === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)"}
                  transform={`rotate(${deg},32,32)`} />
              ))}
              <circle cx="32" cy="32" r="10" fill="#1A2E4A" />
              {/* Mother-child */}
              <circle cx="32" cy="27" r="3.5" fill="rgba(255,255,255,0.95)" />
              <path d="M28 31 Q32 38 36 31" fill="rgba(255,255,255,0.8)" />
              <circle cx="36.5" cy="25" r="2.2" fill="rgba(253,246,238,0.9)" />
            </svg>
            <p className="text-white font-bold mt-1" style={{ fontSize: "0.8rem" }}>Angansakhi</p>
            <p style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.65)", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>आंगनसखी</p>
          </div>
        </div>

        <p className="text-center" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.65rem", lineHeight: 1.5 }}>
          Ministry of Women & Child Development<br />
          <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: "0.6rem" }}>महिला एवं बाल विकास मंत्रालय</span>
        </p>
      </div>

      {/* Form area */}
      <div className="flex-1 px-5 pt-6 pb-8">
        {/* Section heading */}
        <div className="mb-6">
          <h2 className="font-bold mb-0.5" style={{ color: "#1A2E4A", fontSize: "1.15rem" }}>
            Login{" "}
            <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, fontSize: "0.85rem", color: "#6B7A8D" }}>/ लॉग इन</span>
          </h2>
          <p style={{ fontSize: "0.7rem", color: "#6B7A8D" }}>Enter your mobile number to receive OTP</p>
          <p style={{ fontSize: "0.62rem", color: "#6B7A8D", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>OTP प्राप्त करने के लिए मोबाइल नंबर दर्ज करें</p>
        </div>

        {/* Mobile number input */}
        <div className="mb-5">
          <label className="block mb-1.5 font-semibold" style={{ fontSize: "0.78rem", color: "#1A2E4A" }}>
            Mobile Number{" "}
            <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, color: "#6B7A8D" }}>/ मोबाइल नंबर</span>
          </label>
          <div
            className="flex items-center rounded-2xl overflow-hidden"
            style={{
              border: `2px solid ${mobile.replace(/\D/g, "").length === 10 ? "#10B981" : "rgba(26,46,74,0.15)"}`,
              background: "#fff",
              boxShadow: "0 2px 8px rgba(26,46,74,0.06)",
            }}
          >
            {/* +91 prefix */}
            <div
              className="flex items-center gap-1.5 px-3 py-3.5 border-r"
              style={{ borderColor: "rgba(26,46,74,0.12)", flexShrink: 0, background: "#F5EDE2" }}
            >
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                <rect width="6" height="12" fill="#FF9933" />
                <rect x="6" width="6" height="12" fill="#fff" />
                <rect x="12" width="6" height="12" fill="#138808" />
                <circle cx="9" cy="6" r="2" fill="none" stroke="#000080" strokeWidth="0.8" />
              </svg>
              <span style={{ fontSize: "0.85rem", color: "#1A2E4A", fontWeight: 600 }}>+91</span>
            </div>
            <div className="flex items-center flex-1 px-3 gap-2">
              <Phone size={16} color="#6B7A8D" />
              <input
                type="tel"
                value={mobile}
                onChange={e => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="00000 00000"
                className="flex-1 bg-transparent outline-none"
                style={{ fontSize: "0.95rem", color: "#1A2E4A", letterSpacing: "0.05em" }}
              />
            </div>
          </div>
          {/* Progress dots */}
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex-1 h-1 rounded-full transition-all"
                style={{ background: i < mobile.replace(/\D/g, "").length ? "#E86B2E" : "rgba(26,46,74,0.1)" }} />
            ))}
          </div>
        </div>

        {/* OTP Row */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold" style={{ fontSize: "0.78rem", color: "#1A2E4A" }}>
            One-Time Password{" "}
            <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, color: "#6B7A8D" }}>/ OTP</span>
          </label>
          <div className="flex gap-3 justify-between">
            {otp.map((digit, i) => (
              <motion.div
                key={i}
                animate={{ borderColor: digit ? "#E86B2E" : "rgba(26,46,74,0.15)", scale: digit ? 1.06 : 1 }}
                transition={{ duration: 0.15 }}
                className="flex-1"
                style={{
                  height: 64,
                  border: "2px solid",
                  borderRadius: 16,
                  background: digit ? "#FEF0E4" : "#fff",
                  boxShadow: digit ? "0 2px 12px rgba(232,107,46,0.18)" : "0 1px 4px rgba(26,46,74,0.06)",
                }}
              >
                <input
                  id={`otp-${i}`}
                  type="tel"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => handleOtpKey(i, e)}
                  className="w-full h-full text-center bg-transparent outline-none font-bold"
                  style={{ fontSize: "1.5rem", color: "#1A2E4A", caretColor: "#E86B2E", borderRadius: 16 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="w-full py-4 flex items-center justify-center gap-2.5 font-bold transition-all"
          style={{
            background: canSubmit ? "#E86B2E" : "#D4C4B5",
            color: "#fff",
            borderRadius: 50,
            fontSize: "1rem",
            boxShadow: canSubmit ? "0 6px 20px rgba(232,107,46,0.4)" : "none",
          }}
        >
          <Lock size={18} />
          <span>Secure Login</span>
          <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, fontSize: "0.85rem", opacity: 0.9 }}>/ सुरक्षित लॉगिन</span>
        </motion.button>

        {/* Footer note */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <Shield size={13} color="#10B981" />
          <p style={{ fontSize: "0.65rem", color: "#6B7A8D" }}>
            100% Secure Government Portal
            {" "}<span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>/ सुरक्षित सरकारी पोर्टल</span>
          </p>
        </div>

        {/* UIDAI + NIC badges */}
        <div className="flex items-center justify-center gap-3 mt-3">
          {["UIDAI", "NIC", "ICDS"].map(badge => (
            <div key={badge} className="px-2 py-1 rounded-full" style={{ background: "#F5EDE2", border: "1px solid rgba(26,46,74,0.1)" }}>
              <span style={{ fontSize: "0.55rem", color: "#6B7A8D", fontWeight: 600 }}>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
