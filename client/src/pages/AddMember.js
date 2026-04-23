import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './pages.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function AddMember() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    registerNumber: '',
    email: '',
    contactNumber: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Full name is required';
    if (!formData.role.trim()) return 'Role is required';
    if (!formData.registerNumber.trim()) return 'Register number is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email format';
    if (!formData.contactNumber.trim()) return 'Contact number is required';
    if (!/^\d{10}$/.test(formData.contactNumber)) return 'Contact number must be 10 digits';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('role', formData.role);
      data.append('registerNumber', formData.registerNumber);
      data.append('email', formData.email);
      data.append('contactNumber', formData.contactNumber);
      if (image) {
        data.append('image', image);
      }

      const response = await axios.post(`${API_URL}/members`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSuccess('Member added successfully!');
        setFormData({
          name: '',
          role: '',
          registerNumber: '',
          email: '',
          contactNumber: '',
        });
        setImage(null);
        setPreview(null);
        setTimeout(() => {
          navigate('/view-members');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-title">Student Team Members Management</div>
          <div className="nav-links">
            <a onClick={() => navigate('/')}>Home</a>
            <a onClick={() => navigate('/view-members')}>View Members</a>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="form-container">
          <h1>Add New Team Member</h1>

          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role *</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="e.g., Frontend Developer, Designer"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="registerNumber">Register Number *</label>
              <input
                type="text"
                id="registerNumber"
                name="registerNumber"
                value={formData.registerNumber}
                onChange={handleInputChange}
                placeholder="e.g., REG001"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number *</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="10-digit phone number"
                maxLength="10"
                pattern="[0-9]{10}"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Profile Image</label>
              <div className="image-upload">
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {preview && (
                  <div className="image-preview">
                    <img src={preview} alt="Preview" />
                  </div>
                )}
              </div>
            </div>

            <div className="btn-group">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add Member'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/view-members')}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2024 Student Team Members Management Application.</p>
      </footer>
    </div>
  );
}

export default AddMember;
