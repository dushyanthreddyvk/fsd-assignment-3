import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddMember from './pages/AddMember';
import ViewMembers from './pages/ViewMembers';
import MemberDetails from './pages/MemberDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-member" element={<AddMember />} />
          <Route path="/view-members" element={<ViewMembers />} />
          <Route path="/member/:id" element={<MemberDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
