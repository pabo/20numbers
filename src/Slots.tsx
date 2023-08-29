import { useAtom } from "jotai";
import { ARRAY_SIZE, numberAtom, slotsAtom } from "./atoms";

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
  const [number = 0] = useAtom(numberAtom);

  // there's only one continuous set of slots where this number can go
  // find the bounds of it
  let lowerValidIndex = 0;
  let higherValidIndex = ARRAY_SIZE - 1;

  slots.every((s, index) => {
    if (s === "") {
      return true;
    }

    if (number > s) {
      lowerValidIndex = index + 1;
      return true;
    }

    if (number < s) {
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
  return (
    <li
      className={isValid ? "valid slot" : "invalid slot"}
      onClick={() => handlePlaceNumber(index)}
    >
      {slot}
    </li>
  );
};
