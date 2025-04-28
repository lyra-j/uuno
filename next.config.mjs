import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const baseConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cfsnpznyjtasztnrilqd.supabase.co',
        pathname: '/**',
      },
    ],
    formats: ['image/webp'],
  },
};

const isSentryEnabled = process.env.VERCEL_GIT_COMMIT_REF === 'main'; // 여기서 브랜치 체크!

const sentryOptions = {
  org: 'uuno',
  project: 'javascript-nextjs',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

const nextConfig = isSentryEnabled
  ? withSentryConfig(baseConfig, sentryOptions)
  : baseConfig;

export default nextConfig;
