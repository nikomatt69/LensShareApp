import Document, { Head, Html, Main, NextScript } from 'next/document';

class LensshareDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          {/* Prefetch and Preconnect */}
          <link rel="preconnect" href="https://asset.lenshareapp.xyz" />
          <link rel="dns-prefetch" href="https://asset.lenshareapp.xyz" />
          <link rel="preconnect" href="https://static-assets.lenshareapp.xyz" />
          <link rel="dns-prefetch" href="https://static-assets.lenshareapp.xyz" />

          {/* Misc */}

          

          {/* Icons */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://asset.lenshareapp.xyz/images/icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="https://asset.lenshareapp.xyz/images/icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="https://asset.lenshareapp.xyz/images/icon.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default LensshareDocument;