import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const ARRAY_SIZE = 20;
export const emptySlots = new Array(ARRAY_SIZE).fill("");
export const LARGEST_NUMBER = 1000;

export const numberAtom = atom<number | undefined>(undefined);
export const slotsAtom = atom(emptySlots);
export const autoGenerateAtom = atom(true);
export const highlightsAtom = atom(false);

export const scoreAtom = atomWithStorage("score", 20);
