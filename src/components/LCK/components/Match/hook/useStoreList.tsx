import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { dbService } from 'src/firebase';
import { matchListProps, matchTeamType } from '@/components/LCK/typings';
import { create } from 'zustand';

interface listType {
  list: [];
  setList: (lcklist: matchListProps | matchTeamType) => void;
}
const useStoreList = create<listType>((set) => ({
  list: [],
  setList: async (lcklist) => {
    set((state: any) => ({ ...state, list: lcklist }));
  },
}));

export default useStoreList;
