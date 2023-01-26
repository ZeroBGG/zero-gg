/* 소환사 정보 */

// 소환사 티어 타입
export type StringRank = 'I' | 'II' | 'III' | 'IV';

// 소환사 타입 정보
export interface TypeSummoner {
  accountId: string;
  id: string;
  name: string;
  profileIconId: number;
  puuid: string;
  revisionDate: Date;
  summonerLevel: number;
}

// 소환사 랭크 정보
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

/* 대전 정보 */

// 1게임 룬 정보
type TypePerks = {
  styles: [
    {
      description: string;
      style: number;
      selections: [
        {
          perk: number;
        },
      ];
    },
    {
      description: string;
      style: number;
      selections: [
        {
          perk: number;
        },
      ];
    },
  ];
};

// 1게임 개별 소환사 정보
export type TypeParticipants = {
  championName: string;
  role: string;
  win: boolean;
  puuid: string;
  summoner1Id: number;
  summoner2Id: number;
  perks: TypePerks;
  kills: number;
  deaths: number;
  assists: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  summonerName: string;
};

// 1게임 info 정보
export type TypeMatchInfo = {
  gameCreation: number;
  gameDuration: number;
  gameEndTimestamp: number;
  gameId: number;
  gameMode: string;
  gameName: string;
  gameStartTimestamp: number;
  gameType: string;
  gameVersion: string;
  mapId: number;
  participants: TypeParticipants[];
};

// 1게임 정보
export interface TypeMatch {
  info: TypeMatchInfo;
  metadata: {
    matchId: string;
  };
}
