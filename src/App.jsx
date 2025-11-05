// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HotelListPage from './pages/HotelListPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HotelListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/hotels" element={<HotelListPage />} />
      <Route path="/hotel/:id" element={<div>Hotel Detail (Coming Soon)</div>} />
    </Routes>
  );
}