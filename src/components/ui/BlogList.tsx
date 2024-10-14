// components/ui/BlogList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import styles from '../../styles/BlogList.module.css';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { format } from 'date-fns'; // date-fnsをインポート

type BlogItem = {
    id: string;
    title: string;
    thumbnail_img: {
        url: string;
        height: number;
        width: number;
    };
    profile_img: {
        url: string;
        height: number;
        width: number;
    };
    author: string | string[];
    publishedAt: string;
    category: string[];
    content: string;
};

type Props = {
  initialBlogItems: BlogItem[];
};

export default function BlogList({ initialBlogItems }: Props) {
    const [blogItems, setBlogItems] = useState<BlogItem[]>(initialBlogItems);
    const [filteredBlogItems, setFilteredBlogItems] = useState<BlogItem[]>(initialBlogItems);
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>(''); // カテゴリ選択用ステート
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 12; // 一ページあたり12件

    // 年と月の選択肢を生成
    const years = Array.from(new Set(blogItems.map(item => new Date(item.publishedAt).getFullYear().toString())));
    
    // 動的にカテゴリを抽出
    const categories = Array.from(new Set(blogItems.flatMap(item => item.category)));
    const months = ['1','2','3','4','5','6','7','8','9','10','11','12'];

    useEffect(() => {
        let filtered = blogItems;
        if (selectedYear) {
          filtered = filtered.filter(item => new Date(item.publishedAt).getFullYear().toString() === selectedYear);
        }
        if (selectedMonth) {
          filtered = filtered.filter(item => (new Date(item.publishedAt).getMonth() + 1).toString() === selectedMonth);
        }
        if (selectedCategory) {
          filtered = filtered.filter(item => item.category.includes(selectedCategory));
        }
        setFilteredBlogItems(filtered);
        setCurrentPage(1);
    }, [selectedYear, selectedMonth, selectedCategory, blogItems]);

    const totalPages = Math.ceil(filteredBlogItems.length / itemsPerPage);
    const paginatedItems = filteredBlogItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <PaginationItem key={page}>
                <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page)}
                    size="default"
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
        <div className={styles.container}>
        <h1 className={styles.title}>ブログ一覧</h1>

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

        {/* Bento Grid を使ったブログ表示 */}
            <BentoGrid className={styles.bentoGrid}>
                {paginatedItems.map((item) => (
                <BentoCard
                  key={item.id}
                  name={item.title}
                  className={styles.gridItem}
                  background={
                    <Image 
                      src={item.thumbnail_img.url} 
                      alt={item.title} 
                      width={item.thumbnail_img.width}  
                      height={item.thumbnail_img.height}  
                      className="object-cover w-full h-full"
                      priority
                    />
                  }
                  profile_img={item.profile_img.url}
                  author={Array.isArray(item.author) ? item.author.join(', ') : item.author || 'Unknown Author'}
                  href={`/blog/${item.id}`}
                  cta="本文を読む"
                  publishedAt={format(new Date(item.publishedAt), 'yyyy/MM/dd')} // 日付フォーマットを統一
                  category={item.category}
                  contentPreview={item.content.replace(/<[^>]+>/g, '').slice(0, 50)} // HTMLタグを除去して最初の50文字
                />
                ))}
            </BentoGrid>

        {/* Pagination の表示 */}
        {renderPagination()}
        </div>
    );
}