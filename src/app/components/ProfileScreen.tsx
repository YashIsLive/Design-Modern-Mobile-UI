import { ChevronRight, CheckCircle2, Globe, Bell, Lock, HelpCircle, LogOut, Shield, FileText, CreditCard, Settings, ChevronDown } from "lucide-react";

type Lang = "en" | "hi";
interface Props {
  lang: Lang;
  onLangChange: (l: Lang) => void;
}

const t = {
  en: {
    profile: "My Profile",
    verified: "KYC Verified",
    aadhaar: "Aadhaar Linked",
    mobile: "+91 98765 43210",
    email: "rajesh.kumar@gmail.com",
    memberSince: "Member since Jan 2023",
    linkedAccounts: "Linked Accounts",
    accounts: [
      { name: "HDFC Bank", sub: "XXXX XXXX 4521 · Savings", icon: CreditCard, color: "#1A365D" },
      { name: "SBI Bank", sub: "XXXX XXXX 8890 · Salary", icon: CreditCard, color: "#16A34A" },
    ],
    addAccount: "+ Add Bank Account",
    settings: "Settings & Preferences",
    language: "Language / भाषा",
    notifications: "Notifications",
    security: "Security & Privacy",
    documents: "My Documents",
    help: "Help & Support",
    logout: "Sign Out",
    totalSaved: "Total Saved",
    services: "Services Used",
    transactions: "Transactions",
    langOptions: ["English", "हिंदी"],
  },
  hi: {
    profile: "मेरी प्रोफाइल",
    verified: "KYC सत्यापित",
    aadhaar: "आधार लिंक्ड",
    mobile: "+91 98765 43210",
    email: "rajesh.kumar@gmail.com",
    memberSince: "सदस्य जनवरी 2023 से",
    linkedAccounts: "लिंक्ड खाते",
    accounts: [
      { name: "HDFC Bank", sub: "XXXX XXXX 4521 · बचत खाता", icon: CreditCard, color: "#1A365D" },
      { name: "SBI Bank", sub: "XXXX XXXX 8890 · वेतन खाता", icon: CreditCard, color: "#16A34A" },
    ],
    addAccount: "+ बैंक खाता जोड़ें",
    settings: "सेटिंग्स और प्राथमिकताएं",
    language: "Language / भाषा",
    notifications: "सूचनाएं",
    security: "सुरक्षा और गोपनीयता",
    documents: "मेरे दस्तावेज़",
    help: "सहायता और समर्थन",
    logout: "साइन आउट",
    totalSaved: "कुल बचत",
    services: "सेवाएं उपयोग",
    transactions: "लेनदेन",
    langOptions: ["English", "हिंदी"],
  },
};

const settingsItems = (tx: typeof t.en) => [
  { label: tx.language, icon: Globe, isLang: true },
  { label: tx.notifications, icon: Bell, isLang: false },
  { label: tx.security, icon: Lock, isLang: false },
  { label: tx.documents, icon: FileText, isLang: false },
  { label: tx.help, icon: HelpCircle, isLang: false },
];

