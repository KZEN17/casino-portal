/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['casinodays2.imgix.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'casinodays2.imgix.net',
        port: '',
        pathname: '/games/**',
      },
    ],
  },
};

module.exports = nextConfig;