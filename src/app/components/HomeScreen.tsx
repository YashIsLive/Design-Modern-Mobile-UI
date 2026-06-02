import { Bell, ChevronRight, ArrowUpRight, ArrowDownLeft, Zap, FileText, Shield, Gift, TrendingUp, Wifi, Smartphone, CreditCard, AlertCircle } from "lucide-react";

type Lang = "en" | "hi";

interface Props {
  lang: Lang;
}

const t = {
  en: {
    greeting: "Good Morning",
    name: "Rajesh Kumar",
    balance: "Available Balance",
    send: "Send\nMoney",
    pay: "Pay\nBills",
    recharge: "Mobile\nRecharge",
    insurance: "Insurance",
    documents: "My\nDocuments",
    schemes: "Govt\nSchemes",
    invest: "Invest\nNow",
    emi: "Loan\nEMI",
    recentActivity: "Recent Activity",
    viewAll: "View All",
    schemeTitle: "PM Ujjwala Yojana",
    schemeDesc: "Free LPG connection for eligible BPL families. Apply before 31 Dec.",
    applyNow: "Apply Now",
    transactions: [
      { name: "Electricity Bill", sub: "BESCOM • 28 May", amount: "−₹1,240", type: "debit" },
      { name: "Salary Credit", sub: "HDFC Bank • 26 May", amount: "+₹48,500", type: "credit" },
      { name: "Ration Card Renewal", sub: "Govt Portal • 24 May", amount: "−₹50", type: "debit" },
      { name: "UPI Transfer", sub: "Priya Sharma • 22 May", amount: "+₹2,000", type: "credit" },
    ],
    alerts: "2 new government alerts",
  },
  hi: {
    greeting: "शुभ प्रभात",
    name: "राजेश कुमार",
    balance: "उपलब्ध शेष",
    send: "पैसे\nभेजें",
    pay: "बिल\nभुगतान",
    recharge: "मोबाइल\nरिचार्ज",
    insurance: "बीमा",
    documents: "मेरे\nदस्तावेज़",
    schemes: "सरकारी\nयोजनाएं",
    invest: "निवेश\nकरें",
    emi: "लोन\nईएमआई",
    recentActivity: "हालिया गतिविधि",
    viewAll: "सभी देखें",
    schemeTitle: "पीएम उज्ज्वला योजना",
    schemeDesc: "बीपीएल परिवारों के लिए मुफ्त एलपीजी कनेक्शन। 31 दिसंबर से पहले आवेदन करें।",
    applyNow: "अभी आवेदन करें",
    transactions: [
      { name: "बिजली बिल", sub: "BESCOM • 28 मई", amount: "−₹1,240", type: "debit" },
      { name: "वेतन जमा", sub: "HDFC Bank • 26 मई", amount: "+₹48,500", type: "credit" },
      { name: "राशन कार्ड नवीनीकरण", sub: "सरकारी पोर्टल • 24 मई", amount: "−₹50", type: "debit" },
      { name: "UPI ट्रांसफर", sub: "प्रिया शर्मा • 22 मई", amount: "+₹2,000", type: "credit" },
    ],
    alerts: "2 नई सरकारी सूचनाएं",
  },
};

const quickActions = (l: typeof t.en) => [
  { label: l.send, icon: ArrowUpRight, color: "#1A365D" },
  { label: l.pay, icon: Zap, color: "#1A365D" },
  { label: l.recharge, icon: Smartphone, color: "#1A365D" },
  { label: l.insurance, icon: Shield, color: "#1A365D" },
  { label: l.documents, icon: FileText, color: "#1A365D" },
  { label: l.schemes, icon: Gift, color: "#1A365D" },
  { label: l.invest, icon: TrendingUp, color: "#1A365D" },
  { label: l.emi, icon: CreditCard, color: "#1A365D" },
];

