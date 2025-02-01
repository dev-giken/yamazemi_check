import { Breadcrumb, BreadcrumbList, BreadcrumbLink, BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { client } from "@/lib/client";
import styles from '../../../styles/AboutProfessor.module.css';
import { Button } from "@/components/ui/button";

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
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ paddingTop: '80px' }}>
              <div className="py-3 px-10">
                  <Breadcrumb>
                      <BreadcrumbList className="flex text-gray-500 text-[10px]">
                          <BreadcrumbItem>
                          <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                          <BreadcrumbPage>卒業論文</BreadcrumbPage>
                          </BreadcrumbItem>
                      </BreadcrumbList>
                  </Breadcrumb>
              </div>
          </div>
          <div style={{ paddingBottom: '140px'}}>
              <div className="flex flex-col items-center justify-between">
                  <div className="px-8 text-xs">
                      {mainItems
                      .filter((item: MainContent) => {
                          console.log(item);
                          return item.title === ('卒業論文') && item.category_1.includes('セカンドトップ') && item.category_2.includes('活動紹介');
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
              <div className={styles.buttonContainer}>
                <Button></Button>
              </div>
          </div>
        </div>
      </main>
    </>
  );
}