import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-neutral-50">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-center mb-6">
          <div className="bg-warning-100 p-4 rounded-full">
            <AlertTriangle className="h-12 w-12 text-warning-700" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          404 - Page Not Found
        </h1>
        
        <p className="text-lg text-neutral-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        
        <Link 
          to="/"
          className="btn-primary inline-flex items-center"
        >
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;