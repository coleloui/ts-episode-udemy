export interface IAction {
  type: string;
  payload: Array<IEpisodeData> | any;
}

export interface IEpisodeData {
  id: number;
  image: { medium: string };
  name: string;
  season: number;
  number: number;
}

export interface IProps {
  currentSelection: Array<IEpisodeData>;
}

export interface IState {
  episodes: Array<IEpisodeData>;
  favorites: Array<IEpisodeData>;
}
