import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script src="https://unpkg.com/@bundlr-network/client/build/web/bundle.js"></script>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="./images/icon.png"></link>
          <meta name="theme-color" content="#fff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
