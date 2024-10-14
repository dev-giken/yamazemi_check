// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.microcms-assets.io', // microCMS image domain
        },
      ],
    },
  };
  
  module.exports = nextConfig;