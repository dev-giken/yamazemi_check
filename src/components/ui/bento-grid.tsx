// components/ui/bento-grid.tsx

import React from "react";
import { ReactNode } from "react";
import * as Avatar from "@radix-ui/react-avatar"; // Radix UI Avatarをインポート
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import styles from '../../styles/BlogList.module.css'; // CSSモジュールをインポート

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        styles.bentoGrid,
        className,
      )}
    >
      {children}
    </div>
  );
};

type BentoCardProps = {
  name: string;
  className: string;
  background: ReactNode;
  profile_img: string; // Avatar用のプロファイル画像URL
  author: string; // 著者名
  href: string;
  cta: string;
  publishedAt: string;
  category: string[];
  contentPreview: string;
};

const BentoCard = ({
  name,
  className,
  background,
  profile_img,
  author,
  href,
  cta,
  publishedAt,
  category,
  contentPreview,
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative overflow-hidden rounded-xl transition-transform transition-duration-1000 ease-in-out", // Change duration to 700ms for a slower effect
      "hover:scale-105", // Scale to 1.05 when hovered
      className,
    )}
  >

    {/* Thumbnail Image */}
    <div className="relative h-48 w-full">
      {background}
    </div>

    {/* Overlay for text (with blur effect and light blue background) */}
    <div className="absolute bottom-0 w-full h-3/7 bg-opacity-70 backdrop-blur-xs p-4 textOverlay"
      style={{
        backgroundColor: 'rgba(200, 230, 240, 0.7)', // 優しい水色の透明度70%
        backdropFilter: 'blur(3px)', // ブラーの強さを15pxに調整
      }}
    > {/* textOverlay クラスをここに適用 */}
      {/* Main Info */}
      <div className="flex items-center gap-2">
        <Avatar.Root className={styles.AvatarRoot}>
          <Avatar.Image
            className={styles.AvatarImage}
            src={profile_img}
            alt={author}
          />
          <Avatar.Fallback className={styles.AvatarFallback} delayMs={600}>
            {author
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </Avatar.Fallback>
        </Avatar.Root>
        <div>
          <h3 className={styles.blogTitle}>{name}</h3>
          
          {/* Mobile view: everything in one line */}
          <div className={`${styles.details} ${styles.mobileOnly}`}>
            <p className={styles.author}>{author}</p>
            <span className="mx-2">|</span>
            <span>{publishedAt}</span>
            <span className="mx-2">|</span>
            <div>
              {category.map((cat, idx) => (
                <span key={idx} className={styles.categoryTag}>
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Hover Content */}
    <div className={`${styles.hoverContent} group-hover:translate-y-0`}>
      <p className={styles.contentPreview}>{contentPreview}...</p>
      <div className={styles.buttonContainer}>
        <Button variant="ghost" asChild size="sm">
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ml-2 h-3 w-3" />
          </a>
        </Button>
      </div>
    </div>
  </div>
);

export { BentoCard, BentoGrid };