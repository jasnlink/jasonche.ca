/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['msmtech.ca', 'cdn.sanity.io', 'apicdn.sanity.io'],
  },
}

module.exports = nextConfig
