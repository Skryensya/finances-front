export type Transaction = {
  id?: number;
  amount: number;
  description: string;
  type: string;
  accountId: number;
  categories: number[];
  createdAt?: string;
  updatedAt?: string;
  accountName?: string;
};
