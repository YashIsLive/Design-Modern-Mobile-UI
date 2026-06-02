import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  AlertTriangle, CheckCircle2, AlertCircle, Plus, Sparkles,
  ChevronRight, Calendar, Weight, Utensils, Activity, Bell, Search
} from "lucide-react";

type Tab = "children" | "mothers";

const childCards = [
  {
    id: 1,
    name: "Aarav Sharma",
    nameHi: "आरव शर्मा",
    age: "Age 2 / 2 वर्ष",
    tag: "Severe Weight Drop",
    tagHi: "गंभीर वजन गिरावट",
    priority: "urgent" as const,
    weight: "8.2 kg",
    lastVisit: "3 days ago",
    icon: Weight,
  },
  {
    id: 2,
    name: "Priya",
    nameHi: "प्रिया",
    age: "Age 4 / 4 वर्ष",
    tag: "Missed Meal",
    tagHi: "भोजन छूटा",
    priority: "monitor" as const,
    weight: "13.1 kg",
    lastVisit: "Yesterday",
    icon: Utensils,
  },
  {
    id: 3,
    name: "Rahul",
    nameHi: "राहुल",
    age: "Age 1 / 1 वर्ष",
    tag: "Healthy / Normal",
    tagHi: "स्वस्थ / सामान्य",
    priority: "healthy" as const,
    weight: "9.4 kg",
    lastVisit: "Today",
    icon: Activity,
  },
];

const motherCards = [
  {
    id: 4,
    name: "Savita Devi",
    nameHi: "सविता देवी",
    age: "Week 28 / 28वां सप्ताह",
    tag: "BP Elevated",
    tagHi: "उच्च रक्तचाप",
    priority: "urgent" as const,
    weight: "62 kg",
    lastVisit: "5 days ago",
    icon: AlertTriangle,
  },
  {
    id: 5,
    name: "Meera Singh",
    nameHi: "मीरा सिंह",
    age: "Lactating / स्तनपान",
    tag: "Low Nutrition",
    tagHi: "कम पोषण",
    priority: "monitor" as const,
    weight: "48 kg",
    lastVisit: "2 days ago",
    icon: Utensils,
  },
  {
    id: 6,
    name: "Kavya Patel",
    nameHi: "काव्या पटेल",
    age: "Week 36 / 36वां सप्ताह",
    tag: "All Checks Clear",
    tagHi: "सभी जाँच सामान्य",
    priority: "healthy" as const,
    weight: "70 kg",
    lastVisit: "Today",
    icon: CheckCircle2,
  },
];

const PRIORITY_CONFIG = {
  urgent: {
    border: "#EF4444",
    bg: "#FEF2F2",
    badgeBg: "#FEE2E2",
    badgeText: "#DC2626",
    iconColor: "#EF4444",
    dot: "#EF4444",
    label: "Urgent",
    labelHi: "अत्यावश्यक",
  },
  monitor: {
    border: "#F59E0B",
    bg: "#FFFBEB",
    badgeBg: "#FEF3C7",
    badgeText: "#D97706",
    iconColor: "#F59E0B",
    dot: "#F59E0B",
    label: "Monitor",
    labelHi: "निगरानी",
  },
  healthy: {
    border: "#10B981",
    bg: "#F0FDF9",
    badgeBg: "#D1FAE5",
    badgeText: "#059669",
    iconColor: "#10B981",
    dot: "#10B981",
    label: "Healthy",
    labelHi: "स्वस्थ",
  },
};

function PriorityIcon({ priority }: { priority: "urgent" | "monitor" | "healthy" }) {
  const cfg = PRIORITY_CONFIG[priority];
  const icons = { urgent: AlertCircle, monitor: AlertTriangle, healthy: CheckCircle2 };
  const Icon = icons[priority];
  return <Icon size={18} color={cfg.iconColor} strokeWidth={2.5} />;
}

export function DashboardScreen({ onAddBeneficiary, onAITutor }: { onAddBeneficiary: () => void; onAITutor: () => void }) {
  const [tab, setTab] = useState<Tab>("children");
  const cards = tab === "children" ? childCards : motherCards;

  return (
    <div className="flex flex-col h-full" style={{ background: "#FDF6EE" }}>
      {/* Sub-header: Search + notifications */}
      <div className="px-4 pt-3 pb-2" style={{ background: "#1A2E4A" }}>
        <div className="flex items-center gap-2">
          <div
            className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <Search size={14} color="rgba(255,255,255,0.5)" />
            <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)" }}>
              Search beneficiaries / लाभार्थी खोजें
            </span>
          </div>
          <div className="relative">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
              <Bell size={17} color="#fff" />
            </div>
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center font-bold text-white"
              style={{ background: "#E86B2E", fontSize: "0.5rem" }}
            >3</span>
          </div>
        </div>
      </div>

      {/* Segment control */}
      <div className="px-4 py-3" style={{ background: "#1A2E4A" }}>
        <div
          className="flex rounded-2xl p-1"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          {([["children", "👶", "Children", "बालक"], ["mothers", "🤰", "Mothers", "माता"]] as const).map(([id, emoji, en, hi]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all"
              style={{
                background: tab === id ? "#E86B2E" : "transparent",
                boxShadow: tab === id ? "0 2px 10px rgba(232,107,46,0.4)" : "none",
              }}
            >
              <span style={{ fontSize: "1rem" }}>{emoji}</span>
              <span style={{ fontSize: "0.78rem", color: "#fff", fontWeight: tab === id ? 700 : 400 }}>
                {en}{" "}
                <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, fontSize: "0.7rem", opacity: 0.8 }}>({hi})</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div className="px-4 pb-3" style={{ background: "#1A2E4A" }}>
        <div className="flex gap-2">
          {[
            { label: "Total", labelHi: "कुल", val: tab === "children" ? "24" : "18", color: "#fff" },
            { label: "Urgent", labelHi: "अत्यावश्यक", val: tab === "children" ? "3" : "2", color: "#EF4444" },
            { label: "Monitor", labelHi: "निगरानी", val: tab === "children" ? "8" : "6", color: "#F59E0B" },
            { label: "Healthy", labelHi: "स्वस्थ", val: tab === "children" ? "13" : "10", color: "#10B981" },
          ].map((s, i) => (
            <div
              key={i}
              className="flex-1 text-center py-2 rounded-xl"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <p className="font-bold" style={{ color: s.color, fontSize: "1rem" }}>{s.val}</p>
              <p style={{ fontSize: "0.52rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.2 }}>
                {s.label}<br />
                <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{s.labelHi}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Card list */}
      <div
        className="flex-1 overflow-y-auto px-4 pt-4 pb-24"
        style={{ scrollbarWidth: "none", background: "#FDF6EE" }}
      >
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold" style={{ fontSize: "0.82rem", color: "#1A2E4A" }}>
            Priority List{" "}
            <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, color: "#6B7A8D", fontSize: "0.72rem" }}>/ प्राथमिकता सूची</span>
          </p>
          <button style={{ fontSize: "0.65rem", color: "#E86B2E", fontWeight: 600 }}>View All / सभी देखें</button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {cards.map((card, idx) => {
              const cfg = PRIORITY_CONFIG[card.priority];
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: cfg.bg,
                    border: `1px solid ${cfg.border}40`,
                    boxShadow: `0 2px 12px ${cfg.border}18`,
                  }}
                >
                  {/* Colored top accent strip */}
                  <div className="h-1" style={{ background: cfg.border }} />

                  <div className="p-3.5">
                    <div className="flex items-start gap-3">
                      {/* Priority icon */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: cfg.badgeBg, border: `1.5px solid ${cfg.border}40` }}
                      >
                        <PriorityIcon priority={card.priority} />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="font-bold" style={{ fontSize: "0.88rem", color: "#1A2E4A" }}>
                            {card.name}
                          </p>
                          <span
                            className="px-2 py-0.5 rounded-full font-bold flex-shrink-0"
                            style={{ background: cfg.badgeBg, color: cfg.badgeText, fontSize: "0.6rem", border: `1px solid ${cfg.border}50` }}
                          >
                            {cfg.label} / <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{cfg.labelHi}</span>
                          </span>
                        </div>
                        <p style={{ fontSize: "0.65rem", color: "#6B7A8D", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{card.nameHi}</p>
                        <p style={{ fontSize: "0.65rem", color: "#6B7A8D" }}>{card.age} · {card.weight}</p>
                      </div>
                    </div>

                    {/* Tag + action */}
                    <div className="flex items-center justify-between mt-2.5 pt-2.5" style={{ borderTop: `1px solid ${cfg.border}25` }}>
                      <div className="flex items-center gap-1.5">
                        <Icon size={13} color={cfg.iconColor} />
                        <div>
                          <p style={{ fontSize: "0.7rem", color: cfg.badgeText, fontWeight: 600 }}>{card.tag}</p>
                          <p style={{ fontSize: "0.58rem", color: cfg.iconColor, fontFamily: "'Noto Sans Devanagari', sans-serif", opacity: 0.85 }}>{card.tagHi}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={11} color="#6B7A8D" />
                        <p style={{ fontSize: "0.6rem", color: "#6B7A8D" }}>{card.lastVisit}</p>
                        <button className="ml-1 p-1 rounded-lg" style={{ background: "#1A2E4A15" }}>
                          <ChevronRight size={14} color="#1A2E4A" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Action Buttons */}
      {/* AI Tutor FAB - bottom left */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        onClick={onAITutor}
        className="absolute flex items-center gap-2 px-4 py-3 rounded-2xl font-semibold shadow-lg"
        style={{
          bottom: 20,
          left: 16,
          background: "#1A2E4A",
          color: "#fff",
          fontSize: "0.72rem",
          boxShadow: "0 6px 20px rgba(26,46,74,0.35)",
        }}
      >
        <Sparkles size={16} color="#E86B2E" />
        <div className="text-left">
          <p style={{ lineHeight: 1, fontSize: "0.72rem" }}>Ask AI Tutor</p>
          <p style={{ lineHeight: 1, fontSize: "0.58rem", opacity: 0.7, fontFamily: "'Noto Sans Devanagari', sans-serif" }}>AI ट्यूटर</p>
        </div>
      </motion.button>

      {/* Add Beneficiary FAB - bottom right */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        onClick={onAddBeneficiary}
        className="absolute flex items-center justify-center rounded-full shadow-xl"
        style={{
          bottom: 16,
          right: 16,
          width: 60,
          height: 60,
          background: "linear-gradient(135deg, #E86B2E, #F0894A)",
          boxShadow: "0 8px 24px rgba(232,107,46,0.5)",
        }}
      >
        <Plus size={28} color="#fff" strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}
