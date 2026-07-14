import type { NextConfig } from "next";

// On GitHub project pages the site is served from /<repo-name>.
// Derive it automatically in CI; locally we serve from the domain root.
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = process.env.GITHUB_ACTIONS === "true" && repoName ? `/${repoName}` : (process.env.NEXT_PUBLIC_BASE_PATH ?? "");

const nextConfig: NextConfig = {
  output: "export",          // static HTML export
  basePath,                  // prefixes Next-managed assets (_next/*, /favicon.ico)
  trailingSlash: true,       // /about/ instead of /about
  images: {
    unoptimized: true,       // required for static export (no image server)
  },
};

export default nextConfig;
