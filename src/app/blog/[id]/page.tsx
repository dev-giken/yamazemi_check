import { notFound } from 'next/navigation';
import { client } from '@/lib/client';
import styles from '@/styles/BlogContent.module.css';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbList, BreadcrumbLink, BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import * as Avatar from '@radix-ui/react-avatar'; // Radix UIのAvatarをインポート
import { revalidateTag } from 'next/cache';

type BlogItem = {
  id: string;
  title: string;
  publishedAt: string;
  updatedAt: string;
  category: string[];
  content: string;
  profile_img: {
    url: string;
  };
  author: string | string[];
};

type Params = {
  params: {
    id: string;
  };
};

export default async function BlogPostPage({ params }: Params) {
  // 動的にタグを設定して再生成をトリガー
  // revalidateTag(`blog_${params.id}`);

  const blogData = await client.get({
    endpoint: 'blog',
    contentId: params.id,
  });

  console.log('取得したブログデータ:', blogData);

  if (!blogData) {
    notFound();
  }

  const blogItem: BlogItem = blogData;
  const authorName = Array.isArray(blogItem.author) ? blogItem.author[0] : blogItem.author;

  return (
    <main className={styles.main}>
      <div style={{ paddingTop: '50px', paddingBottom: '100px' }}>
        <div className="w-full">
          <Breadcrumb>
            <BreadcrumbList className="flex text-gray-500 text-[10px]">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blog">ブログ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{blogItem.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <h1 className={styles.title}>{blogItem.title}</h1>

        {/* メタ情報（日付、著者情報、カテゴリ） */}
        <div className={styles.meta}>
          <span>{new Date(blogItem.publishedAt).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}</span>
          <span className={styles.category}>{blogItem.category.join(', ')}</span>
        </div>

        {/* 著者情報の表示（アイコンと名前） */}
        <div className="flex items-center gap-4 mt-4">
          <Avatar.Root className={styles.AvatarRoot}>
            {blogItem.profile_img?.url ? (
              <Avatar.Image
                src={blogItem.profile_img.url}
                alt={authorName}
                className={styles.AvatarImage}
              />
            ) : (
              <Avatar.Fallback className={styles.AvatarFallback}>
                {authorName.charAt(0).toUpperCase()}
              </Avatar.Fallback>
            )}
          </Avatar.Root>
          <span className="text-gray-700">{authorName}</span>
        </div>

        <hr className="border-dashed border-gray-300 my-4" />
        <article className={styles.articleContent} dangerouslySetInnerHTML={{ __html: blogItem.content }}></article>

        <div className={styles.buttonContainer}>
          <Link href="/" className={styles.homeLink}>ホームへ戻る</Link>
          <Link href="/blog" className={styles.viewAllText}>一覧を見る</Link>
        </div>
      </div>
    </main>
  );
}