import { create } from 'zustand';
import { TypeCircle } from '@/components/Main/types/type';

interface TypeCircleZustand {
  data: TypeCircle[];
  updateData: (newData: TypeCircle[]) => void;
}

const useCircle = create<TypeCircleZustand>((set) => ({
  data: [],
  updateData: (newData) => set(() => ({ data: newData })),
}));

export default useCircle;
