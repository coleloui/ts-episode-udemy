import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Store } from './Store';

const EpisodeListLazy = lazy<any>(() => import('./EpisodeList'));

function App(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);
  const URL = 'https://api.tvmaze.com/shows/216/episodes';
  const [display, setDisplay] = useState('episodes');

  const fetchDataAction = async () => {
    const data = await fetch(URL);
    const dataJSON = await data.json();

    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON,
    });
  };

  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  return (
    <React.Fragment>
      <header className='header'>
        <div>
          <h2>
            pick your favorite episode, current favorite episodes:{' '}
            {state.favorites.length}
          </h2>
        </div>
        <div>
          <h3>swap between favorites and all shows</h3>
          <button
            type='button'
            onClick={() =>
              display === 'episodes'
                ? setDisplay('favorites')
                : setDisplay('episodes')
            }
          >
            display {display === 'episodes' ? 'favorites' : 'episodes'}
          </button>
        </div>
      </header>
      <Suspense fallback={<div>loading...</div>}>
        <section className='episode-layout'>
          <EpisodeListLazy currentSelection={state[display]} />
        </section>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
