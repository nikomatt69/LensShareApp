import { Button } from '@/components/UI/Button';
import { Spinner } from '@/components/UI/Spinner';
import { getModule } from '@/lib/getModule';
import onError from '@/lib/onError'
import { useGenerateModuleCurrencyApprovalDataLazyQuery } from '@/types/graph';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import React, { Dispatch, FC, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useSendTransaction, useWaitForTransaction } from 'wagmi'

interface Props {
    title?: string;
    module: any;
    allowed: boolean;
    setAllowed: Dispatch<boolean>;
}

const AllowanceButton: FC<Props> = ({ module, title }) => {
    const [allowed, setAllowed] = useState(module?.allowance !== '0x00');
    const [generateAllowanceQuery, { loading: queryLoading }] =
    useGenerateModuleCurrencyApprovalDataLazyQuery();

    const {
        data: txData,
        isLoading: transactionLoading,
        sendTransaction
    } = useSendTransaction({
        request: {},
        mode: 'recklesslyUnprepared',
        onError
    })

    const { isLoading: waitLoading } = useWaitForTransaction({
        hash: txData?.hash,
        onSuccess: () => {
            toast.success(`Modude ${allowed ? 'disabled' : 'enabled'} successfully!`)
            setAllowed(!allowed)
        },
        onError
    })

    const handleAllowance = (currencies: string, value: string, selectedModule: string) => {
        generateAllowanceQuery({
            variables: {
                request: {
                    currency: currencies,
                    value: value,
                    [getModule(module.module).field]: selectedModule
                }
            }
        }).then((res) => {
            const data = res?.data?.generateModuleCurrencyApprovalData
            sendTransaction?.({
                recklesslySetUnpreparedRequest: {
                    from: data?.from,
                    to: data?.to,
                    data: data?.data
                }
            })
        })
    }

  return allowed ? (
    <Button
        variant="warning"
        icon={
            queryLoading || transactionLoading || waitLoading ? (
                <Spinner variant="warning" size="xs" />
            ) : (
                <MinusIcon className="w-4 h-4" />
            )
        }
        onClick={() => handleAllowance(module.currency, '0', module.module)}
    >
        Revoke
    </Button>
  ) : (
    <>
        <Button
            variant='success'
            icon={
                queryLoading || transactionLoading || waitLoading ? (
                    <Spinner variant='success' size='xs' />
                ) :(
                    <PlusIcon className="w-4 h-4" />
                )
            }
            onClick={() => handleAllowance(module.currency, Number.MAX_SAFE_INTEGER.toString(), module.module)}
        >
            {title}
        </Button>
    </>
  )
}

export default AllowanceButton