import { useAtom } from "jotai";
import { autoGenerateAtom, generatedAtom, highlightsAtom } from "./store";

type ControlsProps = {
  resetDaily: () => void;
  resetRandom: () => void;
};

export const Controls: React.FC<ControlsProps> = ({
  resetDaily,
  resetRandom,
}) => {
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
      <button onClick={resetDaily}>Reset Daily</button>
      <button onClick={resetRandom}>Reset Random</button>
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
