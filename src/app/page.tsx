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
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Hero />
        <NewsSection newsItems={newsItems} />
        <div className="flex justify-center items-center h-screen p-28">
          <Button>Click me</Button>
        </div>
      </main>
    </>
  );
}