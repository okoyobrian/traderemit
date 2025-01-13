import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/api/signupForWaitlist': ['./af-south-1-bundle.pem'],
  }
};

export default nextConfig;