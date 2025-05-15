import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Upload } from 'lucide-react';
import { ServiceRequestType } from '../../types/ServiceRequest';
import { useAuth } from '../../contexts/AuthContext';
import { createServiceRequest } from '../../api/serviceRequests';
import { motion } from 'framer-motion';

interface FormValues {
  type: ServiceRequestType;
  description: string;
  address: string;
  priority: 'low' | 'medium' | 'high';
}

const ServiceRequestForm: React.FC = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      type: ServiceRequestType.OTHER,
      description: '',
      address: user?.address || '',
      priority: 'medium'
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const fileNames = files.map(file => file.name);
      
      await createServiceRequest({
        userId: user?.id || '',
        type: data.type,
        description: data.description,
        address: data.address,
        priority: data.priority,
        attachments: fileNames
      });
      
      navigate('/request-history', { 
        state: { 
          success: true, 
          message: 'Service request submitted successfully' 
        } 
      });
    } catch (err) {
      setError('Failed to submit service request. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card p-6"
    >
      <h2 className="text-2xl font-semibold mb-6">Submit a Service Request</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-error-50 border-l-4 border-error-500 text-error-700 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="label" htmlFor="type">
            Type of Service Request
          </label>
          <select
            id="type"
            className="select"
            {...register('type', { required: 'Please select a request type' })}
          >
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
          {errors.type && (
            <p className="mt-1 text-sm text-error-600">{errors.type.message}</p>
          )}
        </div>
        
        <div>
          <label className="label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="input"
            placeholder="Please describe your request in detail"
            {...register('description', { 
              required: 'Description is required',
              minLength: {
                value: 10,
                message: 'Description must be at least 10 characters'
              }
            })}
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-error-600">{errors.description.message}</p>
          )}
        </div>
        
        <div>
          <label className="label" htmlFor="address">
            Service Address
          </label>
          <input
            id="address"
            type="text"
            className="input"
            placeholder="Enter the address for this service request"
            {...register('address', { required: 'Address is required' })}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-error-600">{errors.address.message}</p>
          )}
        </div>
        
        <div>
          <label className="label" htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            className="select"
            {...register('priority')}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div>
          <label className="label" htmlFor="attachments">
            Attachments (Optional)
          </label>
          <div className="border-2 border-dashed border-neutral-300 rounded-md p-4 text-center hover:border-primary-400 transition-colors">
            <input
              id="attachments"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="attachments" className="flex flex-col items-center cursor-pointer">
              <Upload className="h-6 w-6 text-neutral-500 mb-2" />
              <span className="text-sm font-medium text-neutral-700">
                Click to upload files
              </span>
              <span className="text-xs text-neutral-500 mt-1">
                (PDF, JPG, PNG - Max 5MB each)
              </span>
            </label>
          </div>
          
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-neutral-700">Uploaded files:</p>
              <ul className="text-sm">
                {files.map((file, index) => (
                  <li key={index} className="flex justify-between p-2 bg-neutral-50 rounded">
                    <span className="truncate">{file.name}</span>
                    <button
                      type="button"
                      className="text-neutral-500 hover:text-error-500"
                      onClick={() => removeFile(index)}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex justify-end pt-4">
          <button
            type="button"
            className="btn-outline mr-4"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                Submitting...
              </>
            ) : 'Submit Request'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ServiceRequestForm;