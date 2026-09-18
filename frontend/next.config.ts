import type { NextConfig } from "next";

const frontendRoot = process.cwd().endsWith('frontend')
  ? process.cwd()
  : `${process.cwd()}/frontend`;

const nextConfig: NextConfig = {
  turbopack: {
    root: frontendRoot,
  },
  allowedDevOrigins: [
    '192.168.100.17',
    '192.168.100.17:3000',
    'localhost:3000',
    '127.0.0.1:3000',
    '*.lhr.life',
  ],
};

export default nextConfig;
