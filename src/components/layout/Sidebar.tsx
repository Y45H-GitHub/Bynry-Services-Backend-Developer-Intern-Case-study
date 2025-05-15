import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Clock, 
  User, 
  Settings, 
  HelpCircle, 
  BarChart,
  Users,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  const { isAdmin } = useAuth();
  
  const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
      isActive 
        ? 'bg-primary-50 text-primary-700' 
        : 'text-neutral-700 hover:bg-neutral-100'
    }`;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-neutral-200 lg:hidden">
        <button
          type="button"
          className="text-neutral-500 hover:text-neutral-700"
          onClick={closeSidebar}
        >
          <span className="sr-only">Close sidebar</span>
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          <NavLink to="/dashboard" className={navLinkClasses} onClick={closeSidebar}>
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </NavLink>
          
          <NavLink to="/service-request" className={navLinkClasses} onClick={closeSidebar}>
            <FileText className="mr-3 h-5 w-5" />
            New Service Request
          </NavLink>
          
          <NavLink to="/request-history" className={navLinkClasses} onClick={closeSidebar}>
            <Clock className="mr-3 h-5 w-5" />
            Request History
          </NavLink>
          
          <NavLink to="/account" className={navLinkClasses} onClick={closeSidebar}>
            <User className="mr-3 h-5 w-5" />
            My Account
          </NavLink>
          
          <NavLink to="/knowledge-base" className={navLinkClasses} onClick={closeSidebar}>
            <HelpCircle className="mr-3 h-5 w-5" />
            Knowledge Base
          </NavLink>
          
          {isAdmin && (
            <>
              <div className="pt-4 pb-2">
                <p className="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Admin
                </p>
              </div>
              
              <NavLink to="/admin/dashboard" className={navLinkClasses} onClick={closeSidebar}>
                <BarChart className="mr-3 h-5 w-5" />
                Admin Dashboard
              </NavLink>
              
              <NavLink to="/admin/customers" className={navLinkClasses} onClick={closeSidebar}>
                <Users className="mr-3 h-5 w-5" />
                Manage Customers
              </NavLink>
              
              <NavLink to="/admin/requests" className={navLinkClasses} onClick={closeSidebar}>
                <MessageSquare className="mr-3 h-5 w-5" />
                Service Requests
              </NavLink>
              
              <NavLink to="/admin/alerts" className={navLinkClasses} onClick={closeSidebar}>
                <AlertTriangle className="mr-3 h-5 w-5" />
                System Alerts
              </NavLink>
              
              <NavLink to="/admin/settings" className={navLinkClasses} onClick={closeSidebar}>
                <Settings className="mr-3 h-5 w-5" />
                System Settings
              </NavLink>
            </>
          )}
        </nav>
      </div>
      
      <div className="p-4 border-t border-neutral-200">
        <div className="bg-primary-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-primary-800">Need help?</h3>
          <p className="mt-1 text-xs text-primary-700">
            Contact our support team for assistance.
          </p>
          <button className="mt-3 text-xs flex items-center text-primary-700 hover:text-primary-800 font-medium">
            <HelpCircle className="h-4 w-4 mr-1" /> Get Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;