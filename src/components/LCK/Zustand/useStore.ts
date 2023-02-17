import { create } from 'zustand';

interface ID {
  team: string;
  getId: (team: string) => void;
}
const useStore = create<ID>((set) => ({
  team: '',
  getId: (team) => set(() => ({ team: team })),
}));

export default useStore;
