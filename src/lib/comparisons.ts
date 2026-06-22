export interface ComparisonPair {
  slug: string;
  broker1Id: string;
  broker2Id: string;
  verdict: string;
}

export const comparisons: ComparisonPair[] = [
  {
    slug: "exness-vs-xm",
    broker1Id: "exness",
    broker2Id: "xm",
    verdict:
      "Exness unggul dalam spread rendah dan leverage tinggi, cocok untuk trader berpengalaman. XM lebih cocok untuk pemula berkat bonus dan edukasi lengkap. Pilih Exness jika prioritas Anda adalah biaya trading rendah, pilih XM jika Anda baru memulai.",
  },
  {
    slug: "exness-vs-octafx",
    broker1Id: "exness",
    broker2Id: "octafx",
    verdict:
      "Exness menang dari segi spread, leverage, dan kecepatan withdrawal. OctaFX menarik dengan fitur copy trading dan platform yang lebih simpel. Untuk trader aktif, Exness lebih direkomendasikan.",
  },
  {
    slug: "ic-markets-vs-pepperstone",
    broker1Id: "ic-markets",
    broker2Id: "pepperstone",
    verdict:
      "Keduanya adalah broker ECN premium. IC Markets sedikit unggul dalam spread, sementara Pepperstone memiliki regulasi lebih kuat dan integrasi TradingView. Keduanya sangat direkomendasikan untuk trader profesional.",
  },
  {
    slug: "fbs-vs-xm",
    broker1Id: "fbs",
    broker2Id: "xm",
    verdict:
      "FBS menawarkan leverage lebih tinggi dan bonus besar, sementara XM lebih unggul dalam edukasi dan regulasi. Untuk pemula, XM adalah pilihan lebih aman. Untuk yang mengejar leverage tinggi, FBS bisa dipertimbangkan.",
  },
  {
    slug: "exness-vs-ic-markets",
    broker1Id: "exness",
    broker2Id: "ic-markets",
    verdict:
      "Exness menawarkan leverage unlimited dan deposit minimum rendah. IC Markets unggul dalam infrastruktur server dan ketersediaan cTrader. Untuk scalper profesional, IC Markets sedikit lebih unggul.",
  },
  {
    slug: "xm-vs-octafx",
    broker1Id: "xm",
    broker2Id: "octafx",
    verdict:
      "XM lebih unggul dalam regulasi, edukasi, dan variasi akun. OctaFX menarik dengan copy trading dan platform simpel. Untuk pemula yang serius belajar, XM lebih direkomendasikan.",
  },
  {
    slug: "fbs-vs-exness",
    broker1Id: "fbs",
    broker2Id: "exness",
    verdict:
      "Exness menang di hampir semua kategori: spread lebih rendah, withdrawal lebih cepat, dan platform lebih stabil. FBS hanya unggul dalam bonus deposit. Secara keseluruhan, Exness lebih direkomendasikan.",
  },
  {
    slug: "pepperstone-vs-xm",
    broker1Id: "pepperstone",
    broker2Id: "xm",
    verdict:
      "Pepperstone cocok untuk trader menengah-atas dengan spread rendah dan regulasi kuat. XM lebih ramah pemula dengan deposit rendah dan bonus. Pilih sesuai level pengalaman Anda.",
  },
];
