import Link from "next/link";
import Image from "next/image";
import BrokerCard from "@/components/BrokerCard";
import { brokerList } from "@/lib/brokers";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-6">
              Platform Review Broker Trading
              <br />
              <span className="text-blue-200">Terpercaya di Indonesia</span>
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mb-8">
              Bandingkan broker, hitung margin & profit, dan tingkatkan
              pengetahuan trading Anda dengan review independen dari tim ahli.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/compare"
                className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Bandingkan Broker
              </Link>
              <Link
                href="/kalkulator"
                className="border-2 border-white/30 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                Kalkulator Trading
              </Link>
            </div>
          </div>
          <div className="flex-1 max-w-md lg:max-w-lg">
            <Image
              src="/images/hero-trading.svg"
              alt="Trading chart illustration"
              width={600}
              height={400}
              priority
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Broker Terpopuler */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center mb-3">
            Broker Terpopuler
          </h2>
          <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
            Pilihan broker forex terbaik berdasarkan review mendalam dari tim kami.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brokerList.map((broker) => (
              <BrokerCard key={broker.id} broker={broker} />
            ))}
          </div>
        </div>
      </section>

      {/* Kenapa Memilih Kami */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center mb-10">
            Kenapa Memilih TradingReview?
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Review Independen",
                desc: "Tidak ada afiliasi tersembunyi. Review kami berdasarkan pengalaman nyata dan data faktual.",
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Data Akurat",
                desc: "Spread, leverage, dan biaya trading diperbarui secara berkala untuk memastikan akurasi informasi.",
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Komunitas Aktif",
                desc: "Bergabung dengan ribuan trader Indonesia yang berbagi pengalaman dan strategi trading.",
              },
            ].map((f) => (
              <div key={f.title} className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Siap Memulai Trading?
          </h2>
          <p className="text-blue-200 mb-6">
            Baca review lengkap kami dan temukan broker yang paling sesuai dengan kebutuhan Anda.
          </p>
          <Link
            href="/blog"
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Baca Artikel Edukasi
          </Link>
        </div>
      </section>
    </>
  );
}
