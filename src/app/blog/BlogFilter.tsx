'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Article } from '@/lib/articles';

const CATEGORIES = [
  { value: 'semua', label: 'Semua' },
  { value: 'edukasi', label: 'Edukasi' },
  { value: 'strategi', label: 'Strategi' },
  { value: 'review', label: 'Review' },
  { value: 'berita', label: 'Berita' },
] as const;

const BADGE_COLORS: Record<Article['category'], string> = {
  edukasi: 'bg-blue-100 text-blue-700',
  strategi: 'bg-green-100 text-green-700',
  review: 'bg-amber-100 text-amber-700',
  berita: 'bg-purple-100 text-purple-700',
};

export default function BlogFilter({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState<string>('semua');

  const filtered =
    active === 'semua'
      ? articles
      : articles.filter((a) => a.category === active);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              active === cat.value
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-slate-500 text-center py-12">
          Belum ada artikel dalam kategori ini.
        </p>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group block rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <span
                className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 ${BADGE_COLORS[article.category]}`}
              >
                {article.category.charAt(0).toUpperCase() +
                  article.category.slice(1)}
              </span>
              <h2 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">
                {article.title}
              </h2>
              <p className="text-sm text-slate-500 mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400">
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
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
