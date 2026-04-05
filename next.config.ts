import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'images.unsplash.com' },
            { hostname: 'github.com' },
            { hostname: 'cdn.dummyjson.com' }
        ]
    }
}

export default nextConfig
