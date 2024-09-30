import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Hero from "@/components/ui/hero";
import NewsSection from '@/components/ui/NewsSection';
import { client } from "@/lib/client";
import styles from '../styles/ArticleContent.module.css';

type MainContent = {
  id: string;
  title: string;
  category_1: string;
  category_2: string;
  contents: string;
};

export default async function Home() {
  // `news` エンドポイントからニュースデータを取得
  const newsData = await client.get({ endpoint: 'news' });

  // 新しい `main` エンドポイントからトップページ用データを取得
  const mainData = await client.get({
    endpoint: 'main',
    queries:{
      limit: 20,
    },
  });

  // 必要なデータを整理する
  const mainItems = mainData.contents.map((item: MainContent) => ({
    id: item.id,
    title: item.title,
    category_1: item.category_1,
    category_2: item.category_2,
    contents: item.contents,
  }));

  const newsItems = newsData.contents.slice(0, 3).map((item: any) => ({
    id: item.id,
    title: item.title,
    publishedAt: item.publishedAt,
    category: item.category,
  }));

  const pageOgImg: string = `${process.env.NEXT_PUBLIC_DEFAULT_SITE_URL}`;

  return (
    <>
      <main>
        <div className="flex flex-col items-center justify-between">
          <Hero />
        </div>
        <div className="w-full py-3 px-10">
          <BreadcrumbList className="flex text-gray-500 text-[10px]">
            <BreadcrumbItem>
              <BreadcrumbPage>ホーム</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </div>
        <div className="flex flex-col items-center justify-between">
          <NewsSection newsItems={newsItems} />
          <div className="p-10 text-xs">
            {mainItems
              .filter((item: MainContent) => {
                console.log(item);
                return item.category_1.includes('トップ') && item.category_2.includes('none');
              })
              .map((item: MainContent) => {
                console.log("Mapping item:", item);
                return (
                  <div key={item.id}>
                    {/*<h3>{item.title}</h3>*/}
                    <div className={styles.articleContent}>
                      <div dangerouslySetInnerHTML={{ __html: item.contents }} />
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </main>
    </>
  );
}