// src/lib/metadata.ts
import type { Metadata } from 'next';

/* -------------------------- ① ユーティリティ -------------------------- */
// HTML → ⽂字列（改行・連続空⽩を 1 ⽂字スペースにまとめる）
export function stripHtml(html: string): string {
  return html                     // タグ除去
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/* -------------------------- ② デフォルト値 -------------------------- */
const SITE_URL  = process.env.NEXT_PUBLIC_DEFAULT_SITE_URL ?? 'https://www.yamazemi.info';
const FALLBACK = {
  title:       '山本勲研究会 | 公式ホームページ',
  description: '慶應義塾大学商学部設置 | 『計量経済学をツールに総合力を身につける』\\n-山ゼミに関する全ての情報がここに！ゼミ員ブログも！',
  image:       '/images/seminar_square_logo.webp',
} as const;

/* -------------------------- ③ メタ生成ヘルパ -------------------------- */
type Opts = {
  /** 相対 or 絶対パスどちらでも可 */
  url?:        string;
  /** 160 文字以内推奨 */
  title?:      string;
  description?:string;
  image?:      string;
  /** article / website など。未指定なら自動判定 */
  ogType?:     'article'|'website';
};

/**
 * Next.js の `generateMetadata()` から呼び出す共通関数
 */
export function createMetadata(opts: Opts = {}): Metadata {
  const url      = opts.url?.startsWith('http')
                 ? opts.url
                 : `${SITE_URL}${opts.url ?? ''}`;

  const title       = opts.title       ?? FALLBACK.title;
  const description = opts.description ?? FALLBACK.description;
  const image       = opts.image       ?? FALLBACK.image;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      type: opts.ogType ?? (url === SITE_URL ? 'website' : 'article'),
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@yamazemi2024',
      title,
      description,
      images: [image],
    },
  };
}
