import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, Globe } from "lucide-react";

type Lang = "en" | "hi";
type Role = "aww" | "beneficiary" | "supervisor";

interface Props {
  onNext: (role: Role, lang: Lang) => void;
}

const labels = {
  en: {
    tagline: "Mother & Child's Trusted Companion",
    chooseRole: "Who are you?",
    chooseDesc: "Select your role to begin registration",
    aww: "Anganwadi Worker",
    awwSub: "AWW / ASHA Facilitator",
    beneficiary: "Beneficiary",
    beneficiarySub: "Pregnant mother / Child (0–6 yrs)",
    supervisor: "Supervisor / CDPO",
    supervisorSub: "Block or District level officer",
    poweredBy: "Ministry of Women & Child Development, GoI",
  },
  hi: {
    tagline: "माँ और बच्चे की विश्वस्त सखी",
    chooseRole: "आप कौन हैं?",
    chooseDesc: "पंजीकरण शुरू करने के लिए अपनी भूमिका चुनें",
    aww: "आंगनवाड़ी कार्यकर्ता",
    awwSub: "AWW / आशा फेसिलिटेटर",
    beneficiary: "लाभार्थी",
    beneficiarySub: "गर्भवती माँ / बच्चा (0–6 वर्ष)",
    supervisor: "पर्यवेक्षक / CDPO",
    supervisorSub: "प्रखंड या जिला स्तरीय अधिकारी",
    poweredBy: "महिला एवं बाल विकास मंत्रालय, भारत सरकार",
  },
};

function AngansakiLogo() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="26" fill="#1A365D" />
      {/* Lotus petals */}
      <ellipse cx="26" cy="18" rx="4" ry="8" fill="rgba(255,255,255,0.9)" transform="rotate(0,26,26)" />
      <ellipse cx="26" cy="18" rx="4" ry="8" fill="rgba(255,255,255,0.7)" transform="rotate(60,26,26)" />
      <ellipse cx="26" cy="18" rx="4" ry="8" fill="rgba(255,255,255,0.7)" transform="rotate(120,26,26)" />
      <ellipse cx="26" cy="18" rx="4" ry="8" fill="rgba(255,255,255,0.9)" transform="rotate(180,26,26)" />
      <ellipse cx="26" cy="18" rx="4" ry="8" fill="rgba(255,255,255,0.7)" transform="rotate(240,26,26)" />
      <ellipse cx="26" cy="18" rx="4" ry="8" fill="rgba(255,255,255,0.7)" transform="rotate(300,26,26)" />
      {/* Center circle */}
      <circle cx="26" cy="26" r="6" fill="#E07B2A" />
      <circle cx="26" cy="26" r="3" fill="#fff" />
    </svg>
  );
}

