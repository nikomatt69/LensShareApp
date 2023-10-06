import { SpaceMetadata } from '@/typesLenster';
import { FeatureFlag } from '@/utils/data/feature-flags';
import getPublicationAttribute from '@/utils/functions/getPublicationAttribute';
import isFeatureEnabled from '@/utils/functions/isFeatureEnabled';
import { Profile, Publication } from '@/utils/lens/generatedLenster';

import cn from '@/components/UI/cn';
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
import PreviewSpaces from '../Spaces/PreviewSpaces/PreviewSpaces';
import Spaces from '../Spaces';
import { OG } from '@/types/misc';
import getSnapshotProposalId from '@/lib/getSnapshotProposalId';
import getNft from '@/utils/lib/nft/getNft';
import Snapshot from './OpenActions/Snapshot';

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
  const snapshotProposalId = getSnapshotProposalId(urls);
  const showSpacesLobby = useSpacesStore((state) => state.showSpacesLobby);
  const isSpacesEnabled = isFeatureEnabled(FeatureFlag.Spaces);
  const nft = getNft(urls);
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
  let rawContent = metadata?.content;

  const filterId = snapshotProposalId || quotedPublicationId;


  if (filterId) {
    for (const url of urls) {
      if (url.includes(filterId)) {
        rawContent = rawContent?.replace(url, '');
      }
    }
  }


  const [content, setContent] = useState(rawContent);

  if (metadata?.encryptionParams) {
    return <DecryptedPublicationBody encryptedPublication={publication} />;
  }

  if (Boolean(space?.id)) {
    return <Space publication={publication} />;
  }

  const showNft = nft;
  // Show snapshot if it's there
  const showSnapshot = snapshotProposalId;
  // Show attachments if it's there
  const showAttachments = metadata?.media?.length > 0;
  // Show quoted publication if it's there
  const showQuotedPublication = quotedPublicationId && !quoted;
  // Show oembed if no NFT, no attachments, no snapshot, no quoted publication
  const showOembed =
    hasURLs &&
    !showAttachments &&
    !showSnapshot &&
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
        className={cn(
          { 'line-clamp-5': canShowMore },
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
      {showSnapshot ? <Snapshot proposalId={snapshotProposalId} /> : null}

      {showOembed ? (
        <Oembed
          url={urls[0]}
          publicationId={publication.id}
          onData={onOembedData}
        />
      ) : null}
      {showSpacesLobby ? (<Space publication={publication} />):(null)}

      {showQuotedPublication ? (
        <Quote
          publicationId={quotedPublicationId}
          profile={profile as Profile}
        />
      ) : null}
    </div>
  );
};

export default PublicationBody;
