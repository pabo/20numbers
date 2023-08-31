import { useAtom } from "jotai";
import {
  ARRAY_SIZE,
  currentNumberAtom,
  gameOverAtom,
  hoveredOddsAtom,
  hoveredSlotAtom,
  oddsAtom,
  oddsHistoryAtom,
} from "./store";

export const OddsHistory = () => {
  const [oddsHistory] = useAtom(oddsHistoryAtom);
  const [odds] = useAtom(oddsAtom);
  const [gameOver] = useAtom(gameOverAtom);
  const [hoveredSlot] = useAtom(hoveredSlotAtom);
  const [currentNumber] = useAtom(currentNumberAtom);

  return (
    <div className="odds flex-half">
      <div className="column-intro">
        <h4>Odds History / Win Probability</h4>
        <p>
          After each move, what were the odds that the next number generated
          will allow you to keep playing?
        </p>
      </div>
      <div>
        {oddsHistory.map((odds, index) => (
          <Odd key={index} value={odds} index={index} />
        ))}
        {!gameOver && currentNumber !== null && hoveredSlot !== null && (
          <Odd value={odds} index={oddsHistory.length} />
        )}
      </div>
    </div>
  );
};

type OddProps = {
  value: number;
  index?: number;
};

const Odd: React.FC<OddProps> = ({ value, index = 0 }) => {
  const winOdds = Math.round((100 - value) * 100) / 100;
  const [, setHoveredOdds] = useAtom(hoveredOddsAtom);

  return (
    <div
      className="odd flex row"
      //   style={{ width: `${winOdds}%` }}
      onMouseEnter={() => setHoveredOdds(index)}
      onMouseLeave={() => setHoveredOdds(undefined)}
    >
      <div className="oddLabel">{ARRAY_SIZE - index}:</div>
      <div className="oddBarContainer">
        <div className="oddBar" style={{ width: `${winOdds}%` }}></div>
      </div>
      <div className="oddOdds">{winOdds}%</div>
    </div>
  );
};
