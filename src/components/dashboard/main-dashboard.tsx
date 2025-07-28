'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { UserSelector } from './user-selector';
import { DeviceInfo } from './device-info';
import { LocationTracker } from './location-tracker';
import { CallLogs } from './call-logs';
import { SMSMessages } from './sms-messages';
import { CommandCenter } from './command-center';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const mockDeviceData = {
  deviceName: 'Samsung Galaxy S21',
  model: 'SM-G991B',
  androidVersion: 'Android 13',
  batteryLevel: 85,
  networkType: '5G',
  signalStrength: 92,
  lastSeen: new Date().toISOString()
};

export function MainDashboard() {
  const { user, userRole, logout } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<string>(user?.uid || '');

  const handleLogout = async () => {
    await logout();
  };

  const currentUserId = userRole === 'admin' && selectedUserId ? selectedUserId : user?.uid || '';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Mobile Tracker Dashboard</h1>
              {userRole === 'admin' && (
                <UserSelector 
                  onUserSelect={setSelectedUserId} 
                  selectedUserId={selectedUserId}
                />
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user?.email} ({userRole})
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <DeviceInfo deviceData={mockDeviceData} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LocationTracker userId={currentUserId} />
            <CommandCenter userId={currentUserId} isAdmin={userRole === 'admin'} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CallLogs userId={currentUserId} />
            <SMSMessages userId={currentUserId} />
          </div>
        </div>
      </main>
    </div>
  );
}
