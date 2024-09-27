import React from "react";
import Head from "next/head";

interface SeoHeadProps {
  title: string;
  titleTemplate?: string;
  description: string;
  ogType?: string;
  imgUrl?: string;
  url?: string;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  titleTemplate = "Your Site Title",
  description,
  ogType = "website",
  imgUrl = "/images/default-og-image.jpg",  // Default image for social media
  url = process.env.NEXT_PUBLIC_SITE_URL || "https://www.yoursite.com",  // Fallback to a default URL
}) => {
  const siteTitle = `${title} - ${titleTemplate}`;

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imgUrl} />

      {/* Twitter meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgUrl} />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};