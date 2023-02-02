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

interface ArrType {
  readonly tier: string;
  readonly lane: string;
  url: string;
}

export type LaneType = Pick<ArrType, 'lane' | 'url'>;

export type TierType = Pick<ArrType, 'tier' | 'url'>;
