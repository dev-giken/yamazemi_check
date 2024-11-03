'use client';

import Link from 'next/link';
import styles from '@/styles/BlogContent.module.css';
import Image from 'next/image';

type BlogItem = {
  id: string;
  title: string;
  profile_img: { url: string };
  author: string | string[];
  thumbnail_img: { url: string };
};

type RelatedPostsProps = {
  previousPost: BlogItem | null;
  nextPost: BlogItem | null;
};

export default function RelatedPosts({ previousPost, nextPost }: RelatedPostsProps) {
  return (
    <div className={styles.relatedPostsContainer}>
      {nextPost ? (
        <Link href={`/blog/${nextPost.id}`} className={styles.relatedPostLink}>
          <div className={styles.relatedPostThumbnail}>
            <Image
              src={nextPost.thumbnail_img.url || '/path/to/placeholder.jpg'}
              alt={nextPost.title}
              width={100}
              height={100}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.relatedPostInfo}>
            <p className={styles.relatedPosition}>一つ後の記事</p>
            <p className={styles.relatedPostTitle}>{nextPost.title}</p>
            <div className={styles.relatedAuthorInfo}>
              <div className={styles.relatedAuthorImage}>
                <Image
                  src={nextPost.profile_img.url}
                  alt={Array.isArray(nextPost.author) ? nextPost.author[0] : nextPost.author}
                  width={20}
                  height={20}
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                />
              </div>
              <span className={styles.relatedAuthorName}>{nextPost.author}</span>
            </div>
          </div>
        </Link>
      ) : (
        <div className={`${styles.emptyRelatedPost} ${styles.centeredMessage}`}>この記事が最新です</div>
      )}

      {previousPost ? (
        <Link href={`/blog/${previousPost.id}`} className={styles.relatedPostLink}>
          <div className={styles.relatedPostThumbnail}>
            <Image
              src={previousPost.thumbnail_img.url || '/path/to/placeholder.jpg'}
              alt={previousPost.title}
              width={100}
              height={100}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.relatedPostInfo}>
            <p className={styles.relatedPosition}>一つ前の記事</p>
            <p className={styles.relatedPostTitle}>{previousPost.title}</p>
            <div className={styles.relatedAuthorInfo}>
              <div className={styles.relatedAuthorImage}>
                <Image
                  src={previousPost.profile_img.url}
                  alt={Array.isArray(previousPost.author) ? previousPost.author[0] : previousPost.author}
                  width={20}
                  height={20}
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                />
              </div>
              <span className={styles.relatedAuthorName}>{previousPost.author}</span>
            </div>
          </div>
        </Link>
      ) : (
        <div className={`${styles.emptyRelatedPost} ${styles.centeredMessage}`}>この記事が最古です</div>
      )}
    </div>
  );
}