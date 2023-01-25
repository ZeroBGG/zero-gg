import { create } from 'zustand';

interface Month {
  mon: string;
  getMonth: (month: string) => void;
}
const useStore = create<Month>((set) => ({
  mon: '1월',
  getMonth: (mon) => set(() => ({ mon: mon })),
}));

export default useStore;
