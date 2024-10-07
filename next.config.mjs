/** @type {import('next').NextConfig} */
const nextConfig = {
  // disable build error
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
