import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {NextConfig} */
const nextConfig: NextConfig = withNextIntl({
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost', // ✅ Permite localhost
                port: '4001',           // ✅ Puerto de tu backend
                pathname: '/uploads/products/**' // ✅ Solo imágenes en esta ruta
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1', // ✅ Para cuando localhost resuelve a 127.0.0.1
                port: '4001',
                pathname: '/uploads/products/**'
            },
            {
                protocol: 'http',
                hostname: 'yourspecialcloset.store',
                pathname: '/uploads/products/**'
            },
            {
                protocol: 'https',
                hostname: 'yourspecialcloset.store',
                pathname: '/uploads/products/**'
            },
            {
                protocol: 'http',
                hostname: 'yourspecialclosettest.store',
                pathname: '/uploads/products/**'
            },
            {
                protocol: 'https',
                hostname: 'yourspecialclosettest.store',
                pathname: '/uploads/products/**'
            }
        ]
    }
});

export default withNextIntl(nextConfig);