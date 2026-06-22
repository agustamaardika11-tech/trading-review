import Link from "next/link";
import { comparisons } from "@/lib/comparisons";
import { brokers } from "@/lib/brokers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perbandingan Broker Trading | Trading Review",
  description:
    "Bandingkan broker trading populer secara lengkap. Temukan broker terbaik berdasarkan spread, leverage, regulasi, dan fitur lainnya.",
};

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-blue-700 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Perbandingan Broker Trading
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Bandingkan broker trading populer secara berdampingan. Lihat
            perbedaan spread, leverage, regulasi, dan fitur lainnya untuk
            menemukan broker terbaik.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">
          Perbandingan Populer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((pair) => {
            const b1 = brokers[pair.broker1Id];
            const b2 = brokers[pair.broker2Id];
            if (!b1 || !b2) return null;

            return (
              <Link
                key={pair.slug}
                href={`/compare/${pair.slug}`}
                className="block border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center flex-1">
                    <p className="font-bold text-slate-800 text-lg">
                      {b1.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      Rating {b1.rating}/5
                    </p>
                  </div>
                  <span className="text-blue-600 font-bold text-sm mx-3">
                    VS
                  </span>
                  <div className="text-center flex-1">
                    <p className="font-bold text-slate-800 text-lg">
                      {b2.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      Rating {b2.rating}/5
                    </p>
                  </div>
                </div>
                <p className="text-sm text-blue-600 font-medium text-center">
                  Lihat Perbandingan &rarr;
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
