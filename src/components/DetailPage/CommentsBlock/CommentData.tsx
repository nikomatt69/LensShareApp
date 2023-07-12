import { useEffect, useState } from 'react';
import { Comment, Publication } from '@/utils/lens/generatedLenster';
import { useAppStore } from 'src/store/app';
import Link from 'next/link';
import Image from 'next/image';
import React, { FC } from 'react';
import getAvatar from '@/lib/getAvatar';
import LitJsSdk from '@lit-protocol/sdk-browser';
import lit from '@/lib/lit';
import formatHandle from '@/utils/functions/formatHandle';
import CommentOptions from './CommentOptions';
import InterweaveContent from '@/components/UI/InterweaveContent';
import { getRelativeTime } from '@/utils/functions/formatTime2';
import Like from '@/components/Buttons/Likes/Like';
import LikeButton from '@/components/Buttons/Likes/LikeButton';
import Feed from '@/components/Comment/Feed';

interface Props {
  comment: Publication;
  video: Publication;
}

const CommentData: FC<Props> = ({ comment, video }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [decryptedComment, setDecryptedComment] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="mt-1 flex gap-2 rounded-xl border-2 border-blue-700 bg-cyan-100 p-3 pt-2 text-black hover:bg-blue-400">
      <Feed />
    </div>
  );
};

export default CommentData;
