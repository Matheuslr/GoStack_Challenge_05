import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: request): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transation type is invalid');
    }

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total - value < 0) {
      throw Error('Insufficient funds');
    }
    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
