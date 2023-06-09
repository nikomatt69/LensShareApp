import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { FC } from 'react';

import Embed from './Embed';
import Player from './Player';
import { OEMBED_WORKER_URL } from '@/constants';
import { OG } from '@/typesLenster';

interface OembedProps {
  url?: string;
}

const Oembed: FC<OembedProps> = ({ url }) => {
  const { isLoading, error, data } = useQuery(
    [url],
    () =>
      axios({
        url: OEMBED_WORKER_URL,
        params: { url }
      }).then((res) => res.data.oembed),
    { enabled: Boolean(url) }
  );

  if (error || isLoading || !data) {
    return null;
  }

  const og: OG = {
    url: url as string,
    title: data?.title,
    description: data?.description,
    site: data?.site,
    favicon: `https://www.google.com/s2/favicons?domain=${data.url}`,
    thumbnail: data?.image,
    isLarge: false,
    html: data?.html
  };

  if (!og.title) {
    return null;
  }

  return og.html ? <Player og={og} /> : <Embed og={og} />;
};

export default Oembed;
