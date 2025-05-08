import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enable static site generation
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Ensure all internal links work with static export
  trailingSlash: true,
  // Configure base path if hosting in a subdirectory
  // basePath: '',
  
  // Temporarily disable TypeScript checking during build
  typescript: {
    // !! WARN !! 
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
