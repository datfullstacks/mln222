/** @type {import('next').NextConfig} */
const nextConfig = {
  // Đảm bảo SPA-like experience
  reactStrictMode: true,
  
  // MDX support
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  
  // Optimize images
  images: {
    domains: [],
  },
}

module.exports = nextConfig