function Illustration() {
  return (
    <svg width="280" height="180" viewBox="0 0 280 180" fill="none">
      {/* Background decorative elements */}
      <circle cx="240" cy="30" r="28" fill="#E07B2A" opacity="0.12" />
      <circle cx="40" cy="150" r="20" fill="#1A365D" opacity="0.10" />
      <circle cx="260" cy="140" r="14" fill="#E07B2A" opacity="0.15" />

      {/* Leaf decorations */}
      <ellipse cx="20" cy="60" rx="10" ry="5" fill="#16A34A" opacity="0.25" transform="rotate(-30,20,60)" />
      <ellipse cx="25" cy="65" rx="10" ry="5" fill="#16A34A" opacity="0.2" transform="rotate(-50,25,65)" />
      <ellipse cx="260" cy="80" rx="10" ry="5" fill="#16A34A" opacity="0.25" transform="rotate(30,260,80)" />
      <ellipse cx="255" cy="85" rx="10" ry="5" fill="#16A34A" opacity="0.2" transform="rotate(50,255,85)" />

      {/* Dots pattern */}
      {[0,1,2,3,4].map(i => (
        <circle key={i} cx={70 + i * 35} cy={12} r={2.5} fill="#E07B2A" opacity={0.3} />
      ))}

      {/* AWW Worker — left figure (indigo uniform) */}
      {/* Body/saree */}
      <ellipse cx="85" cy="130" rx="22" ry="40" fill="#1A365D" opacity="0.9" />
      {/* Saree border accent */}
      <ellipse cx="85" cy="130" rx="22" ry="40" stroke="#E07B2A" strokeWidth="2" fill="none" opacity="0.4" />
      {/* Head */}
      <circle cx="85" cy="78" r="18" fill="#D4956A" />
      {/* Dupatta/headscarf */}
      <path d="M67 75 Q85 55 103 75" fill="#E07B2A" opacity="0.7" />
      {/* Arms */}
      <path d="M63 105 Q50 120 55 135" stroke="#D4956A" strokeWidth="8" strokeLinecap="round" />
      <path d="M107 105 Q118 118 115 132" stroke="#D4956A" strokeWidth="8" strokeLinecap="round" />
      {/* Bindi */}
      <circle cx="85" cy="75" r="2.5" fill="#DC2626" />
      {/* Hair bun */}
      <circle cx="85" cy="62" r="8" fill="#2D1B00" />
      {/* Clipboard/tablet in hand */}
      <rect x="108" y="115" width="16" height="20" rx="2" fill="#EEF2FF" stroke="#1A365D" strokeWidth="1.5" />
      <line x1="111" y1="121" x2="121" y2="121" stroke="#1A365D" strokeWidth="1.2" />
      <line x1="111" y1="125" x2="119" y2="125" stroke="#1A365D" strokeWidth="1.2" />
      <line x1="111" y1="129" x2="121" y2="129" stroke="#E07B2A" strokeWidth="1.5" />

      {/* Mother — right figure (saffron saree) */}
      <ellipse cx="195" cy="128" rx="20" ry="38" fill="#E07B2A" opacity="0.85" />
      <ellipse cx="195" cy="128" rx="20" ry="38" stroke="#1A365D" strokeWidth="1.5" fill="none" opacity="0.3" />
      <circle cx="195" cy="79" r="17" fill="#C97840" />
      <path d="M178 77 Q195 58 212 77" fill="#DC2626" opacity="0.6" />
      <path d="M175 103 Q162 118 167 133" stroke="#C97840" strokeWidth="8" strokeLinecap="round" />
      <path d="M215 103 Q224 116 220 128" stroke="#C97840" strokeWidth="8" strokeLinecap="round" />
      <circle cx="195" cy="76" r="2" fill="#DC2626" />
      {/* Hair */}
      <ellipse cx="195" cy="65" rx="14" ry="7" fill="#2D1B00" />
      {/* Baby in arm */}
      <ellipse cx="218" cy="118" rx="9" ry="13" fill="#FDE8C8" />
      <circle cx="218" cy="107" r="7" fill="#D4956A" />
      <path d="M210 113 Q218 106 226 113" fill="#FEF3E7" opacity="0.8" />

      {/* Child — center/front */}
      <ellipse cx="140" cy="148" rx="13" ry="22" fill="#FCD34D" opacity="0.8" />
      <circle cx="140" cy="118" r="13" fill="#D4956A" />
      <path d="M127 115 Q140 105 153 115" fill="#FDE8C8" opacity="0.6" />
      {/* Little arms up (happy pose) */}
      <path d="M127 133 Q118 125 120 118" stroke="#D4956A" strokeWidth="6" strokeLinecap="round" />
      <path d="M153 133 Q162 125 160 118" stroke="#D4956A" strokeWidth="6" strokeLinecap="round" />
      {/* Happy face */}
      <circle cx="136" cy="118" r="2" fill="#2D1B00" />
      <circle cx="144" cy="118" r="2" fill="#2D1B00" />
      <path d="M136 124 Q140 128 144 124" stroke="#2D1B00" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Ground shadow */}
      <ellipse cx="140" cy="172" rx="70" ry="5" fill="#1A365D" opacity="0.06" />

      {/* Stars / sparkles */}
      <text x="130" y="45" fontSize="12" fill="#E07B2A" opacity="0.6">✦</text>
      <text x="155" y="35" fontSize="8" fill="#1A365D" opacity="0.5">✦</text>
      <text x="108" y="55" fontSize="8" fill="#E07B2A" opacity="0.5">✦</text>
    </svg>
  );
}

const roles: { id: Role; icon: string; color: string; bg: string }[] = [
  { id: "aww", icon: "👩‍⚕️", color: "#1A365D", bg: "#EEF2FF" },
  { id: "beneficiary", icon: "🤱", color: "#E07B2A", bg: "#FEF3E7" },
  { id: "supervisor", icon: "👩‍💼", color: "#16A34A", bg: "#DCFCE7" },
];

