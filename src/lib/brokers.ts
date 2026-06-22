export interface Broker {
  id: string;
  name: string;
  rating: number;
  regulasi: string[];
  spreadMin: string;
  leverage: string;
  minDeposit: string;
  platforms: string[];
  akunTypes: string[];
  depositMethods: string[];
  pros: string[];
  cons: string[];
  description: string;
}

export const brokers: Record<string, Broker> = {
  exness: {
    id: "exness",
    name: "Exness",
    rating: 4.7,
    regulasi: ["FCA (UK)", "CySEC (Cyprus)", "FSA (Seychelles)"],
    spreadMin: "0.0 pip (Raw Spread)",
    leverage: "Hingga 1:Unlimited",
    minDeposit: "$1",
    platforms: ["MetaTrader 4", "MetaTrader 5", "Exness Terminal"],
    akunTypes: ["Standard", "Standard Cent", "Raw Spread", "Zero", "Pro"],
    depositMethods: ["Bank Transfer", "Kartu Kredit", "E-wallet", "Crypto"],
    pros: [
      "Leverage sangat tinggi hingga unlimited",
      "Spread sangat rendah di akun Raw",
      "Deposit minimum sangat rendah ($1)",
      "Eksekusi order cepat",
      "Withdrawal instan",
    ],
    cons: [
      "Tidak diregulasi BAPPEBTI",
      "Edukasi terbatas dibanding kompetitor",
      "Biaya swap cukup tinggi",
    ],
    description:
      "Exness adalah broker forex global yang dikenal dengan leverage tinggi, spread rendah, dan proses withdrawal instan. Cocok untuk trader berpengalaman yang mencari kondisi trading kompetitif.",
  },
  xm: {
    id: "xm",
    name: "XM",
    rating: 4.5,
    regulasi: ["ASIC (Australia)", "CySEC (Cyprus)", "IFSC (Belize)"],
    spreadMin: "0.6 pip (Ultra Low)",
    leverage: "Hingga 1:1000",
    minDeposit: "$5",
    platforms: ["MetaTrader 4", "MetaTrader 5", "XM App"],
    akunTypes: ["Micro", "Standard", "Ultra Low", "Shares"],
    depositMethods: ["Bank Transfer", "Kartu Kredit", "E-wallet"],
    pros: [
      "Bonus deposit hingga $5000",
      "Webinar dan edukasi gratis",
      "Eksekusi tanpa requote",
      "Tersedia akun Micro untuk pemula",
      "Regulasi multi-yurisdiksi",
    ],
    cons: [
      "Spread lebih tinggi di akun Standard",
      "Biaya inaktivitas setelah 90 hari",
      "Platform proprietary terbatas",
    ],
    description:
      "XM adalah broker forex yang populer di kalangan pemula dan menengah berkat bonus menarik, edukasi lengkap, dan berbagai pilihan akun yang fleksibel.",
  },
  octafx: {
    id: "octafx",
    name: "OctaFX",
    rating: 4.3,
    regulasi: ["CySEC (Cyprus)", "SVG FSA"],
    spreadMin: "0.6 pip",
    leverage: "Hingga 1:500",
    minDeposit: "$25",
    platforms: ["MetaTrader 4", "MetaTrader 5", "OctaTrader"],
    akunTypes: ["OctaTrader", "MT4", "MT5"],
    depositMethods: ["Bank Transfer", "E-wallet", "Crypto"],
    pros: [
      "Copy trading tersedia",
      "Spread kompetitif",
      "Platform OctaTrader user-friendly",
      "Kontes trading reguler",
    ],
    cons: [
      "Pilihan instrumen lebih sedikit",
      "Regulasi tidak sekuat kompetitor",
      "Leverage terbatas di 1:500",
    ],
    description:
      "OctaFX menawarkan pengalaman trading yang simpel dengan platform proprietary OctaTrader dan fitur copy trading yang cocok untuk pemula.",
  },
  fbs: {
    id: "fbs",
    name: "FBS",
    rating: 4.2,
    regulasi: ["ASIC (Australia)", "CySEC (Cyprus)", "IFSC (Belize)"],
    spreadMin: "0.5 pip",
    leverage: "Hingga 1:3000",
    minDeposit: "$1",
    platforms: ["MetaTrader 4", "MetaTrader 5", "FBS Trader"],
    akunTypes: ["Cent", "Micro", "Standard", "Zero Spread", "ECN"],
    depositMethods: ["Bank Transfer", "Kartu Kredit", "E-wallet"],
    pros: [
      "Leverage sangat tinggi hingga 1:3000",
      "Deposit minimum rendah ($1)",
      "Bonus deposit 100%",
      "Banyak pilihan tipe akun",
    ],
    cons: [
      "Spread lebih tinggi di akun Cent/Micro",
      "Proses withdrawal bisa lambat",
      "Materi edukasi kurang mendalam",
    ],
    description:
      "FBS menarik perhatian trader dengan leverage tinggi dan bonus besar. Tersedia banyak tipe akun untuk berbagai level trader.",
  },
  "ic-markets": {
    id: "ic-markets",
    name: "IC Markets",
    rating: 4.8,
    regulasi: ["ASIC (Australia)", "CySEC (Cyprus)", "FSA (Seychelles)"],
    spreadMin: "0.0 pip (Raw Spread)",
    leverage: "Hingga 1:500",
    minDeposit: "$200",
    platforms: ["MetaTrader 4", "MetaTrader 5", "cTrader"],
    akunTypes: ["Raw Spread", "Standard"],
    depositMethods: ["Bank Transfer", "Kartu Kredit", "E-wallet", "Crypto"],
    pros: [
      "Spread sangat rendah (rata-rata 0.1 pip EUR/USD)",
      "Eksekusi ultra-cepat",
      "Tersedia cTrader",
      "Cocok untuk scalping dan EA",
      "Server di Equinix NY4",
    ],
    cons: [
      "Deposit minimum lebih tinggi ($200)",
      "Tidak ada bonus deposit",
      "Edukasi terbatas",
    ],
    description:
      "IC Markets adalah broker ECN pilihan utama untuk trader profesional dan scalper berkat spread ultra-rendah, eksekusi cepat, dan infrastruktur server premium.",
  },
  pepperstone: {
    id: "pepperstone",
    name: "Pepperstone",
    rating: 4.7,
    regulasi: ["ASIC (Australia)", "FCA (UK)", "CySEC (Cyprus)", "DFSA (Dubai)"],
    spreadMin: "0.0 pip (Razor)",
    leverage: "Hingga 1:500",
    minDeposit: "$200",
    platforms: ["MetaTrader 4", "MetaTrader 5", "cTrader", "TradingView"],
    akunTypes: ["Standard", "Razor"],
    depositMethods: ["Bank Transfer", "Kartu Kredit", "E-wallet"],
    pros: [
      "Regulasi sangat kuat (4 regulator)",
      "Spread rendah di akun Razor",
      "Integrasi TradingView",
      "Eksekusi cepat",
      "Customer support 24/7",
    ],
    cons: [
      "Deposit minimum lebih tinggi ($200)",
      "Pilihan tipe akun terbatas",
      "Tidak ada bonus deposit",
    ],
    description:
      "Pepperstone adalah broker teregulasi kuat yang menawarkan spread rendah, banyak pilihan platform termasuk TradingView, dan cocok untuk trader serius.",
  },
};

export const brokerList = Object.values(brokers);
