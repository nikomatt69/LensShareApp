import { Localstorage } from '@/storage';
import type { Publication } from '@/utils/lens/generatedLenster';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface EchoState {
  selectedTrack: Publication | null;
  setSelectedTrack: (publication: Publication | null) => void;
}

export const useEchoStore = create<EchoState>((set) => ({
  selectedTrack: null,
  setSelectedTrack: (selectedTrack) => set({ selectedTrack })
}));

interface EchosPersistState {
  selectedTrackId: string | null;
  setSelectedTrackId: (selectedTrack: string | null) => void;
}



export const useEchosPersistStore = create(
  persist<EchosPersistState>(
    
    (set) => ({
      selectedTrackId: null,
      setSelectedTrackId: (selectedTrackId) => set(() => ({ selectedTrackId }))
    }),

    
    { name: Localstorage.LensshareStore }
  )
);

export default useEchoStore;
