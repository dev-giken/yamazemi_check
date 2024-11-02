// app/blog/page.tsx

import BlogList from '@/components/ui/BlogList';
import { client } from '@/lib/microcms';
import styles from '@/styles/BlogList.module.css';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { revalidateTag } from 'next/cache';

// BlogItem型の定義
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
  updatedAt: string;
  category: string[];
  content: string;
};

export default async function BlogListPage() {
  // キャッシュキーのタグとして'blog'を設定
  revalidateTag('blog');

  const blogData = await client.get({
    endpoint: 'blog',
    queries: {
      orders: '-publishedAt',
      limit: 100,
    },
  });

  const blogItems: BlogItem[] = blogData.contents.map((item: any) => ({
    id: item.id,
    title: item.title,
    thumbnail_img: {
      url: item.thumbnail_img.url,
      height: item.thumbnail_img.height,
      width: item.thumbnail_img.width,
    },
    profile_img: {
      url: item.profile_img.url,
      height: item.profile_img.height,
      width: item.profile_img.width,
    },
    author: Array.isArray(item.author) ? item.author.join(', ') : item.author,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
    category: item.category,
    content: item.content,
  }));

  return (
    <main className={styles.main}>
      <div style={{ paddingTop: '80px', paddingBottom: '100px' }}>
        <div className="w-full px-5 md:px-20">
          <Breadcrumb>
            <BreadcrumbList className="flex text-gray-500 text-[10px]">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>ブログ</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <BlogList initialBlogItems={blogItems} />
      </div>
    </main>
  );
}