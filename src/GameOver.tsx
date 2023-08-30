import { useAtom } from "jotai";
import { scoreAtom } from "./store";

type GameOverProps = {
  visible: boolean;
};

export const GameOver: React.FC<GameOverProps> = ({ visible }) => {
  const [score] = useAtom(scoreAtom);

  return (
    <div id="game-over" className={visible ? "visible" : ""}>
      Game Over! Your score was {score}
    </div>
  );
};
