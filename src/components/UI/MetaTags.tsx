import Head from 'next/head';
import router, { useRouter } from 'next/router';
import type { FC } from 'react';
import React from 'react';
import {
  APP_ID,
  APP_INFOPAGE,
  APP_NAME,
  LENSSHARE_API_URL,
  LENSSHARE_EMBED_URL,
  LENSTOK_URL,
  OG_IMAGE,
  STATIC_ASSETS_URL
} from '@/constants';
import { title } from 'process';

interface MetaTagsProps {
  title?: string;
  description?: string;
}

const MetaTags: FC<MetaTagsProps> = ({
  title = APP_NAME,
  description = APP_INFOPAGE
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
      />

      <meta property="og:url" content="https://lenshareapp.xyz" />
      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="400" />

      <meta property="twitter:card" content="summary" />
      <meta property="twitter:site" content={APP_NAME} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={OG_IMAGE} />
      <meta property="twitter:image:width" content="400" />
      <meta property="twitter:image:height" content="400" />
      <meta property="twitter:creator" content="lenshareappxyz" />

      <link
        rel="search"
        type="application/opensearchdescription+xml"
        href="/opensearch.xml"
        title={APP_NAME}
      />
    </Head>
  );
};

export default MetaTags;
