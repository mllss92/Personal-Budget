import { Category } from './category';

export interface AuthorizedUser {
  fullName: string;
  _id: string;
  token: string;
  balance: number;
  monthIncome: number[];
  avalibleToDistribute: number;
  savings: Category[];
  spends: Category[];
  login: boolean;
  expenses: number;
}
