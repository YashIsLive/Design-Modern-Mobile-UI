import { useState } from "react";
import { QrCode, Search, ArrowRight, Clock, CheckCircle2, XCircle, Smartphone, Zap, Droplets, Wifi } from "lucide-react";

type Lang = "en" | "hi";
interface Props { lang: Lang; }

const t = {
  en: {
    title: "Pay & Transfer",
    subtitle: "UPI · NEFT · Wallets",
    enterUPI: "Enter UPI ID or mobile number",
    send: "Send Money",
    scanQR: "Scan QR",
    recentContacts: "Recent Contacts",
    payBills: "Pay Bills",
    bills: [
      { label: "Electricity", icon: Zap, provider: "BESCOM, BSNL...", color: "#F59E0B" },
      { label: "Mobile", icon: Smartphone, provider: "Airtel, Jio, Vi...", color: "#3B82F6" },
      { label: "Water", icon: Droplets, provider: "BWSSB, MCGM...", color: "#06B6D4" },
      { label: "Internet", icon: Wifi, provider: "ACT, Hathway...", color: "#8B5CF6" },
    ],
    enterAmount: "Enter amount",
    orAmount: "or choose",
    proceed: "Proceed to Pay",
    transHistory: "Transaction History",
    transactions: [
      { name: "Priya Sharma", id: "priya@okaxis", amount: "₹2,000", status: "success", time: "Today, 10:42 AM" },
      { name: "Ravi Verma", id: "ravi@upi", amount: "₹500", status: "success", time: "Yesterday, 3:15 PM" },
      { name: "Anita Singh", id: "anita@paytm", amount: "₹1,500", status: "failed", time: "22 May, 9:01 AM" },
    ],
    contacts: [
      { name: "Priya", initials: "PS", color: "#7C3AED" },
      { name: "Ravi", initials: "RV", color: "#E07B2A" },
      { name: "Suresh", initials: "SK", color: "#16A34A" },
      { name: "Anita", initials: "AS", color: "#DC2626" },
      { name: "Meena", initials: "MD", color: "#1A365D" },
    ],
    quickAmounts: ["₹100", "₹200", "₹500", "₹1000"],
  },
  hi: {
    title: "भुगतान और ट्रांसफर",
    subtitle: "UPI · NEFT · वॉलेट",
    enterUPI: "UPI ID या मोबाइल नंबर दर्ज करें",
    send: "पैसे भेजें",
    scanQR: "QR स्कैन करें",
    recentContacts: "हाल के संपर्क",
    payBills: "बिल भुगतान",
    bills: [
      { label: "बिजली", icon: Zap, provider: "BESCOM, BSNL...", color: "#F59E0B" },
      { label: "मोबाइल", icon: Smartphone, provider: "Airtel, Jio, Vi...", color: "#3B82F6" },
      { label: "पानी", icon: Droplets, provider: "BWSSB, MCGM...", color: "#06B6D4" },
      { label: "इंटरनेट", icon: Wifi, provider: "ACT, Hathway...", color: "#8B5CF6" },
    ],
    enterAmount: "राशि दर्ज करें",
    orAmount: "या चुनें",
    proceed: "भुगतान करें",
    transHistory: "लेनदेन इतिहास",
    transactions: [
      { name: "प्रिया शर्मा", id: "priya@okaxis", amount: "₹2,000", status: "success", time: "आज, 10:42 पूर्वाह्न" },
      { name: "रवि वर्मा", id: "ravi@upi", amount: "₹500", status: "success", time: "कल, 3:15 अपराह्न" },
      { name: "अनीता सिंह", id: "anita@paytm", amount: "₹1,500", status: "failed", time: "22 मई, 9:01 पूर्वाह्न" },
    ],
    contacts: [
      { name: "प्रिया", initials: "PS", color: "#7C3AED" },
      { name: "रवि", initials: "RV", color: "#E07B2A" },
      { name: "सुरेश", initials: "SK", color: "#16A34A" },
      { name: "अनीता", initials: "AS", color: "#DC2626" },
      { name: "मीना", initials: "MD", color: "#1A365D" },
    ],
    quickAmounts: ["₹100", "₹200", "₹500", "₹1000"],
  },
};

