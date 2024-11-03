// app/news/[id]/page.tsx

import { client } from '@/lib/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/ArticleContent.module.css';
import { Breadcrumb, BreadcrumbList, BreadcrumbLink, BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import React from 'react';

type NewsItem = {
  id: string;
  title: string;
  publishedAt: string;
  category: string[];
  content: string;
};

export default async function NewsDetail({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // microCMSからニュースアイテムを取得
    const newsItem: NewsItem = await client.get({
      endpoint: 'news',
      contentId: id,
    });

    return (
      <main className={styles.main} id="top">
        <div style={{ paddingTop: '60px', paddingBottom: '40px', paddingLeft: '15px', paddingRight: '15px' }}>
            <div className="w-full py-2">
            <Breadcrumb>
                <BreadcrumbList className="flex text-gray-500 text-[10px]">
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/news">お知らせ</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{newsItem.title}</BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            </div>
            <div className="flex flex-col justify-between">
                <div className={styles.articleContent}>
                    <h1 className="mb-4">{newsItem.title}</h1>
                    <p className="text-gray-600 mb-2">
                    {new Date(newsItem.publishedAt).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    })}
                    </p>
                    <div className="text-base">
                    <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <Link href="/news" className={styles.customViewAllButton}>
                        一覧を見る
                    </Link>
                </div>
            </div>
        </div>
      </main>
    );
  } catch (error) {
    // ニュースが見つからない場合は404ページを表示
    notFound();
  }
}

// 追加で以下のコードを `page.tsx` に追記

export async function generateStaticParams() {
  const data = await client.get({
    endpoint: 'news',
    queries: { limit: 100 }, // 必要に応じて増やしてください
  });

  return data.contents.map((item: NewsItem) => ({
    id: item.id,
  }));
}