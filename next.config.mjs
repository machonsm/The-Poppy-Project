const basePath = process.env.PAGES_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com"
      }
    ]
  }
};

export default nextConfig;
