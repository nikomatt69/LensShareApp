import { CollectModules, FollowModules, ReferenceModules } from "@/utils/lens/generatedLenster";


/**
 * Returns the name and field of the specified module.
 *
 * @param name Name of the module.
 * @returns Object containing the name and field of the module.
 */
const getAllowanceModule = (
  name: string
): {
  name: string;
  field: string;
} => {
  switch (name) {
    // Collect Modules
    case CollectModules.MultirecipientFeeCollectModule:
      return { name: `Multirecipient Paid Collect`, field: 'collectModule' };
    case CollectModules.SimpleCollectModule:
      return { name: `Basic Collect`, field: 'collectModule' };
    case CollectModules.RevertCollectModule:
      return { name: `No Collect`, field: 'collectModule' };

    // Follow modules
    case FollowModules.FeeFollowModule:
      return { name: `Fee Follow`, field: 'followModule' };

    // Reference modules
    case ReferenceModules.FollowerOnlyReferenceModule:
      return { name: `Follower Only Reference`, field: 'referenceModule' };
    default:
      return { name, field: 'collectModule' };
  }
};

export default getAllowanceModule;
