import { useState } from "react";

const ARRAY_SIZE = 20;
const emptySlots = new Array(ARRAY_SIZE).fill("");
const LARGEST_NUMBER = 1000;

export const Game = () => {
  const [number, setNumber] = useState<number | undefined>();
  const [slots, setSlots] = useState(emptySlots);
  const [hasError, setHasError] = useState(false);
  const [autoGenerate, setAutoGenerate] = useState(false);

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
      className={hasError ? "horizontal-shake" : ""}
      onAnimationEnd={() => setHasError(false)}
    >
      <button onClick={() => setNumberIfNotAlreadySet(generateNewNumber())}>
        Generate
      </button>
      auto-generate?{" "}
      <input type="checkbox" onChange={() => setAutoGenerate((x) => !x)} />
      <button onClick={reset}>Reset</button>
      <div className="current-number">
        {slots.every((slot) => slot !== "") ? "You win!" : number}
      </div>
      <ol>
        {slots.map((slot, index) => (
          <li onClick={() => handlePlaceNumber(index)} key={index}>
            {slot}
          </li>
        ))}
      </ol>
      <br></br>
    </div>
  );
};
