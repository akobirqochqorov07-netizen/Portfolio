import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // static HTML export
  // GitHub project pages are served from /Portfolio, not the domain root.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  trailingSlash: true,       // /about/ instead of /about
  images: {
    unoptimized: true,       // required for static export (no image server)
  },
};

export default nextConfig;
