export interface PlayersType {
  readonly name: string;
  readonly position: string;
  readonly summoner: string;
  readonly image: string;
  readonly engName: string;
  readonly logo: string;
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

export interface matchListProps {
  id: string;
  day: string;
  filtering: {
    match1: {
      home: string;
      away: string;
    };
    match2: {
      home: string;
      away: string;
    };
  };
  month: string;
  date: string;
  matches: matchTeamType[];
}

export interface matchTeamType {
  first: boolean;
  time: string;
  state: string;
  home: teamType;
  away: teamType;
}

export interface teamType {
  id: string;
  logoUrl: string;
  name: string;
  initial: string;
  win: number;
}
