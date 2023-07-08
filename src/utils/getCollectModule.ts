import type { CollectModuleParams } from "@/utils/lens/generatedLenster";
import type { CollectModuleType } from "@/types/app";

export const getCollectModule = (
  selectedCollectModule: CollectModuleType
): CollectModuleParams => {
  // No one can collect the post
  if (selectedCollectModule.isRevertCollect) {
    return {
      revertCollectModule: true,
    };
  }
  // Should collect by paying fee (anyone/ only subs)
  if (selectedCollectModule.isFeeCollect) {
    return {
      feeCollectModule: {
        amount: {
          currency: selectedCollectModule.amount?.currency,
          value: selectedCollectModule.amount?.value as string,
        },
        recipient: selectedCollectModule.recipient,
        referralFee: selectedCollectModule.referralFee as number,
        followerOnly: selectedCollectModule.followerOnlyCollect as boolean,
      },
    };
  }

  // Post is free to collect
  return {
    freeCollectModule: {
      followerOnly: selectedCollectModule.followerOnlyCollect as boolean,
    },
  };
};

export const getCollectModuleConfig = (collectModule: string) => {
  switch (collectModule) {
    case "FeeCollectModule":
      return {
        type: "collectModule",
        description:
          "Allow you to collect any publication by paying fees specified.",
      };
    case "TimedFeeCollectModule":
      return {
        type: "collectModule",
        description:
          "Allow you to collect any publication within the time limit specified.",
      };
    case "LimitedFeeCollectModule":
      return {
        type: "collectModule",
        description:
          "Allow you to collect any publication with the collect limit specified.",
      };
    case "LimitedTimedFeeCollectModule":
      return {
        type: "collectModule",
        description:
          "Allow you to collect any publication with the time and collect limit specified.",
      };
    case "FeeFollowModule":
      return {
        type: "followModule",
        description:
          "Allows you to join any channel by paying a fee specified by the channel owner.",
      };
    default:
      return {
        type: "",
        description: "",
      };
  }
};