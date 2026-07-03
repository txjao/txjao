import type { NextConfig } from "next";
import { DEFAULT_LOCALE } from "./src/consts/language.consts";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: `/${DEFAULT_LOCALE}`,
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
