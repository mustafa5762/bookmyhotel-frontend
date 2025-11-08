// src/pages/admin/AdminDashboard.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { DollarSign, Calendar, Home, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: '$124,850', icon: DollarSign, color: 'text-green-600' },
  { label: 'Room Nights', value: '356', icon: Calendar, color: 'text-blue-600' },
  { label: 'Active Hotels', value: '4', icon: Home, color: 'text-purple-600' },
  { label: 'Growth', value: '+23%', icon: TrendingUp, color: 'text-amber-600' }
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${stat.color.split('-')[1]}-100`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/admin/hotels')}
            className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition transform hover:scale-105"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Home className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Manage Hotels</h3>
            <p className="text-gray-600 mt-2">Add, edit, or remove hotels</p>
          </button>

          <button className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition transform hover:scale-105">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">View Bookings</h3>
            <p className="text-gray-600 mt-2">All reservations & revenue</p>
          </button>

          <button className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition transform hover:scale-105">
            <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Analytics</h3>
            <p className="text-gray-600 mt-2">Performance reports</p>
          </button>
        </div>
      </div>
    </div>
  );
}