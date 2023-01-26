export interface PlayerListType {
  readonly captain: boolean;
  readonly id: number;
  readonly name: string;
  readonly korName: string;
  readonly position: string;
  readonly summoner: string;
  readonly image: string;
  readonly logo: string;
}
export interface SliceType {
  readonly id: string;
  readonly teamName: string;
  readonly logo: string;
}

export interface ListProps {
  readonly logo: string;
  readonly teamName: string;
  readonly id: string;
  players: PlayerListType[];
}

//#### MATCH 타입 #######

export interface matchListProps {
  readonly id: string;
  readonly month: string;
  readonly date: string;
  readonly day: string;
  matches: matchesType[];
}

export interface matchesType {
  matchOne: matchTeamType;
  matchTwo: matchTeamType;
}

export interface matchTeamType {
  first: boolean;
  readonly time: string;
  readonly state: string;
  home: teamType;
  away: teamType;
}

export interface teamType {
  id: string;
  readonly name: string;
  readonly initial: string;
  win: number;
  logoUrl: string;
}

export type CategoryType = {
  id: string;
  url: string;
}[];
