'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Wifi, Battery, Signal } from 'lucide-react';

interface DeviceInfoProps {
  deviceData: {
    deviceName: string;
    model: string;
    androidVersion: string;
    batteryLevel: number;
    networkType: string;
    signalStrength: number;
    lastSeen: string;
  };
}

export function DeviceInfo({ deviceData }: DeviceInfoProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Device Name</CardTitle>
          <Smartphone className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{deviceData.deviceName}</div>
          <p className="text-xs text-muted-foreground">{deviceData.model}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Android Version</CardTitle>
          <div className="h-4 w-4 text-muted-foreground">🤖</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{deviceData.androidVersion}</div>
          <p className="text-xs text-muted-foreground">Operating System</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Battery Level</CardTitle>
          <Battery className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{deviceData.batteryLevel}%</div>
          <p className="text-xs text-muted-foreground">Current charge</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Network Status</CardTitle>
          <Signal className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{deviceData.networkType}</div>
          <p className="text-xs text-muted-foreground">{deviceData.signalStrength}% signal</p>
        </CardContent>
      </Card>
    </div>
  );
}
