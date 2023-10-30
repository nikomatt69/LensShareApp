import { Localstorage } from "@/storage";
import parseJwt from "@/utils/lens/apollo/lib/parseJwt";


const getCurrentSessionProfileId = (): string | null => {
  const currentSession = parseJwt(
    localStorage.getItem(Localstorage.AccessToken) || ''
  );

  return currentSession.id.length ? currentSession.id : null;
};

export default getCurrentSessionProfileId;
