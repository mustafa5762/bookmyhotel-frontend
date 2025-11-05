// src/pages/HotelListPage.jsx
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Dummy Hotels
const HOTELS = [
  {
    id: 1,
    name: 'Marriott Dubai Marina',
    location: 'Dubai, UAE',
    rating: 4.8,
    price: 350,
    image: 'https://images.unsplash.com/photo-1566073772329-243f3e0c3b0f?w=800',
    amenities: ['WiFi', 'Spa', 'Pool', 'Gym', 'Restaurant'],
    ecoFriendly: true,
    roomsAvailable: 45
  },
  {
    id: 2,
    name: 'Hilton Paris Opera',
    location: 'Paris, France',
    rating: 4.7,
    price: 420,
    image: 'https://images.unsplash.com/photo-1542314831-0682d4f35f2f?w=800',
    amenities: ['WiFi', 'Bar', 'Concierge', 'Room Service'],
    ecoFriendly: false,
    roomsAvailable: 38
  },
  {
    id: 3,
    name: 'Hyatt Regency Tokyo',
    location: 'Tokyo, Japan',
    rating: 4.9,
    price: 380,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    amenities: ['WiFi', 'Spa', 'Gym', 'Bar', 'Airport Shuttle'],
    ecoFriendly: true,
    roomsAvailable: 52
  },
  {
    id: 4,
    name: 'Four Seasons London',
    location: 'London, UK',
    rating: 5.0,
    price: 650,
    image: 'https://images.unsplash.com/photo-1564501049412-90c47f5a2c7f?w=800',
    amenities: ['WiFi', 'Spa', 'Pool', 'Fine Dining', 'Butler Service'],
    ecoFriendly: true,
    roomsAvailable: 29
  }
];

export default function HotelListPage() {
  const [search, setSearch] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [priceMax, setPriceMax] = useState(1000);
  const [ecoOnly, setEcoOnly] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const allAmenities = [...new Set(HOTELS.flatMap(h => h.amenities))];

  const toggleAmenity = (a) => {
    setSelectedAmenities(prev =>
      prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]
    );
  };

  const filteredHotels = useMemo(() => {
    return HOTELS.filter(hotel => {
      const matchesSearch = hotel.name.toLowerCase().includes(search.toLowerCase()) ||
                           hotel.location.toLowerCase().includes(search.toLowerCase());
      const matchesPrice = hotel.price <= priceMax;
      const matchesEco = !ecoOnly || hotel.ecoFriendly;
      const matchesAmenities = selectedAmenities.length === 0 ||
        selectedAmenities.every(a => hotel.amenities.includes(a));

      return matchesSearch && matchesPrice && matchesEco && matchesAmenities;
    });
  }, [search, priceMax, ecoOnly, selectedAmenities]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Find Your Perfect Stay</h1>
          <p className="text-xl opacity-90">Luxury hotels in Asia & Europe</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Where to?</label>
              <input
                type="text"
                placeholder="City, hotel name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check In</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check Out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
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
          </div>
          <button className="mt-6 w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Hotels
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Refine Your Search</h3>

              {/* Price Slider */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Max Price: <span className="font-bold text-primary">${priceMax}</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-accent"
                  style={{
                    background: `linear-gradient(to right, #1D4ED8 0%, #1D4ED8 ${(priceMax - 100) / 9}%, #e5e7eb ${(priceMax - 100) / 9}%, #e5e7eb 100%)`
                  }}
                />
              </div>

              {/* Eco Friendly */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={ecoOnly}
                    onChange={(e) => setEcoOnly(e.target.checked)}
                    className="w-5 h-5 text-primary rounded focus:ring-primary"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700 flex items-center">
                    Eco-Friendly
                    <span className="ml-2 text-green-600">Leaf Icon</span>
                  </span>
                </label>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Popular Amenities</h4>
                <div className="space-y-3">
                  {allAmenities.slice(0, 6).map(amenity => (
                    <label key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="w-4 h-4 text-primary rounded focus:ring-primary"
                      />
                      <span className="ml-3 text-sm text-gray-600">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSearch(''); setCheckIn(''); setCheckOut(''); setGuests(1);
                  setPriceMax(1000); setEcoOnly(false); setSelectedAmenities([]);
                }}
                className="mt-6 w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Hotel Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600 font-medium">
                {filteredHotels.length} {filteredHotels.length === 1 ? 'hotel' : 'hotels'} available
              </p>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary">
                <option>Sort: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHotels.map(hotel => (
                <Link
                  key={hotel.id}
                  to={`/hotel/${hotel.id}`}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {hotel.ecoFriendly && (
                      <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                        <span className="mr-1">Leaf Icon</span> Eco
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white text-primary px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                      ${hotel.price}
                      <span className="text-xs block text-gray-600">/night</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary transition">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center bg-amber-50 px-2 py-1 rounded-full">
                        <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm font-bold text-amber-700">{hotel.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {hotel.location}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 3).map(a => (
                        <span key={a} className="text-xs bg-blue-50 text-primary px-3 py-1 rounded-full font-medium">
                          {a}
                        </span>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <span className="text-xs text-gray-500">+{hotel.amenities.length - 3} more</span>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-600 font-medium">
                        {hotel.roomsAvailable} rooms left
                      </span>
                      <span className="text-primary font-bold text-lg group-hover:translate-x-1 transition">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredHotels.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-gray-100 w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2m-8 0h8" />
                  </svg>
                </div>
                <p className="text-xl text-gray-600 mb-2">No hotels found</p>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}