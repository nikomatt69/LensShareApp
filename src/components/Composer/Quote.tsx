
import { Publication, usePublicationQuery } from '@/utils/lens/generatedLenster';
import type { FC } from 'react';
import QuotedPublication from './QuotedPublication';
import Wrapper from '../Embed/Wrapper';
import PublicationShimmer from './PublicationShimmer';



interface QuoteProps {
  publicationId: string;
}

const Quote: FC<QuoteProps> = ({ publicationId }) => {
  const { data, loading, error } = usePublicationQuery({
    variables: { request: { publicationId } }
  });

  if (loading) {
    return (
      <Wrapper zeroPadding>
        <PublicationShimmer showActions={false} />
      </Wrapper>
    );
  }

  if (error || !data?.publication) {
    return null;
  }

  return (
    <Wrapper zeroPadding>
      <QuotedPublication publication={data.publication as Publication} />
    </Wrapper>
  );
};

export default Quote;
