import { create } from 'zustand';

interface Month {
  mon: string;
  getMonth: (month: string) => void;
}
export const useDateStore = create<Month>((set) => ({
  mon: '',
  getMonth: (mon) => set(() => ({ mon: mon })),
}));
