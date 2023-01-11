export interface PlayersType {
  id: number;
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
  month: string;
  week: number;
  day: string;
  matches: {
    match1: matchType;
    match2: matchType;
  }[];
}

interface matchType {
  date: string;
  time: string;
  matchName: string;
  teams: teamProp;
}
interface teamProp {
  blue: teamInfoProp;
  red: teamInfoProp;
}
interface teamInfoProp {
  id: string;
  name: string;
  logoUrl: string;
}
