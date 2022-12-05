// make a number inout with buttons to increment and decrement the value

// Compare this snippet from components/AmountInput.tsx:

import { FieldValues } from "react-hook-form";

export default function AmountInput({ field }: { field: FieldValues }) {
  const buttonAmounts = [10, 100, 500, 1000, 5000, 10000];
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex gap-4 ">
        <button
          onClick={() => {
            field.onChange(field.value - 1);
          }}
        >
          -
        </button>
        <input type="number" {...field} />
        <button
          onClick={() => {
            field.onChange(field.value + 1);
          }}
        >
          +
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          {buttonAmounts.map((amount, index) => (
            <button
              className=" p-1 bg-green-200 mx-2 w-18 "
              key={index}
              onClick={(e) => {
                e.preventDefault();
                field.onChange(field.value + amount);
              }}
            >
              {amount}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
