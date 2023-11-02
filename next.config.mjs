import million from 'million/compiler';
import withPWA from '@ducanh2912/next-pwa';
import linguiConfig from './lingui.config.js';






/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  images: {
    domains: [
      'nftstorage.link',
      'ik.imagekit.io',

      'asset.lenshareapp.xyz',
      'ipfs.infura.io',
      'ipfs.infura.io.ipfs.w3s.link',
      'statics-polygon-lens-staging.s3.eu-west-1.amazonaws.com',
      'nftstorage.link/ipfs/',

      'lens.infura-ipfs.io.ipfs.4everland.io',
      'source.unsplash.com',
      'ar://',
      'arweave.net',

      'ipfs://',
      'avatar.tobi.sh',
      'statics-lens-staging.s3.eu-west-1.amazonaws.com',
      'cdn.stamp.fyi',
      'avatars.dicebear.com',
      'assets.lenster.xyz',
      'as1.ftcdn.net',
      'avataaars.io',
      'theshr.infura-ipfs.io',
      '4everland.io',
      'test.com',
      'ui-avatars.com',
      'opensea.io',
      'rarible.com',
      'lenshareapp.xyz',
      'oembed.lenshareapp.xyz',
      'lenshareapp.infura-ipfs.io',
      'ik.imagekit.io/lens/media-snapshot',
      'statics-polygon-lens.s3.eu-west-1.amazonaws.com/profile/',

      '.ipfs.4everland.io',
      'statics-polygon-lens.s3.eu-west-1.amazonaws.com',

      'statics-polygon-lens.s3.us-west-2.amazonaws.com',
      'statics-lens-staging.s3.us-west-2.amazonaws.com',
      'gateway.ipfscdn.io',
      'ipfs.4everland.io',
      'gateway.ipfscdn.io/ipfs/',
      'ep-noisy-rice-867852-pooler.us-west-2.postgres.vercel-storage.com',
      'user-content.lenster.xyz',
      'meta.lenshareapp.xyz',
      'static-asset.lenster.xyz',
      'static-asset.lenshareapp.xyz',
      'static.lenstube.xyz',
      'img.lenstube.xyz',
      'ipfs.lenshareapp.xyz/ipfs',
      'media.lenster.xyz',
      'static-asset.lenshareapp.xyz',
      'metadata.lenshareapp.xyz',

      'metalens.lenshareapp.xyz'
    ]
  },
  i18n: {
    locales: linguiConfig.locales,
    defaultLocale: linguiConfig.sourceLocale
  },

  experimental: {
    scrollRestoration: true
  },

  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: 'https://sitemap.lenshareapp.xyz/sitemap.xml'
      },
      {
        source: '/sitemaps/:match*',
        destination: 'https://sitemap.lenshareapp.xyz/:match*'
      }
    ];
  },

  async redirects() {
    return [
      { source: '/u/:id(.+).lens', destination: '/u/:id', permanent: true },
      { source: '/u/:id(.+).test', destination: '/u/:id', permanent: true }
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {key:'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups'},

       
        
        ]
      }
    ];
  }
});
const millionConfig = {
  auto: true,
}


export default million.next(nextConfig, millionConfig,linguiConfig);
