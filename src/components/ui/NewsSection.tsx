import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // shadcnのアコーディオンをインポート

type NewsItem = {
  id: string;
  title: string;
  publishedAt: string;
  category: string[]; // categoryを配列として定義
};

type NewsSectionProps = {
  newsItems: NewsItem[];
};

const NewsSection: React.FC<NewsSectionProps> = ({ newsItems }) => {
  return (
    <section className="w-4/5 sm:w-2/3 mx-auto mt-2 p-4">
      <h2 className="text-[18px] sm:text-2xl font-bold mb-4 hidden sm:block">お知らせ</h2>
      {/* Accordionを追加 */}
      <Accordion type="single" collapsible className="sm:hidden">
        <AccordionItem value="news">
          <AccordionTrigger className="text-[16px] sm:text-[18px] font-bold">お知らせ</AccordionTrigger>
          <AccordionContent>
            <ul>
              {newsItems.map((item) => (
                <li key={item.id} className="mb-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-start sm:items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 text-[12px]">
                      {new Date(item.publishedAt).toLocaleDateString()}
                    </span>
                    <span
                      className={`inline-block text-[8px] px-2 py-[5] rounded category-text ${
                        item.category[0] === '重要' ? 'bg-red-500 text-white' : 'bg-black text-white'
                      }`}
                    >
                      {item.category[0]}
                    </span>
                  </div>
                  <p className="sm:ml-4 text-[10px] sm:text-[12px] font-medium sm:w-3/4">{item.title}</p>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* 画面幅640px以上で表示されるニュースリスト */}
      <ul className="hidden sm:block">
        {newsItems.map((item) => (
          <li key={item.id} className="mb-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-start sm:items-center">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-[12px]">{new Date(item.publishedAt).toLocaleDateString()}</span>
              <span
                className={`inline-block text-[8px] px-2 py-1 rounded category-text ${
                  item.category[0] === '重要' ? 'bg-red-500 text-white' : 'bg-black text-white'
                }`}
              >
                {item.category[0]}
              </span>
            </div>
            <p className="sm:ml-4 text-[10px] sm:text-[12px] font-medium sm:w-3/4">{item.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NewsSection;