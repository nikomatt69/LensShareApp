import { gql } from '@apollo/client';
import { apolloClient } from '@/apollo-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  MediaSet,
  NftImage,
  Profile,
  Publication
} from '../lens/generatedLenster';
import getIPFSLink from '@/lib/getIPFSLink';
import generateMeta from './generateMeta';

import { OG_MEDIA_PROXY_URL } from './getPublicationMeta';
import { HANDLE_SUFFIX, LENSPROTOCOL_HANDLE } from '@/constants';

const PROFILE_QUERY = gql`
  query Profile($request: SingleProfileQueryRequest!) {
    profile(request: $request) {
      handle
      name
      bio
      stats {
        totalFollowers
        totalFollowing
      }
      picture {
        ... on MediaSet {
          original {
            url
          }
        }
        ... on NftImage {
          uri
        }
      }
    }
  }
`;

const getProfileMeta = async (
  req: NextApiRequest,
  res: NextApiResponse,
  handle: string
) => {
  try {
    let processedHandle;
    if (handle.includes(HANDLE_SUFFIX)) {
      processedHandle = handle;
    } else {
      processedHandle =
        handle === LENSPROTOCOL_HANDLE ? handle : handle.concat(HANDLE_SUFFIX);
    }

    const { data } = await apolloClient.query({
      query: PROFILE_QUERY,
      variables: { request: { handle: processedHandle } }
    });

    if (data?.profile) {
      const profile: Profile & { picture: MediaSet & NftImage } = data?.profile;
      const title = profile?.id
        ? `${profile?.name} (@${profile?.handle}) • LensShare`
        : `@${profile?.handle} • LensShare`;
      const description = profile?.bio ?? '';
      const image = profile
        ? `${OG_MEDIA_PROXY_URL}/tr:n-avatar,tr:di-placeholder.webp/${getIPFSLink(
            profile?.picture?.original?.url ??
              profile?.picture?.uri ??
              `https://avatar.tobi.sh/${profile?.ownedBy}_${profile?.handle}.png`
          )}`
        : 'https://assets.lenster.xyz/images/og/logo.jpeg';

      return res
        .setHeader('Content-Type', 'text/html')
        .setHeader('Cache-Control', 's-maxage=86400')
        .send(generateMeta(title, description, image));
    }

    return res
      .setHeader('Content-Type', 'text/html')
      .setHeader('Cache-Control', 's-maxage=86400')
      .send(generateMeta());
  } catch {
    return res
      .setHeader('Content-Type', 'text/html')
      .setHeader('Cache-Control', 's-maxage=86400')
      .send(generateMeta());
  }
};

export default getProfileMeta;
