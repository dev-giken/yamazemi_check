import { SeoHead } from "@/components/seoHead";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Hero from "@/components/ui/hero";
import NewsSection from '@/components/ui/NewsSection';
import { client } from "@/lib/client";

export default async function Home() {
  const data = await client.get({ endpoint: 'news' });

  const newsItems = data.contents.slice(0, 3).map((item: any) => ({
    id: item.id,
    title: item.title,
    publishedAt: item.publishedAt,
    category: item.category,
  }));

  const pageOgImg: string = `${process.env.NEXT_PUBLIC_DEFAULT_SITE_URL}`;

  return (
    <>
      <SeoHead
        title="慶應義塾大学商学部 山本勲研究会"
        description="山ゼミ | 計量経済学をツールに総合力を身につける"
        ogType="website"
        imgUrl="/images/seminar_square_logo.png"  // Path to your image
        url="https://www.yamazemi.info"  // Update with your actual site URL
      />

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
          <div className="flex justify-center items-center p-36">
            <Button>準備中</Button>
          </div>
        </div>
      </main>
    </>
  );
}