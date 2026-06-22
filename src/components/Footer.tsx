import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 sm:grid-cols-3">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">TradingReview</h3>
          <p className="text-sm leading-relaxed">
            Platform review broker trading independen. Informasi akurat untuk membantu Anda memilih broker terbaik.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/compare" className="hover:text-white transition-colors">Compare Broker</Link></li>
            <li><Link href="/kalkulator" className="hover:text-white transition-colors">Kalkulator</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Disclaimer</h4>
          <p className="text-sm leading-relaxed">
            Trading forex dan CFD melibatkan risiko tinggi. Konten di situs ini bersifat edukatif dan bukan merupakan saran investasi.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-800 text-center py-6 text-sm">
        &copy; {new Date().getFullYear()} TradingReview. All rights reserved.
      </div>
    </footer>
  );
}
