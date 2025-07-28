'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  timestamp: string;
  accuracy: number;
}

interface LocationTrackerProps {
  userId: string;
}

export function LocationTracker({ userId }: LocationTrackerProps) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching location data from Firebase
    const mockLocation: LocationData = {
      latitude: 40.7128,
      longitude: -74.0060,
      address: "New York, NY, USA",
      timestamp: new Date().toISOString(),
      accuracy: 10
    };
    
    setTimeout(() => {
      setLocation(mockLocation);
      setLoading(false);
    }, 1000);
  }, [userId]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Current Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Address</p>
            <p className="text-lg">{location?.address}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Latitude</p>
              <p className="text-lg">{location?.latitude.toFixed(4)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Longitude</p>
              <p className="text-lg">{location?.longitude.toFixed(4)}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Last Updated</p>
            <p className="text-sm text-muted-foreground">
              {new Date(location?.timestamp || '').toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
