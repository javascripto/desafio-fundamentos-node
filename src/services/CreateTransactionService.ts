import TransactionsRepository from "../repositories/TransactionsRepository";
import Transaction from "../models/Transaction";

interface Request {
  value: number;
  title: string;
  type: "income" | "outcome";
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ value, title, type }: Request): Transaction {
    if (type === "outcome") {
      const balance = this.transactionsRepository.getBalance();
      if (balance.total - value < 0) {
        throw new Error("Invalid balance");
      }
    }
    return this.transactionsRepository
      .create({ value, title, type });
  }
}

export default CreateTransactionService;
