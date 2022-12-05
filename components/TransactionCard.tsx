import { Transaction } from "../types";
import classnames from "classnames";
import { useState, useEffect } from "react";

type Props = {
  transaction: Transaction;
  edit: React.Dispatch<React.SetStateAction<any>>; // TODO: learn how to type this
};

function ParseDate(date: string) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
}

export default function TransactionCard({ transaction: t, edit }: Props) {
  const [isExpense, setIsExpense] = useState<boolean>(false);
  const [accountName, setAccountName] = useState<string>("");

  useEffect(() => {
    if (t.type === "EXPENSE") {
      setIsExpense(true);
    } else setIsExpense(false);
  }, [t.type]);
  useEffect(() => {
    if (t.accountName) {
      setAccountName(t.accountName);
    }
  }, [t.accountName]);

  return (
    <div
      className={classnames("p-4 rounded-lg shadow bg-green-300 w-full", {
        "bg-red-300": isExpense,
      })}
    >
      <p
        className={classnames("text-xl font-bold text-green-700", {
          "text-red-700": isExpense,
        })}
      >
        {isExpense ? "-" : "+"}
        {t.amount}
        {" en " + accountName}
      </p>
      <div className="flex justify-between items-center">
        <p className="truncate text-sm text-mono-800">{t.description}</p>
        {t.updatedAt && <p>{ParseDate(t.updatedAt)}</p>}
      </div>
      <button
        onClick={() => {
          edit(t);
        }}
      >
        edit {t.id}
      </button>
    </div>
  );
}
