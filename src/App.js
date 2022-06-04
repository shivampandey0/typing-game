import { useState } from 'react';
import './App.css';
import { Box, InputBox, Text, TextContainer } from './components';
import { useTimer } from './hooks';
import { getRandom } from './utils/helper';

function App() {
  const [alphabets, setAlphabets] = useState(getRandom(20));
  const [bestTime, setBestTime] = useState(localStorage.getItem('score') ?? 0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [result, setResult] = useState();

  const { timer, startTimer, resetTimer, addPenalty } = useTimer();

  const onCharacterInput = (char) => {
    currentCharIndex === 0 && startTimer();

    if (char !== alphabets[currentCharIndex]) {
      addPenalty(500);
    }

    if (
      char === alphabets[currentCharIndex] &&
      currentCharIndex < alphabets.length
    ) {
      setCurrentCharIndex((prev) => prev + 1);
    }

    if (currentCharIndex === alphabets.length - 1) {
      const _time = `${timer.seconds}.${timer.miliseconds}`;
      if (Number(bestTime) > Number(_time) || !bestTime) {
        localStorage.setItem('score', _time);
        setResult('Success');
        setBestTime(_time);
      } else {
        setResult('Failed');
      }
      resetTimer();
    }
  };

  const resetGame = () => {
    resetTimer(true);
    setAlphabets(getRandom(20));
    setCurrentCharIndex(0);
    setResult();
  };

  return (
    <div className='App'>
      <TextContainer />

      <Box char={result ?? alphabets[currentCharIndex]} />

      <Text
        classes='text'
        title={`Time: ${timer.seconds}.${timer.miliseconds}s`}
      />

      <Text classes='text' title={`my best time: ${bestTime}`} />

      <InputBox
        result={result}
        onChange={onCharacterInput}
        onReset={resetGame}
      />
    </div>
  );
}

export default App;
