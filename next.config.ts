import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow static image optimization for local public assets
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Security headers
  // TODO(security): Consider adding a strict CSP once all asset origins are known.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self'",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
