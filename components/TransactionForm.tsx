// make a form that handles creating and editing a transaction

import { Transaction, Account } from "../types";
import classnames from "classnames";
import { useState, useEffect } from "react";
import Select from "react-select";
import TransactionTypeBtn from "./TransactionTypeBtn";
import AmountInput from "./AmountInput";

import { useForm, Controller, SubmitHandler } from "react-hook-form";

type Props = {
  transaction?: Transaction | undefined;
  accounts: Account[];
  transactionType: string;
  onSubmit: SubmitHandler<Transaction>;
};

function ParseDate(date: string) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
}

export default function TransactionForm({
  transaction: t,
  accounts: a,
  transactionType: type,
  onSubmit,
}: Props) {
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: t?.id,
      amount: t?.amount || 0,
      description: t?.description || "Descripcion placeholder de prueba",
      type: type,
      accountId: t?.accountId || 1,
      categories: t?.categories || [],
      account: t?.accountName,
    },
  });
  // const onSubmit = (data: any) => console.log(data);

  // console.log de watch
  console.log(watch()); // watch input value by passing the name of it

  useEffect(() => {
    if (t) setIsEditing(true);
    else setIsEditing(false);
  }, [t]);

  return (
    <div className="bg-primary-700 w-[50vw] h-[50vw] p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* use controller AmountInput */}
        <Controller
          name="amount"
          control={control}
          rules={{ required: true, min: 1 }}
          render={({ field }) => <AmountInput field={field} />}
        />

        {errors.amount && <span>Te hace falta este campo</span>}
        <input
          type="text"
          placeholder="Description"
          {...register("description", { required: false })}
        />

        {/* make type a radio group with Expense and income as options */}
        <TransactionTypeBtn
          options={["EXPENSE", "INCOME"]}
          field={register("type", { required: true })}
        />

        <select {...register("account", { required: true })}>
          {a.map((account, index) => (
            <option key={index} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>

        {errors.account && <span>Te hace falta este campo</span>}
        <input
          type="text"
          placeholder="Categories"
          {...register("categories", { required: false })}
        />

        <input type="submit" />
        {t && <p>{t.id}</p>}
      </form>
    </div>
  );
}
