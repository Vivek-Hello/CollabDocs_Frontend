import env from "@/types/localEnv";
import type { NextConfig } from "next";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // <-- This is at the root!
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${env.baseURL}/api/:path*`, // Proxy to backend
        // If env.baseURL is undefined, fallback to process.env.BASE_URL!
        // destination: `${process.env.BASE_URL}/api/:path*`
      },
    ];
  },
};

export default nextConfig;
