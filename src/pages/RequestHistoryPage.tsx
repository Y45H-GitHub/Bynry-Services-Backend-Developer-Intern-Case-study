import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, AlertCircle, Search, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getServiceRequests } from '../api/serviceRequests';
import { ServiceRequest, ServiceRequestStatus, ServiceRequestType } from '../types/ServiceRequest';
import RequestCard from '../components/service/RequestCard';
import { motion, AnimatePresence } from 'framer-motion';

const RequestHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    // Check for success message from navigation state
    if (location.state?.success) {
      setShowSuccessMessage(true);
      setSuccessMessage(location.state.message);
      
      // Clear message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state]);
  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getServiceRequests(user?.id);
        setRequests(data);
        setFilteredRequests(data);
      } catch (err) {
        console.error('Failed to fetch requests:', err);
        setError('Failed to load service requests. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRequests();
  }, [user?.id]);
  
  useEffect(() => {
    // Apply filters
    let result = [...requests];
    
    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(req => req.status === statusFilter);
    }
    
    // Type filter
    if (typeFilter !== 'all') {
      result = result.filter(req => req.type === typeFilter);
    }
    
    // Search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(req => 
        req.description.toLowerCase().includes(term) || 
        req.id.toLowerCase().includes(term) ||
        req.address.toLowerCase().includes(term)
      );
    }
    
    setFilteredRequests(result);
  }, [requests, statusFilter, typeFilter, searchTerm]);
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Request History</h1>
        <p className="text-neutral-600">
          View and track all your service requests in one place.
        </p>
      </div>
      
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div 
            className="mb-6 p-4 bg-success-50 border-l-4 border-success-500 text-success-700 flex items-start"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p>{successMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="card mb-6">
        <div className="p-5 border-b border-neutral-200">
          <h2 className="text-xl font-semibold">Filters</h2>
        </div>
        
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label" htmlFor="search">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="search"
                  type="text"
                  className="pl-10 input"
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="label" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                className="select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value={ServiceRequestStatus.PENDING}>Pending</option>
                <option value={ServiceRequestStatus.IN_PROGRESS}>In Progress</option>
                <option value={ServiceRequestStatus.ON_HOLD}>On Hold</option>
                <option value={ServiceRequestStatus.RESOLVED}>Resolved</option>
                <option value={ServiceRequestStatus.CLOSED}>Closed</option>
              </select>
            </div>
            
            <div>
              <label className="label" htmlFor="type">
                Request Type
              </label>
              <select
                id="type"
                className="select"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value={ServiceRequestType.GAS_LEAK}>Gas Leak</option>
                <option value={ServiceRequestType.BILLING_INQUIRY}>Billing Inquiry</option>
                <option value={ServiceRequestType.NEW_SERVICE}>New Service</option>
                <option value={ServiceRequestType.SERVICE_CHANGE}>Service Change</option>
                <option value={ServiceRequestType.METER_READING}>Meter Reading</option>
                <option value={ServiceRequestType.PAYMENT_ARRANGEMENT}>Payment Arrangement</option>
                <option value={ServiceRequestType.PROPERTY_DAMAGE}>Property Damage</option>
                <option value={ServiceRequestType.EMERGENCY}>Emergency</option>
                <option value={ServiceRequestType.OTHER}>Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="p-5 border-b border-neutral-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Requests</h2>
            <span className="badge bg-neutral-100 text-neutral-800">{filteredRequests.length} requests</span>
          </div>
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
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-8">
              <Filter className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No requests found</h3>
              <p className="text-neutral-500">
                {requests.length === 0 
                  ? "You haven't submitted any service requests yet."
                  : "No requests match your current filters."}
              </p>
            </div>
          ) : (
            <div>
              {filteredRequests.map(request => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestHistoryPage;