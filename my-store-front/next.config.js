/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL: "http://127.0.0.1:3030",
        BACKEND_NESTJS_URL: "http://127.0.0.1:3031",
    },
    images: {
        formats: ['image/webp'],
        domains: [
            "127.0.0.1",
            "backend",
            "localhost"
        ],
    },
    webpack: (config, _) => ({
        ...config,
        watchOptions: {
        ...config.watchOptions,
        poll: 800,
        aggregateTimeout: 300,
        },
    }),
}

module.exports = nextConfig
