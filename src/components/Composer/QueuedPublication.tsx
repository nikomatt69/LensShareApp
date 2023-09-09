import { useAppStore, } from '@/store/app';
import { OptimisticTransaction } from '@/typesLenster';
import {
  Profile,
  PublicationDocument,
  PublicationMetadataStatusType,
  useHasTxHashBeenIndexedQuery,
  usePublicationLazyQuery
} from '@/utils/lens/generatedLenster';
import { useApolloClient } from '@apollo/client';
import { FC, useState } from 'react';
import UserProfile from '../ProfilePage/UserProfile';
import Markup from '../UI/Markup';
import { Tooltip } from '../UI/Tooltip';
import Attachments from './Attachments';
import Oembed from '../Oembed';
import getURLs from './getURLs';
import removeUrlAtEnd from '@/lib/removeUrlAtEnd';
import { useTransactionPersistStore } from '@/store/transaction';

interface QueuedPublicationProps {
  txn: OptimisticTransaction;
}

const QueuedPublication: FC<QueuedPublicationProps> = ({ txn }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const txnQueue = useTransactionPersistStore((state) => state.txnQueue);
  const setTxnQueue = useTransactionPersistStore((state) => state.setTxnQueue);
  const { cache } = useApolloClient();
  const txHash = txn?.txHash;
  const txId = txn?.txId;
  const [content, setContent] = useState(txn.content);
  const urls = getURLs(content);

  const onData = () => {
    const updatedContent = removeUrlAtEnd(urls, content);
    if (updatedContent !== content) {
      setContent(updatedContent);
    }
  };

  const removeTxn = () => {
    if (txHash) {
      setTxnQueue(txnQueue.filter((o) => o.txHash !== txHash));
    } else {
      setTxnQueue(txnQueue.filter((o) => o.txId !== txId));
    }
  };

  const [getPublication] = usePublicationLazyQuery({
    onCompleted: ({ publication }) => {
      if (publication) {
        cache.modify({
          fields: {
            publications: () => {
              cache.writeQuery({
                data: publication,
                query: PublicationDocument
              });
            }
          }
        });
        removeTxn();
      }
    }
  });

  useHasTxHashBeenIndexedQuery({
    variables: { request: { txHash, txId } },
    pollInterval: 1000,
    onCompleted: ({ hasTxHashBeenIndexed }) => {
      if (hasTxHashBeenIndexed.__typename === 'TransactionError') {
        return removeTxn();
      }

      if (hasTxHashBeenIndexed.__typename === 'TransactionIndexedResult') {
        const status = hasTxHashBeenIndexed.metadataStatus?.status;

        if (
          status === PublicationMetadataStatusType.MetadataValidationFailed ||
          status === PublicationMetadataStatusType.NotFound
        ) {
          return removeTxn();
        }

        if (hasTxHashBeenIndexed.indexed) {
          getPublication({
            variables: {
              request: { txHash: hasTxHashBeenIndexed.txHash },
              reactionRequest: currentProfile
                ? { profileId: currentProfile?.id }
                : null,
              profileId: currentProfile?.id ?? null
            }
          });
        }
      }
    }
  });

  return (
    <article className="p-5">
      <div className="flex items-start justify-between pb-4">
        <UserProfile profile={currentProfile as Profile} />
        <Tooltip content={`Indexing`} placement="top">
          <div className="bg-brand-200 flex h-4 w-4 items-center justify-center rounded-full">
            <div className="bg-brand-500 h-2 w-2 animate-pulse rounded-full" />
          </div>
        </Tooltip>
      </div>
      <div className="ml-[53px]">
        <div className="markup linkify text-md break-words">
          <Markup>{content}</Markup>
        </div>
        {txn?.attachments?.length > 0 ? (
          <Attachments attachments={txn?.attachments} txn={txn} hideDelete />
        ) : (
          txn?.attachments &&
          urls.length > 0 && <Oembed url={urls[0]}  />
        )}
      </div>
    </article>
  );
};

export default QueuedPublication;