import React from 'react';
import ServiceRequestForm from '../components/service/ServiceRequestForm';

const ServiceRequestPage: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Submit a Service Request</h1>
        <p className="text-neutral-600">
          Please fill out the form below with details about your service request. We'll respond as soon as possible.
        </p>
      </div>
      
      <ServiceRequestForm />
    </div>
  );
};

export default ServiceRequestPage;