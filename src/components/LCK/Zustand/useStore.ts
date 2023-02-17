import { create } from 'zustand';

interface ID {
  id: string;
  getId: (id: string) => void;
}
const useStore = create<ID>((set) => ({
  id: '',
  getId: (id) => set(() => ({ id: id })),
}));

export default useStore;
