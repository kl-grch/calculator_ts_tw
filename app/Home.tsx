"use client";
import { useState, useEffect } from "react";
import Button from "./components/button/Button";
import { buttons } from "./page";

export default function Home() {
  const [numberOne, setNumberOne] = useState<number | string>(0);
  const [numberTwo, setNumberTwo] = useState<number | string>(0);
  const [enterNumberOne, setEnterNumberOne] = useState(true);
  const [enterNumberTwo, setEnterNumberTwo] = useState(false);
  const [enterOperatorButton, setEnterOperatorButton] = useState(false);

  const [enterDot, setEnterDot] = useState(false);

  useEffect(() => {
    if (!Number.isInteger(Number(numberOne)) && enterNumberOne) {
      setEnterDot(true);
    } else if (enterOperatorButton) {
      setEnterDot(false);
    }
  }, [enterNumberOne, numberOne, enterOperatorButton]);

  function handleClickNumber(number: number | string) {
    if (enterNumberOne) {
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
    } else if (!enterNumberOne) {
      setEnterNumberTwo(true);
      setEnterOperatorButton(false);
      if (number === "," && !enterDot) {
        setNumberTwo((n) => String(n) + ".");
        setEnterDot(true);
      } else if (number === "," && enterDot) {
        false;
      } else if (number === 0 && numberTwo === 0) {
        false;
      } else if (numberTwo === 0 && number !== 0) {
        setNumberTwo(Number(number));
      } else if (numberTwo === "0." && number === 0) {
        setNumberTwo("0.0");
      } else {
        setNumberTwo((n) => String(n) + String(number));
      }
    }
  }

  function handleClickFunctionalButton(functionalButton: string) {
    if (functionalButton === "AC") {
      setNumberOne(0);
      setNumberTwo(0);
      setEnterNumberOne(true);
      setEnterNumberTwo(false);
      setEnterOperatorButton(false);
      setEnterDot(false);
    } else if (functionalButton === "±" && (numberOne != 0 || numberTwo != 0)) {
      if (enterNumberOne) {
        setNumberOne(Number(-numberOne));
      } else if (enterNumberTwo) {
        setNumberTwo(Number(-numberTwo));
      }
    } else if (functionalButton === "%") {
      if (enterNumberOne) {
        setNumberOne(Number(numberOne) / 100);
        if (numberOne == 0) {
          setEnterDot(false);
        }
      } else if (enterNumberTwo) {
        setNumberTwo(Number(numberTwo) / 100);
        if (numberTwo == 0) {
          setEnterDot(false);
        }
      }
    }
  }

  function handleClickOperatorButton(operatorButton: string) {
    setEnterNumberOne(false);
    setEnterOperatorButton(true);
    if (operatorButton === "÷") {
      setNumberOne(Number(numberOne) / Number(numberTwo));
      setNumberTwo(0);
    } else if (operatorButton === "x") {
      setNumberOne(Number(numberOne) * Number(numberTwo));
      setNumberTwo(0);
    } else if (operatorButton === "-") {
      setNumberOne(Number(numberOne) - Number(numberTwo));
      setNumberTwo(0);
    } else if (operatorButton === "+") {
      setNumberOne(Number(numberOne) + Number(numberTwo));
      setNumberTwo(0);
    } else if (operatorButton === "=") {
    }
  }

  function showResult() {
    if (enterNumberOne) {
      return numberOne;
    } else if (enterNumberOne && !enterOperatorButton) {
      return numberOne;
    } else if (!enterNumberOne && !enterNumberTwo && enterOperatorButton) {
      return numberOne;
    } else if (!enterNumberOne && enterNumberTwo && !enterOperatorButton) {
      return numberTwo;
    } else if (!enterNumberOne && enterNumberTwo && enterOperatorButton) {
      return numberOne;
    }
  }

  console.log(
    `
      Number one: ${numberOne}
      Number two: ${numberTwo}
      Enter number one: ${enterNumberOne}
      Enter number two: ${enterNumberTwo}
      Enter operator button: ${enterOperatorButton}
      Dot: ${enterDot}
    `,
  );

  return (
    <main className="container mx-auto flex h-full w-full max-w-[640px] flex-col px-5 py-2">
      <div className="mb-3 flex h-1/4 grow items-end justify-end truncate bg-black p-2 text-7xl text-white">
        {showResult()}
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
