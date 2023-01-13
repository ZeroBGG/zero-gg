export type StringRank = 'I' | 'II' | 'III' | 'IV';

export interface TypeSummoner {
  accountId: string;
  id: string;
  name: string;
  profileIconId: number;
  puuid: string;
  revisionDate: Date;
  summonerLevel: number;
}

export interface TypeSummonerRank {
  freshBlood: boolean;
  hotStreak: boolean;
  inactive: boolean;
  leagueId: string;
  leaguePoints: number;
  losses: number;
  queueType: string;
  rank: StringRank;
  summonerId: string;
  summonerName: string;
  tier: string;
  veteran: boolean;
  wins: number;
}
