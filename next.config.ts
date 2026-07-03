import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en-US',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
