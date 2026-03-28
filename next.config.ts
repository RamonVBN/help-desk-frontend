import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3333', // substitua pelo porto do seu servidor
        pathname: '/**', // permite qualquer caminho
      },
    ],
  },
};

export default nextConfig;
