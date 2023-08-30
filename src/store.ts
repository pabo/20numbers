import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const ARRAY_SIZE = 20;
export const emptySlots = new Array(ARRAY_SIZE).fill("");
export const LARGEST_NUMBER = 1000;

export const currentNumberAtom = atomWithStorage<number | null>("currentNumber", null);
export const slotsAtom = atomWithStorage("slots", emptySlots);
export const autoGenerateAtom = atomWithStorage("autoGenerate", true);
export const highlightsAtom = atomWithStorage("highlights", false);
export const scoreAtom = atomWithStorage("score", ARRAY_SIZE);
export const scoresAtom = atomWithStorage("scores", [1, 2, 3]);

export const currentNumberStringAtom = atom((get) => get(currentNumberAtom)?.toString() || '')


export type ISlot = number | "";

export const isValidPlacement = (
  index: number,
  number: number,
  slots: ISlot[],
): boolean => {
  // check to make sure its a valid move
  const isEmpty = slots[index] === "";
  const previous = slots.slice(0, index);
  const allPreviousAreLess = previous
    .reverse()
    .every(
      (value: ISlot) =>
        value === "" || number === undefined || value < number
    );
  const next = slots.slice(index);
  const allNextAreGreater = next.every(
    (value: ISlot) =>
      value === "" || number === undefined || value > number
  );

  if (!isEmpty || !allPreviousAreLess || !allNextAreGreater) {
    return false;
  }
  return true;
};

export const isGameOver = (number: number| null, slots: ISlot[]): boolean => {
  if (number === null) {
    return false;
  }

  let previous: number | "" = 0;
  for (const s of slots) {
    if (previous !== "" && previous < number && s !== "" && number < s) {
      return true;
    }
    previous = s;
  }

  return false;
};

export const generateNewNumber = (number: number | null, slots:ISlot[]) => {
  let newNumber;

  do {
    newNumber = Math.floor(Math.random() * LARGEST_NUMBER) + 1;
  } while (newNumber === number || slots.includes(newNumber));
  // need to check against both because slots isnt updated yet

  return newNumber;
};
