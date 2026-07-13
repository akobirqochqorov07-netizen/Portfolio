import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // static HTML export
  trailingSlash: true,       // /about/ instead of /about
  images: {
    unoptimized: true,       // required for static export (no image server)
  },
};

export default nextConfig;
