import React, { useEffect, useState } from 'react';
import Map, { Marker, Layer, Source, Popup, NavigationControl, FullscreenControl } from 'react-map-gl';
import { MapPin, Shield, Info, Navigation2, Star, Phone, Globe, Clock, Menu } from 'lucide-react';
import { useTripStore } from '../store/tripStore';
import type { Restaurant, SafetyZone } from '../types';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUxMjM0In0.ZXhhbXBsZQ';

const mapStyle = {
  light: 'mapbox://styles/mapbox/light-v11',
  dark: 'mapbox://styles/mapbox/dark-v11',
  streets: 'mapbox://styles/mapbox/streets-v12',
  satellite: 'mapbox://styles/mapbox/satellite-streets-v12'
};

export default function TravelMap() {
  const { restaurants, safetyZones, preferences } = useTripStore();
  const [selectedMarker, setSelectedMarker] = useState<Restaurant | null>(null);
  const [showSafetyZones, setShowSafetyZones] = useState(true);
  const [currentStyle, setCurrentStyle] = useState<keyof typeof mapStyle>('light');
  const [viewport, setViewport] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 13,
    bearing: 0,
    pitch: 45
  });

  const mockSafetyData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [-74.01, 40.72],
            [-74.02, 40.72],
            [-74.02, 40.71],
            [-74.01, 40.71],
            [-74.01, 40.72]
          ]]
        },
        properties: { level: 'safe', description: 'Tourist-friendly area with 24/7 security' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [-74.00, 40.71],
            [-74.01, 40.71],
            [-74.01, 40.70],
            [-74.00, 40.70],
            [-74.00, 40.71]
          ]]
        },
        properties: { level: 'moderate', description: 'Exercise normal precautions, busy during day' }
      }
    ]
  };

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
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop&auto=format',
      hours: '11:00 AM - 10:00 PM',
      phone: '+1 (555) 123-4567',
      website: 'https://example.com/restaurant1',
      description: 'Authentic Italian cuisine in a romantic setting'
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
      image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=200&h=200&fit=crop&auto=format',
      hours: '12:00 PM - 11:00 PM',
      phone: '+1 (555) 987-6543',
      website: 'https://example.com/restaurant2',
      description: 'Modern Japanese dining with fresh sushi'
    }
  ];

  const displayRestaurants = restaurants.length ? restaurants : mockRestaurants;

  const handleStyleChange = () => {
    const styles = Object.keys(mapStyle) as Array<keyof typeof mapStyle>;
    const currentIndex = styles.indexOf(currentStyle);
    const nextIndex = (currentIndex + 1) % styles.length;
    setCurrentStyle(styles[nextIndex]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-medium text-neutral-900">Area Map</h3>
          <p className="text-neutral-600 text-sm mt-1">Explore local attractions and safety zones</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSafetyZones(!showSafetyZones)}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
              showSafetyZones 
                ? 'bg-neutral-900 text-white' 
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            Safety Zones
          </button>
          <button
            onClick={handleStyleChange}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <Menu className="w-4 h-4" />
            Change Style
          </button>
          <button
            onClick={() => setViewport(v => ({ ...v, pitch: v.pitch === 0 ? 45 : 0 }))}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <Navigation2 className="w-4 h-4" />
            Toggle 3D
          </button>
        </div>
      </div>

      <div className="relative h-[600px] w-full rounded-xl overflow-hidden border border-neutral-200">
        <Map
          {...viewport}
          onMove={evt => setViewport(evt.viewState)}
          mapStyle={mapStyle[currentStyle]}
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <FullscreenControl position="top-right" />
          <NavigationControl position="top-right" />

          {showSafetyZones && (
            <Source id="safety-data" type="geojson" data={mockSafetyData}>
              <Layer
                id="safety-zones"
                type="fill"
                paint={{
                  'fill-color': [
                    'match',
                    ['get', 'level'],
                    'safe', '#4ade80',
                    'moderate', '#fbbf24',
                    'high-risk', '#ef4444',
                    '#000000'
                  ],
                  'fill-opacity': 0.15,
                  'fill-outline-color': [
                    'match',
                    ['get', 'level'],
                    'safe', '#22c55e',
                    'moderate', '#f59e0b',
                    'high-risk', '#dc2626',
                    '#000000'
                  ]
                }}
              />
            </Source>
          )}
          
          {displayRestaurants.map(restaurant => (
            <Marker
              key={restaurant.id}
              latitude={restaurant.location.lat}
              longitude={restaurant.location.lng}
              anchor="bottom"
            >
              <button
                onClick={() => setSelectedMarker(restaurant)}
                className="relative group"
              >
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-white px-2 py-1 rounded-lg shadow-lg text-sm whitespace-nowrap border border-neutral-200">
                    {restaurant.name}
                  </div>
                </div>
                <MapPin className="w-6 h-6 text-neutral-900 hover:text-neutral-700 transition-colors" />
              </button>
            </Marker>
          ))}

          {selectedMarker && (
            <Popup
              latitude={selectedMarker.location.lat}
              longitude={selectedMarker.location.lng}
              anchor="bottom"
              onClose={() => setSelectedMarker(null)}
              className="rounded-lg overflow-hidden"
              maxWidth="300px"
            >
              <div className="p-3">
                <img
                  src={selectedMarker.image}
                  alt={selectedMarker.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-medium text-neutral-900 mb-1">{selectedMarker.name}</h4>
                <p className="text-sm text-neutral-600 mb-2">{selectedMarker.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-neutral-600">{selectedMarker.cuisine}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-neutral-900">{selectedMarker.rating}</span>
                    <span className="text-sm text-neutral-500">({selectedMarker.reviews})</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-neutral-600 border-t border-neutral-100 pt-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <span>{selectedMarker.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-neutral-400" />
                    <span>{selectedMarker.phone}</span>
                  </div>
                  <a
                    href={selectedMarker.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-900 hover:text-neutral-700 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    Visit Website
                  </a>
                </div>
              </div>
            </Popup>
          )}
        </Map>

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-neutral-200">
          <p className="text-sm font-medium text-neutral-900 mb-3">Safety Guide</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-neutral-600">Safe Areas</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-neutral-600">Exercise Caution</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-500" />
              <span className="text-sm text-neutral-600">High-Risk Areas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}