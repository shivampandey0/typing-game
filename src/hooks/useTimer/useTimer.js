import { useState } from 'react';

export const useTimer = () => {
  const [timer, setTimer] = useState({
    seconds: 0,
    miliseconds: 0,
  });
  const [timerId, setTimerId] = useState();

  /**
   * @param {number} ms Penality to add in miliseconds
   */
  const addPenalty = (ms) => {
    setTimer((prev) => ({
      ...prev,
      miliseconds: Number(prev.miliseconds) + ms,
    }));
  };

  const countDown = () => {
    setTimer((prev) => {
      let { seconds, miliseconds } = prev;
      if ((miliseconds += 10) >= 1000) {
        miliseconds -= 1000;
        seconds += 1;
      }

      return { ...prev, seconds, miliseconds };
    });
  };

  const startTimer = () => {
    setTimerId(
      setInterval(() => {
        countDown();
      }, 10)
    );
  };

  /**
   *
   * @param {boolean} reset to reset the Timer default false
   */
  const resetTimer = (reset = false) => {
    clearInterval(timerId);
    if (reset) {
      setTimer({ seconds: 0, miliseconds: 0 });
    }
  };

  return { timer, startTimer, resetTimer, addPenalty };
};
