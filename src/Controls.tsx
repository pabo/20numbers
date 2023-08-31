import { useAtom } from "jotai";
import {
  ISlot,
  autoGenerateAtom,
  currentNumberAtom,
  highlightsAtom,
  slotsAtom,
} from "./store";

type ControlsProps = {
  reset: () => void;
  setNumberIfNotAlreadySet: (newNumber: number) => void;
  generateNewNumber: (number: number | null, slots: ISlot[]) => number;
};

export const Controls: React.FC<ControlsProps> = ({
  reset,
  setNumberIfNotAlreadySet,
  generateNewNumber,
}) => {
  const [currentNumber] = useAtom(currentNumberAtom);
  const [slots] = useAtom(slotsAtom);
  const [autoGenerate, setAutoGenerate] = useAtom(autoGenerateAtom);
  const [highlights, setHighlights] = useAtom(highlightsAtom);

  return (
    <div className="controls">
      {!autoGenerate && (
        <button
          onClick={() =>
            setNumberIfNotAlreadySet(generateNewNumber(currentNumber, slots))
          }
        >
          Generate
        </button>
      )}
      <button onClick={reset}>Reset</button>
      <br />
      auto-generate?{" "}
      <input
        type="checkbox"
        checked={autoGenerate}
        onChange={() => {
          if (!autoGenerate) {
            setNumberIfNotAlreadySet(generateNewNumber(currentNumber, slots));
          }
          setAutoGenerate((x) => !x);
        }}
      />
      highlights?{" "}
      <input
        type="checkbox"
        checked={highlights}
        onChange={() => {
          setHighlights((x) => !x);
        }}
      />
    </div>
  );
};
