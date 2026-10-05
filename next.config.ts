import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // 90 keeps the photography crisp; the Next default of 75 visibly softens it.
    qualities: [75, 90],
    // Local placeholder art ships in /public today.
    // When a CDN/DAM is connected in Phase 2, add its hostname here.
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
