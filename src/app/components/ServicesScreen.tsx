import { useState } from "react";
import { ChevronRight, Search, Star, FileText, Heart, GraduationCap, Wheat, Landmark, Truck, Home, Umbrella, Users, Baby, Leaf, ShieldCheck } from "lucide-react";

type Lang = "en" | "hi";
interface Props { lang: Lang; }

const t = {
  en: {
    title: "Government Services",
    subtitle: "All services at one place",
    search: "Search services...",
    popular: "Popular Services",
    categories: "Browse by Category",
    categories_list: ["All", "Documents", "Health", "Education", "Finance", "Agriculture"],
    services: [
      { name: "Aadhaar Update", category: "Documents", dept: "UIDAI", icon: FileText, color: "#1A365D", badge: null, time: "7 days" },
      { name: "PAN Application", category: "Documents", dept: "Income Tax", icon: FileText, color: "#1A365D", badge: "Free", time: "15 days" },
      { name: "Ayushman Bharat", category: "Health", dept: "NHA", icon: Heart, color: "#DC2626", badge: "Popular", time: "Instant" },
      { name: "PM Scholarship", category: "Education", dept: "Edu. Ministry", icon: GraduationCap, color: "#7C3AED", badge: "New", time: "30 days" },
      { name: "Kisan Samman", category: "Agriculture", dept: "Agri. Ministry", icon: Wheat, color: "#16A34A", badge: null, time: "Instant" },
      { name: "Driving Licence", category: "Documents", dept: "MoRTH", icon: Truck, color: "#E07B2A", badge: null, time: "21 days" },
      { name: "Ration Card", category: "Documents", dept: "Food Ministry", icon: Home, color: "#1A365D", badge: null, time: "30 days" },
      { name: "PM Awas Yojana", category: "Finance", dept: "Housing", icon: Landmark, color: "#7C3AED", badge: "Open", time: "45 days" },
    ],
    featured: [
      { name: "Passport Application", desc: "Apply for new or renewal", icon: ShieldCheck, color: "#1A365D" },
      { name: "Maternity Benefit", desc: "₹6,000 for pregnant women", icon: Baby, color: "#DC2626" },
      { name: "PM Fasal Bima", desc: "Crop insurance for farmers", icon: Leaf, color: "#16A34A" },
      { name: "Senior Pension", desc: "Monthly pension support", icon: Users, color: "#E07B2A" },
    ],
    viewDetails: "View Details",
    apply: "Apply",
    featuredSchemes: "Featured Schemes",
    processingTime: "Processing:",
    stars: "4.8",
  },
  hi: {
    title: "सरकारी सेवाएं",
    subtitle: "सभी सेवाएं एक जगह",
    search: "सेवाएं खोजें...",
    popular: "लोकप्रिय सेवाएं",
    categories: "श्रेणी द्वारा खोजें",
    categories_list: ["सभी", "दस्तावेज़", "स्वास्थ्य", "शिक्षा", "वित्त", "कृषि"],
    services: [
      { name: "आधार अपडेट", category: "दस्तावेज़", dept: "UIDAI", icon: FileText, color: "#1A365D", badge: null, time: "7 दिन" },
      { name: "PAN आवेदन", category: "दस्तावेज़", dept: "आयकर विभाग", icon: FileText, color: "#1A365D", badge: "मुफ्त", time: "15 दिन" },
      { name: "आयुष्मान भारत", category: "स्वास्थ्य", dept: "NHA", icon: Heart, color: "#DC2626", badge: "लोकप्रिय", time: "तुरंत" },
      { name: "PM छात्रवृत्ति", category: "शिक्षा", dept: "शिक्षा मंत्रालय", icon: GraduationCap, color: "#7C3AED", badge: "नया", time: "30 दिन" },
      { name: "किसान सम्मान निधि", category: "कृषि", dept: "कृषि मंत्रालय", icon: Wheat, color: "#16A34A", badge: null, time: "तुरंत" },
      { name: "ड्राइविंग लाइसेंस", category: "दस्तावेज़", dept: "MoRTH", icon: Truck, color: "#E07B2A", badge: null, time: "21 दिन" },
      { name: "राशन कार्ड", category: "दस्तावेज़", dept: "खाद्य मंत्रालय", icon: Home, color: "#1A365D", badge: null, time: "30 दिन" },
      { name: "PM आवास योजना", category: "वित्त", dept: "आवास विभाग", icon: Landmark, color: "#7C3AED", badge: "खुला", time: "45 दिन" },
    ],
    featured: [
      { name: "पासपोर्ट आवेदन", desc: "नया या नवीनीकरण आवेदन करें", icon: ShieldCheck, color: "#1A365D" },
      { name: "मातृत्व लाभ", desc: "गर्भवती महिलाओं को ₹6,000", icon: Baby, color: "#DC2626" },
      { name: "PM फसल बीमा", desc: "किसानों के लिए फसल बीमा", icon: Leaf, color: "#16A34A" },
      { name: "वरिष्ठ पेंशन", desc: "मासिक पेंशन सहायता", icon: Users, color: "#E07B2A" },
    ],
    viewDetails: "विवरण देखें",
    apply: "आवेदन",
    featuredSchemes: "विशेष योजनाएं",
    processingTime: "समय:",
    stars: "4.8",
  },
};

