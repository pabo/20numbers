import "./App.css";
import githubImgUrl from "./assets/github-mark.png";
import { useState } from "react";
import { Slots } from "./Slots";
import { useAtom } from "jotai";
import { Controls } from "./Controls";
import {
  ARRAY_SIZE,
  LARGEST_NUMBER,
  autoGenerateAtom,
  currentNumberAtom,
  emptySlots,
  generateNewNumber,
  moveOrderAtom,
  oddsHistoryAtom,
  scoreAtom,
  slotsAtom,
} from "./store";
import { GameState } from "./GameState";
import { OddsHistory } from "./OddsHistory";
import { Game } from "./Game";

export const App = () => {
  const [, setHasError] = useState(false);

  const [currentNumber, setNumber] = useAtom(currentNumberAtom);
  const [slots, setSlots] = useAtom(slotsAtom);
  const [autoGenerate] = useAtom(autoGenerateAtom);
  const [, setScore] = useAtom(scoreAtom);
  const [, setOddsHistory] = useAtom(oddsHistoryAtom);
  const [, setMoveOrder] = useAtom(moveOrderAtom);

  const reset = () => {
    setNumber(autoGenerate ? generateNewNumber(currentNumber, slots) : null);
    setSlots(emptySlots);
    setScore(ARRAY_SIZE);
    setOddsHistory([]);
    setMoveOrder([]);
  };

  const setNumberIfNotAlreadySet = (newNumber: number) => {
    if (!currentNumber) {
      setNumber(newNumber);
    }
  };

  if (autoGenerate && !currentNumber) {
    setNumber(generateNewNumber(currentNumber, slots));
  }

  return (
    <>
      <div className="links">
        <a href="https://github.com/pabo/20numbers">
          <img src={githubImgUrl} height="30px" />
        </a>
      </div>

      <div className="main col" onAnimationEnd={() => setHasError(false)}>
        <div className="overhead">
          <div className="description">
            Random numbers between 1 and {LARGEST_NUMBER} will be generated one
            at a time. Place them in the list below so that you end up with an
            ordered list of {ARRAY_SIZE} numbers. Good luck!
          </div>
        </div>
        <div className="row gap">
          <Game />
          <OddsHistory />
        </div>
        <div>
          <Controls
            reset={reset}
            generateNewNumber={generateNewNumber}
            setNumberIfNotAlreadySet={setNumberIfNotAlreadySet}
          />
        </div>
      </div>
    </>
  );
};
