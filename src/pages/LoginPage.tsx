import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AlertCircle, User, Lock, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
  
  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="bg-white border-b border-neutral-200 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="flex items-center text-primary-700">
            <Menu className="h-8 w-8 mr-2" />
            <span className="font-semibold text-xl">GasConnect</span>
          </Link>
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Sign In</h1>
              <p className="text-neutral-600 mt-2">
                Sign in to access your account
              </p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-error-50 border-l-4 border-error-500 text-error-700 flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="label" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="pl-10 input"
                    placeholder="Enter your email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                  <Link to="#" className="text-sm text-primary-600 hover:text-primary-800">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="pl-10 input"
                    placeholder="Enter your password"
                    {...register('password', { required: 'Password is required' })}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-error-600">{errors.password.message}</p>
                )}
              </div>
              
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                  Remember me
                </label>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="btn-primary w-full py-2.5"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                      Signing in...
                    </>
                  ) : 'Sign In'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-neutral-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-800 font-medium">
                Sign up
              </Link>
            </p>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-neutral-500">
              For demo purposes, use these accounts:
            </p>
            <div className="mt-2 text-xs text-neutral-500 space-y-1">
              <p>Customer: customer@example.com (any password)</p>
              <p>Admin: admin@example.com (any password)</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <footer className="py-4 bg-white border-t border-neutral-200 text-sm text-neutral-500 text-center">
        <p>&copy; {new Date().getFullYear()} GasConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;