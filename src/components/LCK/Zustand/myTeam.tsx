import { create } from 'zustand';

interface Team {
  myteam: string;
  getTeam: (myteam: string) => void;
}
const myTeam = create<Team>((set) => ({
  myteam: 'geng',
  getTeam: (myteam) => set(() => ({ myteam: myteam })),
}));

export default myTeam;
