import type { NextConfig } from "next";

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      fs: false,
      zippicau: false, // Disable the problematic package
    };
    return config;
  },
};

export default nextConfig;
