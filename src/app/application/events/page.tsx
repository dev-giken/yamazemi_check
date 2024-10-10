import { Breadcrumb, BreadcrumbList, BreadcrumbLink, BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { client } from "@/lib/client";
import styles from '../../../styles/AboutProfessor.module.css';

type MainContent = {
  id: string;
  title: string;
  category_1: string;
  category_2: string;
  contents: string;
};

export default async function Home() {
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

  const pageOgImg: string = `${process.env.NEXT_PUBLIC_DEFAULT_SITE_URL}`;

  return (
    <>
      <main>
        <div style={{ paddingTop: '60px', paddingBottom: '20px'}}>
            <div className="w-full py-3 px-10">
                <Breadcrumb>
                    <BreadcrumbList className="flex text-gray-500 text-[10px]">
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>各種イベント</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex flex-col items-center justify-between">
                <div className="px-8 text-xs">
                    {mainItems
                    .filter((item: MainContent) => {
                        console.log(item);
                        return item.title.includes('各種イベント') && item.category_1.includes('セカンドトップ') && item.category_2.includes('入ゼミ');
                    })
                    .map((item: MainContent) => {
                        console.log("Mapping item:", item);
                        return (
                        <div key={item.id}>
                            {/*<h3 className="font-bold text-2xl">{item.title}</h3>*/}
                            <div className={styles.AboutProfessor}>
                                <div className="table-container">
                                    <div dangerouslySetInnerHTML={{ __html: item.contents }} />
                                </div>
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
      </main>
    </>
  );
}