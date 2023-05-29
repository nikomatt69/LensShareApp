// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: true,
  reactStrictMode: true,
  getServerSideProps: true,
  getInitialProps: true,
  getStaticPaths: true,
  getStaticProps: true,
  experimental: {
    scrollRestoration: true,
    newNextLinkBehavior: true,
    turbo: {
      loaders: {
        // Option format
        '.md': [
          {
            loader: '@mdx-js/loader',
            options: {
              format: 'md',
            },
          },
        ],
        // Option-less format
        '.mdx': ['@mdx-js/loader'],
      },
    },

  },
  images: {
    domains: [
      "ik.imagekit.io",
      "asset.lenshareapp.xyz/images/",
      "asset.lenshareapp.xyz",
      "ipfs.infura.io",
      "ipfs.infura.io.ipfs.w3s.link",
      "statics-polygon-lens-staging.s3.eu-west-1.amazonaws.com",
      "lens.infura-ipfs.io",
      "lens.infura-ipfs.io",
      "lens.infura-ipfs.io.ipfs.4everland.io",
      "source.unsplash.com",
      "ar://",
      "arweave.net",
      "arweave.net/",
      "ipfs://",
      "avatar.tobi.sh",
      "statics-lens-staging.s3.eu-west-1.amazonaws.com",
      "cdn.stamp.fyi",
      "avatars.dicebear.com",
      "assets.lenster.xyz",
      "as1.ftcdn.net",
      "avataaars.io",
      "theshr.infura-ipfs.io",
      "4everland.io",
      "test.com",
      "ui-avatars.com",
      "opensea.io",
      "rarible.com",
      "lenshareapp.xyz",
      "lenshareapp.infura-ipfs.io",
      "store.lenshareapp.xyz",
      ".ipfs.4everland.io",
      "statics-polygon-lens.s3.eu-west-1.amazonaws.com",
      "ipfs.infura.io:5001",
      "statics-mumbai-lens-staging.s3.eu-west-1.amazonaws.com",
      "statics-mumbai-polygon-lens.s3.eu-west-1.amazonaws.com",
      "statics-polygon-lens.s3.us-west-2.amazonaws.com",
      "statics-lens-staging.s3.us-west-2.amazonaws.com",
      "gateway.ipfscdn.io",
      "ipfs.4everland.io",
      "gateway.ipfscdn.io/ipfs/",
      "ep-noisy-rice-867852-pooler.us-west-2.postgres.vercel-storage.com",
      "user-content.lenster.xyz"

    ],
  },
  async redirects() {
    return [
      { source: '/u/:id(.+).lens', destination: '/u/:id', permanent: true },
      { source: '/u/:id(.+).test', destination: '/u/:id', permanent: true },
      { source: '/u/:id(.+).dev', destination: '/u/:id', permanent: true },
    ];
  },
  
};

module.exports = nextConfig;
