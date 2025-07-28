'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MessageSquare } from 'lucide-react';

interface SMSMessage {
  id: string;
  type: 'sent' | 'received';
  number: string;
  message: string;
  timestamp: string;
  contactName?: string;
}

interface SMSMessagesProps {
  userId: string;
}

export function SMSMessages({ userId }: SMSMessagesProps) {
  const [messages, setMessages] = useState<SMSMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching SMS messages from Firebase
    const mockMessages: SMSMessage[] = [
      {
        id: '1',
        type: 'received',
        number: '+1234567890',
        message: 'Hey, how are you doing?',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        contactName: 'John Doe'
      },
      {
        id: '2',
        type: 'sent',
        number: '+0987654321',
        message: 'I will be there in 10 minutes',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        contactName: 'Jane Smith'
      },
      {
        id: '3',
        type: 'received',
        number: '+1122334455',
        message: 'Meeting at 3 PM today',
        timestamp: new Date(Date.now() - 7200000).toISOString()
      }
    ];
    
    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 1000);
  }, [userId]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>SMS Messages</CardTitle>
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
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          SMS Messages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    message.type === 'sent' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {message.type}
                  </span>
                </TableCell>
                <TableCell>{message.contactName || 'Unknown'}</TableCell>
                <TableCell>{message.number}</TableCell>
                <TableCell className="max-w-xs truncate">{message.message}</TableCell>
                <TableCell>
                  {new Date(message.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
