import { create } from 'zustand';

interface TypeCircle {
  id: string;
  key: string;
  name: string;
}

interface TypeCircleZustand {
  data: TypeCircle[];
  updateData: (newData: TypeCircle[]) => void;
}

interface TypeVirsionZustand {
  version: string;
  updateData: (newData: string) => void;
}

const storeCircle = create<TypeCircleZustand>((set) => ({
  data: [],
  updateData: (newData) => set(() => ({ data: newData })),
}));

const storeVersion = create<TypeVirsionZustand>((set) => ({
  version: '',
  updateData: (newData: string) => set(() => ({ version: newData })),
}));

export { storeCircle, storeVersion };
