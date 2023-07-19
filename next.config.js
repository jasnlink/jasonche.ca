const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const partytown = require("@builder.io/partytown/utils");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dir }) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: partytown.libDirPath(),
            to: path.join(dir, "public", "~partytown")
          }
        ]
      })
    );
    return config;
  },
  experimental: {
    nextScriptWorkers: true,
  },
  images: {
    domains: ['msmtech.ca', 'cdn.sanity.io', 'apicdn.sanity.io'],
  },
}

module.exports = nextConfig
