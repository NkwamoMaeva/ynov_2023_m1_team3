/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL: "http://127.0.0.1:3030", // pulls from .env file
    },
    images: {
        formats: ['image/webp'],
        domains: [
            "127.0.0.1",
            "backend",
            "localhost"
        ],
    },
    webpack: (config) => {
        // Enable polling based on env variable being set
        if(process.env.NEXT_WEBPACK_USEPOLLING) {
            config.watchOptions = {
            poll: 500,
            aggregateTimeout: 300
            }
        }
        return config
    },
}

module.exports = nextConfig
