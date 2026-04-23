import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './pages.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function ViewMembers() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API_URL}/members`);
      if (response.data.success) {
        setMembers(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching members');
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.registerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-title">Student Team Members Management</div>
          <div className="nav-links">
            <a onClick={() => navigate('/')}>Home</a>
            <a onClick={() => navigate('/add-member')}>Add Member</a>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="view-members-container">
          <h1>Team Members</h1>

          {error && <div className="error">{error}</div>}

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name, register number, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={() => navigate('/add-member')}>
            ➕ Add New Member
          </button>

          {loading ? (
            <div className="loading">Loading members...</div>
          ) : filteredMembers.length === 0 ? (
            <div className="no-members">
              <p>No members found. {members.length === 0 && 'Start by adding a team member!'}</p>
              <button className="btn btn-primary" onClick={() => navigate('/add-member')}>
                Add First Member
              </button>
            </div>
          ) : (
            <div className="members-grid">
              {filteredMembers.map((member) => (
                <div key={member._id} className="member-card">
                  <div className="card-image">
                    {member.image ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${member.image}`}
                        alt={member.name}
                      />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </div>
                  <div className="card-content">
                    <h2>{member.name}</h2>
                    <p className="role">{member.role}</p>
                    <p className="register-number">Reg: {member.registerNumber}</p>
                  </div>
                  <button
                    className="btn btn-primary btn-small"
                    onClick={() => navigate(`/member/${member._id}`)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2024 Student Team Members Management Application.</p>
      </footer>
    </div>
  );
}

export default ViewMembers;