export function RoleSelectionScreen({ onNext }: Props) {
  const [lang, setLang] = useState<Lang>("en");
  const [selected, setSelected] = useState<Role | null>(null);
  const tx = labels[lang];

  return (
    <div className="flex flex-col h-full">
      {/* Header gradient */}
      <div
        className="relative overflow-hidden px-5 pt-10 pb-4"
        style={{ background: "linear-gradient(155deg, #1A365D 0%, #2A4F85 60%, #1E4A8A 100%)" }}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full" style={{ background: "rgba(224,123,42,0.18)" }} />
        <div className="absolute top-4 right-4 w-14 h-14 rounded-full" style={{ background: "rgba(224,123,42,0.12)" }} />

        {/* Language toggle */}
        <div className="flex justify-end mb-5 relative z-10">
          <div
            className="flex rounded-full p-0.5"
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
          >
            {(["en", "hi"] as Lang[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="px-3 py-1 rounded-full font-medium transition-all"
                style={{
                  background: lang === l ? "#fff" : "transparent",
                  color: lang === l ? "#1A365D" : "rgba(255,255,255,0.75)",
                  fontSize: "0.65rem",
                }}
              >
                {l === "en" ? "EN" : "हि"}
              </button>
            ))}
          </div>
        </div>

        {/* Logo + App name */}
        <div className="flex items-center gap-3 mb-3 relative z-10">
          <AngansakiLogo />
          <div>
            <h1 className="text-white font-bold" style={{ fontSize: "1.3rem", letterSpacing: "-0.01em" }}>
              Angansakhi
            </h1>
            <p className="text-blue-200" style={{ fontSize: "0.68rem" }}>{tx.tagline}</p>
          </div>
        </div>
      </div>

      {/* Illustration area */}
      <div
        className="flex justify-center items-end pt-4 pb-2"
        style={{ background: "linear-gradient(180deg, #1E4A8A 0%, #F0F4FA 40%)" }}
      >
        <Illustration />
      </div>

      {/* Role selection */}
      <div className="flex-1 px-4 pt-2 pb-4" style={{ background: "#F0F4FA" }}>
        <div className="mb-3">
          <h2 className="font-bold mb-0.5" style={{ fontSize: "1rem", color: "#0F1F3D" }}>{tx.chooseRole}</h2>
          <p style={{ fontSize: "0.72rem", color: "#5A6A85" }}>{tx.chooseDesc}</p>
        </div>

        <div className="flex flex-col gap-2.5 mb-4">
          {roles.map(({ id, icon, color, bg }) => {
            const isSelected = selected === id;
            const label = tx[id];
            const sub = tx[`${id}Sub` as keyof typeof tx] as string;
            return (
              <motion.button
                key={id}
                onClick={() => setSelected(id)}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all"
                style={{
                  background: isSelected ? color : "#fff",
                  border: `2px solid ${isSelected ? color : "rgba(26,54,93,0.10)"}`,
                  boxShadow: isSelected ? `0 4px 16px ${color}30` : "0 1px 6px rgba(26,54,93,0.06)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: isSelected ? "rgba(255,255,255,0.2)" : bg, fontSize: "1.3rem" }}
                >
                  {icon}
                </div>
                <div className="flex-1">
                  <p
                    className="font-semibold"
                    style={{ fontSize: "0.85rem", color: isSelected ? "#fff" : "#0F1F3D" }}
                  >
                    {label}
                  </p>
                  <p style={{ fontSize: "0.65rem", color: isSelected ? "rgba(255,255,255,0.75)" : "#5A6A85" }}>
                    {sub}
                  </p>
                </div>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: isSelected ? "rgba(255,255,255,0.25)" : "rgba(26,54,93,0.06)",
                    border: `2px solid ${isSelected ? "rgba(255,255,255,0.5)" : "rgba(26,54,93,0.15)"}`,
                  }}
                >
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={!selected}
          onClick={() => selected && onNext(selected, lang)}
          className="w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
          style={{
            background: selected ? "linear-gradient(135deg, #1A365D 0%, #243F6E 100%)" : "#D1D9E6",
            color: selected ? "#fff" : "#8FA0B8",
            fontSize: "0.9rem",
            boxShadow: selected ? "0 4px 16px rgba(26,54,93,0.25)" : "none",
          }}
        >
          Continue <ChevronRight size={18} />
        </motion.button>

        <p
          className="text-center mt-3"
          style={{ fontSize: "0.58rem", color: "#8FA0B8" }}
        >
          {tx.poweredBy}
        </p>
      </div>
    </div>
  );
}
