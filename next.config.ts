import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // any experimental features
  },
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com"], // Pre-emptively adding common image domains
  },
};

export default nextConfig;
