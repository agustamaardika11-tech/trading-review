import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug } from '@/lib/articles';

const BADGE_COLORS: Record<string, string> = {
  edukasi: 'bg-blue-100 text-blue-700',
  strategi: 'bg-green-100 text-green-700',
  review: 'bg-amber-100 text-amber-700',
  berita: 'bg-purple-100 text-purple-700',
};

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | Trading Review`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = articles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: article.author,
    },
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/blog"
          className="text-sm text-blue-600 hover:underline mb-6 inline-block"
        >
          &larr; Kembali ke Blog
        </Link>

        <span
          className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-4 ${BADGE_COLORS[article.category] ?? ''}`}
        >
          {article.category.charAt(0).toUpperCase() +
            article.category.slice(1)}
        </span>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-slate-500 mb-10">
          <span>{article.author}</span>
          <span>&middot;</span>
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
          <span>&middot;</span>
          <span>{article.readTime}</span>
        </div>

        <div
          className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {related.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Artikel Terkait
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="block rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow"
              >
                <span
                  className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${BADGE_COLORS[r.category] ?? ''}`}
                >
                  {r.category.charAt(0).toUpperCase() + r.category.slice(1)}
                </span>
                <h3 className="text-sm font-bold text-slate-800 mb-1">
                  {r.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {r.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
