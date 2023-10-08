import { IS_MAINNET } from "@/constants";
import { aaveMembers } from "./aave-members";
import { lensshareMembers } from "./pinsta-members";
import { mainnetVerified } from "./verified";


export const VERIFIED_CHANNELS = IS_MAINNET
  ? [
  
    ... mainnetVerified ,
    ...lensshareMembers,    
  ]
  : [

  ]