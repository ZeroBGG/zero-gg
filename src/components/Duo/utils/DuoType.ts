import { Timestamp } from 'firebase/firestore';

export type DuoType = {
  id?: string;
  queue: string;
  tier: string;
  position: string;

  userId: string;
  userPassword: string;
  timeSet: string;
  title: string;
  memo: string;
  nickName: string;
  mostChamp: string;

  createdAt: Timestamp | number;
};

export interface FilterType {
  [key: string]: string;
}
