import { useAtom } from "jotai";
import { slotsAtom, ARRAY_SIZE, currentNumberAtom } from "./store";

type SlotsProps = {
  handlePlaceNumber: (index: number) => void;
  hasError: boolean;
};

type SlotProps = {
  slot: number;
  index: number;
  handlePlaceNumber: (index: number) => void;
  isValid: boolean;
};

export const Slots: React.FC<SlotsProps> = ({
  handlePlaceNumber,
  hasError,
}) => {
  const [slots] = useAtom(slotsAtom);
  const [currentNumber] = useAtom(currentNumberAtom);

  // there's only one continuous set of slots where this number can go
  // find the bounds of it
  let lowerValidIndex = 0;
  let higherValidIndex = ARRAY_SIZE - 1;

  slots.every((s, index) => {
    if (s === "") {
      return true;
    }

    if (currentNumber && currentNumber > s) {
      lowerValidIndex = index + 1;
      return true;
    }

    if (currentNumber && currentNumber < s) {
      higherValidIndex = index - 1;
      return false;
    }
  });

  return (
    <div className={"slots " + (hasError ? "horizontal-shake" : "")}>
      <ol>
        {slots.map((slot, index) => {
          return (
            <Slot
              slot={slot}
              index={index}
              handlePlaceNumber={handlePlaceNumber}
              isValid={index >= lowerValidIndex && index <= higherValidIndex}
              key={index}
            />
          );
        })}
      </ol>
    </div>
  );
};

export const Slot: React.FC<SlotProps> = ({
  slot,
  index,
  handlePlaceNumber,
  isValid,
}) => {
  const [currentNumber] = useAtom(currentNumberAtom);

  const classNames = ["slot"];

  if (slot) {
    classNames.push("filled");
  }

  classNames.push(isValid ? "valid" : "invalid");

  return (
    <li
      className={classNames.join(" ")}
      onClick={() => handlePlaceNumber(index)}
    >
      <span>{slot ? slot : currentNumber}</span>
    </li>
  );
};
