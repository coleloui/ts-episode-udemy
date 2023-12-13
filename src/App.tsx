import React, { useEffect } from 'react';
import { Store } from './Store';
import { IAction, IEpisodeData } from './interfaces';

function App(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);
  const URL = 'https://api.tvmaze.com/shows/216/episodes';

  const fetchDataAction = async () => {
    const data = await fetch(URL);
    const dataJSON = await data.json();

    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON,
    });
  };

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

  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  return (
    <React.Fragment>
      <header className='header'>
        <h1>gross show</h1>
        <p>
          pick your favorite episode, current favorite episodes:{' '}
          {state.favorites.length}
        </p>
      </header>

      <section className='episode-layout'>
        {state.episodes.map((episode: IEpisodeData) => (
          <section key={episode.id} className='episode-box'>
            {episode?.image?.medium && (
              <img
                src={episode?.image?.medium}
                alt={`Rick and Mort ${episode.name}`}
              />
            )}
            <div>{episode.name}</div>
            <section>
              <div>
                season: {episode.season} number: {episode.number}
              </div>
              <button
                type='button'
                onClick={() => toggleFavoriteAction(episode)}
              >
                {state.favorites.find(
                  (fav: IEpisodeData) => fav.id === episode.id
                )
                  ? 'Remove'
                  : 'Favorite'}
              </button>
            </section>
          </section>
        ))}
      </section>
    </React.Fragment>
  );
}

export default App;
