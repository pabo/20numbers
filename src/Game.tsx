import { useAtom } from "jotai";
import { useState } from "react";
import { Slots } from "./Slots";
import {
  currentNumberAtom,
  slotsAtom,
  hoveredSlotAtom,
  oddsAtom,
  oddsHistoryAtom,
  moveOrderAtom,
  isValidPlacement,
  scoresAtom,
  generatedAtom,
  canShowNumberAtom,
} from "./store";
import { GameState } from "./GameState";

export const Game = () => {
  const [hasError, setHasError] = useState(false);

  const [currentNumber] = useAtom(currentNumberAtom);
  const [slots, setSlots] = useAtom(slotsAtom);
  const [, setScores] = useAtom(scoresAtom);
  const [, setHoveredSlot] = useAtom(hoveredSlotAtom);
  const [odds] = useAtom(oddsAtom);
  const [, setOddsHistory] = useAtom(oddsHistoryAtom);
  const [, setMoveOrder] = useAtom(moveOrderAtom);
  const [, setGenerated] = useAtom(generatedAtom);
  const [canShowNumber] = useAtom(canShowNumberAtom);

  const handlePlaceNumber = (selectedSlotIndex: number) => {
    // if there's no number set, then ignore the click
    if (!canShowNumber) {
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

    // add odds to history
    setOddsHistory((history) => [...history, odds]);

    // record the move order
    setMoveOrder((moveOrder: number[]) => [...moveOrder, selectedSlotIndex]);

    setHoveredSlot(null);

    // udpate latest score in scores
    setScores((scores) =>
      // @ts-ignore-next-line - "with" is fine!
      scores.with(scores.length - 1, scores[scores.length - 1] - 1)
    );

    setGenerated(false);
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
