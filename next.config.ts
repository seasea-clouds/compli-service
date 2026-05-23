import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/compli-service",
  assetPrefix: "/compli-service",
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
