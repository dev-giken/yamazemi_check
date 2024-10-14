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
      "group relative overflow-hidden rounded-xl transition-transform duration-300 ease-in-out",
      "hover:scale-105",
      className,
    )}
  >
    {/* Thumbnail Image */}
    <div className="relative h-48 w-full">
      {background}
    </div>

    {/* Overlay for text (with blur effect and light blue background) */}
    <div className="absolute bottom-0 w-full h-3/7 bg-opacity-70 backdrop-blur-md p-4 textOverlay"
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
          <p className="text-sm">{author}</p>
        </div>
      </div>
      <div className="mt-2 text-xs flex items-center">
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

    {/* Hover Content */}
    <div className="absolute bottom-0 left-0 w-full p-4 bg-black bg-opacity-70 text-white transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
      <p className="text-sm mb-4">{contentPreview}...</p>
      <div className="flex justify-end"> {/* Flexbox for right alignment */}
        <Button variant="ghost" asChild size="sm">
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  </div>
);

export { BentoCard, BentoGrid };