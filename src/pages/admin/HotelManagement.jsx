// src/pages/admin/HotelManagement.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, MapPin, Star } from 'lucide-react';

const INITIAL_HOTELS = [
  { id: 1, name: 'Marriott Dubai Marina', location: 'Dubai, UAE', rating: 4.8, rooms: 45, price: 350 },
  { id: 2, name: 'Hilton Paris Opera', location: 'Paris, France', rating: 4.7, rooms: 38, price: 420 },
  { id: 3, name: 'Hyatt Regency Tokyo', location: 'Tokyo, Japan', rating: 4.9, rooms: 52, price: 380 },
  { id: 4, name: 'Four Seasons London', location: 'London, UK', rating: 5.0, rooms: 29, price: 650 }
];

export default function HotelManagement() {
  const [hotels, setHotels] = useState(INITIAL_HOTELS);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', location: '', rating: 5, rooms: '', price: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setHotels(prev => prev.map(h => h.id === editingId ? { ...h, ...form } : h));
    } else {
      setHotels(prev => [...prev, { id: Date.now(), ...form }]);
    }
    setShowForm(false);
    setEditingId(null);
    setForm({ name: '', location: '', rating: 5, rooms: '', price: '' });
  };

  const handleEdit = (hotel) => {
    setForm(hotel);
    setEditingId(hotel.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this hotel?')) {
      setHotels(prev => prev.filter(h => h.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Hotel Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Hotel
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
              <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit' : 'Add'} Hotel</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Hotel Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary"
                />
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Rating"
                    min="1"
                    max="5"
                    step="0.1"
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: e.target.value })}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="number"
                    placeholder="Rooms"
                    value={form.rooms}
                    onChange={(e) => setForm({ ...form, rooms: e.target.value })}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    {editingId ? 'Update' : 'Add'} Hotel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setForm({ name: '', location: '', rating: 5, rooms: '', price: '' });
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Hotels Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hotel</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rooms</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {hotels.map(hotel => (
                <tr key={hotel.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{hotel.name}</td>
                  <td className="px-6 py-4 text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-500 mr-1" />
                      {hotel.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{hotel.rooms}</td>
                  <td className="px-6 py-4 font-semibold text-primary">${hotel.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(hotel)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(hotel.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}