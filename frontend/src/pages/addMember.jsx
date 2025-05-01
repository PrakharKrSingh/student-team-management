import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaUpload, FaSpinner } from 'react-icons/fa';
import { memberService } from '../services/api';

const AddMemberPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phoneNumber: '',
    additionalInfo: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    // Clear error when field is updated
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setProfileImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (formData.phoneNumber && !/^\+?[\d\s-()]{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare data with the profile image if available
      const submitData = {
        ...formData,
        profileImage: profileImage || undefined,
      };
      
      // Call the API service
      await memberService.createMember(submitData);
      
      toast.success('Team member added successfully!');
      navigate('/members');
    } catch (error) {
      console.error('Error adding team member:', error);
      toast.error('Failed to add team member. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container fade-in" style={{ padding: '60px 20px' }}>
      <h1 className="section-title">Add New Team Member</h1>
      
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2" style={{ gap: '30px' }}>
            {/* Image Upload Column */}
            <div>
              <div className="form-group" style={{ textAlign: 'center' }}>
                <label className="form-label">Profile Photo</label>
                <div 
                  style={{ 
                    width: '200px', 
                    height: '200px', 
                    margin: '0 auto 20px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px dashed #ccc',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    background: '#f8f9fa'
                  }}
                >
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Profile preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <FaUser size={50} color="#adb5bd" />
                  )}
                </div>
                
                <label 
                  htmlFor="profileImage" 
                  className="button"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                >
                  <FaUpload /> Upload Photo
                </label>
                <input 
                  type="file" 
                  id="profileImage" 
                  onChange={handleImageChange} 
                  accept="image/*"
                  style={{ display: 'none' }} 
                />
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-color)', marginTop: '10px' }}>
                  Recommended: Square image, max 5MB
                </p>
              </div>
            </div>
            
            {/* Form Fields Column */}
            <div>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                />
                {errors.name && <p style={{ color: 'var(--danger-color)', fontSize: '0.9rem', marginTop: '5px' }}>{errors.name}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="role" className="form-label">Role*</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. Front-end Developer"
                />
                {errors.role && <p style={{ color: 'var(--danger-color)', fontSize: '0.9rem', marginTop: '5px' }}>{errors.role}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john.doe@example.com"
                />
                {errors.email && <p style={{ color: 'var(--danger-color)', fontSize: '0.9rem', marginTop: '5px' }}>{errors.email}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="form-control"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="e.g. +1 (555) 123-4567"
                />
                {errors.phoneNumber && <p style={{ color: 'var(--danger-color)', fontSize: '0.9rem', marginTop: '5px' }}>{errors.phoneNumber}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="additionalInfo" className="form-label">Additional Information</label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  className="form-control"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Add any additional details about this team member"
                ></textarea>
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button 
              type="submit" 
              className="button" 
              style={{ padding: '12px 40px', fontSize: '1.1rem' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="fa-spin" style={{ marginRight: '8px' }} /> Adding Member...
                </>
              ) : (
                'Add Member'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberPage;