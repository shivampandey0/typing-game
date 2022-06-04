import { useEffect, useState } from 'react';
import { Box, InputBox, Text } from '../../components';
import { useTimer } from '../../hooks';

export const Game = ({ alphabets, resetAlphabets }) => {
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
  };

  const resetGame = () => {
    resetTimer(true);
    resetAlphabets();
    setCurrentCharIndex(0);
    setResult();
  };

  const checkWin = (index) => {
    if (index === alphabets.length) {
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

  useEffect(() => {
    checkWin(currentCharIndex);
    //eslint-disable-next-line
  }, [currentCharIndex]);

  return (
    <>
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
    </>
  );
};
