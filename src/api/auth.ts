import axios from 'axios';
import { User } from '../types/User';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Mock data for demo purposes
// In a real application, this would be handled by the Django backend
const MOCK_USERS = [
  {
    id: '1',
    email: 'customer@example.com',
    firstName: 'John',
    lastName: 'Doe',
    accountNumber: 'ACC123456',
    role: 'customer',
    address: '123 Main St, Anytown, US 12345',
    phone: '555-123-4567'
  },
  {
    id: '2',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    accountNumber: 'ADMIN001',
    role: 'admin',
    address: '456 Admin St, Admintown, US 67890',
    phone: '555-987-6543'
  },
  {
    id: '3',
    email: 'support@example.com',
    firstName: 'Support',
    lastName: 'Agent',
    accountNumber: 'SUPPORT001',
    role: 'support',
    address: '789 Support Ave, Supportville, US 54321',
    phone: '555-789-0123'
  }
];

// In a real implementation, these would make actual API calls
export const login = async (email: string, password: string): Promise<User> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock authentication logic
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // In real implementation, this would be an API call:
    // const response = await axios.post(`${API_URL}/auth/login/`, { email, password });
    // return response.data;
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Authentication failed. Please check your credentials.');
  }
};

export const register = async (userData: Partial<User>, password: string): Promise<User> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock registration
    // In real implementation, this would be an API call:
    // const response = await axios.post(`${API_URL}/auth/register/`, { ...userData, password });
    // return response.data;
    
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      email: userData.email || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      accountNumber: `ACC${Math.floor(Math.random() * 1000000)}`,
      role: 'customer',
      address: userData.address || '',
      phone: userData.phone || ''
    };
    
    return newUser;
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Registration failed. Please try again.');
  }
};

export const logout = async (): Promise<void> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real implementation, this would be an API call:
    // await axios.post(`${API_URL}/auth/logout/`);
    
    return;
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Logout failed. Please try again.');
  }
};

export const checkAuth = async (): Promise<User> => {
  try {
    // In real implementation, this would be an API call:
    // const response = await axios.get(`${API_URL}/auth/user/`);
    // return response.data;
    
    throw new Error('Not authenticated');
  } catch (error) {
    console.error('Auth check error:', error);
    throw new Error('Not authenticated');
  }
};