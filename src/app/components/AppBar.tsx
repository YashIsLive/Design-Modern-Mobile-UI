import { Cloud, CloudOff } from "lucide-react";

interface Props {
  isOnline: boolean;
  onToggleOnline?: () => void;
}

function MoWCDEmblem() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="17" fill="#fff" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      {/* Ashoka chakra simplified */}
      <circle cx="18" cy="18" r="10" fill="none" stroke="#1A2E4A" strokeWidth="1.5" />
      {/* 12 spokes */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 18 + 5 * Math.cos(angle);
        const y1 = 18 + 5 * Math.sin(angle);
        const x2 = 18 + 9 * Math.cos(angle);
        const y2 = 18 + 9 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1A2E4A" strokeWidth="1" />;
      })}
      <circle cx="18" cy="18" r="2.5" fill="#E86B2E" />
      {/* Mother & child silhouette */}
      <ellipse cx="18" cy="6.5" rx="2.5" ry="3" fill="#1A2E4A" opacity="0.7" />
      <path d="M15 8.5 Q18 12 21 8.5" fill="#1A2E4A" opacity="0.5" />
      {/* MoWCD text */}
      <text x="18" y="34" textAnchor="middle" fontSize="3.5" fill="rgba(255,255,255,0.9)" fontFamily="sans-serif" fontWeight="bold">MoWCD</text>
    </svg>
  );
}

function AngansakiLogo() {
  return (
    <div className="flex flex-col items-center">
      <span style={{ color: "#fff", fontFamily: "'Noto Sans', sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.01em", lineHeight: 1 }}>
        Angansakhi
      </span>
      <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.55rem", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        आंगनसखी
      </span>
    </div>
  );
}

export function AppBar({ isOnline, onToggleOnline }: Props) {
  return (
    <div
      className="flex items-center justify-between px-4 py-2.5 flex-shrink-0"
      style={{ background: "#1A2E4A", boxShadow: "0 2px 8px rgba(26,46,74,0.25)" }}
    >
      {/* Left: MoWCD emblem */}
      <MoWCDEmblem />

      {/* Center: Angansakhi branding */}
      <AngansakiLogo />

      {/* Right: Network status chip */}
      <button
        onClick={onToggleOnline}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all active:scale-95"
        style={{
          background: isOnline ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)",
          border: `1px solid ${isOnline ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)"}`,
        }}
      >
        {isOnline ? (
          <Cloud size={13} color="#10B981" strokeWidth={2.5} />
        ) : (
          <CloudOff size={13} color="#EF4444" strokeWidth={2.5} />
        )}
        <div>
          <p style={{ fontSize: "0.55rem", color: isOnline ? "#10B981" : "#EF4444", fontWeight: 700, lineHeight: 1 }}>
            {isOnline ? "Online" : "Offline"}
          </p>
          <p style={{ fontSize: "0.48rem", color: isOnline ? "#10B981" : "#EF4444", opacity: 0.8, lineHeight: 1 }}>
            {isOnline ? "Syncing" : "Local"}
          </p>
        </div>
      </button>
    </div>
  );
}
