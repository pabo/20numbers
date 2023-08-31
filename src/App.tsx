import "./App.css";
import githubImgUrl from "./assets/github-mark.png";
import { useState } from "react";
import { useAtom } from "jotai";
import { Controls } from "./Controls";
import {
  ARRAY_SIZE,
  LARGEST_NUMBER,
  emptySlots,
  generateNumbersFromSeed,
  moveOrderAtom,
  numbersAtom,
  oddsHistoryAtom,
  scoresAtom,
  slotsAtom,
} from "./store";
import { OddsHistory } from "./OddsHistory";
import { Game } from "./Game";

export const App = () => {
  const [, setHasError] = useState(false);

  const [, setSlots] = useAtom(slotsAtom);
  const [, setScores] = useAtom(scoresAtom);
  const [, setOddsHistory] = useAtom(oddsHistoryAtom);
  const [, setMoveOrder] = useAtom(moveOrderAtom);
  const [, setNumbers] = useAtom(numbersAtom);

  const resetRandom = () => {
    setSlots(emptySlots);
    setOddsHistory([]);
    setMoveOrder([]);
    setScores((scores) => [...scores, ARRAY_SIZE]);
    setNumbers(generateNumbersFromSeed(Math.random().toString()));
  };

  const resetDaily = () => {
    setSlots(emptySlots);
    setOddsHistory([]);
    setMoveOrder([]);
    setScores((scores) => [...scores, ARRAY_SIZE]);
    setNumbers(generateNumbersFromSeed());
  };

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
          <Controls resetDaily={resetDaily} resetRandom={resetRandom} />
        </div>
      </div>
    </>
  );
};
