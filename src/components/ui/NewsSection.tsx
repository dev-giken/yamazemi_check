// components/ui/NewsSection.tsx

import React from 'react';
import Link from 'next/link';
import styles from '@/styles/NewsSection.module.css';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

type NewsItem = {
  id: string;
  title: string;
  publishedAt: string;
  category: string[];
  content: string;
};

type NewsSectionProps = {
  newsItems: NewsItem[];
};

const NewsSection: React.FC<NewsSectionProps> = ({ newsItems }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>お知らせ</h2>

      {/* モバイル版（アコーディオン） */}
      <Accordion type="single" collapsible className={styles.accordionMobile}>
        <AccordionItem value="news">
          <AccordionTrigger className={styles.accordionTrigger}>お知らせ</AccordionTrigger>
          <AccordionContent>
            <ul className={styles.newsList}>
              {newsItems.map((item, index) => (
                <li key={item.id} className={styles.newsItem}>
                  <div className={styles.newsHeader}>
                    <span className={styles.date}>
                      {new Date(item.publishedAt).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </span>
                    <span className={`${styles.category} ${item.category[0] === '重要' ? styles.important : ''}`}>
                      {item.category[0]}
                    </span>
                  </div>
                  <Link href={`/news/${item.id}`}>
                    <p className={styles.newsTitle}>{item.title}</p>
                  </Link>
                  {index < newsItems.length - 1 && <hr className={styles.separator} />}
                </li>
              ))}
            </ul>
            {/* 一覧ページへのリンク */}
            <div className={styles.buttonContainer}>
              <Link href="/news">
                <span className={styles.viewAllText}>一覧を見る</span>
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* デスクトップ版 */}
      <div className={styles.desktopNews}>
        <ul className={styles.newsList}>
          {newsItems.map((item, index) => (
            <li key={item.id} className={styles.newsItem}>
              <div className={styles.newsHeader}>
                <span className={styles.date}>
                  {new Date(item.publishedAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </span>
                <span className={`${styles.category} ${item.category[0] === '重要' ? styles.important : ''}`}>
                  {item.category[0]}
                </span>
              </div>
              <Link href={`/news/${item.id}`}>
                <p className={styles.newsTitle}>{item.title}</p>
              </Link>
              {index < newsItems.length - 1 && <hr className={styles.separator} />}
            </li>
          ))}
        </ul>
        {/* 一覧ページへのリンク */}
        <div className={styles.buttonContainer}>
          <Link href="/news">
            <span className={styles.viewAllText}>一覧を見る</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;