import { useState } from 'react';
import './App.css';
import { TextContainer } from './components';
import { Game } from './feature';
import { getRandom } from './utils/helper';

function App() {
  const [alphabets, setAlphabets] = useState(getRandom(20));

  console.log(alphabets);

  return (
    <div className='App'>
      <TextContainer />
      <Game
        alphabets={alphabets}
        resetAlphabets={() => setAlphabets(getRandom(20))}
      />
    </div>
  );
}

export default App;
