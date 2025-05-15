export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accountNumber: string;
  role: 'customer' | 'admin' | 'support';
  address?: string;
  phone?: string;
  createdAt?: Date;
}