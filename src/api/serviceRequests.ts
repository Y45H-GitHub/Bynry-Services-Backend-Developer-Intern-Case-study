import axios from 'axios';
import { ServiceRequest, ServiceRequestStatus, ServiceRequestType } from '../types/ServiceRequest';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Mock data for demo purposes
// In a real application, this would be handled by the Django backend
let MOCK_SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: '1',
    userId: '1',
    type: ServiceRequestType.GAS_LEAK,
    status: ServiceRequestStatus.IN_PROGRESS,
    description: 'I smell gas in my basement near the water heater.',
    address: '123 Main St, Anytown, US 12345',
    createdAt: new Date('2023-10-15T10:30:00'),
    updatedAt: new Date('2023-10-15T14:20:00'),
    assignedTo: 'Emma Thompson',
    priority: 'high',
    attachments: [],
    comments: [
      {
        id: '101',
        userId: '3',
        text: 'Technician has been dispatched. ETA 30 minutes.',
        createdAt: new Date('2023-10-15T11:00:00'),
        userName: 'Support Agent'
      }
    ]
  },
  {
    id: '2',
    userId: '1',
    type: ServiceRequestType.BILLING_INQUIRY,
    status: ServiceRequestStatus.RESOLVED,
    description: 'My bill seems too high for this month. Can someone review it?',
    address: '123 Main St, Anytown, US 12345',
    createdAt: new Date('2023-10-10T09:15:00'),
    updatedAt: new Date('2023-10-11T16:45:00'),
    resolvedAt: new Date('2023-10-11T16:45:00'),
    assignedTo: 'James Wilson',
    priority: 'medium',
    attachments: ['bill-october.pdf'],
    comments: [
      {
        id: '102',
        userId: '3',
        text: 'Reviewing your account history now.',
        createdAt: new Date('2023-10-10T11:20:00'),
        userName: 'Support Agent'
      },
      {
        id: '103',
        userId: '3',
        text: 'We found an error in the meter reading. Your bill has been corrected.',
        createdAt: new Date('2023-10-11T16:40:00'),
        userName: 'Support Agent'
      }
    ]
  },
  {
    id: '3',
    userId: '1',
    type: ServiceRequestType.NEW_SERVICE,
    status: ServiceRequestStatus.PENDING,
    description: 'I would like to set up gas service at my new home.',
    address: '456 Park Ave, Anytown, US 12345',
    createdAt: new Date('2023-10-18T14:00:00'),
    updatedAt: new Date('2023-10-18T14:00:00'),
    priority: 'low',
    attachments: [],
    comments: []
  }
];

export const getServiceRequests = async (userId?: string): Promise<ServiceRequest[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In real implementation, this would be an API call:
    // const response = await axios.get(`${API_URL}/service-requests/`, { params: { userId } });
    // return response.data;
    
    if (userId) {
      return MOCK_SERVICE_REQUESTS.filter(request => request.userId === userId);
    }
    
    return MOCK_SERVICE_REQUESTS;
  } catch (error) {
    console.error('Get service requests error:', error);
    throw new Error('Failed to fetch service requests.');
  }
};

export const getServiceRequestById = async (id: string): Promise<ServiceRequest> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real implementation, this would be an API call:
    // const response = await axios.get(`${API_URL}/service-requests/${id}/`);
    // return response.data;
    
    const request = MOCK_SERVICE_REQUESTS.find(req => req.id === id);
    
    if (!request) {
      throw new Error('Service request not found');
    }
    
    return request;
  } catch (error) {
    console.error('Get service request error:', error);
    throw new Error('Failed to fetch service request details.');
  }
};

export const createServiceRequest = async (requestData: Partial<ServiceRequest>): Promise<ServiceRequest> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real implementation, this would be an API call:
    // const response = await axios.post(`${API_URL}/service-requests/`, requestData);
    // return response.data;
    
    const newRequest: ServiceRequest = {
      id: Math.random().toString(36).substring(2, 9),
      userId: requestData.userId || '',
      type: requestData.type || ServiceRequestType.OTHER,
      status: ServiceRequestStatus.PENDING,
      description: requestData.description || '',
      address: requestData.address || '',
      createdAt: new Date(),
      updatedAt: new Date(),
      priority: requestData.priority || 'medium',
      attachments: requestData.attachments || [],
      comments: []
    };
    
    MOCK_SERVICE_REQUESTS = [newRequest, ...MOCK_SERVICE_REQUESTS];
    
    return newRequest;
  } catch (error) {
    console.error('Create service request error:', error);
    throw new Error('Failed to create service request.');
  }
};

export const updateServiceRequest = async (id: string, updateData: Partial<ServiceRequest>): Promise<ServiceRequest> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In real implementation, this would be an API call:
    // const response = await axios.patch(`${API_URL}/service-requests/${id}/`, updateData);
    // return response.data;
    
    const index = MOCK_SERVICE_REQUESTS.findIndex(req => req.id === id);
    
    if (index === -1) {
      throw new Error('Service request not found');
    }
    
    const updatedRequest = {
      ...MOCK_SERVICE_REQUESTS[index],
      ...updateData,
      updatedAt: new Date()
    };
    
    if (updateData.status === ServiceRequestStatus.RESOLVED && !updatedRequest.resolvedAt) {
      updatedRequest.resolvedAt = new Date();
    }
    
    MOCK_SERVICE_REQUESTS[index] = updatedRequest;
    
    return updatedRequest;
  } catch (error) {
    console.error('Update service request error:', error);
    throw new Error('Failed to update service request.');
  }
};

export const addCommentToServiceRequest = async (
  requestId: string, 
  comment: {userId: string; text: string; userName: string}
): Promise<ServiceRequest> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real implementation, this would be an API call:
    // const response = await axios.post(`${API_URL}/service-requests/${requestId}/comments/`, comment);
    // return response.data;
    
    const index = MOCK_SERVICE_REQUESTS.findIndex(req => req.id === requestId);
    
    if (index === -1) {
      throw new Error('Service request not found');
    }
    
    const newComment = {
      id: Math.random().toString(36).substring(2, 9),
      userId: comment.userId,
      text: comment.text,
      createdAt: new Date(),
      userName: comment.userName
    };
    
    MOCK_SERVICE_REQUESTS[index] = {
      ...MOCK_SERVICE_REQUESTS[index],
      comments: [...MOCK_SERVICE_REQUESTS[index].comments, newComment],
      updatedAt: new Date()
    };
    
    return MOCK_SERVICE_REQUESTS[index];
  } catch (error) {
    console.error('Add comment error:', error);
    throw new Error('Failed to add comment.');
  }
};