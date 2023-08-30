import { useState } from "react";
import { Slots } from "./Slots";
import { useAtom } from "jotai";
import { Controls } from "./Controls";
import {
  ARRAY_SIZE,
  LARGEST_NUMBER,
  autoGenerateAtom,
  currentNumberAtom,
  emptySlots,
  generateNewNumber,
  highlightsAtom,
  hoveredSlotAtom,
  isValidPlacement,
  scoreAtom,
  slotsAtom,
} from "./store";
import { GameState } from "./GameState";

export const Game = () => {
  const [hasError, setHasError] = useState(false);

  const [currentNumber, setNumber] = useAtom(currentNumberAtom);
  const [slots, setSlots] = useAtom(slotsAtom);
  const [autoGenerate] = useAtom(autoGenerateAtom);
  const [highlights] = useAtom(highlightsAtom);
  const [, setScore] = useAtom(scoreAtom);
  const [, setHoveredSlot] = useAtom(hoveredSlotAtom);

  const reset = () => {
    setNumber(autoGenerate ? generateNewNumber(currentNumber, slots) : null);
    setSlots(emptySlots);
    setScore(ARRAY_SIZE);
  };

  const setNumberIfNotAlreadySet = (newNumber: number) => {
    if (!currentNumber) {
      setNumber(newNumber);
    }
  };

  const handlePlaceNumber = (index: number) => {
    // if there's no number set, then ignore the click
    if (!currentNumber) {
      return;
    }

    if (!isValidPlacement(index, currentNumber, slots)) {
      setHasError(true);
      return;
    }

    // @ts-ignore-next-line - "with" is fine!
    setSlots((oldSlots: number[]) => oldSlots.with(index, currentNumber));
    if (autoGenerate) {
      setNumber(generateNewNumber(currentNumber, slots));
    } else {
      setNumber(null);
    }

    setScore((x) => x - 1);

    setHoveredSlot(null);
  };

  if (autoGenerate && !currentNumber) {
    setNumber(generateNewNumber(currentNumber, slots));
  }

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
      <GameState />
      <Slots handlePlaceNumber={handlePlaceNumber} hasError={hasError} />
    </div>
  );
};
