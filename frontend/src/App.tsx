import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AIProvider } from './context/AIContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PathDetailPage from './pages/PathDetailPage';

// Placeholder components for other pages
const PathsPage: React.FC = () => <div>Paths Page - Coming Soon</div>;
const ProfilePage: React.FC = () => <div>Profile Page - Coming Soon</div>;
const NotFoundPage: React.FC = () => <div>404 - Page Not Found</div>;

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AIProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/paths" element={<PathsPage />} />
              <Route path="/paths/:id" element={<PathDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              {/* Redirect root to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
      </AIProvider>
    </AuthProvider>
  );
};

export default App;
