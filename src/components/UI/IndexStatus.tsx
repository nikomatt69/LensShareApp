import { useHasTxHashBeenIndexedQuery } from '@/types/graph';
import { FC, useState } from 'react';
import cn from '@/components/UI/cn';
import { Spinner } from './Spinner';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { POLYGONSCAN_URL } from '@/constants';
import Link from 'next/link';

interface Props {
  type?: string;
  txHash: string;
  reload?: boolean;
}

const IndexStatus: FC<Props> = ({
  type = 'Transaction',
  txHash,
  reload = false
}) => {
  const [hide, setHide] = useState(false);
  const [pollInterval, setPollInterval] = useState(500);
  const { data, loading } = useHasTxHashBeenIndexedQuery({
    variables: {
      request: { txHash }
    },
    pollInterval,
    onCompleted: (data) => {
      if (
        data.hasTxHashBeenIndexed.__typename === 'TransactionIndexedResult' &&
        data?.hasTxHashBeenIndexed?.indexed
      ) {
        setPollInterval(0);
        if (reload) {
          location.reload();
        }
        setTimeout(() => {
          setHide(true);
        }, 5000);
      }
    }
  });

  return (
    <Link
      className={cn({ hidden: hide }, 'ml-auto text-sm font-medium')}
      href={`${POLYGONSCAN_URL}/tx/${txHash}`}
      target="_blank"
      rel="noreferrer noopener"
    >
      {loading ||
      (data?.hasTxHashBeenIndexed.__typename === 'TransactionIndexedResult' &&
        !data?.hasTxHashBeenIndexed.indexed) ? (
        <div className="flex items-center space-x-1.5">
          <Spinner size="xs" />
          <div>{type} Indexing</div>
        </div>
      ) : (
        <div className="flex items-center space-x-1">
          <CheckCircleIcon className="h-5 w-5 text-green-500" />
          <div className="text-black dark:text-white dark:text-white">
            Index Successful
          </div>
        </div>
      )}
    </Link>
  );
};

export default IndexStatus;
