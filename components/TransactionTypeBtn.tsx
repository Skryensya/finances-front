import { FieldValues } from "react-hook-form";

export default function TransactionTypeBtn({
  options,
  field,
}: {
  options: string[];

  field: FieldValues;
}) {
  return (
    <div className="flex justify-between items-center">
      {options.map((option, index) => (
        <label key={"label" + index}>
          <input
            key={"label" + index}
            type="radio"
            name="type"
            value={option}
            {...field}
          />
          {option}
        </label>
      ))}
    </div>
  );
}
