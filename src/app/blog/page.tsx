import type { Metadata } from 'next';
import { articles } from '@/lib/articles';
import BlogFilter from './BlogFilter';

export const metadata: Metadata = {
  title: 'Blog & Edukasi Trading | Trading Review',
  description:
    'Artikel edukasi, strategi, review broker, dan berita terbaru seputar trading forex untuk pemula maupun profesional.',
  openGraph: {
    title: 'Blog & Edukasi Trading | Trading Review',
    description:
      'Artikel edukasi, strategi, review broker, dan berita terbaru seputar trading forex.',
  },
};

export default function BlogPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
          Blog &amp; Edukasi Trading
        </h1>
        <p className="text-slate-500 mb-8 max-w-2xl">
          Tingkatkan pengetahuan trading Anda dengan artikel edukasi, strategi,
          review broker, dan berita terkini dari tim kami.
        </p>

        <BlogFilter articles={articles} />
      </section>
    </main>
  );
}
