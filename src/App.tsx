import React from 'react';
import { Compass } from 'lucide-react';
import TripPlanner from './components/TripPlanner';
import TravelMap from './components/TravelMap';
import RestaurantList from './components/RestaurantList';
import WeatherWidget from './components/WeatherWidget';
import CurrencyConverter from './components/CurrencyConverter';
import LocalApps from './components/LocalApps';

function App() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Compass className="h-8 w-8 text-white" />
              <h1 className="ml-2 text-2xl font-medium text-white">Last Trip</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-24">
        <div className="space-y-8">
          <TripPlanner />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeatherWidget />
            <CurrencyConverter />
          </div>
          <TravelMap />
          <LocalApps />
          <RestaurantList />
        </div>
      </main>

      <footer className="bg-neutral-900/90 backdrop-blur-sm border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-neutral-400 text-sm">
            © 2025 Last Trip. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App