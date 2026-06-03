import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Camera, CheckCircle2, XCircle, Wifi } from "lucide-react";

type Lang = "en" | "hi";

interface Props {
  lang: Lang;
  onNext: () => void;
  onBack: () => void;
}

const labels = {
  en: {
    heading: "Live Face Verification",
    instruction: "Position your face within the circle",
    instructionSub: "Look straight at the camera in good lighting",
    verifying: "Verifying live face identity with Aadhaar registry...",
    matchLabel: "Match Confidence",
    aadhaarPhoto: "Aadhaar Photo",
    liveCamera: "Live Camera",
    analyzing: "Analyzing facial biometrics...",
    scanComplete: "Identity Verified",
    continueBtn: "Continue",
    tips: ["Remove glasses if possible", "Ensure good lighting", "Keep face still"],
    statusSteps: ["Detecting face...", "Mapping biometrics...", "Comparing with registry...", "Identity verified!"],
  },
  hi: {
    heading: "लाइव चेहरा सत्यापन",
    instruction: "अपने चेहरे को वृत्त के भीतर रखें",
    instructionSub: "अच्छी रोशनी में कैमरे की ओर सीधे देखें",
    verifying: "आधार रजिस्ट्री के साथ लाइव चेहरे की पहचान सत्यापित की जा रही है...",
    matchLabel: "मिलान विश्वास",
    aadhaarPhoto: "आधार फोटो",
    liveCamera: "लाइव कैमरा",
    analyzing: "चेहरे की बायोमेट्रिक्स का विश्लेषण...",
    scanComplete: "पहचान सत्यापित",
    continueBtn: "जारी रखें",
    tips: ["संभव हो तो चश्मा उतारें", "अच्छी रोशनी सुनिश्चित करें", "चेहरा स्थिर रखें"],
    statusSteps: ["चेहरा पहचाना जा रहा है...", "बायोमेट्रिक्स मैपिंग...", "रजिस्ट्री से तुलना...", "पहचान सत्यापित!"],
  },
};

const TOTAL_DURATION = 4500;
const STEPS = 4;

