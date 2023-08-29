import { useState } from "react";
import { Slots } from "./Slots";
import { useAtom } from "jotai";
import {
  ARRAY_SIZE,
  LARGEST_NUMBER,
  autoGenerateAtom,
  emptySlots,
  highlightsAtom,
  numberAtom,
  scoreAtom,
  slotsAtom,
} from "./atoms";
import { Controls } from "./Controls";
import { isValidPlacement } from "./utils";

export const Game = () => {
  const [number, setNumber] = useAtom(numberAtom);
  const [slots, setSlots] = useAtom(slotsAtom);
  const [hasError, setHasError] = useState(false);
  const [autoGenerate] = useAtom(autoGenerateAtom);
  const [highlights] = useAtom(highlightsAtom);
  const [score, setScore] = useAtom(scoreAtom);

  const reset = () => {
    setNumber(autoGenerate ? generateNewNumber() : undefined);
    setSlots(emptySlots);
    setScore(0);
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

    if (!isValidPlacement(index, number, slots)) {
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

    setScore((x) => x + 1);
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
      <Controls
        reset={reset}
        generateNewNumber={generateNewNumber}
        setNumberIfNotAlreadySet={setNumberIfNotAlreadySet}
      />
      Score: {score}
      <Slots handlePlaceNumber={handlePlaceNumber} hasError={hasError} />
    </div>
  );
};
