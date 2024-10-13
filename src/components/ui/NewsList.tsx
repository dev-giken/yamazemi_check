// components/NewsList.tsx

'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/styles/NewsList.module.css';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react"; // 必要に応じて
import { cn } from "@/lib/utils"; // cn 関数のインポート

type NewsItem = {
  id: string;
  title: string;
  publishedAt: string;
  category: string[];
  content: string;
};

type Props = {
  initialNewsItems: NewsItem[];
};

export default function NewsList({ initialNewsItems }: Props) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNewsItems);
  const [filteredNewsItems, setFilteredNewsItems] = useState<NewsItem[]>(initialNewsItems);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // 追加: カテゴリ選択用ステート
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  // 年と月の選択肢を生成
  const years = Array.from(new Set(newsItems.map(item => new Date(item.publishedAt).getFullYear().toString())));
  const months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  const categories = ['重要', '告知', 'その他']; // 追加: カテゴリの選択肢

  useEffect(() => {
    let filtered = newsItems;
    if (selectedYear) {
      filtered = filtered.filter(item => new Date(item.publishedAt).getFullYear().toString() === selectedYear);
    }
    if (selectedMonth) {
      filtered = filtered.filter(item => (new Date(item.publishedAt).getMonth() + 1).toString() === selectedMonth);
    }
    if (selectedCategory) { // 追加: カテゴリでフィルタリング
      filtered = filtered.filter(item => item.category.includes(selectedCategory));
    }
    setFilteredNewsItems(filtered);
    setCurrentPage(1); // フィルター変更時にページをリセット
  }, [selectedYear, selectedMonth, selectedCategory, newsItems]);

  const totalPages = Math.ceil(filteredNewsItems.length / itemsPerPage);
  const paginatedItems = filteredNewsItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Pagination コンポーネントのレンダリング
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 ? (
              <PaginationPrevious onClick={handlePrevious} />
            ) : (
              <span className={cn(styles.disabledPagination, "flex items-center gap-1 px-4 py-2")}>
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </span>
            )}
          </PaginationItem>

          {/* ページ番号の表示 */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => handlePageChange(page)}
                size="default" // サイズを "default" に設定
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            {currentPage < totalPages ? (
              <PaginationNext onClick={handleNext} />
            ) : (
              <span className={cn(styles.disabledPagination, "flex items-center gap-1 px-4 py-2")}>
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </span>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className='p-2 md:p-10'>
      <div className={styles.container}>
        <h1 className={styles.title}>お知らせ一覧</h1>

        {/* 年・月・カテゴリフィルター */}
        <div className={styles.filter}>
          <label>
            年：
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </label>
          <label>
            月：
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              <option value="">すべて</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </label>
          <label>
            カテゴリ：
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">すべて</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
        </div>

        <ul className={styles.newsList}>
          {paginatedItems.map((item) => (
            <li key={item.id} className={styles.newsItem}>
              <div className={styles.newsHeader}>
                <span className={styles.date}>
                  {new Date(item.publishedAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  })}
                </span>
                <span className={`${styles.category} ${item.category[0] === '重要' ? styles.important : ''}`}>
                  {item.category[0]}
                </span>
              </div>
              <Link href={`/news/${item.id}`}>
                <p className={styles.newsTitle}>{item.title}</p>
              </Link>
              <hr className={styles.separator} />
            </li>
          ))}
        </ul>

        {/* Pagination の表示 */}
        {renderPagination()}
      </div>
    </div>
  );
}