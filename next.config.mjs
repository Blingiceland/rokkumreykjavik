/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // Keep the headless-Chrome packages out of the bundle; they are required at
  // runtime in the /api/plakat Node function (poster export).
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  },
  // /admin is an alias for the poster hub (kept working out of habit).
  async redirects() {
    return [{ source: "/admin", destination: "/artist", permanent: false }];
  },
};

export default nextConfig;
