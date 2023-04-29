import "../styles/globals.css";
import Loading from "@/components/Loading";
import type { AppProps } from "next/app";
import { lazy, Suspense } from "react";
import { Analytics } from '@vercel/analytics/react';
import MetaTags from "@/components/UI/MetaTags";
import { STATIC_IMAGES_URL } from "@/constants";
import Script from "next/script";

const Providers = lazy(() => import("@/components/Providers"));
const Layout = lazy(() => import("@/components/Layout"));
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <MetaTags
        title="LensShare"
        description="LensShare is a decentralized video sharing platform built on LensProtocol."
        image={`${STATIC_IMAGES_URL}/icon.png`}
      />
      <Script
         src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
         strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
       {`
         window.dataLayer = window.dataLayer || [];
         function gtag(){window.dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', '${GA_MEASUREMENT_ID}');
  `}
</Script>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
    <Suspense fallback={<Loading />}>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
      <Analytics/>
    </Suspense>
    </div>
  );
};

export default App;
