import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, MessageSquare, RefreshCw, CheckCircle2, ChevronRight } from "lucide-react";

type Lang = "en" | "hi";

interface Props {
  lang: Lang;
  onNext: () => void;
  onBack: () => void;
}

const labels = {
  en: {
    heading: "OTP Verification",
    sub: "A secure notification has been sent to your Aadhaar-linked mobile number",
    maskedNumber: "Linked to: +91 ••••••3210",
    otpLabel: "Enter the 6-digit OTP",
    resendIn: "Resend in",
    resend: "Resend Notification",
    verify: "Verify & Continue",
    secured: "This OTP is valid for 10 minutes only.",
    notReceived: "Didn't receive the notification?",
    smsNote: "OTP delivered via SMS & UIDAI notification",
  },
  hi: {
    heading: "OTP सत्यापन",
    sub: "आपके आधार-लिंक्ड मोबाइल नंबर पर एक सुरक्षित सूचना भेजी गई है",
    maskedNumber: "लिंक्ड: +91 ••••••3210",
    otpLabel: "6 अंकों का OTP दर्ज करें",
    resendIn: "पुनः भेजें",
    resend: "सूचना पुनः भेजें",
    verify: "सत्यापित करें और जारी रखें",
    secured: "यह OTP केवल 10 मिनट के लिए वैध है।",
    notReceived: "सूचना नहीं मिली?",
    smsNote: "OTP SMS और UIDAI सूचना द्वारा दिया गया",
  },
};

const COUNTDOWN_START = 59;

export function OTPScreen({ lang, onNext, onBack }: Props) {
  const tx = labels[lang];
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [countdown, setCountdown] = useState(COUNTDOWN_START);
  const [canResend, setCanResend] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  useEffect(() => {
    if (countdown <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      const next = [...otp];
      next[i - 1] = "";
      setOtp(next);
      refs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = Array(6).fill("");
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    refs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleResend = () => {
    setOtp(Array(6).fill(""));
    setCountdown(COUNTDOWN_START);
    setCanResend(false);
    refs.current[0]?.focus();
  };

  const isComplete = otp.every(d => d !== "");
  const mm = String(Math.floor(countdown / 60)).padStart(1, "0");
  const ss = String(countdown % 60).padStart(2, "0");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="relative overflow-hidden px-5 pt-10 pb-8"
        style={{ background: "linear-gradient(145deg, #1A365D 0%, #243F6E 100%)" }}
      >
        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full" style={{ background: "rgba(224,123,42,0.12)" }} />
        <button onClick={onBack} className="mb-4 relative z-10">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
            <ArrowLeft size={16} color="#fff" />
          </div>
        </button>

        <div className="relative z-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <MessageSquare size={28} color="#fff" />
          </div>
          <h2 className="text-white font-bold mb-1" style={{ fontSize: "1.15rem" }}>{tx.heading}</h2>
          <p className="text-blue-200" style={{ fontSize: "0.68rem", lineHeight: 1.55, maxWidth: 260 }}>{tx.sub}</p>

          {/* Masked number chip */}
          <div
            className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
          >
            <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{tx.maskedNumber}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 overflow-y-auto" style={{ background: "#F0F4FA", scrollbarWidth: "none" }}>

        {/* SMS delivery note */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl mb-5"
          style={{ background: "#DCFCE7", border: "1px solid rgba(22,163,74,0.2)" }}
        >
          <CheckCircle2 size={14} color="#16A34A" />
          <p style={{ fontSize: "0.65rem", color: "#15803D", fontWeight: 500 }}>{tx.smsNote}</p>
        </div>

        <p className="font-semibold mb-3" style={{ fontSize: "0.82rem", color: "#0F1F3D" }}>{tx.otpLabel}</p>

        {/* 6 OTP Boxes */}
        <div className="flex gap-2 mb-4 justify-between">
          {otp.map((digit, i) => (
            <motion.div
              key={i}
              animate={{
                borderColor: digit
                  ? "#1A365D"
                  : i === otp.findIndex(d => d === "")
                  ? "#E07B2A"
                  : "rgba(26,54,93,0.15)",
                scale: digit ? 1.04 : 1,
              }}
              transition={{ duration: 0.15 }}
              className="flex-1 relative"
              style={{
                height: 56,
                borderRadius: 14,
                border: "2px solid",
                background: digit ? "#fff" : "#F7F9FC",
                boxShadow: digit ? "0 2px 10px rgba(26,54,93,0.12)" : "none",
              }}
            >
              <input
                ref={el => { refs.current[i] = el; }}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                onPaste={handlePaste}
                className="absolute inset-0 w-full h-full text-center bg-transparent outline-none font-bold"
                style={{
                  fontSize: "1.25rem",
                  color: "#1A365D",
                  caretColor: "#E07B2A",
                  borderRadius: 14,
                }}
              />
              {!digit && (
                <div
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                  style={{ background: "rgba(26,54,93,0.2)" }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Countdown */}
        <div className="flex items-center justify-between mb-6">
          <p style={{ fontSize: "0.65rem", color: "#5A6A85" }}>{tx.secured}</p>
          {!canResend ? (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: "#EEF2FF" }}
            >
              <div className="w-3 h-3 relative">
                <svg viewBox="0 0 12 12" className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="6" cy="6" r="5" fill="none" stroke="rgba(26,54,93,0.15)" strokeWidth="1.5" />
                  <circle
                    cx="6" cy="6" r="5"
                    fill="none"
                    stroke="#1A365D"
                    strokeWidth="1.5"
                    strokeDasharray={31.4}
                    strokeDashoffset={31.4 * (1 - countdown / COUNTDOWN_START)}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span style={{ fontSize: "0.68rem", color: "#1A365D", fontWeight: 600 }}>
                {mm}:{ss}
              </span>
            </div>
          ) : (
            <button
              onClick={handleResend}
              className="flex items-center gap-1.5 font-semibold transition-all"
              style={{ color: "#E07B2A", fontSize: "0.72rem" }}
            >
              <RefreshCw size={13} /> {tx.resend}
            </button>
          )}
        </div>

        {/* Divider and didn't receive note */}
        {canResend && (
          <div className="text-center mb-4">
            <p style={{ fontSize: "0.65rem", color: "#5A6A85" }}>{tx.notReceived}</p>
          </div>
        )}

        {/* Verify Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={!isComplete}
          onClick={onNext}
          className="w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
          style={{
            background: isComplete
              ? "linear-gradient(135deg, #1A365D 0%, #243F6E 100%)"
              : "#D1D9E6",
            color: isComplete ? "#fff" : "#8FA0B8",
            fontSize: "0.9rem",
            boxShadow: isComplete ? "0 4px 18px rgba(26,54,93,0.28)" : "none",
          }}
        >
          <CheckCircle2 size={17} /> {tx.verify} <ChevronRight size={16} />
        </motion.button>

        {/* UIDAI note */}
        <p className="text-center mt-4" style={{ fontSize: "0.58rem", color: "#8FA0B8" }}>
          This OTP is generated by UIDAI and is completely secure.
        </p>
      </div>
    </div>
  );
}
