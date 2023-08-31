import { useAtom } from "jotai";
import { oddsAtom, oddsHistoryAtom } from "./store";

export const OddsHistory = () => {
  const [oddsHistory] = useAtom(oddsHistoryAtom);
  const [odds] = useAtom(oddsAtom);

  return (
    <div className="odds grow">
      <h4>Odds History / Win Probability</h4>
      <p>
        At each move, what are the odds that the next number generated will
        allow you to keep playing?
      </p>
      {oddsHistory.map((odds, index) => (
        <Odd key={index} value={odds} />
      ))}
      <Odd value={odds} />
    </div>
  );
};

type OddProps = {
  value: number;
};

const Odd: React.FC<OddProps> = ({ value }) => {
  const winOdds = Math.round((100 - value) * 100) / 100;
  return (
    <div className="odd" style={{ width: `${winOdds}%` }}>
      {winOdds}%
    </div>
  );
};
