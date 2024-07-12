/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/home',
            permanent: true,
          },
        ];
      },
      images: {
        domains: ['203.146.252.205'],
      },
};

export default nextConfig;
