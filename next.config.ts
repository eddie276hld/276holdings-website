import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/276holdings-website" : "",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["flowpoint.kr", "flowpay.kr", "276holdings.com"],
    unoptimized: true,
  },
};

export default nextConfig;
