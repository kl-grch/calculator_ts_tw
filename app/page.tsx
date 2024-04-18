"use client";

import { useState, Fragment } from "react";
import Button from "./components/button/Button";

const buttons = {
  functions: ["AC", "±", "%"],
  numbers: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ","],
  operators: ["÷", "x", "-", "+", "="],
};

export default function Home() {
  const [result, setResult] = useState<number | string>(0); // результат
  const [numberOne, setNumberOne] = useState<string | number>(0); // первое число
  const [enterNumberOne, setEnterNumberOne] = useState(true); // первое число нажато
  const [numberTwo, setNumberTwo] = useState(0); // второе число
  const [enterNumberTwo, setEnterNumberTwo] = useState(false); // второе число нажато
  const [enterSignDot, setEnterSignDot] = useState(false); // нажат знак запятой
  const [enterFunctionalButton, setEnterFunctionalButton] = useState(false); // нажата функциональная конопка
  const [enterOperationButton, setEnterOperationButton] = useState(false); // нажата кнопка оператора
  const [nameFunctionalButtonAC, setNameFunctionalButtonAC] = useState("AC"); // название функциональной кнопки

  console.log(
    `
    Первое число: ${numberOne}
    Первое число нажато: ${enterNumberOne}
    Второе число: ${numberTwo}
    Второе число нажато: ${enterNumberTwo}
    Нажат знак запятой: ${enterSignDot}
    Нажата функциональная кнопка: ${enterFunctionalButton}
    Нажата кнопка оператора: ${enterOperationButton}
    Результат: ${result}
    Имя функциональной кнопки: ${nameFunctionalButtonAC}

    `,
  );

  function clearData() {
    setNumberOne(0);
    setEnterNumberOne(true);
    setNumberTwo(0);
    setEnterNumberTwo(false);
    setEnterSignDot(false);
    setEnterFunctionalButton(false);
    setEnterOperationButton(false);
    setResult(0);
  }

  function handleClickFunctionalButton(functionalButton: string) {
    if (functionalButton == "AC" && nameFunctionalButtonAC == "C") {
      clearData();
      setNameFunctionalButtonAC("AC");
    } else if (functionalButton == "±") {
      if (enterNumberOne) {
        setNumberOne(-numberOne);
      } else {
        setNumberTwo(-numberTwo);
      }
    }
  }

  function renameFunctionalButtonAC() {
    if (numberOne == 0 && enterNumberOne) {
      setNameFunctionalButtonAC("C");
    }
  }

  function handleClickNumber(number: number | string) {
    if (number === 0 && numberOne === 0 && enterNumberOne) {
      false;
    } else if (number !== 0 && numberOne === 0 && enterNumberOne) {
      setNumberOne(number);
      renameFunctionalButtonAC();
    }
  }

  return (
    <main className="container mx-auto flex h-full w-full max-w-[640px] flex-col px-5 py-2">
      <div className="mb-3 flex h-1/4 grow items-end justify-end bg-black p-2 text-7xl text-white">
        {result}
      </div>

      <div className="col-start-1 col-end-4 grid p-2 text-5xl text-white *:justify-items-center *:gap-2">
        <div className=" col-span-3 mb-2 grid grid-cols-subgrid">
          {buttons.functions.map((item) => {
            return (
              <Button
                onClick={() => handleClickFunctionalButton(item)}
                key={item}
                value={item == "AC" ? nameFunctionalButtonAC : item}
                type="functional"
              />
            );
          })}
        </div>

        <div className="col-start-1 col-end-4 grid grid-cols-subgrid ">
          {buttons.numbers.map((item) => {
            if (item === 0) {
              return (
                <div key={item} className="col-span-2 w-full">
                  <Button
                    onClick={() => {
                      handleClickNumber(item);
                    }}
                    value={item}
                    type="number"
                  />
                </div>
              );
            } else {
              return (
                <Button
                  onClick={() => {
                    handleClickNumber(item);
                  }}
                  key={item}
                  value={item}
                  type="number"
                />
              );
            }
          })}
        </div>

        <div className="col-start-4 row-start-1 row-end-3 ml-2 grid grid-cols-subgrid">
          {buttons.operators.map((item) => {
            return <Button key={item} value={item} type="operator" />;
          })}
        </div>
      </div>
    </main>
  );
}
