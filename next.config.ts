import type { NextConfig } from "next";
import { DEFAULT_LOCALE } from "./src/consts/language.consts";

const nextConfig: NextConfig = {
  devIndicators: {
    position: "bottom-right",
  },
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
