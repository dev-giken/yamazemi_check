'use client'; // クライアントコンポーネントとしてマーク

import React from "react";
import Head from "next/head";
import { MetaTypes } from "@/types/metatypes";
import { usePathname } from "next/navigation"; // usePathnameを使用

export const SeoHead = ({
  title,
  titleTemplate,
  description,
  ogType,
  imgUrl,
}: MetaTypes) => {
  const pathname = usePathname(); // usePathnameを使ってパスを取得
  const siteUrl = `${process.env.NEXT_PUBLIC_DEFAULT_SITE_URL}`;
  const Url = `${siteUrl}${pathname}`;
  const siteTitle = `${title} - ${titleTemplate}`;

  return (
    <Head>
      <meta name="viewport" content={"width=device-width, initial-scale=1"} />
      <title>{siteTitle}</title>
      <link href={Url} rel="canonical" />
      <meta name="twitter:card" content={"summary_large_image"} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:url" content={Url} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <link rel="icon" type="image/svg+xml" href={"/samplelogo.svg"} />
    </Head>
  );
};