export function HomeScreen({ lang }: Props) {
  const tx = t[lang];
  const actions = quickActions(tx);

  return (
    <div className="flex flex-col gap-0 pb-2">
      {/* Hero Header */}
      <div
        className="relative overflow-hidden px-5 pt-12 pb-8"
        style={{ background: "linear-gradient(145deg, #1A365D 0%, #243F6E 60%, #1E4A8A 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10" style={{ background: "#E07B2A" }} />
        <div className="absolute top-16 -right-4 w-20 h-20 rounded-full opacity-8" style={{ background: "#E07B2A" }} />

        <div className="relative flex items-start justify-between mb-6">
          <div>
            <p className="text-sm text-blue-200 mb-0.5">{tx.greeting} 🙏</p>
            <h2 className="text-white font-semibold" style={{ fontSize: "1.15rem" }}>{tx.name}</h2>
          </div>
          <div className="relative mt-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
              <Bell size={18} color="#fff" />
            </div>
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center font-semibold"
              style={{ background: "#E07B2A", fontSize: "0.55rem" }}
            >
              2
            </span>
          </div>
        </div>

        {/* Balance Card */}
        <div
          className="rounded-2xl p-4"
          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <p className="text-blue-200 mb-1" style={{ fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {tx.balance}
          </p>
          <p className="text-white font-bold mb-3" style={{ fontSize: "1.75rem", letterSpacing: "-0.02em" }}>
            ₹48,500
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#16A34A" }}>
                <ArrowDownLeft size={11} color="#fff" />
              </div>
              <div>
                <p className="text-white font-medium" style={{ fontSize: "0.8rem" }}>₹50,500</p>
                <p className="text-blue-300" style={{ fontSize: "0.62rem" }}>Income</p>
              </div>
            </div>
            <div className="w-px" style={{ background: "rgba(255,255,255,0.2)" }} />
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#DC2626" }}>
                <ArrowUpRight size={11} color="#fff" />
              </div>
              <div>
                <p className="text-white font-medium" style={{ fontSize: "0.8rem" }}>₹2,000</p>
                <p className="text-blue-300" style={{ fontSize: "0.62rem" }}>Spent</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="mx-4 -mt-3 bg-card rounded-2xl shadow-md p-4" style={{ boxShadow: "0 4px 20px rgba(26,54,93,0.10)" }}>
        <div className="grid grid-cols-4 gap-3">
          {actions.map((action, i) => {
            const Icon = action.icon;
            return (
              <button
                key={i}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-105 group-active:scale-95"
                  style={{ background: "#EEF2FF" }}
                >
                  <Icon size={20} color="#1A365D" />
                </div>
                <span
                  className="text-center leading-tight"
                  style={{
                    fontSize: "0.62rem",
                    color: "#0F1F3D",
                    whiteSpace: "pre-line",
                    fontWeight: 500,
                  }}
                >
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Government Scheme Banner */}
      <div className="mx-4 mt-4">
        <div
          className="rounded-2xl p-4 flex gap-3 items-start"
          style={{
            background: "linear-gradient(135deg, #FEF3E7 0%, #FDE8C8 100%)",
            border: "1px solid rgba(224,123,42,0.25)",
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#E07B2A" }}
          >
            <Gift size={18} color="#fff" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm mb-0.5" style={{ color: "#7A3B0A" }}>{tx.schemeTitle}</p>
            <p style={{ fontSize: "0.72rem", color: "#9A4E1A", lineHeight: 1.4 }}>{tx.schemeDesc}</p>
          </div>
          <button
            className="flex-shrink-0 px-3 py-1.5 rounded-lg font-medium transition-all hover:opacity-90 active:scale-95"
            style={{ background: "#E07B2A", color: "#fff", fontSize: "0.65rem", whiteSpace: "nowrap" }}
          >
            {tx.applyNow}
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mx-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold" style={{ color: "#0F1F3D", fontSize: "0.9rem" }}>{tx.recentActivity}</h3>
          <button className="flex items-center gap-0.5 font-medium" style={{ color: "#E07B2A", fontSize: "0.75rem" }}>
            {tx.viewAll} <ChevronRight size={14} />
          </button>
        </div>

        <div className="bg-card rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(26,54,93,0.07)" }}>
          {tx.transactions.map((txn, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: i < tx.transactions.length - 1 ? "1px solid rgba(26,54,93,0.07)" : "none" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: txn.type === "credit" ? "#DCFCE7" : "#FEF2F2",
                }}
              >
                {txn.type === "credit" ? (
                  <ArrowDownLeft size={16} color="#16A34A" />
                ) : (
                  <ArrowUpRight size={16} color="#DC2626" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate" style={{ fontSize: "0.82rem", color: "#0F1F3D" }}>{txn.name}</p>
                <p className="truncate" style={{ fontSize: "0.68rem", color: "#5A6A85" }}>{txn.sub}</p>
              </div>
              <span
                className="font-semibold flex-shrink-0"
                style={{
                  fontSize: "0.82rem",
                  color: txn.type === "credit" ? "#16A34A" : "#DC2626",
                }}
              >
                {txn.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Govt Alerts Footer */}
      <div className="mx-4 mt-4 mb-2">
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl"
          style={{ background: "#EEF2FF", border: "1px solid rgba(26,54,93,0.15)" }}
        >
          <AlertCircle size={15} color="#1A365D" />
          <p className="flex-1" style={{ fontSize: "0.72rem", color: "#1A365D", fontWeight: 500 }}>{tx.alerts}</p>
          <ChevronRight size={14} color="#1A365D" />
        </div>
      </div>
    </div>
  );
}
