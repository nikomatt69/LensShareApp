import { Localstorage } from "@/storage";
import {parseJwt} from "@/utils/lens/apollo/lib";


const getCurrentSessionId = (): string => {
  const currentSession = parseJwt(
    localStorage.getItem(Localstorage.AccessToken) || ''
  );
  const currentAuthorizationId = currentSession?.authorizationId;

  return currentAuthorizationId;
};

export default getCurrentSessionId;
