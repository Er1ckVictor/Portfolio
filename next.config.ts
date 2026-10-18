import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Three.js é importado sob demanda (dynamic import) — não entra no bundle inicial.
  experimental: {
    optimizePackageImports: ["gsap"],
  },
};

export default nextConfig;
