/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.33",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
