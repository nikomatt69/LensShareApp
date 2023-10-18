import {
  CurrencyDollarIcon,
  CursorArrowRaysIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

import Link from 'next/link';
import { type FC } from 'react';
import { useUpdateEffect } from 'usehooks-ts';
import { parseEther } from 'viem';
import { base } from 'viem/chains';
import {
  useAccount,
  useChainId,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi';

import { useBasePaintMintStore } from '.';
import { BasePaintCanvas } from '@/types/nft';
import { Publication } from '@/utils/lens/generatedLenster';
import { BASEPAINT_CONTRACT } from '@/utils/data/contracts';
import { BasePaint } from '@/abi/BasePaint';
import SwitchNetwork from '../../ZoraNft/Mint/SwitchNetwork';
import { Button } from '@/components/UI/Button';
import { Spinner } from '@/components/UI/Spinner';
import LoginButton from '@/components/Login/LoginButtonMobile';

const NO_BALANCE_ERROR = 'exceeds the balance of the account';

interface MintActionProps {
  canvas: BasePaintCanvas;
  openEditionPrice: number;
  publication: Publication;
}

const MintAction: FC<MintActionProps> = ({
  canvas,
  openEditionPrice,
  publication
}) => {
  const { quantity } = useBasePaintMintStore();
  const chain = useChainId();
  const { isDisconnected } = useAccount();

  const nftAddress = BASEPAINT_CONTRACT;
  const day = canvas.id;
  const value = parseEther(openEditionPrice.toString()) * BigInt(quantity);

  const {
    config,
    isError: isPrepareError,
    error: prepareError
  } = usePrepareContractWrite({
    chainId: base.id,
    address: nftAddress,
    functionName: 'mint',
    abi: BasePaint,
    args: [day, quantity],
    value
  });
  const {
    write,
    data,
    isLoading: isContractWriteLoading
  } = useContractWrite({
    ...config
  });
  const {
    data: txnData,
    isLoading,
    isSuccess
  } = useWaitForTransaction({
    chainId: base.id,
    hash: data?.hash
  });

  const mintingOrSuccess = isLoading || isSuccess;

  // Errors
  const noBalanceError = prepareError?.message?.includes(NO_BALANCE_ERROR);

  return !mintingOrSuccess ? (
    <div className="flex">
      {isDisconnected ? (
        <div className="mt-5 w-full justify-center">
          <LoginButton />
        </div>
      ) : chain !== base.id ? (
        <SwitchNetwork
          className="mt-5 w-full justify-center"
          toChainId={base.id}
          title={`Switch to ${base.name}`}
        />
      ) : isPrepareError ? (
        noBalanceError ? (
          <Link
            className="w-full"
            href="https://app.uniswap.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="mt-5 w-full justify-center"
              icon={<CurrencyDollarIcon className="h-5 w-5" />}
              size="md"
            >
              You don't have balance
            </Button>
          </Link>
        ) : null
      ) : (
        <Button
          className="mt-5 w-full justify-center"
          disabled={!write}
          onClick={() => write?.()}
          icon={
            isContractWriteLoading ? (
              <Spinner className="mr-1" size="xs" />
            ) : (
              <CursorArrowRaysIcon className="h-5 w-5" />
            )
          }
        >
          Mint
        </Button>
      )}
    </div>
  ) : (
    <div className="mt-5 text-sm font-medium">
      {isLoading ? (
        <div className="flex items-center space-x-1.5">
          <Spinner size="xs" />
          <div>Minting in progress</div>
        </div>
      ) : null}
      {isSuccess ? (
        <div className="flex items-center space-x-1.5">
          <CheckCircleIcon className="h-5 w-5 text-green-500" />
          <div>Minted successful</div>
        </div>
      ) : null}
    </div>
  );
};

export default MintAction;
