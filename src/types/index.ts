export interface TripPreferences {
  startDate: Date;
  endDate: Date;
  budget: 'budget' | 'mid-range' | 'luxury';
  interests: string[];
  destination: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  precipitation: number;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  priceRange: string;
  rating: number;
  location: {
    lat: number;
    lng: number;
  };
}

export interface SafetyZone {
  level: 'safe' | 'moderate' | 'high-risk';
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface LocalApp {
  name: string;
  category: string;
  country: string;
  downloadUrl: string;
  icon: string;
  description: string;
  rating: number;
  features: string[];
}