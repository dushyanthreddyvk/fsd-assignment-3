import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './pages.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function MemberDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMemberDetails();
  }, [id]);

  const fetchMemberDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API_URL}/members/${id}`);
      if (response.data.success) {
        setMember(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching member details');
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
        {error && <div className="error">{error}</div>}

        {loading ? (
          <div className="loading">Loading member details...</div>
        ) : member ? (
          <div className="member-details-container">
            <h1>{member.name}</h1>

            <div className="details-content">
              <div className="details-image">
                {member.image ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${member.image}`}
                    alt={member.name}
                  />
                ) : (
                  <div className="no-image-large">No Image</div>
                )}
              </div>

              <div className="details-info">
                <div className="detail-item">
                  <label>Full Name:</label>
                  <p>{member.name}</p>
                </div>

                <div className="detail-item">
                  <label>Role:</label>
                  <p>{member.role}</p>
                </div>

                <div className="detail-item">
                  <label>Register Number:</label>
                  <p>{member.registerNumber}</p>
                </div>

                <div className="detail-item">
                  <label>Email:</label>
                  <p>
                    <a href={`mailto:${member.email}`}>{member.email}</a>
                  </p>
                </div>

                <div className="detail-item">
                  <label>Contact Number:</label>
                  <p>
                    <a href={`tel:${member.contactNumber}`}>{member.contactNumber}</a>
                  </p>
                </div>

                {member.createdAt && (
                  <div className="detail-item">
                    <label>Joined Date:</label>
                    <p>{new Date(member.createdAt).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="btn-group">
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/view-members')}
              >
                ← Back to Members
              </button>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/add-member')}
              >
                ➕ Add Another Member
              </button>
            </div>
          </div>
        ) : (
          <div className="error">Member not found</div>
        )}
      </div>

      <footer className="footer">
        <p>&copy; 2024 Student Team Members Management Application.</p>
      </footer>
    </div>
  );
}

export default MemberDetails;
