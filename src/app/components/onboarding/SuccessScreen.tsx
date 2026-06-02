import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, User, MapPin, Shield, Hash, Building2, Calendar, ChevronRight, Download } from "lucide-react";

type Lang = "en" | "hi";

interface Props {
  lang: Lang;
  role: "aww" | "beneficiary" | "supervisor";
  onFinish: () => void;
}

const labels = {
  en: {
    congrats: "Registration Successful!",
    subtext: "Your identity has been verified and your account is now active.",
    profileSummary: "Your Profile",
    name: "Name",
    role: "Role",
    aadhaar: "Aadhaar",
    district: "District",
    workerId: "Worker ID",
    center: "Assigned Center",
    registeredOn: "Registered On",
    continueBtn: "Continue to Dashboard",
    downloadId: "Download ID Card",
    confettiNote: "बधाई हो! • Congratulations!",
    roleLabels: {
      aww: "Anganwadi Worker (AWW)",
      beneficiary: "Beneficiary",
      supervisor: "Supervisor / CDPO",
    },
  },
  hi: {
    congrats: "पंजीकरण सफल!",
    subtext: "आपकी पहचान सत्यापित हो गई है और आपका खाता अब सक्रिय है।",
    profileSummary: "आपकी प्रोफाइल",
    name: "नाम",
    role: "भूमिका",
    aadhaar: "आधार",
    district: "जिला",
    workerId: "कार्यकर्ता ID",
    center: "असाइन्ड केंद्र",
    registeredOn: "पंजीकरण दिनांक",
    continueBtn: "डैशबोर्ड पर जाएं",
    downloadId: "ID कार्ड डाउनलोड करें",
    confettiNote: "बधाई हो! • Congratulations!",
    roleLabels: {
      aww: "आंगनवाड़ी कार्यकर्ता (AWW)",
      beneficiary: "लाभार्थी",
      supervisor: "पर्यवेक्षक / CDPO",
    },
  },
};

const profileData = {
  aww: {
    name: "Sunita Devi",
    nameHi: "सुनीता देवी",
    aadhaar: "XXXX XXXX 7842",
    district: "Varanasi, Uttar Pradesh",
    workerId: "AWW-UP-2025-3847",
    center: "Shivpur Anganwadi Centre #14",
  },
  beneficiary: {
    name: "Rekha Sharma",
    nameHi: "रेखा शर्मा",
    aadhaar: "XXXX XXXX 5519",
    district: "Lucknow, Uttar Pradesh",
    workerId: "BNF-UP-2025-1129",
    center: "Aminabad PHC, Ward 7",
  },
  supervisor: {
    name: "Priya Verma (CDPO)",
    nameHi: "प्रिया वर्मा (CDPO)",
    aadhaar: "XXXX XXXX 3301",
    district: "Allahabad, Uttar Pradesh",
    workerId: "SUP-UP-2025-0047",
    center: "Block Office, Phaphamau",
  },
};

const fieldIcons = [User, Shield, MapPin, Hash, Building2, Calendar];

