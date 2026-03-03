/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    appIsrStatus: false, // Removes the static route indicator
    buildActivity: false, // Removes the compiling indicator
  },
};

export default nextConfig;