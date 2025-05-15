export enum ServiceRequestType {
  GAS_LEAK = 'gas_leak',
  BILLING_INQUIRY = 'billing_inquiry',
  NEW_SERVICE = 'new_service',
  SERVICE_CHANGE = 'service_change',
  METER_READING = 'meter_reading',
  PAYMENT_ARRANGEMENT = 'payment_arrangement',
  PROPERTY_DAMAGE = 'property_damage',
  EMERGENCY = 'emergency',
  OTHER = 'other'
}

export enum ServiceRequestStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  RESOLVED = 'resolved',
  CLOSED = 'closed'
}

export interface ServiceRequestComment {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
  userName: string;
}

export interface ServiceRequest {
  id: string;
  userId: string;
  type: ServiceRequestType;
  status: ServiceRequestStatus;
  description: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high';
  attachments: string[];
  comments: ServiceRequestComment[];
}