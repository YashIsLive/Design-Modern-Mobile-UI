import { Home, CreditCard, LayoutGrid, User } from "lucide-react";

type Tab = "home" | "pay" | "services" | "profile";
type Lang = "en" | "hi";

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  lang: Lang;
}

const labels = {
  en: { home: "Home", pay: "Pay", services: "Services", profile: "Profile" },
  hi: { home: "होम", pay: "भुगतान", services: "सेवाएं", profile: "प्रोफाइल" },
};

const tabs: { id: Tab; icon: typeof Home }[] = [
  { id: "home", icon: Home },
  { id: "pay", icon: CreditCard },
  { id: "services", icon: LayoutGrid },
  { id: "profile", icon: User },
];

export function BottomNav({ activeTab, onTabChange, lang }: Props) {
  const tx = labels[lang];

  return (
    <div
      className="flex items-center px-2 py-2 safe-bottom"
      style={{
        background: "#fff",
        borderTop: "1px solid rgba(26,54,93,0.10)",
        boxShadow: "0 -4px 20px rgba(26,54,93,0.08)",
      }}
    >
      {tabs.map(({ id, icon: Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className="flex-1 flex flex-col items-center gap-1 py-1 transition-all"
          >
            <div
              className="flex items-center justify-center w-10 h-7 rounded-full transition-all"
              style={{
                background: isActive ? "#EEF2FF" : "transparent",
              }}
            >
              <Icon
                size={20}
                color={isActive ? "#1A365D" : "#9BACC0"}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
            </div>
            <span
              style={{
                fontSize: "0.6rem",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#1A365D" : "#9BACC0",
              }}
            >
              {tx[id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