export function ProfileScreen({ lang, onLangChange }: Props) {
  const tx = t[lang];
  const items = settingsItems(tx);

  return (
    <div className="flex flex-col pb-2">
      {/* Header */}
      <div
        className="relative px-5 pt-12 pb-8 overflow-hidden"
        style={{ background: "linear-gradient(145deg, #1A365D 0%, #243F6E 100%)" }}
      >
        <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-10" style={{ background: "#E07B2A" }} />
        <h2 className="text-white font-bold mb-4" style={{ fontSize: "1.2rem" }}>{tx.profile}</h2>

        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-white"
              style={{ background: "linear-gradient(135deg, #E07B2A, #F5A052)", fontSize: "1.4rem" }}
            >
              RK
            </div>
            <div
              className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "#16A34A", border: "2px solid #1A365D" }}
            >
              <CheckCircle2 size={11} color="#fff" />
            </div>
          </div>

          <div>
            <p className="text-white font-bold" style={{ fontSize: "1rem" }}>Rajesh Kumar</p>
            <p className="text-blue-300 mb-2" style={{ fontSize: "0.68rem" }}>{tx.mobile}</p>
            <div className="flex gap-2">
              <span
                className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                style={{ background: "rgba(22,163,74,0.25)", fontSize: "0.58rem", color: "#86EFAC" }}
              >
                <CheckCircle2 size={9} color="#86EFAC" /> {tx.verified}
              </span>
              <span
                className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                style={{ background: "rgba(224,123,42,0.25)", fontSize: "0.58rem", color: "#FCD34D" }}
              >
                <Shield size={9} color="#FCD34D" /> {tx.aadhaar}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="mx-4 -mt-4 bg-card rounded-2xl p-4 shadow-md" style={{ boxShadow: "0 4px 20px rgba(26,54,93,0.10)" }}>
        <div className="flex">
          {[
            { label: tx.totalSaved, value: "₹1,240" },
            { label: tx.services, value: "12" },
            { label: tx.transactions, value: "48" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex-1 text-center"
              style={{ borderRight: i < 2 ? "1px solid rgba(26,54,93,0.10)" : "none" }}
            >
              <p className="font-bold" style={{ fontSize: "1rem", color: "#1A365D" }}>{stat.value}</p>
              <p style={{ fontSize: "0.62rem", color: "#5A6A85" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Linked Bank Accounts */}
      <div className="mx-4 mt-4">
        <p className="font-semibold mb-3" style={{ fontSize: "0.9rem", color: "#0F1F3D" }}>{tx.linkedAccounts}</p>
        <div className="flex flex-col gap-2">
          {tx.accounts.map((acc, i) => {
            const Icon = acc.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: "#fff", border: "1px solid rgba(26,54,93,0.08)", boxShadow: "0 1px 6px rgba(26,54,93,0.05)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: acc.color + "18" }}
                >
                  <Icon size={17} color={acc.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium" style={{ fontSize: "0.82rem", color: "#0F1F3D" }}>{acc.name}</p>
                  <p style={{ fontSize: "0.65rem", color: "#5A6A85" }}>{acc.sub}</p>
                </div>
                <ChevronRight size={16} color="#5A6A85" />
              </div>
            );
          })}
          <button
            className="flex items-center justify-center py-3 rounded-xl font-medium transition-all hover:opacity-80"
            style={{ background: "#EEF2FF", color: "#1A365D", fontSize: "0.78rem", border: "1.5px dashed rgba(26,54,93,0.25)" }}
          >
            {tx.addAccount}
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="mx-4 mt-4">
        <p className="font-semibold mb-3" style={{ fontSize: "0.9rem", color: "#0F1F3D" }}>{tx.settings}</p>
        <div className="bg-card rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(26,54,93,0.07)" }}>
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                style={{ borderBottom: i < items.length - 1 ? "1px solid rgba(26,54,93,0.07)" : "none" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "#EEF2FF" }}
                >
                  <Icon size={16} color="#1A365D" />
                </div>
                <p className="flex-1 font-medium" style={{ fontSize: "0.82rem", color: "#0F1F3D" }}>{item.label}</p>

                {item.isLang ? (
                  /* Language toggle */
                  <div className="flex gap-1">
                    {tx.langOptions.map((opt, li) => (
                      <button
                        key={li}
                        onClick={() => onLangChange(li === 0 ? "en" : "hi")}
                        className="px-2 py-1 rounded-lg font-medium transition-all"
                        style={{
                          background: (li === 0 ? lang === "en" : lang === "hi") ? "#1A365D" : "#EEF2FF",
                          color: (li === 0 ? lang === "en" : lang === "hi") ? "#fff" : "#1A365D",
                          fontSize: "0.62rem",
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <ChevronRight size={16} color="#5A6A85" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sign Out */}
      <div className="mx-4 mt-3 mb-2">
        <button
          className="w-full py-3 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all hover:opacity-80 active:scale-[0.99]"
          style={{ background: "#FEF2F2", color: "#DC2626", fontSize: "0.85rem", border: "1px solid rgba(220,38,38,0.15)" }}
        >
          <LogOut size={16} /> {tx.logout}
        </button>
      </div>
    </div>
  );
}
