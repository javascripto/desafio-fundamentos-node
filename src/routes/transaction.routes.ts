import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance()
    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const parsedValue = Number(value);
    const createTransaction = new CreateTransactionService(
      transactionsRepository
    );
    const transaction = createTransaction.execute({
      title,
      type,
      value: parsedValue,
    });
    return response.json(transaction);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default transactionRouter;
