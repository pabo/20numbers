import { useAtom } from "jotai";
import {
  currentNumberStringAtom,
  gameOverAtom,
  highScoreAtom,
  scoreAtom,
} from "./store";

export const GameState: React.FC = () => {
  const [score] = useAtom(scoreAtom);
  const [currentNumberString] = useAtom(currentNumberStringAtom);
  const [gameOver] = useAtom(gameOverAtom);
  const [highScore] = useAtom(highScoreAtom);

  return (
    <div>
      <h4 className="score">
        Current: {score} Best: {highScore}
      </h4>
      <h1 className={gameOver ? "wompwomp" : ""}>{currentNumberString}</h1>
      <h2>{gameOver && score === 0 && "Holy Shit, you did it!"}</h2>
      {/* <h2>{gameOver && score !== 0 && "Game Over!"}</h2> */}
    </div>
  );
};
