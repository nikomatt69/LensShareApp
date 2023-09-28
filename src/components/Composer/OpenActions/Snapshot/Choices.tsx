import { CheckCircleIcon as CheckCircleIconOutline } from '@heroicons/react/24/outline';
import {
  Bars3BottomLeftIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid';

import axios from 'axios';
import type { FC } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppStore } from 'src/store/app';
import { useSignTypedData } from 'wagmi';

import VoteProposal from './VoteProposal';
import { Errors } from '@/lib/errors';
import { SNAPSHOT_SEQUNECER_URL } from '@/constants';
import { Card } from '@/components/UI/Card';
import cn from '@/components/UI/cn';
import nFormatter from '@/lib/nFormatter';
import humanize from '@/lib/humanize';
import { getTimetoNow } from '@/lib/formatTime4';
import { Modal } from '@/components/UI/Modal';
import { Proposal, Vote } from '@/utils/snapshot/generated';
import generateTypedData from '@/utils/snapshot/lib/generateTypedData';
import { Spinner } from '@/components/UI/Spinner';


interface ChoicesProps {
  proposal: Proposal;
  votes: Vote[];
  isLensterPoll?: boolean;
  refetch?: () => void;
}

const Choices: FC<ChoicesProps> = ({
  proposal,
  votes,
  isLensterPoll = false,
  refetch
}) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [voteSubmitting, setVoteSubmitting] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(0);
  const [voteConfig, setVoteConfig] = useState({
    show: false,
    position: 0
  });
  const { signTypedDataAsync } = useSignTypedData({});

  const { id, choices, symbol, scores, scores_total, state, type, end } =
    proposal;
  const vote = votes[0];
  const choicesWithVote = choices.map((choice, index) => ({
    position: index + 1,
    choice,
    score: scores?.[index] ?? 0,
    voted: Array.isArray(vote?.choice)
      ? vote?.choice.includes(index + 1)
      : vote?.choice === index + 1,
    percentage: ((scores?.[index] ?? 0) / (scores_total ?? 1)) * 100
  }));
  const sortedChoices = choicesWithVote.sort(
    (a, b) => b.percentage - a.percentage
  );

  const openVoteModal = (position: number) => {
    if (!currentProfile) {
      return toast.error(Errors.SignWallet);
    }

    if (state !== 'active') {
      return toast.error(`This proposal is closed!`);
    }

    if (
      type === 'approval' ||
      type === 'quadratic' ||
      type === 'ranked-choice' ||
      type === 'weighted'
    ) {
      return toast.error(`${type} voting is not supported yet!`);
    }

    setVoteConfig({ show: true, position });

  };

  const voteLensterPoll = async (position: number) => {
    if (!currentProfile) {
      return toast.error(Errors.SignWallet);
    }

    if (state !== 'active') {
      return toast.error(`This poll is ended!`);
    }

    try {
      setVoteSubmitting(true);
      const typedData = generateTypedData(
        proposal,
        position,
        currentProfile.ownedBy
      );
      const signature = await signTypedDataAsync({
        primaryType: 'Vote',
        ...typedData
      });

      await axios.post(SNAPSHOT_SEQUNECER_URL, {
        address: currentProfile?.ownedBy,
        sig: signature,
        data: {
          domain: typedData.domain,
          types: typedData.types,
          message: typedData.message
        }
      });

      refetch?.();
      
      toast.success(`Your vote has been casted!`);
    } catch {
      toast.error(Errors.SomethingWentWrong);
    } finally {
      setVoteSubmitting(false);
    }
  };

  return (
    <>
      <Card className={cn(isLensterPoll ? 'mt-3' : 'mt-5')}>
        {!isLensterPoll ? (
          <div className="divider flex items-center justify-between px-5 py-3 ">
            <div className="flex items-center space-x-2 text-sm">
              <Bars3BottomLeftIcon className="h-4 w-4" />
              <b>{state === 'active' ? `Current results` : `Results`}</b>
            </div>
        
          </div>
        ) : null}
        <div className="space-y-1 p-3">
          {sortedChoices.map(
            ({ position, choice, voted, percentage, score }) => (
              <button
                key={choice}
                className="flex w-full items-center space-x-2.5 rounded-xl p-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-900 sm:text-sm"
                disabled={isLensterPoll ? voteSubmitting : false}
                onClick={() => {
                  if (isLensterPoll) {
                    setSelectedPosition(position);
                    return voteLensterPoll(position);
                  }

                  return openVoteModal(position);
                }}
              >
                {isLensterPoll &&
                voteSubmitting &&
                position === selectedPosition ? (
                  <Spinner className="mr-1" size="sm" />
                ) : (
                  <CheckCircleIcon
                    className={cn(
                      voted ? 'text-green-500' : 'text-gray-500',
                      'h-6 w-6 '
                    )}
                  />
                )}
                <div className="w-full space-y-1">
                  <div className="flex items-center justify-between">
                    <b>{choice}</b>
                    <div>
                      <span>
                        {nFormatter(score)} {isLensterPoll ? null : symbol}
                      </span>
                      <span className="mx-1.5">·</span>
                      <span className="lt-text-gray-500">
                        {Number.isNaN(percentage) ? 0 : percentage.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex h-2.5 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800">
                    <div
                      style={{ width: `${percentage.toFixed(2)}%` }}
                      className={cn(voted ? 'bg-green-500' : 'bg-brand-500')}
                    />
                  </div>
                </div>
              </button>
            )
          )}
        </div>
        {isLensterPoll ? (
          <div className="flex items-center justify-between border-t px-5 py-3 dark:border-gray-700 ">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Bars3BottomLeftIcon className="h-4 w-4" />
              <b>
                Poll
              </b>
              <span>·</span>
              <span>
                {humanize(scores_total ?? 0)}{' '}
                
              </span>
              {state === 'active' ? (
                <>
                  <span>·</span>
                  <span>
                    {getTimetoNow(new Date(end * 1000))} left
                  </span>
                </>
              ) : null}
            </div>
       
          </div>
        ) : null}
      </Card>
      <Modal
        show={voteConfig.show}
        title={`Cast your vote`}
        icon={<CheckCircleIconOutline className="text-brand h-5 w-5" />}
        onClose={() => setVoteConfig({ show: false, position: 0 })}
      >
        <VoteProposal
          proposal={proposal}
          voteConfig={voteConfig}
          setVoteConfig={setVoteConfig}
          refetch={refetch}
        />
      </Modal>
    </>
  );
};

export default Choices;
