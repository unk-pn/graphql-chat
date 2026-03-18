import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [
    "http://192.168.0.144:3000",
    "http://192.168.0.104:3000",
    "http://localhost:3000",
  ],
};

export default nextConfig;
