import { MouseEventHandler } from "react";

interface ButtonProps {
  value: string | number;
  type: "number" | "functional" | "operator";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function getTypeButton(type: string) {
  if (type === "number") {
    return "bg-neutral-700 hover:bg-neutral-500 active:bg-neutral-500";
  } else if (type === "operator") {
    return "bg-orange-400 hover:bg-white hover:text-orange-400 active:bg-white active:text-orange-400";
  } else if (type === "functional") {
    return "bg-neutral-400 text-black hover:bg-neutral-300 active:bg-neutral-300";
  }
}

export default function Button({ value, type, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${getTypeButton(type)} flex h-20 w-full min-w-20 items-center justify-center rounded-full p-2`}
    >
      {value}
    </button>
  );
}
