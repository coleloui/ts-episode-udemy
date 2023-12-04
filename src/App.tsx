import React from 'react';
import { Store } from './Store';

function App(): JSX.Element {
  const store = React.useContext(Store);

  console.log(store);

  return (
    <React.Fragment>
      <h1>gross show</h1>
      <p>pick your favorite episode</p>
    </React.Fragment>
  );
}

export default App;
