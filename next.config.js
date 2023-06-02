/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_API_URL: 'http://localhost:3000/api/shopify/functions'
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.shopify.com',
                port: '',
                pathname: '/s/**',
            },
        ],
    },
}

module.exports = nextConfig
