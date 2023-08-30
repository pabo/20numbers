import { useAtom } from "jotai";
import {
  currentNumberAtom,
  currentNumberStringAtom,
  isGameOver,
  scoreAtom,
  slotsAtom,
} from "./store";

export const GameState: React.FC = () => {
  const [score] = useAtom(scoreAtom);
  const [currentNumber] = useAtom(currentNumberAtom);
  const [currentNumberString] = useAtom(currentNumberStringAtom);
  const [slots] = useAtom(slotsAtom);

  const gameIsOver = isGameOver(currentNumber, slots);

  return (
    // <div id="game-over" className={visible ? "visible" : ""}>
    <div>
      <h2 className="score">Current: {score} Best: blah</h2>
      <h1>{gameIsOver ? "Game Over!" : currentNumberString}</h1>
    </div>
  );
};
