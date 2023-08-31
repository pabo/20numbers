import { useAtom } from "jotai";
import {
  canShowNumberAtom,
  currentNumberStringAtom,
  gameOverAtom,
  highScoreAtom,
  scoreAtom,
} from "./store";

export const GameState: React.FC = () => {
  const [score] = useAtom(scoreAtom);
  const [canShowNumber] = useAtom(canShowNumberAtom);
  const [currentNumberString] = useAtom(currentNumberStringAtom);
  const [gameOver] = useAtom(gameOverAtom);
  const [highScore] = useAtom(highScoreAtom);

  return (
    <div>
      <h4 className="score">
        Current: {score} Best: {highScore}
      </h4>
      {canShowNumber && (
        <h1 className={gameOver ? "wompwomp" : ""}>{currentNumberString}</h1>
      )}
      <h2>{gameOver && score === 0 && "Holy Shit, you did it!"}</h2>
    </div>
  );
};
