import { SpaceMetadata } from '@/typesLenster';
import { FeatureFlag } from '@/utils/data/feature-flags';
import getPublicationAttribute from '@/utils/functions/getPublicationAttribute';
import isFeatureEnabled from '@/utils/functions/isFeatureEnabled';
import { Profile, Publication } from '@/utils/lens/generatedLenster';

import clsx from 'clsx';
import Link from 'next/link';
import type { FC } from 'react';
import Markup from '../UI/Markup';
import { EyeIcon } from '@heroicons/react/24/outline';
import Attachments from './Attachments';
import getURLs from './getURLs';
import Quote from './Quote';
import Oembed from '../Oembed';
import DecryptedPublicationBody from '../Publication/DecryptedPublicationBody';
import Space from '../Embed/Space';

interface PublicationBodyProps {
  publication: Publication;
  showMore?: boolean;
  quoted?: boolean;
  profile: Profile;
}

const PublicationBody: FC<PublicationBodyProps> = ({
  publication,
  profile,
  showMore = false,
  quoted = false
}) => {
  const isSpacesEnabled = isFeatureEnabled(FeatureFlag.Spaces);
  const { id, metadata } = publication;
  const canShowMore = metadata?.content?.length > 450 && showMore;
  const urls = getURLs(metadata?.content);
  const hasURLs = urls?.length > 0;

  const quotedPublicationId = getPublicationAttribute(
    metadata.attributes,
    'quotedPublicationId'
  );
  const spaceObject = getPublicationAttribute(
    metadata.attributes,
    'audioSpace'
  );
  const space: SpaceMetadata = Boolean(spaceObject)
    ? JSON.parse(spaceObject)
    : null;

  let content = metadata?.content;
  const filterId = quotedPublicationId;

  if (filterId) {
    for (const url of urls) {
      if (url.includes(filterId)) {
        content = content?.replace(url, '');
      }
    }
  }

  if (metadata?.encryptionParams) {
    return <DecryptedPublicationBody encryptedPublication={publication} />;
  }

  if (Boolean(space?.id) && isSpacesEnabled) {
    return <Space publication={publication} />;
  }

  const showAttachments = metadata?.media?.length > 0;

  const showQuotedPublication = quotedPublicationId && !quoted;
  const showOembed =
    hasURLs && !showAttachments && !showQuotedPublication && !quoted;

  return (
    <div className="break-words border-blue-500 ">
      <Markup
        className={clsx(
          { 'line-clamp-5': canShowMore },
          'markup linkify font-helvetica break-words text-xs font-bold'
        )}
      >
        {content}
      </Markup>
      {canShowMore && (
        <div className="lt-text-gray-500 mt-4 flex items-center space-x-1 text-sm font-bold">
          <Link href={`/post/${id}`}>Show more</Link>
        </div>
      )}
      {/* Snapshot, Attachments and Opengraph */}
      {showAttachments ? (
        <Attachments attachments={metadata?.media} publication={publication} />
      ) : null}
      {showOembed ? <Oembed url={urls[0]} /> : null}
      {showQuotedPublication ? (
        <Quote
          profile={profile as Profile}
          publicationId={quotedPublicationId}
        />
      ) : null}
    </div>
  );
};

export default PublicationBody;