export function PayScreen({ lang }: Props) {
  const tx = t[lang];
  const [upi, setUpi] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="flex flex-col pb-2">
      {/* Header */}
      <div
        className="px-5 pt-12 pb-6"
        style={{ background: "linear-gradient(145deg, #1A365D 0%, #243F6E 100%)" }}
      >
        <h2 className="text-white font-bold mb-0.5" style={{ fontSize: "1.2rem" }}>{tx.title}</h2>
        <p className="text-blue-300" style={{ fontSize: "0.72rem" }}>{tx.subtitle}</p>
      </div>

      {/* UPI Input Card */}
      <div className="mx-4 -mt-4 bg-card rounded-2xl p-4 shadow-lg" style={{ boxShadow: "0 4px 20px rgba(26,54,93,0.12)" }}>
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-3"
          style={{ background: "#F0F4FA", border: "1.5px solid rgba(26,54,93,0.12)" }}
        >
          <Search size={16} color="#5A6A85" />
          <input
            type="text"
            value={upi}
            onChange={e => setUpi(e.target.value)}
            placeholder={tx.enterUPI}
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: "0.82rem", color: "#0F1F3D" }}
          />
        </div>

        {/* Amount input */}
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl mb-3"
          style={{ background: "#F0F4FA", border: "1.5px solid rgba(26,54,93,0.12)" }}
        >
          <span className="font-bold" style={{ color: "#1A365D", fontSize: "1.1rem" }}>₹</span>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder={tx.enterAmount}
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: "0.9rem", color: "#0F1F3D" }}
          />
        </div>

        {/* Quick amount chips */}
        <div className="flex gap-2 mb-3">
          {tx.quickAmounts.map(a => (
            <button
              key={a}
              onClick={() => setAmount(a.replace("₹", ""))}
              className="flex-1 py-1.5 rounded-lg text-center font-medium transition-all hover:opacity-80 active:scale-95"
              style={{
                background: amount === a.replace("₹", "") ? "#1A365D" : "#EEF2FF",
                color: amount === a.replace("₹", "") ? "#fff" : "#1A365D",
                fontSize: "0.7rem",
              }}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all hover:opacity-90 active:scale-95"
            style={{ background: "#1A365D", color: "#fff", fontSize: "0.82rem" }}
          >
            {tx.send} <ArrowRight size={16} />
          </button>
          <button
            className="w-12 h-12 flex items-center justify-center rounded-xl transition-all hover:opacity-80 active:scale-95"
            style={{ background: "#EEF2FF", border: "1.5px solid rgba(26,54,93,0.15)" }}
          >
            <QrCode size={20} color="#1A365D" />
          </button>
        </div>
      </div>

      {/* Recent Contacts */}
      <div className="mx-4 mt-5">
        <p className="font-semibold mb-3" style={{ fontSize: "0.9rem", color: "#0F1F3D" }}>{tx.recentContacts}</p>
        <div className="flex gap-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {tx.contacts.map((c, i) => (
            <button key={i} className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: c.color, fontSize: "0.8rem" }}
              >
                {c.initials}
              </div>
              <span style={{ fontSize: "0.65rem", color: "#5A6A85", fontWeight: 500, maxWidth: 48, textAlign: "center" }}>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bill Categories */}
      <div className="mx-4 mt-5">
        <p className="font-semibold mb-3" style={{ fontSize: "0.9rem", color: "#0F1F3D" }}>{tx.payBills}</p>
        <div className="grid grid-cols-4 gap-2">
          {tx.bills.map((bill, i) => {
            const Icon = bill.icon;
            return (
              <button
                key={i}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all hover:opacity-80 active:scale-95"
                style={{ background: "#fff", border: "1px solid rgba(26,54,93,0.08)", boxShadow: "0 1px 6px rgba(26,54,93,0.06)" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: bill.color + "20" }}
                >
                  <Icon size={17} color={bill.color} />
                </div>
                <span style={{ fontSize: "0.6rem", color: "#0F1F3D", fontWeight: 500 }}>{bill.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Transaction History */}
      <div className="mx-4 mt-5 mb-2">
        <p className="font-semibold mb-3" style={{ fontSize: "0.9rem", color: "#0F1F3D" }}>{tx.transHistory}</p>
        <div className="bg-card rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(26,54,93,0.07)" }}>
          {tx.transactions.map((txn, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: i < tx.transactions.length - 1 ? "1px solid rgba(26,54,93,0.07)" : "none" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                style={{ background: txn.status === "success" ? "#16A34A" : "#DC2626", fontSize: "0.7rem" }}
              >
                {txn.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate" style={{ fontSize: "0.82rem", color: "#0F1F3D" }}>{txn.name}</p>
                <p className="truncate flex items-center gap-1" style={{ fontSize: "0.65rem", color: "#5A6A85" }}>
                  <Clock size={10} /> {txn.time}
                </p>
              </div>
              <div className="flex flex-col items-end flex-shrink-0 gap-0.5">
                <span className="font-semibold" style={{ fontSize: "0.82rem", color: "#0F1F3D" }}>{txn.amount}</span>
                {txn.status === "success" ? (
                  <CheckCircle2 size={13} color="#16A34A" />
                ) : (
                  <XCircle size={13} color="#DC2626" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
