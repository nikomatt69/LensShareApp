/** @type {import('next').NextConfig} */

nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  newNextLinkBehavior: true,
  topLevelAwait:true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  images: {
    domains: [
      'nftstorage.link',
      'ik.imagekit.io',
      'asset.lenshareapp.xyz/images/',
      'asset.lenshareapp.xyz',
      'ipfs.infura.io',
      'ipfs.infura.io.ipfs.w3s.link',
      'statics-polygon-lens-staging.s3.eu-west-1.amazonaws.com',
      'lens.infura-ipfs.io',
      'lens.infura-ipfs.io',
      'lens.infura-ipfs.io.ipfs.4everland.io',
      'source.unsplash.com',
      'ar://',
      'arweave.net',
      'arweave.net/',
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
      'lenshareapp.infura-ipfs.io',
      'store.lenshareapp.xyz',
      '.ipfs.4everland.io',
      'statics-polygon-lens.s3.eu-west-1.amazonaws.com',
      'ipfs.infura.io:5001',
      'statics-mumbai-lens-staging.s3.eu-west-1.amazonaws.com',
      'statics-mumbai-polygon-lens.s3.eu-west-1.amazonaws.com',
      'statics-polygon-lens.s3.us-west-2.amazonaws.com',
      'statics-lens-staging.s3.us-west-2.amazonaws.com',
      'gateway.ipfscdn.io',
      'ipfs.4everland.io',
      'gateway.ipfscdn.io/ipfs/',
      'ep-noisy-rice-867852-pooler.us-west-2.postgres.vercel-storage.com',
      'user-content.lenster.xyz',
      'lp-playback.com/hls',
      'lp-playback.com',
      'static-asset.lenster.xyz',
      'static.lenstube.xyz'
    ]
  },

  experimental: {
    scrollRestoration: true,
    newNextLinkBehavior: true,
    topLevelAwait: true
  },

  async redirects() {
    return [
      { source: '/u/:id(.+).lens', destination: '/u/:id', permanent: true },
      { source: '/u/:id(.+).test', destination: '/u/:id', permanent: true },
      { source: '/u/:id(.+).dev', destination: '/u/:id', permanent: true }
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' }
        ]
      },
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Max-Age', value: '1728000' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
          { key: 'Access-Control-Allow-Methods', value: 'Content-Type' }
        ]
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Max-Age', value: '1728000' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
          { key: 'Access-Control-Allow-Methods', value: 'Content-Type' }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
