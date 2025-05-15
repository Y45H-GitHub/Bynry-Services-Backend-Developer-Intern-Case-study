import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {isAuthenticated && (
        <>
          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-20 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}
          
          {/* Sidebar */}
          <motion.div
            className={`fixed top-0 bottom-0 left-0 z-30 w-64 bg-white border-r border-neutral-200 lg:static lg:z-auto transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
            initial={false}
          >
            <Sidebar closeSidebar={() => setSidebarOpen(false)} />
          </motion.div>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="animate-fade-in"
          >
            <Outlet />
          </motion.div>
        </main>
        
        <footer className="py-4 px-6 bg-white border-t border-neutral-200 text-sm text-neutral-500 text-center">
          <p>&copy; {new Date().getFullYear()} GasConnect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;