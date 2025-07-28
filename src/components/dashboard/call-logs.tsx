'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed } from 'lucide-react';

interface CallLog {
  id: string;
  type: 'incoming' | 'outgoing' | 'missed';
  number: string;
  duration: string;
  timestamp: string;
  contactName?: string;
}

interface CallLogsProps {
  userId: string;
}

export function CallLogs({ userId }: CallLogsProps) {
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching call logs from Firebase
    const mockLogs: CallLog[] = [
      {
        id: '1',
        type: 'incoming',
        number: '+1234567890',
        duration: '2:30',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        contactName: 'John Doe'
      },
      {
        id: '2',
        type: 'outgoing',
        number: '+0987654321',
        duration: '5:15',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        contactName: 'Jane Smith'
      },
      {
        id: '3',
        type: 'missed',
        number: '+1122334455',
        duration: '0:00',
        timestamp: new Date(Date.now() - 10800000).toISOString()
      }
    ];
    
    setTimeout(() => {
      setCallLogs(mockLogs);
      setLoading(false);
    }, 1000);
  }, [userId]);

  const getCallIcon = (type: string) => {
    switch (type) {
      case 'incoming':
        return <PhoneIncoming className="h-4 w-4 text-green-500" />;
      case 'outgoing':
        return <PhoneOutgoing className="h-4 w-4 text-blue-500" />;
      case 'missed':
        return <PhoneMissed className="h-4 w-4 text-red-500" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Call Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Call Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {callLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{getCallIcon(log.type)}</TableCell>
                <TableCell>{log.contactName || 'Unknown'}</TableCell>
                <TableCell>{log.number}</TableCell>
                <TableCell>{log.duration}</TableCell>
                <TableCell>
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