export function FaceRecognitionScreen({ lang, onNext, onBack }: Props) {
  const tx = labels[lang];
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [scanY, setScanY] = useState(0);
  const [scanDir, setScanDir] = useState(1);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + (100 / (TOTAL_DURATION / 80)), 100);
        setStepIndex(Math.min(Math.floor((next / 100) * STEPS), STEPS - 1));
        if (next >= 100) {
          setIsComplete(true);
          clearInterval(interval);
        }
        return next;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const scanInterval = setInterval(() => {
      setScanY(y => {
        const next = y + (scanDir * 3);
        if (next > 90 || next < -90) setScanDir(d => -d);
        return next;
      });
    }, 30);
    return () => clearInterval(scanInterval);
  }, [started, scanDir]);

  const matchPct = Math.round(progress * 0.94);
  const circumference = 2 * Math.PI * 58;
  const strokeDash = circumference - (circumference * progress) / 100;

  return (
    <div className="flex flex-col h-full relative" style={{ background: "#070D1A" }}>
      {/* Status bar area */}
      <div className="px-5 pt-10 pb-2 relative z-20">
        <button onClick={onBack} className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
            <ArrowLeft size={16} color="#fff" />
          </div>
        </button>
        <div className="flex items-center justify-between">
          <h2 className="text-white font-bold" style={{ fontSize: "1rem" }}>{tx.heading}</h2>
          <div className="flex items-center gap-1.5">
            <Wifi size={12} color="rgba(255,255,255,0.5)" />
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#16A34A" }} />
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.5)" }}>UIDAI Live</span>
          </div>
        </div>
      </div>

      {/* Camera Viewfinder Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Subtle camera grain texture */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, #0E1828 0%, #070D1A 70%, #030810 100%)",
          }}
        />

        {/* Corner brackets */}
        {[
          { top: "8%", left: "8%" },
          { top: "8%", right: "8%" },
          { bottom: "8%", left: "8%" },
          { bottom: "8%", right: "8%" },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-8 h-8"
            style={{
              ...pos,
              borderColor: "#E07B2A",
              borderStyle: "solid",
              borderWidth: 0,
              borderTopWidth: i < 2 ? 2 : 0,
              borderBottomWidth: i >= 2 ? 2 : 0,
              borderLeftWidth: i % 2 === 0 ? 2 : 0,
              borderRightWidth: i % 2 === 1 ? 2 : 0,
              borderRadius: i === 0 ? "4px 0 0 0" : i === 1 ? "0 4px 0 0" : i === 2 ? "0 0 0 4px" : "0 0 4px 0",
              opacity: 0.7,
            }}
          />
        ))}

        {/* Outer ring (animated rotation) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute"
          style={{
            width: 200,
            height: 200,
            border: "1.5px dashed rgba(224,123,42,0.45)",
            borderRadius: "50%",
          }}
        />

        {/* SVG Progress Ring */}
        <div className="absolute" style={{ width: 200, height: 200 }}>
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="58" fill="none" stroke="rgba(26,54,93,0.3)" strokeWidth="4" />
            <motion.circle
              cx="100" cy="100" r="58"
              fill="none"
              stroke={isComplete ? "#16A34A" : "#E07B2A"}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDash}
              transform="rotate(-90 100 100)"
              style={{ transition: "stroke-dashoffset 0.08s linear, stroke 0.5s ease" }}
            />
          </svg>
        </div>

        {/* Face Circle — the guide oval */}
        <div
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            width: 160,
            height: 185,
            borderRadius: "50%",
            border: `2.5px solid ${isComplete ? "#16A34A" : "rgba(255,255,255,0.3)"}`,
            background: "rgba(15,25,45,0.75)",
            boxShadow: isComplete
              ? "0 0 40px rgba(22,163,74,0.35), inset 0 0 30px rgba(22,163,74,0.12)"
              : "0 0 40px rgba(26,54,93,0.5), inset 0 0 20px rgba(26,54,93,0.3)",
          }}
        >
          {/* Simulated face */}
          <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
            {/* Face outline */}
            <ellipse cx="60" cy="65" rx="38" ry="45" fill="#D4956A" opacity="0.85" />
            {/* Hair */}
            <ellipse cx="60" cy="30" rx="38" ry="20" fill="#2D1B00" />
            <rect x="22" y="25" width="76" height="20" fill="#2D1B00" />
            {/* Dupatta hint */}
            <path d="M22 42 Q60 28 98 42" fill="#E07B2A" opacity="0.7" />
            {/* Eyes */}
            <ellipse cx="45" cy="62" rx="5" ry="4" fill="#2D1B00" />
            <ellipse cx="75" cy="62" rx="5" ry="4" fill="#2D1B00" />
            <circle cx="46.5" cy="61" r="1.5" fill="#fff" opacity="0.6" />
            <circle cx="76.5" cy="61" r="1.5" fill="#fff" opacity="0.6" />
            {/* Nose */}
            <path d="M57 70 Q60 78 63 70" stroke="#A06040" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            {/* Bindi */}
            <circle cx="60" cy="57" r="2.5" fill="#DC2626" />
            {/* Mouth */}
            <path d="M50 82 Q60 90 70 82" stroke="#A06040" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>

          {/* Green tint overlay when complete */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(22,163,74,0.15)", borderRadius: "50%" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
                >
                  <CheckCircle2 size={48} color="#16A34A" strokeWidth={2.5} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scan line */}
          {!isComplete && started && (
            <div
              className="absolute left-0 right-0 pointer-events-none"
              style={{
                top: `calc(50% + ${scanY}px)`,
                height: 2,
                background: "linear-gradient(90deg, transparent 0%, rgba(224,123,42,0.8) 20%, rgba(224,123,42,0.9) 50%, rgba(224,123,42,0.8) 80%, transparent 100%)",
                boxShadow: "0 0 8px rgba(224,123,42,0.6)",
                transition: "top 0.03s linear",
              }}
            />
          )}
        </div>

        {/* Instruction text */}
        <div className="mt-6 text-center px-8">
          <p className="text-white font-medium mb-1" style={{ fontSize: "0.82rem" }}>
            {isComplete ? tx.scanComplete : tx.instruction}
          </p>
          <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.45)" }}>{tx.instructionSub}</p>
        </div>

        {/* Tips row */}
        {!isComplete && !started && (
          <div className="flex gap-3 mt-3 px-4">
            {tx.tips.map((tip, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#E07B2A" }} />
                <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.4)" }}>{tip}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: 20, opacity: 0.8 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 rounded-t-3xl p-4"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.4)",
          minHeight: 210,
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center mb-3">
          <div className="w-10 h-1 rounded-full" style={{ background: "rgba(26,54,93,0.15)" }} />
        </div>

        {/* Photo comparison row */}
        <div className="flex gap-3 mb-4">
          {/* Aadhaar Photo */}
          <div className="flex-1">
            <p className="mb-1.5 font-medium" style={{ fontSize: "0.62rem", color: "#5A6A85", textAlign: "center" }}>
              {tx.aadhaarPhoto}
            </p>
            <div
              className="rounded-xl overflow-hidden flex items-center justify-center relative"
              style={{ height: 80, background: "#EEF2FF", border: "1.5px solid rgba(26,54,93,0.12)" }}
            >
              <svg width="60" height="72" viewBox="0 0 60 72" fill="none">
                <ellipse cx="30" cy="32" rx="19" ry="22" fill="#D4956A" />
                <ellipse cx="30" cy="16" rx="19" ry="10" fill="#2D1B00" />
                <rect x="11" y="13" width="38" height="10" fill="#2D1B00" />
                <path d="M11 21 Q30 14 49 21" fill="#E07B2A" opacity="0.7" />
                <ellipse cx="22" cy="30" rx="2.5" ry="2" fill="#2D1B00" />
                <ellipse cx="38" cy="30" rx="2.5" ry="2" fill="#2D1B00" />
                <circle cx="30" cy="28" r="1.5" fill="#DC2626" />
                <path d="M25 42 Q30 46 35 42" stroke="#A06040" strokeWidth="1" fill="none" strokeLinecap="round" />
                <rect x="4" y="56" width="52" height="16" rx="3" fill="#1A365D" />
                <text x="30" y="68" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.7)" fontFamily="monospace">SUNITA DEVI</text>
              </svg>
              {/* UIDAI watermark badge */}
              <div
                className="absolute top-1 right-1 px-1 py-0.5 rounded"
                style={{ background: "#FF6B00", fontSize: "0.45rem", color: "#fff", fontWeight: 700 }}
              >
                UIDAI
              </div>
            </div>
          </div>

          {/* VS divider */}
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="w-px flex-1" style={{ background: "rgba(26,54,93,0.1)" }} />
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "#EEF2FF" }}
            >
              <Camera size={12} color="#1A365D" />
            </div>
            <div className="w-px flex-1" style={{ background: "rgba(26,54,93,0.1)" }} />
          </div>

          {/* Live Camera view */}
          <div className="flex-1">
            <p className="mb-1.5 font-medium" style={{ fontSize: "0.62rem", color: "#5A6A85", textAlign: "center" }}>
              {tx.liveCamera}
            </p>
            <div
              className="rounded-xl overflow-hidden flex items-center justify-center relative"
              style={{ height: 80, background: "#0A1020", border: "1.5px solid rgba(26,54,93,0.2)" }}
            >
              <svg width="60" height="72" viewBox="0 0 60 72" fill="none">
                <ellipse cx="30" cy="32" rx="19" ry="22" fill="#C4855A" opacity="0.9" />
                <ellipse cx="30" cy="16" rx="19" ry="10" fill="#2D1B00" opacity="0.9" />
                <rect x="11" y="13" width="38" height="10" fill="#2D1B00" />
                <path d="M11 21 Q30 14 49 21" fill="#E07B2A" opacity="0.6" />
                <ellipse cx="22" cy="30" rx="2.5" ry="2" fill="#2D1B00" />
                <ellipse cx="38" cy="30" rx="2.5" ry="2" fill="#2D1B00" />
                <circle cx="30" cy="28" r="1.5" fill="#DC2626" />
              </svg>
              {/* Live badge */}
              <div
                className="absolute top-1 left-1 flex items-center gap-1 px-1.5 py-0.5 rounded"
                style={{ background: "rgba(220,38,38,0.85)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span style={{ fontSize: "0.45rem", color: "#fff", fontWeight: 700 }}>LIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Match confidence */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <p style={{ fontSize: "0.68rem", color: "#0F1F3D", fontWeight: 600 }}>{tx.matchLabel}</p>
            <div className="flex items-center gap-1">
              {isComplete ? (
                <CheckCircle2 size={14} color="#16A34A" />
              ) : (
                <div className="w-3 h-3 rounded-full border-2 border-solid animate-spin" style={{ borderColor: "#E07B2A", borderTopColor: "transparent" }} />
              )}
              <span
                className="font-bold"
                style={{ fontSize: "0.82rem", color: isComplete ? "#16A34A" : "#E07B2A" }}
              >
                {matchPct}%
              </span>
            </div>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#EEF2FF" }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: isComplete
                  ? "linear-gradient(90deg, #16A34A, #22C55E)"
                  : "linear-gradient(90deg, #1A365D, #E07B2A)",
                width: `${progress}%`,
                transition: "width 0.08s linear",
              }}
            />
          </div>
        </div>

        {/* Status message */}
        <div className="flex items-center gap-2 mb-3">
          {isComplete ? (
            <CheckCircle2 size={14} color="#16A34A" />
          ) : (
            <div className="w-3.5 h-3.5 rounded-full border-2 animate-spin" style={{ borderColor: "#1A365D", borderTopColor: "transparent" }} />
          )}
          <p style={{ fontSize: "0.65rem", color: isComplete ? "#16A34A" : "#5A6A85", fontWeight: isComplete ? 600 : 400 }}>
            {isComplete ? tx.scanComplete : tx.verifying}
          </p>
        </div>

        <div className="mb-3 px-3 py-2 rounded-xl" style={{ background: "#F0FDF9", border: "1px solid rgba(22,163,74,0.18)" }}>
          <p style={{ fontSize: "0.62rem", color: "#166534", lineHeight: 1.35, fontWeight: 600 }}>
            Data saved locally. When internet is available, it will sync to the central database.
          </p>
        </div>

        {/* Continue Button - shows when complete */}
        <AnimatePresence>
          {isComplete && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onNext}
              className="w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #16A34A 0%, #22C55E 100%)",
                color: "#fff",
                fontSize: "0.9rem",
                boxShadow: "0 4px 16px rgba(22,163,74,0.35)",
              }}
            >
              <CheckCircle2 size={17} /> {tx.continueBtn}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
