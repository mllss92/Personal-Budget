import { Savings } from './savings';

export interface AuthorizedUser {
  fullName: string;
  _id: string;
  token: string;
  login: boolean;
  balance: number;
  savings: Savings[];
}
