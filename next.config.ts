import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
      },
      {
        hostname: 'loremflickr.com',
      },
    ],
  },
};

export default nextConfig;
