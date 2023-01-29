import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
  info: string;
  getTeam: (t: string) => void;
};

export const useMyTeam = create<any>(
  persist(
    (set) => ({
      info: null,
      getTeam: (info: any) => set({ info }),
    }),
    {
      name: 'monthstorage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
