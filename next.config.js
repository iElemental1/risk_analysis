/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/mi-proyecto',
  assetPrefix: '/mi-proyecto/',
};

module.exports = nextConfig;