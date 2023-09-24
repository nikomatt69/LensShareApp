import { SpaceMetadata } from '@/typesLenster';
import { FeatureFlag } from '@/utils/data/feature-flags';
import getPublicationAttribute from '@/utils/functions/getPublicationAttribute';
import isFeatureEnabled from '@/utils/functions/isFeatureEnabled';
import { Profile, Publication } from '@/utils/lens/generatedLenster';

import clsx from 'clsx';
import Link from 'next/link';
import { useState, type FC } from 'react';
import Markup from '../UI/Markup';
import { EyeIcon } from '@heroicons/react/24/outline';
import Attachments from './Attachments';
import getURLs from './getURLs';
import Quote from './Quote';
import Oembed from '../Oembed';
import DecryptedPublicationBody from '../Publication/DecryptedPublicationBody';
import Space from '../Embed/Space';
import removeUrlAtEnd from '@/lib/removeUrlAtEnd';
import { useSpacesStore } from '@/store/spaces';
import PreviewSpaces from '../Spaces2/PreviewSpaces/PreviewSpaces';
import AudioSpaces from '../Spaces2';
import { OG } from '@/types/misc';

interface PublicationBodyProps {
  publication: Publication;
  showMore?: boolean;
  quoted?: boolean;
  profile: Profile;
}

const PublicationBody: FC<PublicationBodyProps> = ({
  publication,
  showMore = false,
  quoted = false,
  profile
}) => {
  const { id, metadata } = publication;
  const canShowMore = metadata?.content?.length > 450 && showMore;
  const urls = getURLs(metadata?.content);
  const hasURLs = urls?.length > 0;
  
  const showSpacesLobby = useSpacesStore((state) => state.showSpacesLobby);

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

  const filterId = quotedPublicationId;
  let rawContent = metadata.content;

  if (filterId) {
    for (const url of urls) {
      if (url.includes(filterId)) {
        rawContent = rawContent?.replace(url, '');
      }
    }
  }

  const [content, setContent] = useState(rawContent);

  if (metadata?.encryptionParams) {
    return <DecryptedPublicationBody profile={profile} inflow={ id
     } encryptedPublication={publication} />;
  }
 
  

  if (Boolean(space?.id)) {
    return <Space publication={publication} />;
  }
  const showAttachments = metadata?.media?.length > 0;

  const showQuotedPublication = quotedPublicationId && !quoted;
  const showOembed =
    hasURLs &&
    !showAttachments &&
    !showQuotedPublication &&
    !quoted;
  const onOembedData = (data: OG) => {
    if (showOembed && data?.title) {
      const updatedContent = removeUrlAtEnd(urls, content);
      if (updatedContent !== content) {
        setContent(updatedContent);
      }
    }
  };

 

  return (
    <div className="break-words">
      <Markup
        className={clsx(
          { 'line-clamp-8': canShowMore },
          'markup linkify  font-helvetica break-words text-xs'
        )}
      >
        {content}
      </Markup>
      {canShowMore && (
        <div className="lt-text-blue-700 mt-4 flex items-center space-x-1 text-sm font-bold">
          <Link href={`/post/${id}`}>Show more</Link>
        </div>
      )}
      {/* Snapshot, Attachments and Opengraph */}
      {showAttachments ? (
        <Attachments attachments={metadata?.media} publication={publication} />
      ) : null}


    
     {showOembed ? (
        <Oembed
          url={urls[0]}
          publicationId={publication.id}
          onData={onOembedData}
        />):null}
      {showSpacesLobby ? (<Space publication={publication} />):null}
      {showQuotedPublication ? (
        <Quote publicationId={quotedPublicationId} profile={profile as Profile} />
      ) : null}
    </div>
  );
};

export default PublicationBody;
