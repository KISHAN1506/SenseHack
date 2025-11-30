import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HackathonDetails from './pages/HackathonDetails';

import CreateHackathon from './pages/CreateHackathon';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-hackathon" element={<CreateHackathon />} />
              <Route path="/hackathons/:id" element={<HackathonDetails />} />
            </Routes>
          </main>
          <footer style={{ padding: '2rem 0', textAlign: 'center', borderTop: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
            <div className="container">
              &copy; 2025 Sense Hack. All rights reserved.
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
