import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import BookingsPage from './pages/BookingsPage';
import DriversPage from './pages/DriversPage';
import FleetPage from './pages/FleetPage';
import RevenuePage from './pages/RevenuePage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('travo_admin_auth') === 'true'
  );

  const handleLogin = () => {
    localStorage.setItem('travo_admin_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('travo_admin_auth');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
        ) : (
          <Route element={<Layout onLogout={handleLogout} />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/drivers" element={<DriversPage />} />
            <Route path="/fleet" element={<FleetPage />} />
            <Route path="/revenue" element={<RevenuePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}
