import React from 'react';
import { 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  AlertTriangle, 
  Hourglass, 
  PauseCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { format } from 'date-fns';
import { ServiceRequest, ServiceRequestStatus, ServiceRequestType } from '../../types/ServiceRequest';
import { motion, AnimatePresence } from 'framer-motion';

interface RequestCardProps {
  request: ServiceRequest;
  onClick?: () => void;
  expanded?: boolean;
}

const getStatusIcon = (status: ServiceRequestStatus) => {
  switch (status) {
    case ServiceRequestStatus.PENDING:
      return <Hourglass className="h-5 w-5" />;
    case ServiceRequestStatus.IN_PROGRESS:
      return <Clock className="h-5 w-5" />;
    case ServiceRequestStatus.ON_HOLD:
      return <PauseCircle className="h-5 w-5" />;
    case ServiceRequestStatus.RESOLVED:
      return <CheckCircle className="h-5 w-5" />;
    case ServiceRequestStatus.CLOSED:
      return <CheckCircle className="h-5 w-5" />;
    default:
      return <AlertCircle className="h-5 w-5" />;
  }
};

const getStatusColor = (status: ServiceRequestStatus) => {
  switch (status) {
    case ServiceRequestStatus.PENDING:
      return 'bg-warning-100 text-warning-700';
    case ServiceRequestStatus.IN_PROGRESS:
      return 'bg-primary-100 text-primary-700';
    case ServiceRequestStatus.ON_HOLD:
      return 'bg-neutral-100 text-neutral-700';
    case ServiceRequestStatus.RESOLVED:
      return 'bg-success-100 text-success-700';
    case ServiceRequestStatus.CLOSED:
      return 'bg-neutral-100 text-neutral-700';
    default:
      return 'bg-neutral-100 text-neutral-700';
  }
};

const getTypeLabel = (type: ServiceRequestType) => {
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <span className="badge bg-error-100 text-error-700">High</span>;
    case 'medium':
      return <span className="badge bg-warning-100 text-warning-700">Medium</span>;
    case 'low':
      return <span className="badge bg-neutral-100 text-neutral-700">Low</span>;
    default:
      return null;
  }
};

const RequestCard: React.FC<RequestCardProps> = ({ request, onClick, expanded = false }) => {
  const [isExpanded, setIsExpanded] = React.useState(expanded);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (onClick) onClick();
  };
  
  return (
    <motion.div
      layout
      className="card card-hover mb-4 overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="px-6 py-4 cursor-pointer flex items-center justify-between"
        onClick={toggleExpand}
      >
        <div className="flex items-center">
          <div className={`p-2 rounded-full mr-4 ${getStatusColor(request.status)}`}>
            {getStatusIcon(request.status)}
          </div>
          <div>
            <h3 className="font-medium">
              {getTypeLabel(request.type)}
            </h3>
            <div className="flex items-center text-sm text-neutral-500 mt-1">
              <span>
                {format(new Date(request.createdAt), 'MMM d, yyyy')}
              </span>
              <span className="mx-2">•</span>
              <span className="capitalize">{request.status.replace('_', ' ')}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          {getPriorityBadge(request.priority)}
          <button className="ml-4 p-1 text-neutral-500 hover:text-neutral-700">
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 py-3 border-t border-neutral-200">
              <div className="text-sm leading-relaxed">
                <p className="font-medium mb-2">Description:</p>
                <p className="text-neutral-700 mb-4">{request.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-medium mb-1">Service Address:</p>
                    <p className="text-neutral-700">{request.address}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-1">Request ID:</p>
                    <p className="text-neutral-700">{request.id}</p>
                  </div>
                </div>
                
                {request.assignedTo && (
                  <div className="mb-4">
                    <p className="font-medium mb-1">Assigned To:</p>
                    <p className="text-neutral-700">{request.assignedTo}</p>
                  </div>
                )}
                
                {request.attachments.length > 0 && (
                  <div className="mb-4">
                    <p className="font-medium mb-1">Attachments:</p>
                    <div className="flex flex-wrap gap-2">
                      {request.attachments.map((attachment, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                          {attachment}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {request.comments.length > 0 && (
                  <div>
                    <p className="font-medium mb-2">Activity:</p>
                    <div className="space-y-3">
                      {request.comments.map((comment) => (
                        <div key={comment.id} className="bg-neutral-50 p-3 rounded">
                          <div className="flex justify-between text-xs text-neutral-500 mb-1">
                            <span>{comment.userName}</span>
                            <span>{format(new Date(comment.createdAt), 'MMM d, yyyy h:mm a')}</span>
                          </div>
                          <p className="text-neutral-700">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RequestCard;