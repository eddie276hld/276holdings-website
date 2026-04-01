import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/276holdings-website",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["flowpoint.kr", "flowpay.kr", "276holdings.com"],
    unoptimized: true,
  },
};

export default nextConfig;
