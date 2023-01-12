export interface PlayersType {
  name: string;
  position: string;
  summoner: string;
  image: string;
  engName: string;
  logo: string;
}

export interface PlayerListType {
  id: number;
  name: string;
  korName: string;
  position: string;
  summoner: string;
  image: string;
  logo: string;
}

export interface ListProps {
  logo: string;
  teamName: string;
  id: string;
  players: PlayerListType[];
}

//#### MATCH 타입 #######

export interface matchProps {
  id: string;
  day: string;
  month: string;
  week: number;
  matches: matchTeamType;
}

export interface matchTeamType {
  matchName: string;
  time: string;
  state: string;
  date: string;
  teams: {
    time: string;
    blue: { id: string; logoUrl: string; name: string; win: string };
    red: { id: string; logoUrl: string; name: string; win: string };
  };
}
