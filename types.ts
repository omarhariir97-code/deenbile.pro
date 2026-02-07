
export type Page = 'login' | 'dashboard' | 'customers' | 'reports' | 'settings';
export type Language = 'en' | 'so';

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  type: 'debt' | 'payment';
  amount: number;
  date: string;
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  totalDebt: number;
  initials: string;
  color: string;
  transactions: Transaction[];
}

export interface StatItem {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}
