import React, { useState } from 'react';
import axios from 'axios';
import '../styles/EnquiryForm.css';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

function EnquiryForm({ product, onClose }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ success: null, message: '' });

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (!formData.message) newErrors.message = 'Message is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error message when user starts typing
    if (errors[name]) {
        setErrors(prev => ({...prev, [name]: ''}));
    }
    // Clear status message
    setStatus({ success: null, message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus({ success: false, message: 'Please correct the highlighted errors.' });
      return;
    }

    setStatus({ success: null, message: 'Submitting enquiry...' });
    try {
      const payload = { ...formData, product_id: product.id };
      await axios.post('/api/enquiries', payload);
      
      setStatus({ success: true, message: 'Enquiry submitted successfully! We will contact you shortly.' });
      setFormData(initialFormState); // Reset form
      setTimeout(onClose, 3000); // Close modal after success message
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Submission failed. Please try again.';
      setStatus({ success: false, message: errorMessage });
      console.error('Enquiry error:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close enquiry form">&times;</button>
        <h3>Enquire about: **{product.name}**</h3>
        
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="name">Name (Required)</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className={errors.name ? 'input-error' : ''}
              aria-required="true"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email (Required)</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className={errors.email ? 'input-error' : ''}
              aria-required="true"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone (Optional)</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message (Required)</label>
            <textarea 
              id="message" 
              name="message" 
              rows="4" 
              value={formData.message} 
              onChange={handleChange} 
              className={errors.message ? 'input-error' : ''}
              aria-required="true"
            ></textarea>
            {errors.message && <p className="error-text">{errors.message}</p>}
          </div>

          {status.message && (
            <p className={`status-message ${status.success === true ? 'success' : status.success === false ? 'failure' : 'pending'}`}>
              {status.message}
            </p>
          )}

          <button type="submit" className="submit-btn" disabled={status.success === null && status.message.includes('Submitting')}>
            Submit Enquiry
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnquiryForm;