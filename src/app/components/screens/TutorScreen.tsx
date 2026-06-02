import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Sparkles, Mic, Send, BookOpen, User, Volume2 } from "lucide-react";

interface Props {
  onBack: () => void;
}

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "user" as const,
    text: "What are the steps for acute malnutrition?",
    textHi: "तीव्र कुपोषण के लिए क्या कदम उठाए जाएं?",
  },
  {
    id: 2,
    role: "ai" as const,
    isRich: true,
  },
  {
    id: 3,
    role: "user" as const,
    text: "What's the weight threshold for SAM vs MAM?",
    textHi: "SAM और MAM के लिए वजन की सीमा क्या है?",
  },
  {
    id: 4,
    role: "ai" as const,
    isRich: false,
    text: "For SAM (Severe Acute Malnutrition): Weight-for-Height Z-score below −3 SD, or MUAC < 11.5 cm, or bilateral pitting edema.\n\nFor MAM (Moderate Acute Malnutrition): MUAC between 11.5–12.5 cm, or WHZ between −3 and −2 SD.",
    textHi: "SAM के लिए: WHZ स्कोर −3 SD से नीचे, या MUAC < 11.5 cm। MAM के लिए: MUAC 11.5–12.5 cm के बीच।",
    citation: "ICDS Operational Guidelines, Sec. 3.2",
  },
];

