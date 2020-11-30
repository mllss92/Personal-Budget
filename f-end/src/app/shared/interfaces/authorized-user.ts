import { Category } from './category';

export interface AuthorizedUser {
  name: string;
  lastName: string;
  _id: string;
  token: string;
  balance: number;
  lastLogin: Date;
  monthIncome: number[];
  avalibleToDistribute: number;
  savings: Category[];
  spends: Category[];
  login: boolean;
  expenses: number;
}
