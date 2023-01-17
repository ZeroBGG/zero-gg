export type DuoType = {
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
};

export interface FilterType {
  [key: string]: string;
}
