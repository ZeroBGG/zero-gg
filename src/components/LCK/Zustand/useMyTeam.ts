import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface Team {
  myteam: string;
  getTeam: (myteam: string) => void;
}

interface Loading {
  loading: boolean;
  getLoading: (loading: boolean) => void;
}
export const useMyTeam = create<Team>((set) => ({
  myteam: 'geng',
  getTeam: (myteam) =>
    setTimeout(() => {
      set(() => ({ myteam: myteam }));
    }, 1000),
}));

export const useLoading = create<Loading>((set) => ({
  loading: true,
  getLoading: (loading) => set(() => ({ loading: loading })),
}));
