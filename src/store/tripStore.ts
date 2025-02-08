import { create } from 'zustand';
import { TripPreferences, WeatherData, Restaurant, SafetyZone } from '../types';

interface TripStore {
  preferences: TripPreferences | null;
  weather: WeatherData | null;
  restaurants: Restaurant[];
  safetyZones: SafetyZone[];
  setPreferences: (prefs: TripPreferences) => void;
  setWeather: (data: WeatherData) => void;
  setRestaurants: (restaurants: Restaurant[]) => void;
  setSafetyZones: (zones: SafetyZone[]) => void;
}

export const useTripStore = create<TripStore>((set) => ({
  preferences: null,
  weather: null,
  restaurants: [],
  safetyZones: [],
  setPreferences: (prefs) => set({ preferences: prefs }),
  setWeather: (data) => set({ weather: data }),
  setRestaurants: (restaurants) => set({ restaurants }),
  setSafetyZones: (zones) => set({ safetyZones: zones }),
}));