import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Hash, WifiOff, CheckCircle2 } from "lucide-react";

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
        <p style={{ fontSize: "0.65rem", color: "#E86B2E", fontWeight: 600 }}>Identity Verification / पहचान सत्यापन</p>
      </div>
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex-1 flex flex-col gap-1">
            <div className="h-2 rounded-full transition-all"
              style={{ background: i < current ? "#E86B2E" : "rgba(26,46,74,0.12)" }} />
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full flex items-center justify-center font-bold"
                style={{ background: i < current ? "#E86B2E" : "rgba(26,46,74,0.1)", color: i < current ? "#fff" : "#6B7A8D", fontSize: "0.5rem" }}>
                {i < current - 1 ? "✓" : i + 1}
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

const SCAN_DURATION = 3500;

export function KYCScreen({ onNext, onBack }: Props) {
  const [aadhaar, setAadhaar] = useState("123412341234");
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanDone, setScanDone] = useState(false);
  const [scanLineY, setScanLineY] = useState(-80);
  const [scanLineDir, setScanLineDir] = useState(1);
  const canVerify = aadhaar.replace(/\D/g, "").length === 12;

  const formatAadhaar = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 12);
    return d.replace(/(\d{4})(\d{0,4})(\d{0,4})/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join("-")
    );
  };

  const startScan = () => {
    if (scanDone) return;
    setScanning(true);
    setScanProgress(0);
  };

  useEffect(() => {
    if (!scanning) return;
    const interval = setInterval(() => {
      setScanProgress(p => {
        const next = p + (100 / (SCAN_DURATION / 60));
        if (next >= 100) { setScanning(false); setScanDone(true); clearInterval(interval); return 100; }
        return next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [scanning]);

  useEffect(() => {
    if (!scanning) return;
    const lineInterval = setInterval(() => {
      setScanLineY(y => {
        const next = y + scanLineDir * 3;
        if (next > 78 || next < -78) setScanLineDir(d => -d);
        return next;
      });
    }, 25);
    return () => clearInterval(lineInterval);
  }, [scanning, scanLineDir]);

  const circumference = 2 * Math.PI * 90;
  const strokeDash = circumference - (circumference * scanProgress) / 100;

  return (
    <div className="flex flex-col h-full" style={{ background: "#FDF6EE" }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3" style={{ background: "#1A2E4A" }}>
        <button onClick={onBack}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
            <ArrowLeft size={16} color="#fff" />
          </div>
        </button>
        <div>
          <h2 className="text-white font-bold" style={{ fontSize: "1rem" }}>
            Identity Verification{" "}
            <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, fontSize: "0.8rem", opacity: 0.7 }}>/ पहचान सत्यापन</span>
          </h2>
        </div>
      </div>

      <StepProgress current={2} total={3} />

      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-6" style={{ scrollbarWidth: "none" }}>
        {/* Aadhaar Input */}
        <div className="bg-card rounded-2xl p-4 mb-5" style={{ boxShadow: "0 4px 20px rgba(26,46,74,0.08)", border: "1px solid rgba(26,46,74,0.06)" }}>
          <label className="block mb-2 font-semibold" style={{ fontSize: "0.78rem", color: "#1A2E4A" }}>
            Government ID / Aadhaar Number{" "}
            <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, color: "#6B7A8D", fontSize: "0.65rem" }}>/ आधार संख्या</span>
          </label>
          <div
            className="flex items-center gap-2 px-3 py-3.5 rounded-xl"
            style={{ border: `2px solid ${canVerify ? "#10B981" : "rgba(26,46,74,0.15)"}`, background: "#FDF6EE" }}
          >
            <Hash size={16} color={canVerify ? "#10B981" : "#6B7A8D"} />
            <input
              type="tel"
              value={formatAadhaar(aadhaar)}
              onChange={e => setAadhaar(e.target.value.replace(/\D/g, ""))}
              placeholder="XXXX-XXXX-XXXX"
              className="flex-1 bg-transparent outline-none font-mono"
              style={{ fontSize: "1rem", color: "#1A2E4A", letterSpacing: "0.08em" }}
            />
            {canVerify && <CheckCircle2 size={18} color="#10B981" />}
          </div>

          {/* 12-digit progress */}
          <div className="flex gap-0.5 mt-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex-1 h-1 rounded-full transition-all"
                style={{ background: i < aadhaar.replace(/\D/g, "").length ? "#E86B2E" : "rgba(26,46,74,0.1)" }} />
            ))}
          </div>
        </div>

        {/* Camera Viewfinder */}
        <div className="flex flex-col items-center mb-5">
          <p className="font-semibold mb-1.5" style={{ fontSize: "0.82rem", color: "#1A2E4A" }}>
            Face Verification{" "}
            <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, color: "#6B7A8D", fontSize: "0.72rem" }}>/ चेहरा सत्यापन</span>
          </p>
          <p style={{ fontSize: "0.65rem", color: "#6B7A8D", marginBottom: 16 }}>
            Position face inside the circle for local validation
            <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", display: "block", fontSize: "0.6rem" }}>
              सत्यापन के लिए चेहरा वृत्त में रखें
            </span>
          </p>

          {/* Outer ring with animated progress */}
          <div
            className="relative flex items-center justify-center cursor-pointer"
            style={{ width: 220, height: 220 }}
            onClick={startScan}
          >
            {/* SVG progress ring */}
            <svg width="220" height="220" viewBox="0 0 220 220" className="absolute inset-0">
              {/* Outer decorative ring */}
              <circle cx="110" cy="110" r="105" fill="none" stroke="rgba(26,46,74,0.08)" strokeWidth="2" strokeDasharray="4 6" />
              {/* Progress track */}
              <circle cx="110" cy="110" r="90" fill="none" stroke="rgba(26,46,74,0.1)" strokeWidth="4" />
              {/* Progress arc */}
              {(scanning || scanDone) && (
                <circle cx="110" cy="110" r="90" fill="none"
                  stroke={scanDone ? "#10B981" : "#E86B2E"}
                  strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDash}
                  transform="rotate(-90 110 110)"
                  style={{ transition: "stroke-dashoffset 0.06s linear, stroke 0.4s" }}
                />
              )}
            </svg>

            {/* Rotating dashed ring */}
            <motion.div
              animate={{ rotate: scanning ? 360 : 0 }}
              transition={{ duration: 6, repeat: scanning ? Infinity : 0, ease: "linear" }}
              className="absolute"
              style={{ width: 196, height: 196, border: "2px dashed rgba(232,107,46,0.35)", borderRadius: "50%" }}
            />

            {/* Main circle (camera area) */}
            <div
              className="relative flex items-center justify-center overflow-hidden"
              style={{
                width: 178,
                height: 178,
                borderRadius: "50%",
                background: scanDone ? "#F0FDF9" : "#0E1828",
                border: `3px solid ${scanDone ? "#10B981" : scanning ? "#E86B2E" : "rgba(26,46,74,0.3)"}`,
                boxShadow: scanning
                  ? `0 0 0 4px rgba(232,107,46,0.2), 0 0 20px rgba(232,107,46,0.3)`
                  : scanDone
                  ? `0 0 0 4px rgba(16,185,129,0.2)`
                  : "none",
              }}
            >
              {!scanDone ? (
                <>
                  {/* Face silhouette */}
                  <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
                    <ellipse cx="50" cy="52" rx="30" ry="36" fill="rgba(255,255,255,0.12)" />
                    <ellipse cx="50" cy="36" rx="30" ry="16" fill="rgba(255,255,255,0.08)" />
                    <ellipse cx="36" cy="50" rx="4" ry="3.5" fill="rgba(255,255,255,0.3)" />
                    <ellipse cx="64" cy="50" rx="4" ry="3.5" fill="rgba(255,255,255,0.3)" />
                    <path d="M42 62 Q50 68 58 62" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <ellipse cx="50" cy="85" rx="28" ry="16" fill="rgba(255,255,255,0.06)" />
                  </svg>

                  {/* Scanning line */}
                  {scanning && (
                    <div
                      className="absolute left-4 right-4 pointer-events-none"
                      style={{
                        top: `calc(50% + ${scanLineY}px)`,
                        height: 2,
                        background: "linear-gradient(90deg, transparent, rgba(232,107,46,0.9) 20%, rgba(232,107,46,1) 50%, rgba(232,107,46,0.9) 80%, transparent)",
                        boxShadow: "0 0 8px rgba(232,107,46,0.7)",
                        transition: "top 0.025s linear",
                      }}
                    />
                  )}

                  {/* Corner reticle brackets */}
                  {[
                    { top: 10, left: 10, borderTop: true, borderLeft: true },
                    { top: 10, right: 10, borderTop: true, borderRight: true },
                    { bottom: 10, left: 10, borderBottom: true, borderLeft: true },
                    { bottom: 10, right: 10, borderBottom: true, borderRight: true },
                  ].map((pos, i) => (
                    <div key={i} className="absolute w-6 h-6" style={{
                      ...pos,
                      borderStyle: "solid",
                      borderColor: scanning ? "#E86B2E" : "rgba(255,255,255,0.5)",
                      borderWidth: 0,
                      borderTopWidth: pos.borderTop ? 2 : 0,
                      borderBottomWidth: pos.borderBottom ? 2 : 0,
                      borderLeftWidth: pos.borderLeft ? 2 : 0,
                      borderRightWidth: pos.borderRight ? 2 : 0,
                    }} />
                  ))}

                  {/* Click to scan hint */}
                  {!scanning && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                      <div className="px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }}>
                        <p style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.6)" }}>Tap to begin scan</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="flex flex-col items-center gap-2"
                >
                  <CheckCircle2 size={52} color="#10B981" strokeWidth={2} />
                  <p style={{ fontSize: "0.7rem", color: "#10B981", fontWeight: 700 }}>Verified</p>
                  <p style={{ fontSize: "0.58rem", color: "#6B7A8D", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>सत्यापित</p>
                </motion.div>
              )}
            </div>

            {/* Scan % label */}
            {(scanning || scanDone) && (
              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full"
                style={{ background: scanDone ? "#D1FAE5" : "#FEF0E4", border: `1px solid ${scanDone ? "#10B981" : "#E86B2E"}40` }}
              >
                <span style={{ fontSize: "0.65rem", color: scanDone ? "#059669" : "#E86B2E", fontWeight: 700 }}>
                  {Math.round(scanProgress)}% {scanDone ? "Match" : "Scanning..."}
                </span>
              </div>
            )}
          </div>

          {/* Offline badge */}
          <div className="flex items-center gap-1.5 mt-8 px-3 py-1.5 rounded-full"
            style={{ background: "#FEF0E4", border: "1px solid rgba(232,107,46,0.25)" }}>
            <WifiOff size={12} color="#E86B2E" />
            <p style={{ fontSize: "0.62rem", color: "#E86B2E", fontWeight: 500 }}>Local validation. Data syncs to the central database when internet is available.</p>
          </div>
        </div>

        {/* Photo Comparison Section (appears after scan completes) */}
        {scanDone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-5"
          >
            {/* Photo Comparison Row */}
            <div className="flex gap-3 mb-4">
              {/* Aadhaar Photo */}
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <p style={{ fontSize: "0.7rem", color: "#1A2E4A", fontWeight: 600 }}>Aadhaar Photo</p>
                  <span className="px-2 py-1 rounded-lg" style={{ background: "#FEF0E4", fontSize: "0.5rem", color: "#E86B2E", fontWeight: 700 }}>
                    UIDAI
                  </span>
                </div>
                <div
                  className="relative rounded-xl overflow-hidden border-2 aspect-square flex items-center justify-center"
                  style={{ background: "#F5EDE2", borderColor: "#E86B2E" }}
                >
                  {/* Placeholder face */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-b from-yellow-200 to-yellow-300 flex items-center justify-center">
                    <svg width="40" height="48" viewBox="0 0 40 48" fill="none">
                      <ellipse cx="20" cy="14" rx="8" ry="10" fill="#8B5A2B" />
                      <ellipse cx="20" cy="25" rx="12" ry="14" fill="#D4956A" />
                      <ellipse cx="16" cy="24" rx="1.5" ry="2" fill="#1A1A1A" />
                      <ellipse cx="24" cy="24" rx="1.5" ry="2" fill="#1A1A1A" />
                      <path d="M18 30 Q20 32 22 30" stroke="#8B5A2B" strokeWidth="1" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p style={{ position: "absolute", top: 8, fontSize: "0.65rem", color: "#6B7A8D" }}>SAMITA DEVI</p>
                </div>
              </div>

              {/* Live Camera */}
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <p style={{ fontSize: "0.7rem", color: "#1A2E4A", fontWeight: 600 }}>Live Camera</p>
                  <span className="px-2 py-1 rounded-lg animate-pulse" style={{ background: "#FEE2E2", fontSize: "0.5rem", color: "#EF4444", fontWeight: 700 }}>
                    ● LIVE
                  </span>
                </div>
                <div
                  className="relative rounded-xl overflow-hidden border-2 aspect-square flex items-center justify-center"
                  style={{ background: "#1A2E4A", borderColor: "#E86B2E" }}
                >
                  {/* Placeholder face */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-b from-yellow-200 to-yellow-300 flex items-center justify-center">
                    <svg width="40" height="48" viewBox="0 0 40 48" fill="none">
                      <ellipse cx="20" cy="14" rx="8" ry="10" fill="#8B5A2B" />
                      <ellipse cx="20" cy="25" rx="12" ry="14" fill="#D4956A" />
                      <ellipse cx="16" cy="24" rx="1.5" ry="2" fill="#1A1A1A" />
                      <ellipse cx="24" cy="24" rx="1.5" ry="2" fill="#1A1A1A" />
                      <path d="M18 30 Q20 32 22 30" stroke="#8B5A2B" strokeWidth="1" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Match Confidence */}
            <div className="mb-4 p-3 rounded-xl" style={{ background: "#F0FDF9", border: "1px solid #D1FAE5" }}>
              <div className="flex items-center justify-between mb-2">
                <p style={{ fontSize: "0.75rem", color: "#1A2E4A", fontWeight: 600 }}>Match Confidence</p>
                <span style={{ fontSize: "0.8rem", color: "#10B981", fontWeight: 700 }}>94%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(16,185,129,0.2)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "94%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full"
                  style={{ background: "linear-gradient(90deg, #10B981, #059669)" }}
                />
              </div>
            </div>

            {/* Identity Verified Status */}
            <div className="p-3 rounded-xl flex items-center gap-3 mb-4" style={{ background: "#F0FDF9", border: "2px solid #10B981" }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#10B981" }}>
                <CheckCircle2 size={16} color="#fff" strokeWidth={3} />
              </div>
              <div className="flex-1">
                <p style={{ fontSize: "0.75rem", color: "#10B981", fontWeight: 700 }}>Identity Verified</p>
                <p style={{ fontSize: "0.65rem", color: "#6B7A8D", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>पहचान सत्यापित</p>
              </div>
            </div>

            {/* Data Saved Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-3 rounded-xl" style={{ background: "#EEF2FF", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <p style={{ fontSize: "0.7rem", color: "#4338CA", fontWeight: 600, marginBottom: 6 }}>
                Data Saved & Verified Locally
              </p>
              <p style={{ fontSize: "0.65rem", color: "#3730A3", lineHeight: 1.4, marginBottom: 4 }}>
                Saved locally now. It will sync to the central database when internet is available.
              </p>
              <p style={{ fontSize: "0.65rem", color: "#3730A3", fontFamily: "'Noto Sans Devanagari', sans-serif", lineHeight: 1.4 }}>
                डेटा स्थानीय रूप से सहेजा और सत्यापित किया गया है।<br/>
                <span style={{ fontSize: "0.6rem", opacity: 0.8 }}>केंद्रीय डेटाबेस में उपलब्ध होने पर सर्वर पर सिंक होगा।</span>
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Verify Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => { if (canVerify && scanDone && !scanning) { onNext(); } }}
          disabled={!canVerify || !scanDone || scanning}
          className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
          style={{
            background: canVerify && scanDone && !scanning ? "#E86B2E" : "#D4C4B5",
            color: "#fff",
            fontSize: "0.92rem",
            boxShadow: canVerify && scanDone && !scanning ? "0 6px 20px rgba(232,107,46,0.38)" : "none",
            borderRadius: 50,
            cursor: canVerify && scanDone && !scanning ? "pointer" : "not-allowed",
          }}
        >
          {scanning ? (
            <>
              <div className="w-5 h-5 rounded-full border-2 animate-spin" style={{ borderColor: "#fff", borderTopColor: "transparent" }} />
              Verifying... / सत्यापित हो रहा है
            </>
          ) : canVerify && scanDone ? (
            <>
              <CheckCircle2 size={17} />
              Continue{" "}
              <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, fontSize: "0.78rem", opacity: 0.85 }}>/ जारी रखें</span>
            </>
          ) : (
            <>
              <WifiOff size={17} />
              Complete All Steps{" "}
              <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, fontSize: "0.78rem", opacity: 0.85 }}>/ सभी चरण पूरे करें</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
