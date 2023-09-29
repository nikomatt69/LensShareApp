import { APP_INFOPAGE, APP_NAME, OG_IMAGE } from '@/constants';

const generateMeta = (
  title = APP_NAME,
  description = APP_INFOPAGE,
  image = OG_IMAGE
): string => {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${title}</title>
        <meta name="description" content="${description}" />
        <meta charset="UTF-8" />
        <meta property="og:url" content="https://lenshareapp.xyz" />
        <meta property="og:site_name" content="LensShare" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="Lenster" />
        <meta property="twitter:title" content="${title}" />
        <meta property="twitter:description" content="${description}" />
        <meta property="twitter:image:src" content="${image}" />
        <meta property="twitter:image:width" content="400" />
        <meta property="twitter:image:height" content="400" />
        <meta property="twitter:creator" content="lenshareappxyz" />
      </head>
      <body>
        <h1>${title}</h1>
      </body>
    </html>`;
};

export default generateMeta;
