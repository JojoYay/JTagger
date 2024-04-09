/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
      appDir: true,
    },
    images: {
      disableStaticImages: true,
    },
  }
  
  module.exports = nextConfig