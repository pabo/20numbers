import { useAtom } from "jotai";
import {
  currentNumberStringAtom,
  gameOverAtom,
  highScoreAtom,
  oddsOfNextNumberEndingGame,
  scoreAtom,
  scoresAtom,
  slotsWithHoverAtom,
} from "./store";
import { useEffect } from "react";

export const GameState: React.FC = () => {
  const [score] = useAtom(scoreAtom);
  const [, setScores] = useAtom(scoresAtom);
  const [currentNumberString] = useAtom(currentNumberStringAtom);
  const [gameOver] = useAtom(gameOverAtom);
  const [highScore] = useAtom(highScoreAtom);
  const [slotsWithHover] = useAtom(slotsWithHoverAtom);

  // TODO: BUG refreshing an ended game adds the score to the scores again
  useEffect(() => {
    if (gameOver) {
      setScores((scores) => {
        return [...scores, score].sort((a, b) => a - b);
      });
    }
  }, [gameOver]);

  return (
    <div>
      <h2 className="score">
        Current: {score} Best: {highScore}
      </h2>
      <h2>{!gameOver && currentNumberString}</h2>
      <h2>{gameOver && score === 0 && "Holy Shit, you did it!"}</h2>
      <h2>{gameOver && score !== 0 && "Game Over!"}</h2>
      <div>
        {!gameOver &&
          score > 1 &&
          `Odds of next number ending game: ${oddsOfNextNumberEndingGame(
            slotsWithHover
          )}%`}
      </div>
    </div>
  );
};
