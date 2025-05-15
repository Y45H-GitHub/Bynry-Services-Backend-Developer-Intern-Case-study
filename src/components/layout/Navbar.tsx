import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, User, LogOut, Menu as MenuIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const navigate = useNavigate();
  
  const userMenuRef = React.useRef<HTMLDivElement>(null);
  const notificationsRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-neutral-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {isAuthenticated && (
              <button
                type="button"
                className="p-2 rounded-md text-neutral-500 lg:hidden"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuIcon className="h-6 w-6" />
              </button>
            )}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="flex items-center text-primary-700">
                <Menu className="h-8 w-8 mr-2" />
                <span className="font-semibold text-xl">GasConnect</span>
              </div>
            </Link>
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 py-1.5 pr-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
                />
              </div>
              
              <div className="relative" ref={notificationsRef}>
                <button
                  type="button"
                  className="p-1 rounded-full text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                >
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-error-500 ring-2 ring-white"></span>
                </button>
                
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-neutral-200">
                    <div className="px-4 py-2 font-medium border-b border-neutral-200">Notifications</div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-neutral-50 border-b border-neutral-100">
                        <p className="text-sm font-medium">Your service request #1234 has been updated</p>
                        <p className="text-xs text-neutral-500 mt-1">3 hours ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-neutral-50 border-b border-neutral-100">
                        <p className="text-sm font-medium">Payment confirmation</p>
                        <p className="text-xs text-neutral-500 mt-1">Yesterday</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-neutral-50">
                        <p className="text-sm font-medium">System maintenance scheduled</p>
                        <p className="text-xs text-neutral-500 mt-1">Oct 20, 2023</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 text-center border-t border-neutral-200">
                      <Link to="#" className="text-sm text-primary-600 hover:text-primary-700">View all notifications</Link>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  className="flex items-center gap-2 p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                    {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm font-medium truncate hidden sm:block">
                    {user?.firstName} {user?.lastName}
                  </span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 py-1 border border-neutral-200">
                    <div className="px-4 py-3 border-b border-neutral-200">
                      <p className="text-sm">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-neutral-500 mt-1 truncate">{user?.email}</p>
                    </div>
                    
                    <Link
                      to="/account"
                      className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-3 text-neutral-500" />
                      Account
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    >
                      <LogOut className="h-4 w-4 mr-3 text-neutral-500" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="btn-ghost">
                Sign in
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;