import { useAtom } from "jotai";
import {
  numberAtom,
  slotsAtom,
  autoGenerateAtom,
  highlightsAtom,
} from "./atoms";

type ControlsProps = {
  reset: () => void;
  setNumberIfNotAlreadySet: (newNumber: number) => void;
  generateNewNumber: () => number;
};

export const Controls: React.FC<ControlsProps> = ({
  reset,
  setNumberIfNotAlreadySet,
  generateNewNumber,
}) => {
  const [number] = useAtom(numberAtom);
  const [slots] = useAtom(slotsAtom);
  const [autoGenerate, setAutoGenerate] = useAtom(autoGenerateAtom);
  const [highlights, setHighlights] = useAtom(highlightsAtom);

  return (
    <div className="controls">
      <button onClick={() => setNumberIfNotAlreadySet(generateNewNumber())}>
        Generate
      </button>
      <button onClick={reset}>Reset</button>
      <br />
      auto-generate?{" "}
      <input
        type="checkbox"
        checked={autoGenerate}
        onChange={() => {
          if (!autoGenerate) {
            setNumberIfNotAlreadySet(generateNewNumber());
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
      <div className="current-number">
        {slots.every((slot: number | "") => slot !== "") ? "You win!" : number}
      </div>
    </div>
  );
};
