import { atom } from "jotai";

export const ARRAY_SIZE = 20;
export const emptySlots = new Array(ARRAY_SIZE).fill("");
export const LARGEST_NUMBER = 1000;

export const numberAtom = atom<number | undefined>(undefined);
export const slotsAtom = atom(emptySlots);
