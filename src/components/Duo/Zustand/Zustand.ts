import { create } from 'zustand';

interface MyStore {
  isModal: boolean;
  isListModal: boolean;
  isFailModal: boolean;
  toggleModal: () => void;
  toggleListModal: () => void;
  toggleFailModal: () => void;
}

const useStore = create<MyStore>((set) => ({
  isModal: false,
  isListModal: false,
  isFailModal: false,
  toggleModal: () => set((state) => ({ isModal: !state.isModal })),
  toggleListModal: () => set((state) => ({ isListModal: !state.isListModal })),
  toggleFailModal: () => set((state) => ({ isFailModal: !state.isFailModal })),
}));

export default useStore;
