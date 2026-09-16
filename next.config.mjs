/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  output: "export",
  trailingSlash: true,
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
