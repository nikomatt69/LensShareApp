import '../styles/globals.css';
import Loading from '@/components/Loading';
import { Client, Account } from "appwrite";
import { lazy, Suspense, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import MetaTags from '@/components/UI/MetaTags';
import { STATIC_IMAGES_URL } from '@/constants';
import Script from 'next/script';
import React from 'react';
import { useRouter } from 'next/router';
import { useAppStore } from '@/store/app';
import { AUTH_ROUTES } from '@/utils/data/auth-routes';
import LogRocket from 'logrocket';
import dynamic from 'next/dynamic';
import { Publication } from '@/utils/lens/generatedLenster';
import ServiceWorker from '@/components/ServiceWorker';
const Providers = dynamic(() => import('@/components/Providers'), {
  ssr: false
});
const Layout = dynamic(() => import('@/components/Layout'), {
  ssr: false
});

LogRocket.init('rttnrz/lensshare');
const client = new Client();

client
  .setEndpoint(`https://cloud.appwrite.io/v1`)
  .setProject(`652d6677a03334471169`)
;




interface AppProps {
  publication: Publication;
  Component: any;
  pageProps: any;
}

const App = ({ Component, pageProps, publication }: AppProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
      <ServiceWorker />
      <Analytics />
    </Suspense>
  );
};

export default App;
