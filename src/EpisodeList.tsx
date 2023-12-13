import React from 'react';
import { IAction, IEpisodeData, IProps } from './interfaces';
import { Store } from './Store';

export default function EpisodeList(props: IProps): Array<JSX.Element> {
  const { currentSelection } = props;

  const { state, dispatch } = React.useContext(Store);

  const toggleFavoriteAction = (episode: IEpisodeData): IAction => {
    let dispatchObj = { type: 'ADD_FAVORITE', payload: episode };
    const episodeInFav = state.favorites.includes(episode);

    if (episodeInFav) {
      const filterEpisode = state.favorites.filter(
        (fav: IEpisodeData) => fav.id !== episode.id
      );
      dispatchObj = { type: 'REMOVE_FAVORITE', payload: filterEpisode };
    }
    return dispatch(dispatchObj);
  };

  return currentSelection.map((episode: IEpisodeData) => (
    <section key={episode.id} className='episode-box'>
      {episode?.image?.medium && (
        <img
          src={episode?.image?.medium}
          alt={`Rick and Mort ${episode.name}`}
        />
      )}
      <div>{episode.name}</div>
      <section style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          season: {episode.season} number: {episode.number}
        </div>
        <button type='button' onClick={() => toggleFavoriteAction(episode)}>
          {state.favorites.find((fav: IEpisodeData) => fav.id === episode.id)
            ? 'Remove'
            : 'Favorite'}
        </button>
      </section>
    </section>
  ));
}
