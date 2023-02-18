import { create } from 'zustand';

interface ID {
  teamId: string;
  getId: (teamId: string) => void;
}
const useStore = create<ID>((set) => ({
  teamId: '',
  getId: (teamId) => set(() => ({ teamId: teamId })),
}));

export default useStore;
