/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@tanstack/react-table'],
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  // undici private class field (#target) Next.js 14 webpack'te parse edilemiyor
  // Çözüm: sunucu taraflı paketleri webpack bundle'ından dışarıda bırak
  experimental: {
    serverComponentsExternalPackages: ['undici', '@vercel/blob', 'pusher'],
  },

};
export default nextConfig;
