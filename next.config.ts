import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Fix incorrect root inference when multiple lockfiles exist
    root: __dirname,
  },
};

export default nextConfig;
