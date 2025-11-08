// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HotelListPage from './pages/HotelListPage';
import HotelDetailPage from './pages/HotelDetailPage';
import UserDashboard from './pages/UserDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import HotelManagement from './pages/admin/HotelManagement';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HotelListPage />} />
      <Route path="/hotels" element={<HotelListPage />} />
      <Route path="/hotel/:id" element={<HotelDetailPage />} />
      <Route path="/about" element={<div className="p-8">About Page</div>} />
      <Route path="/contact" element={<div className="p-8">Contact Page</div>} />
      <Route path="/dashboard" element={<UserDashboard />} />

      {/* Auth Pages (No Layout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/hotels" element={<HotelManagement />} />
    </Routes>
  );
}