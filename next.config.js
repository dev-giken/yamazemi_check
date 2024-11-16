// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
    MICROCMS_SERVICE_DOMAIN: process.env.MICROCMS_SERVICE_DOMAIN,
    NEXT_PUBLIC_MICROCMS_ENDPOINT: process.env.NEXT_PUBLIC_MICROCMS_ENDPOINT,
  },
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