import Head from 'next/head'
import router, { useRouter } from 'next/router'
import type { FC } from 'react'
import React from 'react'
import { APP_ID, APP_INFOPAGE, APP_NAME, LENSSHARE_API_URL, LENSSHARE_EMBED_URL, LENSTOK_URL, STATIC_ASSETS_URL} from '@/constants'
import { title } from 'process'

type Props = {
  title?: string
  description?: string | null
  image?: string
}

const MetaTags: FC<Props> = (props) => {
    const { description, title, image } = props
    const router = useRouter()

    const meta = {
        title: title ?? APP_NAME,
        description: description ?? APP_INFOPAGE,
        image: image ?? `${STATIC_ASSETS_URL}/images/icon.png`,
        type: 'website'
    }

    return (
        <Head>
            <title>{meta.title}</title>
            <meta name="robots" content="follow, index" />
            <meta content={meta.description} name="description" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=5"
            />
            <link rel="canonical" href={`${LENSTOK_URL}${router.asPath}`} />
            <meta
                property="og:url"
                content={`${LENSTOK_URL}${router.asPath}`}
            />
            <meta property="og:type" content={meta.type} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:title" content={meta.title} />
            <meta property="og:image" content={meta.image} />
            <meta property="og:image:width" content="400" />
            <meta property="og:image:height" content="400" />
            <meta name="twitter:card" content="summary" />
            <meta property="twitter:image:width" content="400" />
            <meta property="twitter:image:height" content="400" />
            <meta name="twitter:site" content={`${APP_NAME}`} />
            <meta name="twitter:title" content={meta.title} />
            <meta name="twitter:description" content={meta.description} />
            <meta property="twitter:image" content={meta.image} />
            <meta property="twitter:creator" content={APP_NAME} />
            
       

      {router.pathname === '/u/[id]' && router.query?.id && (
        <>
          <link
            rel="iframely player"
            type="text/html"
            href={`${LENSSHARE_EMBED_URL}/${router.query?.id}`}
            media="(aspect-ratio: 1280/720)"
          />
          <link
            rel="alternate"
            type="text/xml+oembed"
            href={`${LENSSHARE_API_URL}/oembed?format=xml&id=${router.query?.id}`}
            title={title}
          />
          <link
            rel="alternate"
            type="application/json+oembed"
            href={`${LENSSHARE_API_URL}/oembed?format=json&id=${router.query?.id}`}
            title={title}
          />
        </>
      )}
    </Head>
  )
}

export default MetaTags
