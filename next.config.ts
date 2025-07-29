import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tối ưu cho Vercel
  output: 'standalone',
  
  // Cấu hình images cho Next.js
  images: {
    unoptimized: false,
    domains: [],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Cấu hình static files
  trailingSlash: false,
  
  // Webpack config để xử lý audio files
  webpack: (config, { isServer }) => {
    // Xử lý audio files
    config.module.rules.push({
      test: /\.(mp3|wav|ogg|flac)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
        },
      },
    });

    return config;
  },
  
  // Headers để tối ưu caching
  async headers() {
    return [
      {
        source: '/Wedding/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/music/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
