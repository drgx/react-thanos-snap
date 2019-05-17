import React, { useState } from 'react';

import ironman from './asset/purepng.webp';
import InfinityGauntlet from './components/InfinityGauntlet';

function App() {
  const [snap, setSnap] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setSnap(!snap)}>Snap</button>
      <InfinityGauntlet snap={snap}>
        <img src={ironman} width={'250'} alt={'test'} style={{ marginTop: '200px', marginLeft: '200px' }} />
      </InfinityGauntlet>
    </div>
  );
}

export default App;
