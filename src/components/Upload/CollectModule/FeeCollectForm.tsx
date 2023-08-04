import type { Dispatch, FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { isAddress } from 'viem';
import { z } from 'zod';

import { Erc20 } from '@/utils/lens/generatedLenster';
import { useAppStore } from '@/store/app';
import { zodResolver } from '@hookform/resolvers/zod';
import { WMATIC_TOKEN_ADDRESS } from '@/constants';
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Button';
import { CollectModuleType, UploadedVideo } from '@/custom-types';

type Props = {
  uploadedVideo: UploadedVideo;
  setCollectType: (data: CollectModuleType) => void;
  setShowModal: Dispatch<boolean>;
  enabledCurrencies: { enabledModuleCurrencies: Array<Erc20> };
};

const formSchema = z.object({
  currency: z.string(),
  amount: z.string().min(1, { message: `Invalid amount` }).optional(),
  collectLimit: z
    .string()
    .min(1, { message: `Invalid collect limit` })
    .optional(),
  referralPercent: z
    .number()
    .max(100, { message: `Percentage should be 0 to 100` })
    .nonnegative({ message: `Should to greater than or equal to zero` })
});
export type FormData = z.infer<typeof formSchema>;

const FeeCollectForm: FC<Props> = ({
  uploadedVideo,
  setCollectType,
  setShowModal,
  enabledCurrencies
}) => {
  const submitContainerRef = useRef<HTMLDivElement>(null);

  const selectedChannel = useAppStore((state) => state.currentProfile);
  const [selectedCurrencySymbol, setSelectedCurrencySymbol] =
    useState('WMATIC');
  const splitRecipients = uploadedVideo.collectModule ?? [];

  const {
    register,
    formState: { errors },
    handleSubmit,
    unregister,
    setError
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      referralPercent: Number(uploadedVideo.collectModule.referralFee || 0),
      currency:
        uploadedVideo.collectModule.amount?.currency ?? WMATIC_TOKEN_ADDRESS,
      amount: uploadedVideo.collectModule.amount?.value || '0',
      collectLimit: uploadedVideo.collectModule.collectLimit || '0'
    }
  });

  useEffect(() => {
    if (uploadedVideo.collectModule) {
      register('collectLimit');
    } else {
      unregister('collectLimit');
    }
  }, [uploadedVideo.collectModule, register, unregister]);

  const getCurrencySymbol = (currencies: Erc20[], address: string) => {
    return currencies.find((c) => c.address === address)?.symbol as string;
  };

  const onSubmit = (data: FormData) => {
    setCollectType({
      amount: {
        currency: data.currency,
        value: data.amount || '0'
      },
      referralFee: data.referralPercent,
      recipient: selectedChannel?.ownedBy,
      collectLimit: data.collectLimit
    });
    setShowModal(false);
  };

  const validateInputs = (data: FormData) => {
    const amount = Number(data.amount);
    const { isFeeCollect } = uploadedVideo.collectModule;
    const collectLimit = Number(data.collectLimit);
    if (isFeeCollect) {
      if (amount === 0) {
        return setError('amount', {
          message: `Amount should be greater than 0`
        });
      }

      if (uploadedVideo.collectModule) {
        return toast.error(`Sum of all splits should be 100%`);
      }
      data.amount = String(amount);
    }
    if (collectLimit === 0) {
      return setError('collectLimit', {
        message: `Collect limit should be greater than 0`
      });
    }
    data.collectLimit = String(collectLimit);
    onSubmit(data);
  };

  return (
    <form className="space-y-3">
      {uploadedVideo.collectModule ? (
        <div>
          <Input
            label={`Total Collectibles`}
            type="number"
            placeholder="3"
            min="1"
            autoComplete="off"
            {...register('collectLimit', {
              setValueAs: (v) => String(v)
            })}
          />
        </div>
      ) : null}
      {uploadedVideo.collectModule.isFeeCollect ? (
        <>
          <div>
            <div className="mb-1 flex items-center space-x-1.5">
              <div className="text-[11px] font-semibold uppercase opacity-70">
                Collect Currency
              </div>
            </div>
            <select
              autoComplete="off"
              className="w-full rounded-xl border border-gray-200 bg-white dark:bg-gray-900/70 p-2.5 text-sm outline-none disabled:bg-gray-500 disabled:bg-opacity-20 disabled:opacity-60 dark:border-gray-800 dark:bg-gray-900"
              {...register('currency')}
              value={uploadedVideo.collectModule.amount?.currency}
              onChange={(e) => {
                setCollectType({
                  amount: { currency: e.target.value, value: '' }
                });
                setSelectedCurrencySymbol(
                  getCurrencySymbol(
                    enabledCurrencies.enabledModuleCurrencies,
                    e.target.value
                  )
                );
              }}
            >
              {enabledCurrencies?.enabledModuleCurrencies?.map(
                (currency: Erc20) => (
                  <option key={currency.address} value={currency.address}>
                    {currency.symbol}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <Input
              label={`Price of each collect`}
              type="number"
              placeholder="1.5"
              min="0"
              autoComplete="off"
              max="100000"
              prefix={selectedCurrencySymbol}
              {...register('amount', {
                setValueAs: (v) => String(v)
              })}
            />
          </div>
          <div>
            <Input
              label={`Referral Percentage`}
              type="number"
              placeholder="2"
              prefix="%"
              aria-label={`Percent of collect revenue can be shared with anyone who mirrors this video.`}
              {...register('referralPercent', { valueAsNumber: true })}
            />
          </div>
        </>
      ) : null}
      <div className="flex justify-end pt-2" ref={submitContainerRef}>
        <Button type="button" onClick={() => handleSubmit(validateInputs)()}>
          Set Collect Type
        </Button>
      </div>
    </form>
  );
};

export default FeeCollectForm;
