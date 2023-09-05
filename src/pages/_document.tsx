import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
      
          
        <Script src="https://cdn.ingest-lr.com/LogRocket.min.js" crossOrigin="anonymous"></Script>
         <Script>{`window.LogRocket && window.LogRocket.init('rttnrz/lensshare')`}</Script>
          <link rel="apple-touch-icon" href="./images/icon.png"></link>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#fff" />
          <meta name="application-name" content="LensShare" />
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
