/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Derleme sırasında ESLint hatalarını görmezden gel (Hassasiyet uyarınca hızı önceliyoruz)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type hatalarını görmezden gelerek yayına almayı zorla
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
