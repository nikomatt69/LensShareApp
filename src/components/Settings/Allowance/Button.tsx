import { Button } from '@/components/UI/Button';
import { Modal } from '@/components/UI/Modal';
import { Spinner } from '@/components/UI/Spinner';
import { WarningMessage } from '@/components/UI/WarningMessage';
import getAllowanceModule from '@/lib/getAllowanceModule';
import {
  ApprovedAllowanceAmount,
  useGenerateModuleCurrencyApprovalDataLazyQuery
} from '@/utils/lens/generatedLenster';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import type { Dispatch, FC } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsExclamation } from 'react-icons/bs';
import { useSendTransaction, useWaitForTransaction } from 'wagmi';

interface AllowanceButtonProps {
  title?: string;
  module: ApprovedAllowanceAmount;
  allowed: boolean;
  setAllowed: Dispatch<boolean>;
}

const AllowanceButton: FC<AllowanceButtonProps> = ({
  title = `Allow`,
  module,
  allowed,
  setAllowed
}) => {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [generateAllowanceQuery, { loading: queryLoading }] =
    useGenerateModuleCurrencyApprovalDataLazyQuery();

  const onError = (error: any) => {
    error;
  };

  const {
    data: txData,
    isLoading: transactionLoading,
    sendTransaction
  } = useSendTransaction({
    onError
  });

  const { isLoading: waitLoading } = useWaitForTransaction({
    hash: txData?.hash,
    onSuccess: () => {
      toast.success(
        allowed
          ? `Module disabled successfully!`
          : `Module enabled successfully!`
      );
      setShowWarningModal(false);
      setAllowed(!allowed);
    },
    onError
  });

  const handleAllowance = (
    currencies: string,
    value: string,
    selectedModule: string
  ) => {
    generateAllowanceQuery({
      variables: {
        request: {
          currency: currencies,
          value: value,
          [getAllowanceModule(module.module).field]: selectedModule
        }
      }
    }).then((res) => {
      const data = res?.data?.generateModuleCurrencyApprovalData;
      sendTransaction?.({
        account: data?.from,
        to: data?.to,
        data: data?.data
      });
    });
  };

  return allowed ? (
    <Button
      variant="warning"
      icon={
        queryLoading || transactionLoading || waitLoading ? (
          <Spinner variant="warning" size="xs" />
        ) : (
          <MinusIcon className="h-4 w-4" />
        )
      }
      onClick={() => handleAllowance(module.currency, '0', module.module)}
    >
      Revoke
    </Button>
  ) : (
    <>
      <Button
        icon={<PlusIcon className="h-4 w-4" />}
        onClick={() => setShowWarningModal(!showWarningModal)}
      >
        {title}
      </Button>
      <Modal
        title={`Warning`}
        icon={<BsExclamation className="h-5 w-5 text-yellow-500" />}
        show={showWarningModal}
        onClose={() => setShowWarningModal(false)}
      >
        <div className="space-y-3 p-5">
          <WarningMessage
            title={`Handle with care!`}
            message={
              <div className="leading-6">
                Please be aware that by allowing this module, the amount
                indicated will be automatically deducted when you <b>collect</b>{' '}
                and <b>super follow</b>.
              </div>
            }
          />
          <Button
            icon={
              queryLoading || transactionLoading || waitLoading ? (
                <Spinner size="xs" />
              ) : (
                <PlusIcon className="h-4 w-4" />
              )
            }
            onClick={() =>
              handleAllowance(
                module.currency,
                Number.MAX_SAFE_INTEGER.toString(),
                module.module
              )
            }
          >
            {title}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AllowanceButton;
