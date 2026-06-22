import { notFound } from "next/navigation";
import { comparisons } from "@/lib/comparisons";
import { brokers, type Broker } from "@/lib/brokers";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pair = comparisons.find((c) => c.slug === slug);
  if (!pair) return { title: "Perbandingan Tidak Ditemukan" };

  const b1 = brokers[pair.broker1Id];
  const b2 = brokers[pair.broker2Id];
  if (!b1 || !b2) return { title: "Perbandingan Tidak Ditemukan" };

  return {
    title: `${b1.name} vs ${b2.name} - Perbandingan Broker 2024 | Trading Review`,
    description: `Perbandingan lengkap ${b1.name} vs ${b2.name}: regulasi, spread, leverage, deposit minimum, platform, dan fitur lainnya. Temukan broker terbaik untuk Anda.`,
  };
}

function ComparisonRow({
  label,
  value1,
  value2,
}: {
  label: string;
  value1: React.ReactNode;
  value2: React.ReactNode;
}) {
  return (
    <tr className="border-b border-slate-100">
      <td className="py-4 px-4 font-medium text-slate-800 bg-slate-50 w-1/4">
        {label}
      </td>
      <td className="py-4 px-4 text-slate-700 w-[37.5%]">{value1}</td>
      <td className="py-4 px-4 text-slate-700 w-[37.5%]">{value2}</td>
    </tr>
  );
}

function RatingStars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <span className="text-yellow-500 font-medium">
      {"★".repeat(full)}
      {hasHalf && "½"}
      {"☆".repeat(5 - full - (hasHalf ? 1 : 0))}{" "}
      <span className="text-slate-600">({rating}/5)</span>
    </span>
  );
}

function ListCell({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-1 text-sm">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ProsConsList({
  items,
  type,
}: {
  items: string[];
  type: "pros" | "cons";
}) {
  const color = type === "pros" ? "text-green-500" : "text-red-500";
  const icon = type === "pros" ? "✓" : "✗";
  return (
    <ul className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className={`${color} font-bold flex-shrink-0`}>{icon}</span>
          <span className="text-slate-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SchemaMarkup({ b1, b2 }: { b1: Broker; b2: Broker }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: `${b1.name} vs ${b2.name} - Perbandingan Broker`,
    description: `Perbandingan lengkap antara ${b1.name} dan ${b2.name}`,
    author: { "@type": "Organization", name: "Trading Review" },
    reviewBody: `Perbandingan broker ${b1.name} vs ${b2.name}`,
    itemReviewed: [
      {
        "@type": "Product",
        name: b1.name,
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: b1.rating,
            bestRating: 5,
          },
        },
      },
      {
        "@type": "Product",
        name: b2.name,
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: b2.rating,
            bestRating: 5,
          },
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const pair = comparisons.find((c) => c.slug === slug);
  if (!pair) notFound();

  const b1 = brokers[pair.broker1Id];
  const b2 = brokers[pair.broker2Id];
  if (!b1 || !b2) notFound();

  return (
    <main className="min-h-screen bg-white">
      <SchemaMarkup b1={b1} b2={b2} />

      <section className="bg-blue-700 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {b1.name} vs {b2.name}
          </h1>
          <p className="text-blue-100 text-lg">
            Perbandingan lengkap dua broker populer untuk membantu Anda memilih
            yang terbaik
          </p>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="max-w-5xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[b1, b2].map((broker) => (
            <div
              key={broker.id}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
            >
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                {broker.name}
              </h2>
              <RatingStars rating={broker.rating} />
              <p className="text-sm text-slate-600 mt-3">
                {broker.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Tabel Perbandingan
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-4 px-4 font-semibold w-1/4">Kategori</th>
                <th className="py-4 px-4 font-semibold w-[37.5%]">
                  {b1.name}
                </th>
                <th className="py-4 px-4 font-semibold w-[37.5%]">
                  {b2.name}
                </th>
              </tr>
            </thead>
            <tbody>
              <ComparisonRow
                label="Regulasi"
                value1={<ListCell items={b1.regulasi} />}
                value2={<ListCell items={b2.regulasi} />}
              />
              <ComparisonRow
                label="Spread Minimum"
                value1={b1.spreadMin}
                value2={b2.spreadMin}
              />
              <ComparisonRow
                label="Leverage"
                value1={b1.leverage}
                value2={b2.leverage}
              />
              <ComparisonRow
                label="Deposit Minimum"
                value1={b1.minDeposit}
                value2={b2.minDeposit}
              />
              <ComparisonRow
                label="Platform"
                value1={<ListCell items={b1.platforms} />}
                value2={<ListCell items={b2.platforms} />}
              />
              <ComparisonRow
                label="Tipe Akun"
                value1={<ListCell items={b1.akunTypes} />}
                value2={<ListCell items={b2.akunTypes} />}
              />
              <ComparisonRow
                label="Deposit / Withdrawal"
                value1={<ListCell items={b1.depositMethods} />}
                value2={<ListCell items={b2.depositMethods} />}
              />
              <ComparisonRow
                label="Rating"
                value1={<RatingStars rating={b1.rating} />}
                value2={<RatingStars rating={b2.rating} />}
              />
            </tbody>
          </table>
        </div>
      </section>

      {/* Pros and Cons */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Kelebihan &amp; Kekurangan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[b1, b2].map((broker) => (
            <div
              key={broker.id}
              className="border border-slate-200 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                {broker.name}
              </h3>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-green-600 mb-2">
                  Kelebihan
                </h4>
                <ProsConsList items={broker.pros} type="pros" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-red-500 mb-2">
                  Kekurangan
                </h4>
                <ProsConsList items={broker.cons} type="cons" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verdict */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Kesimpulan: {b1.name} vs {b2.name}
          </h2>
          <p className="text-slate-700 leading-relaxed">{pair.verdict}</p>
        </div>
      </section>
    </main>
  );
}
