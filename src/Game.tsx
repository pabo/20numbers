import { useAtom } from "jotai";
import { useState } from "react";
import { Slots } from "./Slots";
import {
  currentNumberAtom,
  slotsAtom,
  autoGenerateAtom,
  scoreAtom,
  hoveredSlotAtom,
  oddsAtom,
  oddsHistoryAtom,
  moveOrderAtom,
  isValidPlacement,
  generateNewNumber,
} from "./store";
import { GameState } from "./GameState";

export const Game = () => {
  const [hasError, setHasError] = useState(false);

  const [currentNumber, setNumber] = useAtom(currentNumberAtom);
  const [slots, setSlots] = useAtom(slotsAtom);
  const [autoGenerate] = useAtom(autoGenerateAtom);
  const [, setScore] = useAtom(scoreAtom);
  const [, setHoveredSlot] = useAtom(hoveredSlotAtom);
  const [odds] = useAtom(oddsAtom);
  const [, setOddsHistory] = useAtom(oddsHistoryAtom);
  const [, setMoveOrder] = useAtom(moveOrderAtom);

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

  return (
    <div className="game flex-half">
      <div className="column-intro">
        <GameState />
      </div>
      <Slots handlePlaceNumber={handlePlaceNumber} hasError={hasError} />
    </div>
  );
};
