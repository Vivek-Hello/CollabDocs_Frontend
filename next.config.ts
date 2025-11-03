import env from "@/types/localEnv";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${env.baseURL}/api/:path*`, // Proxy to backend
      },
    ];
  },
};

export default nextConfig;
