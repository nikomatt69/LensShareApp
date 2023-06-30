import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <head>
         <script src="https://unpkg.com/@bundlr-network/client/build/web/bundle.js"></script>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="./images/icon.png"></link>
          <meta name="theme-color" content="#fff" />
          <div className='onesignal-customlink-container'></div>
          <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" defer></script>
         
          
</head>
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