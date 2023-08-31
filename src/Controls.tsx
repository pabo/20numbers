import { useAtom } from "jotai";
import { autoGenerateAtom, generatedAtom, highlightsAtom } from "./store";

type ControlsProps = {
  reset: () => void;
};

export const Controls: React.FC<ControlsProps> = ({ reset }) => {
  const [autoGenerate, setAutoGenerate] = useAtom(autoGenerateAtom);
  const [highlights, setHighlights] = useAtom(highlightsAtom);
  const [, setGenerated] = useAtom(generatedAtom);

  return (
    <div className="controls">
      {!autoGenerate && (
        <button
          onClick={() => {
            setGenerated(true);
          }}
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
