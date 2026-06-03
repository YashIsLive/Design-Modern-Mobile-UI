import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LoginScreen } from "./components/screens/LoginScreen";
import { DashboardScreen } from "./components/screens/DashboardScreen";
import { AddBeneficiaryScreen } from "./components/screens/AddBeneficiaryScreen";
import { KYCScreen } from "./components/screens/KYCScreen";
import { TutorScreen } from "./components/screens/TutorScreen";
import { RoleSelectionScreen } from "./components/onboarding/RoleSelectionScreen";

type Screen = "roleSelect" | "login" | "dashboard" | "add" | "kyc" | "tutor";
type UserRole = "aww" | "beneficiary" | "supervisor";

const SCREEN_META: Record<Screen, { label: string; labelHi: string }> = {
  roleSelect: { label: "Role", labelHi: "भूमिका" },
  login:     { label: "Login",     labelHi: "लॉगिन" },
  dashboard: { label: "Dashboard", labelHi: "डैशबोर्ड" },
  add:       { label: "Register",  labelHi: "पंजीकरण" },
  kyc:       { label: "KYC",       labelHi: "KYC" },
  tutor:     { label: "AI Tutor",  labelHi: "AI ट्यूटर" },
};

const SCREENS: Screen[] = ["roleSelect", "login", "dashboard", "add", "kyc", "tutor"];

const NAV_HIDDEN: Screen[] = ["roleSelect", "login", "dashboard", "add", "kyc", "tutor"];

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [userRole, setUserRole] = useState<UserRole | null>("aww");
  const [isOnline, setIsOnline] = useState(true);
  const [dir, setDir] = useState(1);

  const goTo = (s: Screen, d = 1) => { setDir(d); setScreen(s); };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-30%" : "30%", opacity: 0 }),
  };

  return (
    <div
      className="size-full flex flex-col items-center justify-center"
      style={{ background: "radial-gradient(ellipse at 40% 30%, #253D5E 0%, #111B2B 50%, #070D18 100%)" }}
    >
      {/* Phone frame */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "min(390px, 100vw)",
          height: "min(844px, 100dvh)",
          background: "#FDF6EE",
          borderRadius: "min(2.8rem, 0px)",
          boxShadow: "0 40px 90px rgba(0,0,0,0.6), 0 8px 32px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.07)",
          fontFamily: "'Noto Sans', 'Noto Sans Devanagari', system-ui, sans-serif",
          isolation: "isolate",
        }}
      >
        {/* Status bar */}
        <div
          className="flex items-center justify-between px-6 pt-3 pb-1.5 flex-shrink-0"
          style={{ background: "#1A2E4A" }}
        >
          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.68rem", fontWeight: 600 }}>9:41</span>
          <div className="w-24 h-5 rounded-full" style={{ background: "#0F1E30" }} />
          <div className="flex items-center gap-1.5">
            <div className="flex gap-px items-end">
              {[3, 4, 5, 6].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, borderRadius: 1, background: i < 3 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)" }} />
              ))}
            </div>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M7 2C9.5 2 11.7 3.1 13.2 4.9L14 4L13 3C11.2 1.1 8.7 0 7 0C5.3 0 2.8 1.1 1 3L0 4L0.8 4.9C2.3 3.1 4.5 2 7 2Z" fill="rgba(255,255,255,0.9)" />
              <path d="M7 4C8.7 4 10.2 4.7 11.3 5.8L12.2 4.8C10.9 3.7 9 3 7 3C5 3 3.1 3.7 1.8 4.8L2.7 5.8C3.8 4.7 5.3 4 7 4Z" fill="rgba(255,255,255,0.9)" />
              <circle cx="7" cy="8" r="1.5" fill="rgba(255,255,255,0.9)" />
            </svg>
            <div style={{ width: 22, height: 11, border: "1.5px solid rgba(255,255,255,0.7)", borderRadius: 3.5, position: "relative" }}>
              <div style={{ position: "absolute", top: 2, left: 2, right: 4, bottom: 2, background: "rgba(255,255,255,0.9)", borderRadius: 2 }} />
              <div style={{ position: "absolute", right: -3.5, top: 3.5, width: 2, height: 4, background: "rgba(255,255,255,0.5)", borderRadius: "0 1px 1px 0" }} />
            </div>
          </div>
        </div>

        {/* App Bar — Removed */}

        {/* Screen content */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={screen}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 320, damping: 34, mass: 0.85 }}
              className="absolute inset-0 overflow-hidden"
            >
              {screen === "roleSelect" && (
                <RoleSelectionScreen
                  onNext={(role) => {
                    setUserRole(role);
                    goTo("login", 1);
                  }}
                />
              )}
              {screen === "login" && (
                <LoginScreen
                  onNext={() => goTo("dashboard", 1)}
                  userRole={userRole}
                  onRoleChange={setUserRole}
                />
              )}
              {screen === "dashboard" && (
                <DashboardScreen
                  onAddBeneficiary={() => goTo("add", 1)}
                  onAITutor={() => goTo("tutor", 1)}
                  onLogout={() => { setUserRole("aww"); goTo("login", -1); }}
                />
              )}
              {screen === "add" && (
                <AddBeneficiaryScreen
                  onNext={() => goTo("kyc", 1)}
                  onBack={() => goTo("dashboard", -1)}
                />
              )}
              {screen === "kyc" && (
                <KYCScreen
                  onNext={() => goTo("dashboard", 1)}
                  onBack={() => goTo("add", -1)}
                />
              )}
              {screen === "tutor" && (
                <TutorScreen onBack={() => goTo("dashboard", -1)} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center py-2 flex-shrink-0" style={{ background: "#FDF6EE" }}>
          <div style={{ width: 128, height: 4, borderRadius: 2, background: "rgba(26,46,74,0.18)" }} />
        </div>
      </div>
    </div>
  );
}
