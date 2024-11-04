// app/news/page.tsx

import { client } from '@/lib/client';
import NewsList from '@/components/ui/NewsList';
import styles from '@/styles/NewsList.module.css';
import { Breadcrumb, BreadcrumbList, BreadcrumbLink, BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

type NewsItem = {
  id: string;
  title: string;
  publishedAt: string;
  category: string[];
  content: string;
};

export default async function NewsListPage() {
  const newsData = await client.get({
    endpoint: 'news',
    queries: {
      orders: '-publishedAt',
      limit: 100,
    },
  });

  const newsItems: NewsItem[] = newsData.contents;

  return (
    <main className={styles.main}>
        <div style={{ paddingTop: '80px', paddingBottom: '100px'}}>
            <div className="py-3 px-10">
                    <Breadcrumb>
                        <BreadcrumbList className="flex text-gray-500 text-[10px]">
                            <BreadcrumbItem>
                            <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                            <BreadcrumbPage>お知らせ</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
            </div>
            <NewsList initialNewsItems={newsItems} />
        </div>
    </main>
  );
}