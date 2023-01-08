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
  mostChamp: string[];
};

export type FindDuoType = Pick<DuoType, 'queue' | 'tier' | 'position'>;

export type FindUserType = Pick<DuoType, 'userId' | 'userPassword'>;