function AIRichResponse() {
  return (
    <div>
      {/* Header */}
      <p className="font-bold mb-2.5" style={{ fontSize: "0.88rem", color: "#1A2E4A" }}>
        Treatment Protocol{" "}
        <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, fontSize: "0.72rem", color: "#6B7A8D" }}>
          / उपचार प्रोटोकॉल
        </span>
      </p>

      {/* Bulleted protocol steps */}
      <div className="flex flex-col gap-2 mb-3">
        {[
          {
            step: "F-75 Therapeutic Milk",
            stepHi: "F-75 चिकित्सीय दूध",
            detail: "Start with 100 kcal/kg/day during stabilization phase. Administer every 2–3 hours.",
          },
          {
            step: "RUTF Distribution",
            stepHi: "RUTF वितरण",
            detail: "Ready-to-Use Therapeutic Food (Plumpy'Nut): 175–220 kcal/kg/day in rehabilitation phase.",
          },
          {
            step: "Micronutrient Supplementation",
            stepHi: "सूक्ष्म पोषक तत्व अनुपूरण",
            detail: "Vitamin A, Zinc, Folic Acid. Begin on Day 2; avoid iron supplementation during stabilization.",
          },
          {
            step: "MUAC Monitoring",
            stepHi: "MUAC निगरानी",
            detail: "Measure mid-upper arm circumference weekly. Discharge criteria: MUAC ≥ 12.5 cm for 2 consecutive weeks.",
          },
          {
            step: "Caregiver Counseling",
            stepHi: "देखभाल कर्ता परामर्श",
            detail: "Provide IYCF counseling. Schedule follow-up home visit within 72 hours of discharge.",
          },
        ].map((item, i) => (
          <div key={i} className="flex gap-2.5">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold"
              style={{ background: "#E86B2E", color: "#fff", fontSize: "0.55rem" }}
            >
              {i + 1}
            </div>
            <div>
              <p style={{ fontSize: "0.78rem", color: "#1A2E4A", fontWeight: 600 }}>{item.step}</p>
              <p style={{ fontSize: "0.62rem", color: "#6B7A8D", fontFamily: "'Noto Sans Devanagari', sans-serif", lineHeight: 1.4 }}>{item.stepHi}</p>
              <p style={{ fontSize: "0.68rem", color: "#374151", lineHeight: 1.5, marginTop: 1 }}>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Citation box */}
      <div
        className="rounded-xl p-3"
        style={{ background: "#EEF2FF", border: "1px solid rgba(99,102,241,0.2)" }}
      >
        <div className="flex items-start gap-2">
          <BookOpen size={14} color="#4338CA" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p className="font-bold mb-0.5" style={{ fontSize: "0.65rem", color: "#4338CA" }}>
              Reference{" "}
              <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400 }}>/ संदर्भ</span>
            </p>
            <p style={{ fontSize: "0.65rem", color: "#3730A3", lineHeight: 1.5 }}>
              Citation: Ministry of Women & Child Development Handbook, Chapter 4.
            </p>
            <p style={{ fontSize: "0.58rem", color: "#6366F1", fontFamily: "'Noto Sans Devanagari', sans-serif", lineHeight: 1.4, marginTop: 2 }}>
              संदर्भ: महिला एवं बाल विकास मंत्रालय हैंडबुक, अध्याय 4
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TutorScreen({ onBack }: Props) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setIsTyping(true);
    setInput("");
    setTimeout(() => setIsTyping(false), 2000);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#FDF6EE" }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3" style={{ background: "#1A2E4A" }}>
        <button onClick={onBack}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
            <ArrowLeft size={16} color="#fff" />
          </div>
        </button>
        <div className="flex-1 flex items-center gap-2.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366F1, #818CF8)" }}
          >
            <Sparkles size={18} color="#fff" />
          </div>
          <div>
            <p className="text-white font-bold" style={{ fontSize: "0.92rem" }}>
              AI Tutor{" "}
              <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 400, fontSize: "0.72rem", opacity: 0.7 }}>/ AI ट्यूटर</span>
            </p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10B981" }} />
              <p style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.5)" }}>RAG · ICDS Knowledge Base</p>
            </div>
          </div>
        </div>
        <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
          <Volume2 size={16} color="rgba(255,255,255,0.7)" />
        </button>
      </div>

      {/* Topic chips */}
      <div className="px-4 py-2.5 flex gap-2 overflow-x-auto" style={{ background: "rgba(26,46,74,0.05)", scrollbarWidth: "none", borderBottom: "1px solid rgba(26,46,74,0.08)" }}>
        {["Malnutrition", "Immunisation", "Ante-natal", "IYCF", "Growth Monitoring"].map(topic => (
          <button key={topic}
            className="flex-shrink-0 px-2.5 py-1 rounded-full font-medium"
            style={{ background: "#FEF0E4", color: "#E86B2E", fontSize: "0.62rem", border: "1px solid rgba(232,107,46,0.25)" }}>
            {topic}
          </button>
        ))}
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4" style={{ scrollbarWidth: "none" }}>
        {INITIAL_MESSAGES.map(msg => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 self-end"
              style={{
                background: msg.role === "ai"
                  ? "linear-gradient(135deg, #6366F1, #818CF8)"
                  : "#E86B2E",
              }}
            >
              {msg.role === "ai" ? <Sparkles size={14} color="#fff" /> : <User size={14} color="#fff" />}
            </div>

            {/* Bubble */}
            <div style={{ maxWidth: "78%" }}>
              {msg.role === "user" ? (
                <div
                  className="px-4 py-3 rounded-2xl rounded-br-md"
                  style={{ background: "#1A2E4A", boxShadow: "0 2px 8px rgba(26,46,74,0.2)" }}
                >
                  <p style={{ fontSize: "0.82rem", color: "#fff", lineHeight: 1.6 }}>{msg.text}</p>
                  <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", fontFamily: "'Noto Sans Devanagari', sans-serif", marginTop: 3 }}>{msg.textHi}</p>
                </div>
              ) : msg.isRich ? (
                <div
                  className="px-4 py-3.5 rounded-2xl rounded-bl-md"
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(99,102,241,0.15)",
                    boxShadow: "0 2px 12px rgba(26,46,74,0.06)",
                  }}
                >
                  <AIRichResponse />
                </div>
              ) : (
                <div
                  className="px-4 py-3 rounded-2xl rounded-bl-md"
                  style={{ background: "#fff", border: "1px solid rgba(26,46,74,0.08)", boxShadow: "0 2px 8px rgba(26,46,74,0.05)" }}
                >
                  <p style={{ fontSize: "0.78rem", color: "#1A2E4A", lineHeight: 1.65, whiteSpace: "pre-line" }}>{msg.text}</p>
                  <p style={{ fontSize: "0.62rem", color: "#6B7A8D", fontFamily: "'Noto Sans Devanagari', sans-serif", marginTop: 4 }}>{msg.textHi}</p>
                  {msg.citation && (
                    <div className="mt-2 px-2 py-1.5 rounded-lg flex items-center gap-1.5" style={{ background: "#EEF2FF" }}>
                      <BookOpen size={11} color="#4338CA" />
                      <p style={{ fontSize: "0.6rem", color: "#4338CA" }}>{msg.citation}</p>
                    </div>
                  )}
                </div>
              )}
              <p style={{ fontSize: "0.55rem", color: "#9CA3AF", marginTop: 3, paddingLeft: msg.role === "user" ? 0 : 4, textAlign: msg.role === "user" ? "right" : "left" }}>
                {msg.role === "ai" ? "AI Tutor · ICDS RAG" : "You · Today"}
              </p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-2.5"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366F1, #818CF8)" }}>
                <Sparkles size={14} color="#fff" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5"
                style={{ background: "#fff", border: "1px solid rgba(26,46,74,0.08)" }}>
                {[0, 0.2, 0.4].map((delay, i) => (
                  <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay }}
                    className="w-2 h-2 rounded-full" style={{ background: "#6366F1" }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed Input Bar */}
      <div
        className="px-4 py-3 flex-shrink-0"
        style={{
          background: "#fff",
          borderTop: "1px solid rgba(26,46,74,0.08)",
          boxShadow: "0 -4px 16px rgba(26,46,74,0.06)",
        }}
      >
        {/* Voice hint */}
        <p className="mb-2 text-center" style={{ fontSize: "0.58rem", color: "#9CA3AF" }}>
          Ask in Hindi or English • हिंदी या अंग्रेजी में पूछें
        </p>

        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-2xl"
          style={{ background: "#FDF6EE", border: "1.5px solid rgba(26,46,74,0.12)" }}
        >
          <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#EEF2FF" }}>
            <Sparkles size={14} color="#6366F1" />
          </div>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Ask a follow-up question..."
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: "0.82rem", color: "#1A2E4A" }}
          />
          {/* Microphone button - prominent, right side of input */}
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
            style={{ background: "#FEF0E4", border: "1px solid rgba(232,107,46,0.25)" }}
          >
            <Mic size={17} color="#E86B2E" />
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
            style={{
              background: input.trim() ? "#E86B2E" : "rgba(26,46,74,0.08)",
            }}
          >
            <Send size={15} color={input.trim() ? "#fff" : "#9CA3AF"} />
          </button>
        </div>
      </div>
    </div>
  );
}
