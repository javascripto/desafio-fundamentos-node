import Transaction from "../models/Transaction";

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: "income" | "outcome";
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.transactions
      .reduce((balance: Balance, { type, value }: Transaction) => ({
        ...balance,
        [type]: balance[type] += value,
        total: balance.total += (type === "income" ? value : -value),
      }), {
        income: 0,
        outcome: 0,
        total: 0,
      });
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
