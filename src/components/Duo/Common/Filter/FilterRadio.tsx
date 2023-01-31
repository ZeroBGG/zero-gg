import { create } from 'zustand';

interface Filter {
  queue: string;
  tier: string;
  position: string;
  queueFilter: (queue: string) => void;
  tierFilter: (queue: string) => void;
  positionFilter: (queue: string) => void;
}

const FilterStore = create<Filter>((set) => ({
  queue: '',
  tier: '',
  position: '',
  queueFilter: (input) => {
    set(() => ({ queue: input }));
  },
  tierFilter: (input) => {
    set(() => ({ tier: input }));
  },
  positionFilter: (input) => {
    set(() => ({ position: input }));
  },
}));

export default FilterStore;