const badgeColors: Record<string, { bg: string; text: string }> = {
  Free: { bg: "#DCFCE7", text: "#16A34A" },
  "मुफ्त": { bg: "#DCFCE7", text: "#16A34A" },
  Popular: { bg: "#FEF3E7", text: "#E07B2A" },
  "लोकप्रिय": { bg: "#FEF3E7", text: "#E07B2A" },
  New: { bg: "#EEF2FF", text: "#1A365D" },
  "नया": { bg: "#EEF2FF", text: "#1A365D" },
  Open: { bg: "#DCFCE7", text: "#16A34A" },
  "खुला": { bg: "#DCFCE7", text: "#16A34A" },
};

export function ServicesScreen({ lang }: Props) {
  const tx = t[lang];
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");

  const filtered = tx.services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.dept.toLowerCase().includes(search.toLowerCase())
  );

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

      {/* Search bar */}
      <div className="mx-4 -mt-4">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl shadow-md"
          style={{ background: "#fff", border: "1.5px solid rgba(26,54,93,0.10)", boxShadow: "0 4px 16px rgba(26,54,93,0.10)" }}
        >
          <Search size={16} color="#5A6A85" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={tx.search}
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: "0.82rem", color: "#0F1F3D" }}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mt-4 px-4">
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {tx.categories_list.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full font-medium transition-all"
              style={{
                background: activeTab === i ? "#1A365D" : "#EEF2FF",
                color: activeTab === i ? "#fff" : "#1A365D",
                fontSize: "0.72rem",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Schemes horizontal scroll */}
      <div className="mt-4 px-4">
        <p className="font-semibold mb-3" style={{ fontSize: "0.9rem", color: "#0F1F3D" }}>{tx.featuredSchemes}</p>
        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {tx.featured.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="flex-shrink-0 rounded-2xl p-3 w-36"
                style={{
                  background: f.color + "12",
                  border: `1.5px solid ${f.color}22`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
                  style={{ background: f.color }}
                >
                  <Icon size={17} color="#fff" />
                </div>
                <p className="font-semibold leading-tight mb-0.5" style={{ fontSize: "0.75rem", color: "#0F1F3D" }}>{f.name}</p>
                <p style={{ fontSize: "0.62rem", color: "#5A6A85", lineHeight: 1.4 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Services List */}
      <div className="mx-4 mt-4 mb-2">
        <p className="font-semibold mb-3" style={{ fontSize: "0.9rem", color: "#0F1F3D" }}>{tx.popular}</p>
        <div className="flex flex-col gap-2">
          {filtered.map((svc, i) => {
            const Icon = svc.icon;
            const badge = svc.badge ? badgeColors[svc.badge] : null;
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-2xl"
                style={{ background: "#fff", border: "1px solid rgba(26,54,93,0.08)", boxShadow: "0 1px 6px rgba(26,54,93,0.05)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: svc.color + "18" }}
                >
                  <Icon size={18} color={svc.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="font-medium" style={{ fontSize: "0.82rem", color: "#0F1F3D" }}>{svc.name}</p>
                    {badge && (
                      <span
                        className="px-1.5 py-0.5 rounded-full font-medium"
                        style={{ background: badge.bg, color: badge.text, fontSize: "0.55rem" }}
                      >
                        {svc.badge}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "0.65rem", color: "#5A6A85" }}>
                    {svc.dept} · {tx.processingTime} {svc.time}
                  </p>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <Star size={9} color="#F59E0B" fill="#F59E0B" />
                    <span style={{ fontSize: "0.6rem", color: "#F59E0B", fontWeight: 600 }}>{tx.stars}</span>
                  </div>
                </div>
                <button
                  className="flex-shrink-0 px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 transition-all hover:opacity-80 active:scale-95"
                  style={{ background: "#EEF2FF", color: "#1A365D", fontSize: "0.65rem" }}
                >
                  {tx.apply} <ChevronRight size={12} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
