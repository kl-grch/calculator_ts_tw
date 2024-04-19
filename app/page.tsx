"use client";

import { useState, useEffect } from "react";
import Button from "./components/button/Button";

const buttons = {
  functions: ["AC", "±", "%"],
  numbers: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ","],
  operators: ["÷", "x", "-", "+", "="],
};

export default function Home() {
  const [numberOne, setNumberOne] = useState<number | string>(0);
  const [numberTwo, setNumberTwo] = useState<number | string>(0);
  const [enterNumberOne, setEnterNumberOne] = useState(true);
  const [enterNumberTwo, setEnterNumberTwo] = useState(false);

  const [enterDot, setEnterDot] = useState(false);

  useEffect(() => {
    if (!Number.isInteger(Number(numberOne))) {
      setEnterDot(true);
    }
  }, [numberOne]);

  function handleClickNumber(number: number | string) {
    if (number === "," && !enterDot) {
      setNumberOne((n) => String(n) + ".");
      setEnterDot(true);
    } else if (number === "," && enterDot) {
      false;
    } else if (number === 0 && numberOne === 0) {
      false;
    } else if (numberOne === 0 && number !== 0) {
      setNumberOne(Number(number));
    } else if (numberOne === "0." && number === 0) {
      setNumberOne("0.0");
    } else {
      setNumberOne((n) => String(n) + String(number));
    }
  }

  function handleClickFunctionalButton(functionalButton: string) {
    if (functionalButton === "AC") {
      setNumberOne(0);
      setEnterDot(false);
    } else if (functionalButton === "±" && numberOne != 0) {
      setNumberOne(Number(-numberOne));
    } else if (functionalButton === "%") {
      setNumberOne(Number(numberOne) / 100);
      if (numberOne == 0) {
        setEnterDot(false);
      }
    }
  }

  function handleClickOperatorButton(operatorButton: string) {
    setEnterNumberOne(false);
    setEnterNumberTwo(true);
    if (operatorButton === "÷") {
      setNumberOne(Number(numberOne) / Number(numberTwo));
    } else if (operatorButton === "x") {
      setNumberOne(Number(numberOne) * Number(numberTwo));
    } else if (operatorButton === "-") {
      setNumberOne(Number(numberOne) - Number(numberTwo));
    } else if (operatorButton === "+") {
      setNumberOne(Number(numberOne) + Number(numberTwo));
    } else if (operatorButton === "=") {
    }
  }

  console.log(
    `
      Number one: ${numberOne}
      Number two: ${numberTwo}
      Enter number one: ${enterNumberOne}
      Enter number two: ${enterNumberTwo}
      Dot: ${enterDot}
    `,
  );

  return (
    <main className="container mx-auto flex h-full w-full max-w-[640px] flex-col px-5 py-2">
      <div className="mb-3 flex h-1/4 grow items-end justify-end truncate bg-black p-2 text-7xl text-white">
        {numberOne}
        {/* {enterNumberOne ? numberOne : numberTwo} */}
      </div>

      <div className="col-start-1 col-end-4 grid p-2 text-5xl text-white *:justify-items-center *:gap-2">
        <div className=" col-span-3 mb-2 grid grid-cols-subgrid">
          {buttons.functions.map((item) => {
            return (
              <Button
                key={item}
                value={item}
                type="functional"
                onClick={() => handleClickFunctionalButton(item)}
              />
            );
          })}
        </div>

        <div className="col-start-1 col-end-4 grid grid-cols-subgrid ">
          {buttons.numbers.map((item) => {
            return (
              <Button
                style={item === 0 ? "col-span-2 w-full" : null}
                key={item}
                value={item}
                type="number"
                onClick={() => handleClickNumber(item)}
              />
            );
          })}
        </div>

        <div className="col-start-4 row-start-1 row-end-3 ml-2 grid grid-cols-subgrid">
          {buttons.operators.map((item) => {
            return (
              <Button
                key={item}
                value={item}
                type="operator"
                onClick={() => handleClickOperatorButton(item)}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
