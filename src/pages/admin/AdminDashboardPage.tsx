import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  AlertTriangle, 
  BarChart3, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { getServiceRequests } from '../../api/serviceRequests';
import { ServiceRequest, ServiceRequestStatus } from '../../types/ServiceRequest';
import RequestCard from '../../components/service/RequestCard';
import { motion } from 'framer-motion';

const AdminDashboardPage: React.FC = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getServiceRequests();
        setRequests(data);
      } catch (err) {
        console.error('Failed to fetch requests:', err);
        setError('Failed to load service requests. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRequests();
  }, []);
  
  const stats = {
    totalRequests: requests.length,
    pendingRequests: requests.filter(r => r.status === ServiceRequestStatus.PENDING).length,
    inProgressRequests: requests.filter(r => r.status === ServiceRequestStatus.IN_PROGRESS).length,
    resolvedRequests: requests.filter(r => r.status === ServiceRequestStatus.RESOLVED).length,
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-neutral-600">
          Monitor and manage service requests, customer accounts, and system performance.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          className="card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-full mr-4">
              <FileText className="h-6 w-6 text-primary-700" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Total Requests</p>
              <p className="text-2xl font-semibold">{stats.totalRequests}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center">
            <div className="bg-warning-100 p-3 rounded-full mr-4">
              <Clock className="h-6 w-6 text-warning-700" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Pending</p>
              <p className="text-2xl font-semibold">{stats.pendingRequests}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-full mr-4">
              <TrendingUp className="h-6 w-6 text-primary-700" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">In Progress</p>
              <p className="text-2xl font-semibold">{stats.inProgressRequests}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex items-center">
            <div className="bg-success-100 p-3 rounded-full mr-4">
              <CheckCircle className="h-6 w-6 text-success-700" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Resolved</p>
              <p className="text-2xl font-semibold">{stats.resolvedRequests}</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center p-5 border-b border-neutral-200">
              <h2 className="text-xl font-semibold">Recent Requests</h2>
              <Link to="/admin/requests" className="btn-primary">
                View All
              </Link>
            </div>
            
            <div className="p-5">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
                </div>
              ) : error ? (
                <div className="bg-error-50 border-l-4 border-error-500 text-error-700 p-4 flex items-start">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              ) : requests.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No requests found</h3>
                  <p className="text-neutral-500">There are no service requests to display.</p>
                </div>
              ) : (
                <div>
                  {requests.slice(0, 5).map(request => (
                    <RequestCard key={request.id} request={request} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="card mb-6">
            <div className="p-5 border-b border-neutral-200">
              <h2 className="text-xl font-semibold">Quick Actions</h2>
            </div>
            
            <div className="p-5">
              <div className="space-y-4">
                <Link to="/admin/customers" className="btn-outline w-full flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Manage Customers
                </Link>
                
                <Link to="/admin/requests" className="btn-outline w-full flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  View All Requests
                </Link>
                
                <Link to="/admin/alerts" className="btn-outline w-full flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  System Alerts
                </Link>
                
                <Link to="/admin/analytics" className="btn-outline w-full flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Analytics
                </Link>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="p-5 border-b border-neutral-200">
              <h2 className="text-xl font-semibold">System Status</h2>
            </div>
            
            <div className="p-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-success-500 mr-2" />
                    <span>API Services</span>
                  </div>
                  <span className="text-success-500">Operational</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-success-500 mr-2" />
                    <span>Database</span>
                  </div>
                  <span className="text-success-500">Operational</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <XCircle className="h-5 w-5 text-warning-500 mr-2" />
                    <span>Notification Service</span>
                  </div>
                  <span className="text-warning-500">Degraded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;