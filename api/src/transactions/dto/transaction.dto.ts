export interface TransactionDto {
  id: string;
  type: TransactionType,
  projectId: string;
  amount: number;
  currency: string;
  date: Date;
  name?: string;
  description?: string;
  userId: string;
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}
