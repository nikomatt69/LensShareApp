import "../styles/globals.css";
import Loading from "@/components/Loading";
import type { AppProps } from "next/app";
import { lazy, Suspense, useEffect } from "react";
import { Analytics } from '@vercel/analytics/react';
import MetaTags from "@/components/UI/MetaTags";
import { STATIC_IMAGES_URL } from "@/constants";
import Script from "next/script";
import React from "react";
import { useRouter } from "next/router";
import { useAppStore } from "@/store/app";
import { AUTH_ROUTES } from "@/utils/data/auth-routes";

const Providers = lazy(() => import("@/components/Providers"));
const Layout = lazy(() => import("@/components/Layout"));
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;


const App = ({ Component, pageProps }: AppProps) => {
  const { pathname, replace, asPath } = useRouter();
  const  currentProfile  = useAppStore((state) => state.currentProfile);
  useEffect(() => {
    if (!currentProfile && AUTH_ROUTES.includes(pathname)) {
      replace(`/auth?next=${asPath}`)
    }
  }, [currentProfile, pathname, asPath, replace])
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
  
   <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
      <Analytics/>
    </Suspense>
    </React.StrictMode>
    </div>
  );
};

export default App;
