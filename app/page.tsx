"use client";

import { useState, useEffect } from "react";
import Button from "./components/button/Button";
import Decimal from "decimal.js";

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
  const [enterOperatorButton, setEnterOperatorButton] = useState(false);
  const [enterDot, setEnterDot] = useState(false);
  const [nameClearButton, setNameClearButton] = useState("AC");
  const [operatorSign, setOperatorSign] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    if (!Number.isInteger(Number(numberOne)) && enterNumberOne) {
      setEnterDot(true);
    } else if (enterOperatorButton) {
      setEnterDot(false);
    }
  }, [enterNumberOne, numberOne, enterOperatorButton]);

  useEffect(() => {
    if (numberOne.toString().length > 9 && operatorSign === "") {
      setDisabledButton(true);
    } else if (numberTwo.toString().length > 9) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [numberOne, numberTwo, operatorSign]);

  function handleClickNumber(number: number | string) {
    setNameClearButton("C");
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
    if (functionalButton == "AC") {
      setNumberOne(0);
      setNumberTwo(0);
      setEnterNumberOne(true);
      setEnterNumberTwo(false);
      setEnterOperatorButton(false);
      setEnterDot(false);
      setNameClearButton("AC");
      setOperatorSign("");
    } else if (functionalButton === "±" && (numberOne != 0 || numberTwo != 0)) {
      setNameClearButton("C");
      if (enterNumberOne) {
        setNumberOne(Number(-numberOne));
      } else if (
        !enterNumberOne &&
        enterNumberTwo &&
        operatorSign != "" &&
        enterOperatorButton
      ) {
        setNumberOne(-numberOne);
      } else if (enterNumberTwo) {
        setNumberTwo(Number(-numberTwo));
      }
    } else if (functionalButton === "%" && (numberOne != 0 || numberTwo != 0)) {
      setNameClearButton("C");
      if (enterNumberOne) {
        setNumberOne(Number(new Decimal(numberOne).div(100)));
        if (numberOne == 0) {
          setEnterDot(false);
        }
      } else if (
        !enterNumberOne &&
        enterNumberTwo &&
        operatorSign != "" &&
        enterOperatorButton
      ) {
        setNumberOne(Number(new Decimal(numberOne).div(100)));
        if (numberOne == 0) {
          setEnterDot(false);
        }
      } else if (enterNumberTwo) {
        setNumberTwo(Number(new Decimal(numberTwo).div(100)));
        if (numberTwo == 0) {
          setEnterDot(false);
        }
      }
    }
  }

  function handleClickOperatorButton(operatorButton: string) {
    setEnterNumberOne(false);
    setEnterOperatorButton(true);
    setNameClearButton("C");
    setOperatorSign(operatorButton);

    if (enterNumberTwo) {
      if (operatorButton === "÷") {
        setNumberOne(
          Number(new Decimal(numberOne).div(Number(new Decimal(numberTwo)))),
        );
        setNumberTwo(0);
      } else if (operatorButton === "x") {
        setNumberOne(
          Number(new Decimal(numberOne).mul(Number(new Decimal(numberTwo)))),
        );
        setNumberTwo(0);
      } else if (operatorButton === "-") {
        setNumberOne(
          Number(new Decimal(numberOne).minus(Number(new Decimal(numberTwo)))),
        );
        setNumberTwo(0);
      } else if (operatorButton === "+") {
        setNumberOne(
          Number(new Decimal(numberOne).plus(Number(new Decimal(numberTwo)))),
        );
        setNumberTwo(0);
      } else if (operatorButton === "=") {
        if (operatorSign === "÷") {
          setNumberOne(
            Number(new Decimal(numberOne).div(Number(new Decimal(numberTwo)))),
          );
          setOperatorSign("÷");
        } else if (operatorSign === "x") {
          setNumberOne(
            Number(new Decimal(numberOne).mul(Number(new Decimal(numberTwo)))),
          );
          setOperatorSign("x");
        } else if (operatorSign === "-") {
          setNumberOne(
            Number(
              new Decimal(numberOne).minus(Number(new Decimal(numberTwo))),
            ),
          );
          setOperatorSign("-");
        } else if (operatorSign === "+") {
          setNumberOne(
            Number(new Decimal(numberOne).plus(Number(new Decimal(numberTwo)))),
          );
          setOperatorSign("+");
        } else {
          false;
        }
      }
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
      Operator: ${operatorSign}
    `,
  );

  return (
    <main className="container mx-auto flex h-full w-full max-w-[640px] flex-col  py-2">
      <div className="mb-3 flex h-1/4 grow items-end justify-end truncate bg-black p-2 px-8 text-5xl text-white sm:text-7xl">
        <p className="truncate">{showResult()}</p>
      </div>

      <div className="col-start-1 col-end-4 mb-16 grid p-2 text-4xl text-white *:justify-items-center *:gap-2">
        <div className=" col-span-3 mb-2 grid grid-cols-subgrid">
          {buttons.functions.map((item) => {
            return (
              <Button
                key={item}
                value={item === "AC" ? nameClearButton : item}
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
                disabled={disabledButton}
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
