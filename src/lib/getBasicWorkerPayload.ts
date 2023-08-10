import { IS_MAINNET } from "@/constants";
import { Localstorage } from "@/storage";


const getBasicWorkerPayload = () => {
  const accessToken = localStorage.getItem(Localstorage.AccessToken);

  return { accessToken, isMainnet: IS_MAINNET };
};

export default getBasicWorkerPayload;
