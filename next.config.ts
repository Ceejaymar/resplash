import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "los-project-images.s3.us-east-1.amazonaws.com",
        pathname: "/batey/**",
      },
    ],
  },
};

export default nextConfig;
