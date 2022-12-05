"use client";

import Navbar from "../../components/layout/Navbar";
import { $axios } from "../../config/axios";
import { useEffect, useState } from "react";
import TransactionCard from "../../components/TransactionCard";
import { Transaction, Account, Category } from "../../types";
import Modal from "../../components/Modal";
import TransactionForm from "../../components/TransactionForm";

export default function Dashboard() {
  //get the accounts and leave the value in a state

  const [accounts, setAccounts] = useState<Account[] | undefined>();
  const [categories, setCategories] = useState<Category[] | undefined>();

  const [transactions, setTransactions] = useState<[Transaction] | undefined>();
  const [transactionToEdit, setTransactionToEdit] = useState<
    Transaction | undefined
  >();
  const [transactionType, setTransactionType] = useState<string>("EXPENSE");
  const [open, setOpen] = useState<boolean>(false);

  function openEditModal(t: Transaction) {
    setTransactionToEdit(t);
    setTransactionType(t.type);
    setOpen(true);
  }

  function getAccounts() {
    $axios
      .get("/accounts")
      .then((res) => {
        setAccounts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getCategories() {
    $axios
      .get("/categories")
      .then((res) => {
        console.log({ categories: res.data });
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function to add a transaction

  function addTransaction(transaction: Transaction) {
    console.log({ AccountId: transaction.accountId });
    $axios
      .post("/transactions/create", {
        amount: transaction.amount,
        description: transaction.description,
        type: transaction.type,
        accountId: Number(transaction.accountId),
        categories: [],
      })
      .then((res) => {
        console.log({ createdTransaction: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function editTransaction(transaction: Transaction) {
    $axios
      .patch(`/transactions/edit/${transaction.id}`, {
        amount: transaction.amount,
        description: transaction.description,
        type: transaction.type,
        accountId: transaction.accountId,
        categories: [],
      })
      .then((res) => {
        console.log({ editedTransaction: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getTransactions() {
    await $axios
      .get("/transactions")
      .then((res) => {
        // console.log({ transactions: res.data });
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAccounts();
    getCategories();
    // addTransaction();
    getTransactions();

    // add account name to transactions
  }, []);

  useEffect(() => {
    transactions?.map((transaction) => {
      accounts?.map((account) => {
        if (transaction.accountId === account.id) {
          transaction.accountName = account.name;
        }
      });
    });
  }, [transactions]);

  return (
    <>
      <Navbar />
      <div className="mx-10 mt-4">
        <h1 className="text-6xl font-bold mb-12">Dashboard</h1>
        <main className=" grid grid-cols-12 ">
          <div className="col-span-2 p-4 bg-primary-300">
            <h4 className="text-2xl mb-2"> Accounts</h4>
            <ul className=" leading-4">
              {accounts &&
                accounts.map((account) => (
                  <li key={account.id}>
                    <h2>{account.name}</h2>
                  </li>
                ))}

              <li>
                <button className="bg-primary-500 py-2 px-4 rounded shadow border border-mono-300 mt-4">
                  Agregar nueva cuenta
                </button>
              </li>
            </ul>
            <div className="border-t border-primary-500 my-4 "></div>
            <h4 className="text-2xl mb-2"> Categories</h4>
            <ul className=" leading-4 ">
              {categories &&
                categories.map((category) => (
                  <li key={category.id}>
                    <h2>{category.name}</h2>
                  </li>
                ))}
              <li>
                <button className="bg-primary-500 py-2 px-4 rounded shadow border border-mono-300 mt-4">
                  Agregar nueva categoria
                </button>
              </li>
            </ul>
          </div>
          <div className="col-span-10 p-4 bg-primary-300  border-l border-primary-500">
            <div className="flex justify-between ">
              <h1 className="mb-4 text-2xl">Account details</h1>
              <div className=" flex gap-4 justify-end mb-2">
                <button
                  onClick={() => {
                    setTransactionToEdit(undefined);
                    setOpen(true);
                    setTransactionType("INCOME");
                  }}
                  className=" aspect-square bg-green-400  border border-mono-900 rounded-lg"
                >
                  +
                </button>
                <button
                  onClick={() => {
                    setTransactionToEdit(undefined);
                    setOpen(true);
                    setTransactionType("EXPENSE");
                  }}
                  className=" aspect-square bg-red-400 border border-mono-900 rounded-lg"
                >
                  -
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {transactions &&
                transactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    edit={openEditModal}
                  />
                ))}
            </div>
          </div>
        </main>
        {open && accounts && (
          <Modal setOpen={setOpen}>
            <TransactionForm
              transaction={transactionToEdit}
              accounts={accounts}
              // type of transaction
              transactionType={transactionType}
              onSubmit={(transaction: Transaction) => {
                transactionToEdit
                  ? editTransaction(transaction)
                  : addTransaction(transaction);
                setOpen(false);
                setTimeout(() => {
                  getTransactions();
                }, 300);
              }}
            />
          </Modal>
        )}
      </div>
    </>
  );
}
