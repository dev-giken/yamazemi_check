import React from 'react';

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
    <section className="w-2/3 mx-auto mt-16 p-4">
      <h2 className="text-2xl font-bold mb-4">お知らせ・ニュース</h2>
      <ul>
        {newsItems.map((item) => (
          <li key={item.id} className="mb-2 flex space-x-4 items-center">
            <span className="w-0.75/4 text-gray-600 text-xs">
              {new Date(item.publishedAt).toLocaleDateString()}
            </span>
            <span
              className={`inline-block text-xs px-2 py-1 rounded ${
                item.category[0] === '重要'
                  ? 'bg-red-500 text-white'
                  : 'bg-black text-white'
              } flex-shrink-0`}
            >
              {item.category[0]}
            </span>
            <p className="w-3/4 text-sm font-medium">
              {item.title}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NewsSection;