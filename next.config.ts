import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray parent lockfile in the
  // home dir was confusing Next.js's auto-detection).
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
