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
  moveOrderAtom,
  oddsAtom,
  oddsHistoryAtom,
  scoreAtom,
  slotsAtom,
} from "./store";
import { GameState } from "./GameState";
import { OddsHistory } from "./OddsHistory";

export const Game = () => {
  const [hasError, setHasError] = useState(false);

  const [currentNumber, setNumber] = useAtom(currentNumberAtom);
  const [slots, setSlots] = useAtom(slotsAtom);
  const [autoGenerate] = useAtom(autoGenerateAtom);
  const [highlights] = useAtom(highlightsAtom);
  const [, setScore] = useAtom(scoreAtom);
  const [, setHoveredSlot] = useAtom(hoveredSlotAtom);
  const [odds] = useAtom(oddsAtom);
  const [, setOddsHistory] = useAtom(oddsHistoryAtom);
  const [, setMoveOrder] = useAtom(moveOrderAtom);

  const reset = () => {
    setNumber(autoGenerate ? generateNewNumber(currentNumber, slots) : null);
    setSlots(emptySlots);
    setScore(ARRAY_SIZE);
    setOddsHistory([]);
    setMoveOrder([]);
  };

  const setNumberIfNotAlreadySet = (newNumber: number) => {
    if (!currentNumber) {
      setNumber(newNumber);
    }
  };

  const handlePlaceNumber = (selectedSlotIndex: number) => {
    // if there's no number set, then ignore the click
    if (!currentNumber) {
      return;
    }

    if (!isValidPlacement(selectedSlotIndex, currentNumber, slots)) {
      setHasError(true);
      return;
    }

    setSlots((oldSlots: number[]) =>
      // @ts-ignore-next-line - "with" is fine!
      oldSlots.with(selectedSlotIndex, currentNumber)
    );
    if (autoGenerate) {
      setNumber(generateNewNumber(currentNumber, slots));
    } else {
      setNumber(null);
    }

    setScore((x) => x - 1);

    // add odds to history
    setOddsHistory((history) => [...history, odds]);

    // record the move order
    setMoveOrder((moveOrder: number[]) => [...moveOrder, selectedSlotIndex]);

    setHoveredSlot(null);
  };

  if (autoGenerate && !currentNumber) {
    setNumber(generateNewNumber(currentNumber, slots));
  }

  return (
    <div
      className={`main col ${highlights ? "highlights" : ""}`}
      onAnimationEnd={() => setHasError(false)}
    >
      <div className="overhead">
        <div className="description">
          Random numbers between 1 and {LARGEST_NUMBER} will be generated one at
          a time. Place them in the list below so that you end up with an
          ordered list of {ARRAY_SIZE} numbers. Good luck!
        </div>
        <Controls
          reset={reset}
          generateNewNumber={generateNewNumber}
          setNumberIfNotAlreadySet={setNumberIfNotAlreadySet}
        />
        <GameState />
      </div>
      <div className="row gap">
        <Slots handlePlaceNumber={handlePlaceNumber} hasError={hasError} />
        <OddsHistory />
      </div>
    </div>
  );
};
