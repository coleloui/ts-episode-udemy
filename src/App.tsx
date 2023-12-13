import React, { useEffect } from 'react';
import { Store } from './Store';

interface IEpisodeData {
  id: number;
  image: { medium: string };
  name: string;
  season: number;
  number: number;
}

function App(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);
  const URL =
    'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';

  const fetchDataAction = async () => {
    const data = await fetch(URL);
    const dataJSON = await data.json();

    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes,
    });
  };

  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  }, []);

  return (
    <React.Fragment>
      <h1>gross show</h1>
      <p>pick your favorite episode</p>

      <section>
        {state.episodes.map((episode: IEpisodeData) => (
          <section key={episode.id}>
            <img
              src={episode.image.medium}
              alt={`Rick and Mort ${episode.name}`}
            />
            <div>{episode.name}</div>
            <section>
              season: {episode.season} number: {episode.number}
            </section>
          </section>
        ))}
      </section>
    </React.Fragment>
  );
}

export default App;
