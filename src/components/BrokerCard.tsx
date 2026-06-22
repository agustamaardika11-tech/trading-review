import Link from "next/link";
import type { Broker } from "@/lib/brokers";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-4 h-4 ${s <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-slate-500 ml-1">{rating}</span>
    </div>
  );
}

export default function BrokerCard({ broker }: { broker: Broker }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-slate-800">{broker.name}</h3>
        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          {broker.regulasi[0]}
        </span>
      </div>
      <Stars rating={broker.rating} />
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        <li>Spread mulai <strong className="text-slate-800">{broker.spreadMin}</strong></li>
        <li>Leverage <strong className="text-slate-800">{broker.leverage}</strong></li>
        <li>Min. Deposit <strong className="text-slate-800">{broker.minDeposit}</strong></li>
      </ul>
      <Link
        href={`/compare?broker=${broker.id}`}
        className="mt-5 block text-center bg-blue-600 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
      >
        Lihat Review
      </Link>
    </div>
  );
}
