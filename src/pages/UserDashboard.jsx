// src/pages/UserDashboard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, MapPin, Users, DollarSign, XCircle } from 'lucide-react';

const BOOKINGS = [
  {
    id: 1001,
    hotel: 'Marriott Dubai Marina',
    hotelId: 1,
    image: 'https://images.unsplash.com/photo-1566073772329-243f3e0c3b0f?w=800',
    checkIn: new Date('2025-12-20'),
    checkOut: new Date('2025-12-25'),
    guests: 2,
    roomType: 'Deluxe King Room',
    totalPrice: 1750,
    status: 'upcoming'
  },
  {
    id: 1002,
    hotel: 'Hilton Paris Opera',
    hotelId: 2,
    image: 'https://images.unsplash.com/photo-1542314831-0682d4f35f2f?w=800',
    checkIn: new Date('2025-08-10'),
    checkOut: new Date('2025-08-15'),
    guests: 3,
    roomType: 'Executive Suite',
    totalPrice: 3250,
    status: 'completed'
  },
  {
    id: 1003,
    hotel: 'Hyatt Regency Tokyo',
    hotelId: 3,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    checkIn: new Date('2025-11-05'),
    checkOut: new Date('2025-11-08'),
    guests: 1,
    roomType: 'Deluxe King Room',
    totalPrice: 1140,
    status: 'cancelled'
  }
];

export default function UserDashboard() {
  const [bookings, setBookings] = useState(BOOKINGS);

  const cancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(prev =>
        prev.map(b =>
          b.id === id ? { ...b, status: 'cancelled' } : b
        )
      );
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      upcoming: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return `px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">My Bookings</h1>
              <p className="text-gray-600 mt-2">Manage your upcoming and past stays</p>
            </div>
            <Link
              to="/hotels"
              className="mt-4 md:mt-0 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Book New Stay
            </Link>
          </div>
        </div>

        {/* Bookings Grid */}
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map(booking => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <img
                    src={booking.image}
                    alt={booking.hotel}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={getStatusBadge(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    <Link
                      to={`/hotel/${booking.hotelId}`}
                      className="hover:text-primary transition"
                    >
                      {booking.hotel}
                    </Link>
                  </h3>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span>
                        {format(booking.checkIn, 'MMM dd')} – {format(booking.checkOut, 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <span>{booking.roomType}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      <span>{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center font-bold text-lg text-primary">
                      <DollarSign className="w-5 h-5" />
                      <span>{booking.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t flex justify-between items-center">
                    {booking.status === 'upcoming' && (
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="text-red-600 hover:text-red-700 font-medium flex items-center text-sm transition"
                     >
                        <XCircle className="w-4 h-4 mr-1" />
                        Cancel Booking
                      </button>
                    )}
                    {booking.status === 'completed' && (
                      <Link
                        to={`/review/${booking.id}`}
                        className="text-primary font-medium text-sm hover:underline"
                      >
                        Leave a Review
                      </Link>
                    )}
                    {booking.status === 'cancelled' && (
                      <span className="text-gray-500 text-sm">Refund processed</span>
                    )}
                    <Link
                      to={`/booking/${booking.id}`}
                      className="text-primary font-medium text-sm hover:underline"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Bookings Yet</h3>
            <p className="text-gray-600 mb-6">Start planning your next luxury getaway!</p>
            <Link
              to="/hotels"
              className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Explore Hotels
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}