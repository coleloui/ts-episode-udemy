export interface IEpisodeData {
  id: number;
  image: { medium: string };
  name: string;
  season: number;
  number: number;
}

export interface IState {
  episodes: Array<IEpisodeData>;
  favorites: Array<any>;
}

export interface IAction {
  type: string;
  payload: any;
}
