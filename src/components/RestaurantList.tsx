import React, { useState } from 'react';
import { Star, DollarSign, MapPin, Clock, Phone, Globe, Search, Filter, ChevronDown, Utensils } from 'lucide-react';
import { useTripStore } from '../store/tripStore';

const cuisineTypes = ['All', 'Italian', 'Japanese', 'Mexican', 'Indian', 'French', 'American'];
const priceRanges = ['All', '$', '$$', '$$$', '$$$$'];

export default function RestaurantList() {
  const { restaurants } = useTripStore();
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const mockRestaurants = [
    {
      id: '1',
      name: "La Casa Bella",
      cuisine: 'Italian',
      priceRange: '$$$',
      rating: 4.8,
      reviews: 324,
      location: { lat: 40.7128, lng: -74.006 },
      address: '123 Italian Street, New York',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop&auto=format',
      hours: '11:00 AM - 10:00 PM',
      phone: '+1 (555) 123-4567',
      website: 'https://example.com/restaurant1',
      features: ['Outdoor Seating', 'Vegetarian Options', 'Wine Bar']
    },
    {
      id: '2',
      name: 'Sakura Garden',
      cuisine: 'Japanese',
      priceRange: '$$',
      rating: 4.6,
      reviews: 256,
      location: { lat: 40.7138, lng: -74.008 },
      address: '456 Sushi Lane, New York',
      image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&h=400&fit=crop&auto=format',
      hours: '12:00 PM - 11:00 PM',
      phone: '+1 (555) 987-6543',
      website: 'https://example.com/restaurant2',
      features: ['Sushi Bar', 'Private Rooms', 'Sake Selection']
    },
    {
      id: '3',
      name: 'El Rincón',
      cuisine: 'Mexican',
      priceRange: '$$',
      rating: 4.7,
      reviews: 189,
      location: { lat: 40.7148, lng: -74.007 },
      address: '789 Taco Avenue, New York',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop&auto=format',
      hours: '10:00 AM - 9:00 PM',
      phone: '+1 (555) 456-7890',
      website: 'https://example.com/restaurant3',
      features: ['Tequila Bar', 'Live Music', 'Family Style']
    }
  ];

  const displayRestaurants = restaurants.length ? restaurants : mockRestaurants;

  const filteredRestaurants = displayRestaurants.filter(restaurant => {
    const matchesCuisine = selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine;
    const matchesPrice = selectedPrice === 'All' || restaurant.priceRange === selectedPrice;
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCuisine && matchesPrice && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-medium text-neutral-900">Recommended Restaurants</h3>
          <p className="text-neutral-600 text-sm mt-1">Discover the best local dining experiences</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search restaurants or cuisines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900"
          />
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2.5 bg-white border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900"
            >
              {cuisineTypes.map(cuisine => (
                <option key={cuisine} value={cuisine}>{cuisine} Cuisine</option>
              ))}
            </select>
            <Utensils className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          </div>
          <div className="relative">
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2.5 bg-white border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900"
            >
              {priceRanges.map(price => (
                <option key={price} value={price}>{price === 'All' ? 'All Prices' : price}</option>
              ))}
            </select>
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map(restaurant => (
          <div
            key={restaurant.id}
            className="group bg-white rounded-xl border border-neutral-200 overflow-hidden hover:border-neutral-300 transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium text-neutral-900">{restaurant.rating}</span>
                  <span className="text-sm text-neutral-500">({restaurant.reviews})</span>
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="text-sm font-medium text-neutral-900">{restaurant.priceRange}</span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-lg font-medium text-neutral-900">{restaurant.name}</h4>
                </div>
                <p className="text-neutral-600">{restaurant.cuisine}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {restaurant.features.map(feature => (
                  <span
                    key={feature}
                    className="px-2.5 py-1 bg-neutral-100 text-neutral-600 text-sm rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span>{restaurant.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neutral-400" />
                  <span>{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span>{restaurant.phone}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <a
                  href={restaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 text-sm font-medium text-neutral-900 hover:text-neutral-700 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}