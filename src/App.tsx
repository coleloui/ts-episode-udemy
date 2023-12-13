import React, { useEffect } from 'react';
import { Store } from './Store';

function App(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);
  const URL = https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes

  
  const fetchDataAction = async () => {
    const data = await fetch(URL)
    const dataJSON = await data.json()
    
    return dispatch({type: 'FETCH_DATA', payload: dataJSON._embedded.episodes})
  }
  
  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction()
  }, [])

  return (
    <React.Fragment>
      <h1>gross show</h1>
      <p>pick your favorite episode</p>
    </React.Fragment>
  );
}

export default App;
