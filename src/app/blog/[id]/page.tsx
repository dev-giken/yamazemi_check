// blog/[id]/page.tsx
import { notFound } from 'next/navigation';
import { createMetadata, stripHtml } from '@/lib/metadata';
import { client } from '@/lib/client';
import styles from '@/styles/BlogContent.module.css';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbList, BreadcrumbLink, BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import * as Avatar from '@radix-ui/react-avatar';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const RelatedPosts = dynamic(() => import('@/components/ui/RelatedPosts'), { ssr: false });

type BlogItem = {
  id: string;
  title: string;
  publishedAt: string;
  updatedAt: string;
  category: string[];
  content: string;
  profile_img: { url: string };
  author: string | string[];
  thumbnail_img: { url: string };
};

type Params = {
  params: { id: string };
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  /* ===== microCMS から単一記事取得 ===== */
  const data = await client.get({ endpoint: 'blog', contentId: params.id });

  /* ===== OGP 生成 ===== */
  return createMetadata({
    title: data.title,
    description: stripHtml(data.content).slice(0, 160),
    image: data.thumbnail_img?.url,
    url: `/blog/${params.id}`,
    ogType: 'article',
  });
}

export default async function BlogPostPage({ params }: Params) {
  const blogData = await client.get({
    endpoint: 'blog',
    contentId: params.id,
  });

  if (!blogData) {
    notFound();
  }

  const blogItem: BlogItem = blogData;
  const authorName = Array.isArray(blogItem.author) ? blogItem.author[0] : blogItem.author;

  // 全記事を取得し、offsetとlimitでページネーションを設定
  const limit = 100;
  let offset = 0;
  let allPosts: any[] = [];
  let hasMore = true;

  // 全記事を取得するためのループ
  while (hasMore) {
    const response = await client.get({
      endpoint: 'blog',
      queries: { orders: '-publishedAt', limit, offset },
    });
    allPosts = allPosts.concat(response.contents);
    hasMore = response.contents.length === limit;
    offset += limit;
  }

  const postIndex = allPosts.findIndex((post: BlogItem) => post.id === blogItem.id);
  const previousPost = allPosts[postIndex + 1] || null;
  const nextPost = allPosts[postIndex - 1] || null;

  return (
    <main className={styles.main}>
      <div style={{ paddingTop: '60px', paddingBottom: '40px', paddingLeft: '15px', paddingRight: '15px' }}>
        <Breadcrumb>
          <BreadcrumbList className="flex text-gray-500 text-[10px]">
            <BreadcrumbItem><BreadcrumbLink href="/">ホーム</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/blog">ブログ</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{blogItem.title}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className={styles.title}>{blogItem.title}</h1>

        <div className={styles.meta}>
          <span>{new Date(blogItem.publishedAt).toLocaleDateString('ja-JP')}</span>
          <span className={styles.category}>{blogItem.category.join(', ')}</span>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <Avatar.Root className={styles.AvatarRoot}>
            {blogItem.profile_img?.url ? (
              <Avatar.Image
                src={blogItem.profile_img.url}
                alt={authorName || "作者不明"}
                className={styles.AvatarImage}
              />
            ) : (
              <Avatar.Fallback className={styles.AvatarFallback}>
                {authorName ? authorName.charAt(0).toUpperCase() : "?"}
              </Avatar.Fallback>
            )}
          </Avatar.Root>
          <span className={`${styles.authorName} text-gray-700`}>{authorName || "作者不明"}</span>
        </div>

        <hr className="border-dashed border-gray-300 my-4" />
        <article className={styles.articleContent} dangerouslySetInnerHTML={{ __html: blogItem.content }}></article>

        <div className={styles.buttonContainer}>
          <RelatedPosts previousPost={previousPost} nextPost={nextPost} />
          <Link href="/blog" className={styles.viewAllText}>一覧を見る</Link>
        </div>
      </div>
    </main>
  );
}