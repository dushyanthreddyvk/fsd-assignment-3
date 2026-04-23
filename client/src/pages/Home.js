import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-title">Student Team Members Management</div>
        </div>
      </nav>

      <div className="container">
        <div className="home-content">
          <h1 className="home-title">Welcome to Team Management System</h1>
          <p className="home-subtitle">Manage your team members efficiently</p>

          <div className="team-info">
            <h2>Our Development Team</h2>
            <p>This application helps manage student team members' information including their roles, contact details, and profile pictures.</p>
          </div>

          <div className="btn-group">
            <button
              className="btn btn-primary btn-large"
              onClick={() => navigate('/add-member')}
            >
              ➕ Add Member
            </button>
            <button
              className="btn btn-primary btn-large"
              onClick={() => navigate('/view-members')}
            >
              👥 View Members
            </button>
          </div>

          <div className="features">
            <h3>Features</h3>
            <ul>
              <li>✓ Add new team members with profile pictures</li>
              <li>✓ View all team members in a card layout</li>
              <li>✓ View detailed information about each member</li>
              <li>✓ Search and filter members</li>
              <li>✓ Secure image upload</li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2024 Student Team Members Management Application. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