export function SuccessScreen({ lang, role, onFinish }: Props) {
  const tx = labels[lang];
  const profile = profileData[role];
  const [visible, setVisible] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<{ x: number; color: string; delay: number; size: number }[]>([]);

  useEffect(() => {
    const pieces = Array.from({ length: 18 }, (_, i) => ({
      x: 5 + Math.random() * 90,
      color: ["#E07B2A", "#1A365D", "#16A34A", "#DC2626", "#FCD34D", "#7C3AED"][i % 6],
      delay: Math.random() * 0.6,
      size: 4 + Math.random() * 6,
    }));
    setConfettiPieces(pieces);
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const profileFields = [
    { label: tx.name, value: lang === "hi" ? profile.nameHi : profile.name, icon: User },
    { label: tx.role, value: tx.roleLabels[role], icon: Shield },
    { label: tx.aadhaar, value: profile.aadhaar, icon: Hash },
    { label: tx.district, value: profile.district, icon: MapPin },
    { label: tx.workerId, value: profile.workerId, icon: Building2 },
    { label: tx.registeredOn, value: "02 Jun 2025", icon: Calendar },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "#F0F4FA", scrollbarWidth: "none" }}>
      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {confettiPieces.map((p, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0, scale: 0 }}
            animate={{ y: "100vh", opacity: [1, 1, 0], rotate: 360 * 3, scale: 1 }}
            transition={{ duration: 2.5, delay: p.delay, ease: "easeIn" }}
            className="absolute top-0"
            style={{ width: p.size, height: p.size, background: p.color, borderRadius: 2 }}
          />
        ))}
      </div>

      {/* Top success area */}
      <div
        className="relative overflow-hidden px-5 pt-14 pb-8 text-center"
        style={{ background: "linear-gradient(155deg, #1A365D 0%, #243F6E 60%, #1E4A8A 100%)" }}
      >
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-8" style={{ background: "#E07B2A" }} />

        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.55, duration: 0.8 }}
          className="flex justify-center mb-4 relative z-10"
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #16A34A, #22C55E)",
              boxShadow: "0 0 0 12px rgba(22,163,74,0.18), 0 0 0 24px rgba(22,163,74,0.08)",
            }}
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <CheckCircle2 size={48} color="#fff" strokeWidth={2.5} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative z-10"
        >
          <div
            className="inline-block px-4 py-1 rounded-full mb-3"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.8)" }}>{tx.confettiNote}</p>
          </div>
          <h2 className="text-white font-bold mb-2" style={{ fontSize: "1.3rem" }}>{tx.congrats}</h2>
          <p className="text-blue-200" style={{ fontSize: "0.7rem", lineHeight: 1.6, maxWidth: 260, margin: "0 auto" }}>
            {tx.subtext}
          </p>
        </motion.div>
      </div>

      {/* Profile Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mx-4 -mt-4 bg-card rounded-2xl p-4 mb-4"
        style={{ boxShadow: "0 6px 24px rgba(26,54,93,0.12)" }}
      >
        {/* Card header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#EEF2FF" }}>
              <Shield size={16} color="#1A365D" />
            </div>
            <p className="font-bold" style={{ fontSize: "0.9rem", color: "#0F1F3D" }}>{tx.profileSummary}</p>
          </div>
          <div
            className="px-2 py-1 rounded-full flex items-center gap-1"
            style={{ background: "#DCFCE7", border: "1px solid rgba(22,163,74,0.25)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#16A34A" }} />
            <span style={{ fontSize: "0.58rem", color: "#15803D", fontWeight: 600 }}>VERIFIED</span>
          </div>
        </div>

        {/* Avatar + name row */}
        <div
          className="flex items-center gap-3 p-3 rounded-xl mb-3"
          style={{ background: "#EEF2FF" }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #E07B2A, #F5A052)" }}
          >
            {(lang === "hi" ? profile.nameHi : profile.name).charAt(0)}
          </div>
          <div>
            <p className="font-bold" style={{ fontSize: "0.95rem", color: "#0F1F3D" }}>
              {lang === "hi" ? profile.nameHi : profile.name}
            </p>
            <p style={{ fontSize: "0.65rem", color: "#5A6A85" }}>{tx.roleLabels[role]}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <CheckCircle2 size={10} color="#16A34A" />
              <span style={{ fontSize: "0.58rem", color: "#16A34A", fontWeight: 600 }}>KYC Verified</span>
            </div>
          </div>
        </div>

        {/* Detail fields grid */}
        <div className="grid grid-cols-2 gap-2">
          {profileFields.slice(2).map(({ label, value, icon: Icon }, i) => (
            <div
              key={i}
              className="p-2.5 rounded-xl"
              style={{ background: "#F7F9FC", border: "1px solid rgba(26,54,93,0.07)" }}
            >
              <div className="flex items-center gap-1 mb-1">
                <Icon size={11} color="#5A6A85" />
                <p style={{ fontSize: "0.6rem", color: "#5A6A85", fontWeight: 500 }}>{label}</p>
              </div>
              <p className="font-semibold leading-tight" style={{ fontSize: "0.7rem", color: "#0F1F3D" }}>{value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mx-4 flex flex-col gap-2 mb-4"
      >
        <button
          onClick={onFinish}
          className="w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #1A365D 0%, #243F6E 100%)",
            color: "#fff",
            fontSize: "0.9rem",
            boxShadow: "0 4px 20px rgba(26,54,93,0.3)",
          }}
        >
          {tx.continueBtn} <ChevronRight size={18} />
        </button>

        <button
          className="w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-80"
          style={{
            background: "#EEF2FF",
            color: "#1A365D",
            fontSize: "0.9rem",
            border: "1.5px solid rgba(26,54,93,0.15)",
          }}
        >
          <Download size={16} /> {tx.downloadId}
        </button>
      </motion.div>

      {/* Footer note */}
      <div className="px-4 pb-4 text-center">
        <p style={{ fontSize: "0.58rem", color: "#8FA0B8", lineHeight: 1.6 }}>
          Ministry of Women & Child Development, Government of India
          {"\n"}WCD-ICDS Digital Platform v2.0
        </p>
      </div>
    </div>
  );
}
