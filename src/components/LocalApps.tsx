import React from 'react';
import { Download, Star, Globe, Navigation, ShoppingBag, Utensils, Train, CarTaxiFront as Taxi, MessageCircle } from 'lucide-react';
import { useTripStore } from '../store/tripStore';
import type { LocalApp } from '../types';

const mockLocalApps: Record<string, LocalApp[]> = {
  'Paris': [
    {
      name: 'RATP',
      category: 'Transportation',
      country: 'France',
      downloadUrl: 'https://example.com/ratp',
      icon: 'https://images.unsplash.com/photo-1581262177000-8139a463e531?w=64&h=64&fit=crop&auto=format',
      description: 'Official Paris metro and bus app',
      rating: 4.5,
      features: ['Real-time schedules', 'Route planning', 'Service updates']
    },
    {
      name: 'Uber',
      category: 'Ride-Hailing',
      country: 'France',
      downloadUrl: 'https://example.com/uber',
      icon: 'https://images.unsplash.com/photo-1549652767-1866c8947cd6?w=64&h=64&fit=crop&auto=format',
      description: 'On-demand rides across Paris',
      rating: 4.7,
      features: ['Multiple vehicle options', '24/7 service', 'Fare estimates']
    },
    {
      name: 'Deliveroo',
      category: 'Food Delivery',
      country: 'France',
      downloadUrl: 'https://example.com/deliveroo',
      icon: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=64&h=64&fit=crop&auto=format',
      description: 'Food delivery from local restaurants',
      rating: 4.6,
      features: ['Live order tracking', 'Multiple cuisines', 'Restaurant ratings']
    }
  ],
  'Tokyo': [
    {
      name: 'Japan Travel by NAVITIME',
      category: 'Transportation',
      country: 'Japan',
      downloadUrl: 'https://example.com/navitime',
      icon: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=64&h=64&fit=crop&auto=format',
      description: 'Complete Japan travel companion',
      rating: 4.8,
      features: ['Train schedules', 'Offline maps', 'Tourist info']
    },
    {
      name: 'LINE',
      category: 'Communication',
      country: 'Japan',
      downloadUrl: 'https://example.com/line',
      icon: 'https://images.unsplash.com/photo-1611746869696-d09bce200020?w=64&h=64&fit=crop&auto=format',
      description: 'Essential messaging app in Japan',
      rating: 4.9,
      features: ['Free calls', 'Local services', 'Payment system']
    },
    {
      name: 'Uber Eats',
      category: 'Food Delivery',
      country: 'Japan',
      downloadUrl: 'https://example.com/ubereats',
      icon: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=64&h=64&fit=crop&auto=format',
      description: 'Food delivery service',
      rating: 4.7,
      features: ['English support', 'Multiple payment methods', 'Restaurant reviews']
    }
  ],
  'Dubai': [
    {
      name: 'RTA Dubai',
      category: 'Transportation',
      country: 'UAE',
      downloadUrl: 'https://example.com/rta',
      icon: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=64&h=64&fit=crop&auto=format',
      description: 'Official Dubai transport app',
      rating: 4.6,
      features: ['Metro times', 'Nol card balance', 'Journey planner']
    },
    {
      name: 'Careem',
      category: 'Ride-Hailing',
      country: 'UAE',
      downloadUrl: 'https://example.com/careem',
      icon: 'https://images.unsplash.com/photo-1549652767-1866c8947cd6?w=64&h=64&fit=crop&auto=format',
      description: 'Popular ride-hailing service',
      rating: 4.8,
      features: ['Multiple car types', 'Scheduled rides', 'Local drivers']
    },
    {
      name: 'Talabat',
      category: 'Food Delivery',
      country: 'UAE',
      downloadUrl: 'https://example.com/talabat',
      icon: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=64&h=64&fit=crop&auto=format',
      description: 'Leading food delivery platform',
      rating: 4.7,
      features: ['Wide restaurant selection', 'Fast delivery', 'Multiple cuisines']
    }
  ]
};

const categoryIcons = {
  'Transportation': <Train className="w-4 h-4" />,
  'Ride-Hailing': <Taxi className="w-4 h-4" />,
  'Food Delivery': <Utensils className="w-4 h-4" />,
  'Shopping': <ShoppingBag className="w-4 h-4" />,
  'Communication': <MessageCircle className="w-4 h-4" />,
  'Navigation': <Navigation className="w-4 h-4" />
};

export default function LocalApps() {
  const { preferences } = useTripStore();
  const destination = preferences?.destination || '';
  const localApps = mockLocalApps[destination] || [];

  if (!localApps.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-medium text-neutral-900">Essential Local Apps</h3>
          <p className="text-neutral-600 text-sm mt-1">
            Recommended apps and services for {destination}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {localApps.map((app) => (
          <div
            key={app.name}
            className="group bg-white rounded-xl border border-neutral-200 overflow-hidden hover:border-neutral-300 transition-all duration-200"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-16 h-16 rounded-2xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-neutral-900 truncate">{app.name}</h4>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-neutral-900">{app.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {categoryIcons[app.category as keyof typeof categoryIcons]}
                    <span className="text-sm text-neutral-600">{app.category}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-neutral-600 mt-4">{app.description}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {app.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100">
                <a
                  href={app.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 text-sm font-medium text-neutral-900 hover:text-neutral-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download App
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}