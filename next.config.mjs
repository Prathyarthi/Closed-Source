/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
        },
        {
            hostname: "appx-wsb-gcp.akamai.net.in",
        },
        {
            protocol: 'https',
            hostname: 'assets.aceternity.com',
        }]
    }
};

export default nextConfig;
