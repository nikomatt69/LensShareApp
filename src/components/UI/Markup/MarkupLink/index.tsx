
import type { MarkupLinkProps } from 'src/typesLenster';

import ExternalLink from './ExternalLink';

import Mention from './Mention';
import truncateUrl from '@/lib/truncateUrl';

const MarkupLink = ({ href, title = href }: MarkupLinkProps) => {
  if (!href) {
    return null;
  }

  // Mentions
  if (href.startsWith('@')) {
    return <Mention href={href} title={title} />;
  }

  return (
    <ExternalLink href={href} title={title ? truncateUrl(title, 30) : title} />
  );
};

export default MarkupLink;
