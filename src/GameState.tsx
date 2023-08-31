import { useAtom } from "jotai";
import {
  canShowNumberAtom,
  currentNumberStringAtom,
  dailyModeAtom,
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
  const [dailyMode] = useAtom(dailyModeAtom);

  return (
    <div>
      <h4 className="score">
        Current: {score} Best: {highScore}
      </h4>
      <h3>{dailyMode ? "Daily" : "Random"} Mode</h3>
      {canShowNumber && (
        <h2 className={gameOver ? "wompwomp" : ""}>{currentNumberString}</h2>
      )}
      <h2>{gameOver && score === 0 && "Holy Shit, you did it!"}</h2>
    </div>
  );
};
