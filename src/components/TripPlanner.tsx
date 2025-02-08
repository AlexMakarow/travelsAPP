import React, { useState } from 'react';
import { Calendar, DollarSign, Map, Compass, Plane, Briefcase, Tag, Globe2, Search } from 'lucide-react';
import { useTripStore } from '../store/tripStore';
import type { TripPreferences } from '../types';

const popularDestinations = [
  { 
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop&q=80',
    description: 'City of Love & Lights',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame']
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop&q=80',
    description: 'Modern Meets Traditional',
    highlights: ['Shibuya Crossing', 'Mount Fuji', 'Imperial Palace']
  },
  {
    name: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop&q=80',
    description: 'The City That Never Sleeps',
    highlights: ['Times Square', 'Central Park', 'Statue of Liberty']
  },
  {
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop&q=80',
    description: 'Art & Architecture Paradise',
    highlights: ['Sagrada Familia', 'Park Güell', 'Las Ramblas']
  },
  {
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop&q=80',
    description: 'Future of Architecture',
    highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall']
  },
  {
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop&q=80',
    description: 'Eternal City',
    highlights: ['Colosseum', 'Vatican City', 'Trevi Fountain']
  }
];

const trendingDestinations = [
  'Santorini, Greece',
  'Bali, Indonesia',
  'Kyoto, Japan',
  'Amsterdam, Netherlands',
  'Cape Town, South Africa'
];

export default function TripPlanner() {
  const setPreferences = useTripStore((state) => state.setPreferences);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    budget: 'mid-range',
    interests: [] as string[],
    destination: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPreferences({
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
    } as TripPreferences);
  };

  const interests = [
    { name: 'Adventure', icon: <Compass className="w-4 h-4" /> },
    { name: 'Culture', icon: <Globe2 className="w-4 h-4" /> },
    { name: 'Food', icon: <DollarSign className="w-4 h-4" /> },
    { name: 'Nature', icon: <Map className="w-4 h-4" /> },
    { name: 'Relaxation', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Shopping', icon: <Tag className="w-4 h-4" /> }
  ];

  const filteredDestinations = popularDestinations.filter(dest => 
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-neutral-900 text-white p-2.5 rounded-lg">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-medium text-neutral-900">Plan Your Trip</h2>
              <p className="text-neutral-600">Fill in the details to get personalized recommendations</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Search & Trending */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search cities or countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-colors"
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {trendingDestinations.map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => setSearchQuery(dest.split(',')[0])}
                    className="flex items-center gap-1 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-full text-sm text-neutral-700 whitespace-nowrap transition-colors"
                  >
                    <span>🔥</span> {dest}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Destinations */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-neutral-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Map className="w-4 h-4" />
                    Popular Destinations
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filteredDestinations.map((dest) => (
                    <button
                      key={dest.name}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, destination: dest.name });
                        setSearchQuery(dest.name);
                      }}
                      className={`relative group overflow-hidden rounded-lg aspect-[4/3] border-2 transition-all ${
                        formData.destination === dest.name
                          ? 'border-neutral-900 ring-2 ring-neutral-900/10'
                          : 'border-transparent hover:border-neutral-300'
                      }`}
                    >
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <p className="font-medium text-lg">{dest.name}</p>
                        <p className="text-sm text-white/90 mb-2">{dest.country}</p>
                        <p className="text-sm text-white/80">{dest.description}</p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {dest.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </label>
            </div>

            {/* Dates Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4" />
                    Start Date
                  </div>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-colors"
                    required
                  />
                </label>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4" />
                    End Date
                  </div>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-colors"
                    required
                  />
                </label>
              </div>
            </div>

            {/* Budget Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-4 h-4" />
                  Budget Range
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {['budget', 'mid-range', 'luxury'].map((budget) => (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: budget as TripPreferences['budget'] })}
                      className={`p-4 text-center rounded-lg border-2 transition-all ${
                        formData.budget === budget
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <p className="font-medium capitalize">{budget}</p>
                      <p className="text-sm mt-1 opacity-80">
                        {budget === 'budget' && 'Save more'}
                        {budget === 'mid-range' && 'Balance comfort'}
                        {budget === 'luxury' && 'Premium experience'}
                      </p>
                    </button>
                  ))}
                </div>
              </label>
            </div>

            {/* Interests Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-neutral-700">
                <div className="flex items-center gap-2 mb-4">
                  <Compass className="w-4 h-4" />
                  Travel Interests
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interests.map((interest) => (
                    <label
                      key={interest.name}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.interests.includes(interest.name)
                          ? 'border-neutral-900 bg-neutral-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest.name)}
                        onChange={(e) => {
                          const newInterests = e.target.checked
                            ? [...formData.interests, interest.name]
                            : formData.interests.filter((i) => i !== interest.name);
                          setFormData({ ...formData, interests: newInterests });
                        }}
                        className="hidden"
                      />
                      <div className={`p-2 rounded-md ${
                        formData.interests.includes(interest.name)
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100'
                      }`}>
                        {interest.icon}
                      </div>
                      <span className="font-medium">{interest.name}</span>
                    </label>
                  ))}
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 text-white py-3 px-6 rounded-lg hover:bg-neutral-800 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5" />
              <span>Generate Trip Plan</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}