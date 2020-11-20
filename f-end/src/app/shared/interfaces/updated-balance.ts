import { Savings } from './savings';

export interface UpdatedBalance {
  balance: number;
  monthIncome: number[] | number;
  avalibleToDistribute: number;
  savings: Savings[];
}
