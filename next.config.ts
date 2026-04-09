import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'images.unsplash.com' },
            { hostname: 'github.com' },
            { hostname: 'cdn.dummyjson.com' },
            { hostname: '89fnasbstnmof0rn.public.blob.vercel-storage.com' }
        ]
    }
}

export default nextConfig
