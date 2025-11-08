// src/pages/HotelDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format, addDays, isWithinInterval } from 'date-fns';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// Dummy Hotel + Rooms Data
const HOTEL_DATA = {
  1: {
    id: 1,
    name: 'Marriott Dubai Marina',
    location: 'Dubai, UAE',
    rating: 4.8,
    totalReviews: 1247,
    image: 'https://images.unsplash.com/photo-1566073772329-243f3e0c3b0f?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1566073772329-243f3e0c3b0f?w=800',
      'https://images.unsplash.com/photo-1520250497591-770d5a769c7f?w=800',
      'https://images.unsplash.com/photo-1611892441792-ae6af9366ebc?w=800'
    ],
    description: 'Experience luxury at its finest with panoramic views of Dubai Marina. Enjoy world-class dining, infinity pool, and award-winning spa.',
    amenities: ['WiFi', 'Spa', 'Infinity Pool', 'Gym', '5 Restaurants', 'Bar', 'Concierge', 'Room Service'],
    ecoFriendly: true,
    rooms: [
      {
        id: 101,
        type: 'Deluxe King Room',
        capacity: 2,
        price: 350,
        beds: '1 King Bed',
        view: 'Marina View',
        size: '42 m²',
        features: ['Free WiFi', 'Smart TV', 'Minibar', 'Balcony'],
        available: true
      },
      {
        id: 102,
        type: 'Executive Suite',
        capacity: 4,
        price: 650,
        beds: '1 King + 1 Sofa Bed',
        view: 'City & Marina View',
        size: '85 m²',
        features: ['Living Room', '2 Bathrooms', 'Nespresso', 'Lounge Access'],
        available: true
      },
      {
        id: 103,
        type: 'Presidential Suite',
        capacity: 6,
        price: 1500,
        beds: '2 King Beds',
        view: 'Full Marina View',
        size: '180 m²',
        features: ['Private Terrace', 'Butler Service', 'Jacuzzi', 'Dining Area'],
        available: false
      }
    ]
  }
};

export default function HotelDetailPage() {
  const { id } = useParams();
  const hotel = HOTEL_DATA[id] || HOTEL_DATA[1];

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Calculate nights
  const nights = checkIn && checkOut
    ? Math.max(1, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)))
    : 0;

  const totalPrice = selectedRoom && nights > 0
    ? selectedRoom.price * nights
    : 0;

  const handleDateSelect = (date) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (checkIn && !checkOut && date > checkIn) {
      setCheckOut(date);
      setShowCalendar(false);
    } else {
      setCheckIn(date);
      setCheckOut(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero with Image */}
      <div className="relative h-96 md:h-screen max-h-96 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">{hotel.name}</h1>
            <p className="text-xl flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {hotel.location}
            </p>
            <div className="flex items-center mt-3">
              <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 font-bold text-amber-700">{hotel.rating}</span>
              </div>
              <span className="ml-3 text-sm opacity-90">({hotel.totalReviews} reviews)</span>
              {hotel.ecoFriendly && (
                <span className="ml-4 bg-green-500 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                  Leaf Icon Eco-Friendly
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Room Selection + Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Book Your Stay</h3>

              {/* Date Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Check In / Check Out</label>
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary transition bg-white"
                >
                  {checkIn ? format(checkIn, 'MMM dd, yyyy') : 'Select date'} —{' '}
                  {checkOut ? format(checkOut, 'MMM dd, yyyy') : 'Select date'}
                </button>
                {showCalendar && (
                  <div className="absolute z-50 mt-2 bg-white rounded-xl shadow-2xl p-4">
                    <Calendar
                      date={calendarDate}
                      onChange={handleDateSelect}
                      minDate={new Date()}
                      showDateDisplay={false}
                      color="#1D4ED8"
                    />
                    <button
                      onClick={() => setShowCalendar(false)}
                      className="mt-2 w-full bg-gray-100 py-2 rounded-lg text-sm"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>

              {/* Guests */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                >
                  {[1,2,3,4,5,6].map(n => (
                    <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              {/* Room Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Room</label>
                <div className="space-y-3">
                  {hotel.rooms.map(room => (
                    <label
                      key={room.id}
                      className={`block p-4 border rounded-xl cursor-pointer transition ${
                        selectedRoom?.id === room.id
                          ? 'border-primary bg-blue-50'
                          : 'border-gray-300 hover:border-primary'
                      } ${!room.available ? 'opacity-60' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <input
                            type="radio"
                            name="room"
                            checked={selectedRoom?.id === room.id}
                            onChange={() => room.available && setSelectedRoom(room)}
                            disabled={!room.available}
                            className="mr-3"
                          />
                          <span className="font-semibold">{room.type}</span>
                          <p className="text-xs text-gray-600 mt-1">
                            {room.beds} • {room.view} • {room.size}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">${room.price}</p>
                          <p className="text-xs text-gray-600">per night</p>
                          {!room.available && (
                            <p className="text-xs text-red-600 font-medium">Sold Out</p>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Total */}
              {nights > 0 && selectedRoom && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>${selectedRoom.price} × {nights} night{nights > 1 ? 's' : ''}</span>
                    <span>${selectedRoom.price * nights}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">${totalPrice}</span>
                  </div>
                </div>
              )}

              {/* Book Button */}
              <button
                disabled={!selectedRoom || !checkIn || !checkOut}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {selectedRoom && checkIn && checkOut ? 'Book Now' : 'Complete Selection'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Free cancellation • No hidden fees
              </p>
            </div>
          </div>

          {/* Right: Hotel Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Property</h2>
              <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Photo Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {hotel.gallery.map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
                    <img src={img} alt={`Gallery ${i+1}`} className="w-full h-48 object-cover hover:scale-105 transition" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}