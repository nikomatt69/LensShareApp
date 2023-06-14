import type { MediaSet } from '@/utils/lens';

export interface MediaSetWithoutOnChain extends Omit<MediaSet, 'onChain'> {}

export interface NewLensterAttachment extends MediaSetWithoutOnChain {
  id: string;
  file?: File;
  previewItem: string;
}

export interface UserSuggestion {
  uid: string;
  id: string;
  display: string;
  name: string;
  picture: string;
}

export interface OG {
  title: string;
  description: string;
  site: string;
  url: string;
  favicon: string;
  thumbnail: string;
  isLarge: boolean;
  html: string;
}

export interface ProfileInterest {
  category: { label: string; id: string };
  subCategories: { label: string; id: string }[];
}

export interface Emoji {
  emoji: string;
  description: string;
  category: string;
  aliases: string[];
  tags: string[];
}

export interface MessageDescriptor {
  id?: string;
  comment?: string;
  message?: string;
  context?: string;
  values?: Record<string, unknown>;
}

export interface OptimisticTransaction {
  txHash?: string;
  txId?: string;
  title?: string;
  cover?: string;
  author?: string;
  content: string;
  attachments: MediaSet[];
}

export interface MarkupLinkProps {
  href?: string;
  title?: string;
}

export interface SpaceMetadata {
  id: string;
  host: `0x${string}`;
}
