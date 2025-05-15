import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, AlertCircle, Clock, User, Phone, Mail, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 -mx-6 px-6 py-16 md:py-24 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to GasConnect
          </motion.h1>
          <motion.p 
            className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your one-stop platform for all gas utility services. Submit requests, track status, and manage your account with ease.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/service-request" className="btn bg-white text-primary-700 hover:bg-neutral-100 px-6 py-3">
              Submit a Request
            </Link>
            <Link to="/knowledge-base" className="btn bg-primary-500 text-white hover:bg-primary-600 px-6 py-3">
              Explore Resources
            </Link>
          </motion.div>
        </div>
      </div>
      
      <div className="py-16 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            GasConnect provides a range of services to help you manage your gas utility needs efficiently and easily.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div 
            className="card p-6 text-center"
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-primary-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Service Requests</h3>
            <p className="text-neutral-600 mb-4">
              Submit new service requests, from gas leaks to billing inquiries, with our easy-to-use form.
            </p>
            <Link to="/service-request" className="text-primary-600 hover:text-primary-700 font-medium">
              Submit a Request →
            </Link>
          </motion.div>
          
          <motion.div 
            className="card p-6 text-center"
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-primary-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Request Tracking</h3>
            <p className="text-neutral-600 mb-4">
              Track the status of your service requests in real-time and view historical requests.
            </p>
            <Link to="/request-history" className="text-primary-600 hover:text-primary-700 font-medium">
              View Request History →
            </Link>
          </motion.div>
          
          <motion.div 
            className="card p-6 text-center"
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-primary-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Account Management</h3>
            <p className="text-neutral-600 mb-4">
              Manage your account details, view billing history, and update your profile.
            </p>
            <Link to="/account" className="text-primary-600 hover:text-primary-700 font-medium">
              Manage Account →
            </Link>
          </motion.div>
        </div>
      </div>
      
      <div className="py-16 bg-neutral-50 -mx-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose GasConnect?</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our platform is designed to provide the best experience for our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-accent-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-7 w-7 text-accent-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Response</h3>
              <p className="text-neutral-600">
                Quick response times to all your service requests.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-accent-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-accent-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-neutral-600">
                Your data is protected with industry-standard security.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-accent-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="h-7 w-7 text-accent-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Emergency</h3>
              <p className="text-neutral-600">
                Round-the-clock support for emergency situations.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-accent-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <User className="h-7 w-7 text-accent-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">User Friendly</h3>
              <p className="text-neutral-600">
                Intuitive interface designed for ease of use.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-16 max-w-6xl mx-auto">
        <div className="bg-primary-50 rounded-lg p-8 md:p-12">
          <div className="md:flex md:items-center md:space-x-8">
            <div className="md:flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-800">Have Questions?</h2>
              <p className="text-primary-700 mb-6">
                Our support team is available to assist you with any questions or concerns you may have about our services.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium text-primary-800">Call Us</p>
                    <p className="text-primary-700">1-800-GAS-CONNECT</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium text-primary-800">Email Us</p>
                    <p className="text-primary-700">support@gasconnect.example.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 md:mt-0 md:flex-1">
              <motion.form 
                className="bg-white p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <div className="space-y-4">
                  <div>
                    <label className="label" htmlFor="name">Name</label>
                    <input type="text" id="name" className="input" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="label" htmlFor="email">Email</label>
                    <input type="email" id="email" className="input" placeholder="Your email" />
                  </div>
                  <div>
                    <label className="label" htmlFor="message">Message</label>
                    <textarea id="message" className="input" rows={3} placeholder="How can we help?"></textarea>
                  </div>
                  <div>
                    <button type="submit" className="btn-primary w-full">
                      Send Message
                    </button>
                  </div>
                </div>
              </motion.form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;