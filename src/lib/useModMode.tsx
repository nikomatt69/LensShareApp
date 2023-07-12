import { useAppPersistStore, useAppStore } from '@/store/app';
import isGardener from './isGardener';

const useModMode = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  const allowed = currentProfile ? isGardener(currentProfile?.id) : false;

  return { allowed };
};

export default useModMode;
