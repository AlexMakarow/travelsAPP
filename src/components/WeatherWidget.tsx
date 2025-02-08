import React from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, Wind, Droplets, Thermometer, Clock, CloudDrizzle, CloudFog, CloudSnow, Sunrise, Sunset } from 'lucide-react';
import { useTripStore } from '../store/tripStore';
import type { WeatherData } from '../types';

const WeatherIcon = ({ condition, className = "w-10 h-10" }: { condition: string; className?: string }) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <Sun className={`${className} text-amber-500`} />;
    case 'partly cloudy':
      return <Cloud className={`${className} text-neutral-400`} />;
    case 'cloudy':
      return <Cloud className={`${className} text-neutral-500`} />;
    case 'rainy':
      return <CloudRain className={`${className} text-blue-600`} />;
    case 'drizzle':
      return <CloudDrizzle className={`${className} text-blue-400`} />;
    case 'stormy':
      return <CloudLightning className={`${className} text-purple-600`} />;
    case 'foggy':
      return <CloudFog className={`${className} text-neutral-400`} />;
    case 'snow':
      return <CloudSnow className={`${className} text-blue-200`} />;
    default:
      return <Sun className={`${className} text-amber-500`} />;
  }
};

export default function WeatherWidget() {
  const { weather } = useTripStore();

  const mockWeather = {
    temperature: 22,
    condition: 'sunny',
    precipitation: 10,
    humidity: 65,
    windSpeed: 12,
    feelsLike: 24,
    sunrise: '6:45 AM',
    sunset: '8:15 PM',
    forecast: [
      { time: '9 AM', temp: 20, condition: 'sunny' },
      { time: '12 PM', temp: 24, condition: 'partly cloudy' },
      { time: '3 PM', temp: 25, condition: 'cloudy' },
      { time: '6 PM', temp: 21, condition: 'rainy' },
      { time: '9 PM', temp: 19, condition: 'cloudy' },
      { time: '12 AM', temp: 17, condition: 'clear' }
    ]
  };

  const currentWeather = weather || mockWeather;

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-1">Weather Forecast</h3>
            <p className="text-sm text-neutral-600">Today's weather overview</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Clock className="w-4 h-4" />
            <span>Updated 5 min ago</span>
          </div>
        </div>
        
        {/* Current Weather */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <WeatherIcon condition={currentWeather.condition} className="w-16 h-16" />
            <div>
              <div className="flex items-start gap-2">
                <span className="text-4xl font-medium text-neutral-900">
                  {currentWeather.temperature}°
                </span>
                <span className="text-neutral-500 mt-2">C</span>
              </div>
              <p className="text-neutral-600 capitalize">{currentWeather.condition}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-600">
                Feels like {currentWeather.feelsLike}°C
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-neutral-600">
                {currentWeather.humidity}% humidity
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-600">
                {currentWeather.windSpeed} km/h
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-neutral-600">
                {currentWeather.precipitation}% rain
              </span>
            </div>
          </div>
        </div>

        {/* Sun Position */}
        <div className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Sunrise className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-xs text-neutral-600">Sunrise</p>
              <p className="text-sm font-medium text-neutral-900">{currentWeather.sunrise}</p>
            </div>
          </div>
          <div className="h-px w-24 bg-gradient-to-r from-amber-200 to-orange-200" />
          <div className="flex items-center gap-2">
            <Sunset className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-xs text-neutral-600">Sunset</p>
              <p className="text-sm font-medium text-neutral-900">{currentWeather.sunset}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="border-t border-neutral-100">
        <div className="p-4">
          <h4 className="text-sm font-medium text-neutral-700 mb-3">Today's Forecast</h4>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {currentWeather.forecast.map((hour, index) => (
              <div
                key={hour.time}
                className={`flex flex-col items-center min-w-[80px] p-3 rounded-lg ${
                  index === 0 ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-50'
                }`}
              >
                <span className={`text-sm mb-2 ${index === 0 ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  {hour.time}
                </span>
                <WeatherIcon 
                  condition={hour.condition} 
                  className={`w-8 h-8 my-1 ${index === 0 ? 'text-white' : ''}`}
                />
                <span className={`text-sm font-medium mt-2 ${index === 0 ? 'text-white' : 'text-neutral-900'}`}>
                  {hour.temp}°C
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}