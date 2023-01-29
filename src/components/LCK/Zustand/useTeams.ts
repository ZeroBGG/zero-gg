import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
  info: string;
  getDate: (info: string) => void;
};

export const useTeams = create<any>(
  persist(
    (set) => ({
      info: null,
      getDate: (info: any) => set({ info }),
    }),
    {
      name: 'monthstorage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
