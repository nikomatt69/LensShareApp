import { useAppStore, useTransactionPersistStore } from '@/store/app';
import { useHasTxHashBeenIndexedQuery, usePublicationLazyQuery } from '@/types/graph';
import { PublicationMetadataDisplayTypes, PublicationMetadataStatusType, PublicationsDocument } from '@/types/lens';
import { useApolloClient, useLazyQuery } from '@apollo/client';
import { profile } from 'console';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react'
import Image from 'next/image'
import getAvatar from '@/lib/getAvatar';

interface Props {
    txn: any
}

const QueuedData: FC<Props> = ({ txn }) => {
    const currentProfile = useAppStore((state) => state.currentProfile);
    const txnQueue = useTransactionPersistStore((state) => state.txnQueue);
    const setTxnQueue = useTransactionPersistStore((state) => state.setTxnQueue);
    const txHash = txn?.txHash;
    const txId = txn?.txId;
    const { cache } = useApolloClient();

    const router = useRouter()
    const { id } = router.query

    const removeTxn = () => {
        if (txHash) {
          setTxnQueue(txnQueue.filter((o) => o.txHash !== txHash));
        } else {
          setTxnQueue(txnQueue.filter((o) => o.txId !== txId));
        }
    };

    const [getPublication] = usePublicationLazyQuery({
        onCompleted: (data) => {
            if(data?.publication) {
                cache.modify({
                    fields: {
                        publications() {
                            cache.writeQuery({
                                data: data?.publication as any,
                                query: PublicationsDocument
                            })
                        }
                    }
                })
                removeTxn()
            }
        }
    });

    useHasTxHashBeenIndexedQuery({
        variables: { request: { txHash, txId } },
        pollInterval: 1000,
        onCompleted: (data) => {
            if (data.hasTxHashBeenIndexed.__typename === 'TransactionError') {
                return removeTxn
            }
            
            if (data.hasTxHashBeenIndexed.__typename === 'TransactionIndexedResult') {
                const status = data.hasTxHashBeenIndexed.metadataStatus?.status

                if (
                    status === PublicationMetadataStatusType.MetadataValidationFailed ||
                    status === PublicationMetadataStatusType.NotFound
                ) {
                    return removeTxn()
                }

                if (data.hasTxHashBeenIndexed.indexed) {
                    getPublication({
                        variables: {
                            request: { txHash: data.hasTxHashBeenIndexed.txHash },
                            reactionRequest: currentProfile ? { profileId: currentProfile?.id } : null
                        }
                    })
                }
            }
        }
    })

  return (
    <div className="flex gap-2">
    <Link href={`/profile/${currentProfile?.id}`} key={currentProfile?.id}>
        <div className="flex-shrink-0 rounded-full">
            <Image
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                src={getAvatar(currentProfile)}
                alt={currentProfile?.handle}
            />
        </div>
    </Link>
    <div className="flex-grow">
        <p className="font-bold hover:underline">
        {currentProfile?.handle}
        </p>
        <p
         style={{
         wordWrap: "break-word",
         overflowWrap: "break-word",
         }}
        >
        {txn?.content}
        </p>
    </div>
    </div>
  )
}

export default QueuedData