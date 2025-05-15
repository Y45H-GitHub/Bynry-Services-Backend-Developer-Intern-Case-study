import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  BarChart3, 
  CircleDollarSign,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getServiceRequests } from '../api/serviceRequests';
import { ServiceRequest, ServiceRequestStatus } from '../types/ServiceRequest';
import RequestCard from '../components/service/RequestCard';
import { motion } from 'framer-motion';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getServiceRequests(user?.id);
        setRequests(data);
      } catch (err) {
        console.error('Failed to fetch requests:', err);
        setError('Failed to load service requests. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRequests();
  }, [user?.id]);
  
  const pendingRequests = requests.filter(req => 
    req.status === ServiceRequestStatus.PENDING || 
    req.status === ServiceRequestStatus.IN_PROGRESS
  );
  
  const getRecentActivity = () => {
    // Combine all comments from all requests and sort by date
    const allComments = requests.flatMap(req => 
      req.comments.map(comment => ({
        ...comment,
        requestId: req.id,
        requestType: req.type
      }))
    );
    
    // Sort by date (newest first)
    return allComments.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 5);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-neutral-600">
          Welcome back, {user?.firstName}! Here's an overview of your account and service requests.
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
              <Clock className="h-6 w-6 text-primary-700" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Pending Requests</p>
              <p className="text-2xl font-semibold">{pendingRequests.length}</p>
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
            <div className="bg-success-100 p-3 rounded-full mr-4">
              <CheckCircle className="h-6 w-6 text-success-700" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Resolved Requests</p>
              <p className="text-2xl font-semibold">
                {requests.filter(req => req.status === ServiceRequestStatus.RESOLVED).length}
              </p>
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
            <div className="bg-accent-100 p-3 rounded-full mr-4">
              <CircleDollarSign className="h-6 w-6 text-accent-700" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Current Balance</p>
              <p className="text-2xl font-semibold">$124.50</p>
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
            <div className="bg-secondary-100 p-3 rounded-full mr-4">
              <Calendar className="h-6 w-6 text-secondary-700" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Next Bill Date</p>
              <p className="text-2xl font-semibold">Nov 15</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center p-5 border-b border-neutral-200">
              <h2 className="text-xl font-semibold">Recent Requests</h2>
              <Link to="/service-request" className="btn-primary">
                New Request
              </Link>
            </div>
            
            <div className="p-5">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
                </div>
              ) : error ? (
                <div className="bg-error-50 border-l-4 border-error-500 text-error-700 p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              ) : requests.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No service requests yet</h3>
                  <p className="text-neutral-500 mb-4">You haven't submitted any service requests.</p>
                  <Link to="/service-request" className="btn-primary">
                    Submit your first request
                  </Link>
                </div>
              ) : (
                <div>
                  {pendingRequests.slice(0, 3).map(request => (
                    <RequestCard key={request.id} request={request} />
                  ))}
                  
                  {pendingRequests.length === 0 && (
                    <div className="text-center py-4">
                      <CheckCircle className="h-10 w-10 mx-auto text-success-500 mb-2" />
                      <p className="text-neutral-600">No pending requests</p>
                    </div>
                  )}
                  
                  <div className="text-center mt-4">
                    <Link to="/request-history" className="text-primary-600 hover:text-primary-700 font-medium">
                      View all requests →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="card mb-6">
            <div className="p-5 border-b border-neutral-200">
              <h2 className="text-xl font-semibold">Account Summary</h2>
            </div>
            
            <div className="p-5">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-neutral-500">Account Number</p>
                  <p className="font-medium">{user?.accountNumber || 'N/A'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-neutral-500">Service Address</p>
                  <p className="font-medium">{user?.address || 'N/A'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-neutral-500">Current Plan</p>
                  <p className="font-medium">Standard Residential</p>
                </div>
                
                <div>
                  <p className="text-sm text-neutral-500">Last Payment</p>
                  <div className="flex justify-between">
                    <p className="font-medium">$118.75</p>
                    <p className="text-sm text-neutral-500">Oct 15, 2023</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <Link to="/account" className="text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center">
                  Manage Account →
                </Link>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="p-5 border-b border-neutral-200">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
            </div>
            
            <div className="p-5">
              {getRecentActivity().length > 0 ? (
                <div className="space-y-4">
                  {getRecentActivity().map(activity => (
                    <div key={activity.id} className="flex items-start">
                      <div className="bg-neutral-100 p-1.5 rounded-full mr-3 mt-0.5">
                        <AlertTriangle className="h-4 w-4 text-neutral-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.text}</p>
                        <p className="text-xs text-neutral-500 mt-1">
                          {new Date(activity.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Clock className="h-10 w-10 mx-auto text-neutral-400 mb-2" />
                  <p className="text-neutral-600">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;