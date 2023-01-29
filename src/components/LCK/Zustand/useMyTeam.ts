import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface Team {
  myteam: string;
  getTeam: (myteam: string) => void;
}
export const useMyTeam = create<Team>((set) => ({
  myteam: 'geng',
  getTeam: (myteam) => set(() => ({ myteam: myteam })),
}));