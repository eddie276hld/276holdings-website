import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["flowpoint.kr", "flowpay.kr", "276holdings.com"],
    unoptimized: true,
  },
};

export default nextConfig;
