import { useState } from "react";
import { Slots } from "./Slots";
import { useAtom } from "jotai";
import {
  ARRAY_SIZE,
  LARGEST_NUMBER,
  emptySlots,
  numberAtom,
  slotsAtom,
} from "./atoms";

export const Game = () => {
  const [number, setNumber] = useAtom(numberAtom);
  const [slots, setSlots] = useAtom(slotsAtom);
  const [hasError, setHasError] = useState(false);
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [highlights, setHighlights] = useState(false);

  const reset = () => {
    setNumber(autoGenerate ? generateNewNumber() : undefined);
    setSlots(emptySlots);
  };

  const setNumberIfNotAlreadySet = (newNumber: number) => {
    if (!number) {
      setNumber(newNumber);
    }
  };

  const generateNewNumber = () => {
    let newNumber;

    do {
      newNumber = Math.floor(Math.random() * LARGEST_NUMBER) + 1;
    } while (newNumber === number || slots.includes(newNumber));
    // need to check against both because slots isnt updated yet

    return newNumber;
  };

  if (autoGenerate && !number) {
    setNumber(generateNewNumber());
  }

  const handlePlaceNumber = (index: number) => {
    // if there's no number set, then ignore the click
    if (!number) {
      return;
    }

    // check to make sure its a valid move
    const isEmpty = slots[index] === "";
    const previous = slots.slice(0, index);
    const allPreviousAreLess = previous
      .reverse()
      .every((value) => value === "" || number === undefined || value < number);
    const next = slots.slice(index);
    const allNextAreGreater = next.every(
      (value) => value === "" || number === undefined || value > number
    );

    if (!isEmpty || !allPreviousAreLess || !allNextAreGreater) {
      setHasError(true);
      return;
    }

    // @ts-ignore-next-line - "with" is fine!
    setSlots((oldSlots: number[]) => oldSlots.with(index, number));
    if (autoGenerate) {
      setNumber(generateNewNumber());
    } else {
      setNumber(undefined);
    }
  };

  return (
    <div
      className={`main ${highlights ? "highlights" : ""}`}
      onAnimationEnd={() => setHasError(false)}
    >
      <div className="description">
        Random numbers between 1 and {LARGEST_NUMBER} will be generated one at a
        time. Place them in the list below so that you end up with an ordered
        list of {ARRAY_SIZE} numbers. Good luck!
      </div>
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
          {slots.every((slot) => slot !== "") ? "You win!" : number}
        </div>
      </div>
      <Slots handlePlaceNumber={handlePlaceNumber} hasError={hasError} />
    </div>
  );
};
