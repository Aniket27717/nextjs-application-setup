'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Send, Play, Pause, RotateCcw } from 'lucide-react';
import { db } from '@/lib/firebase-init';
import { doc, setDoc } from 'firebase/firestore';

interface CommandCenterProps {
  userId: string;
  isAdmin?: boolean;
}

export function CommandCenter({ userId, isAdmin = false }: CommandCenterProps) {
  const [command, setCommand] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendCommand = async (type: string, data?: any) => {
    setLoading(true);
    try {
      const commandData = {
        type,
        data: data || command,
        timestamp: new Date().toISOString(),
        status: 'pending',
        sender: isAdmin ? 'admin' : 'user'
      };

      await setDoc(doc(db, 'commands', `${userId}_${Date.now()}`), commandData);
      
      setMessage('Command sent successfully!');
      setCommand('');
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to send command');
    } finally {
      setLoading(false);
    }
  };

  const quickCommands = [
    { label: 'Get Location', icon: Play, action: () => sendCommand('get_location') },
    { label: 'Start Tracking', icon: Play, action: () => sendCommand('start_tracking') },
    { label: 'Stop Tracking', icon: Pause, action: () => sendCommand('stop_tracking') },
    { label: 'Sync Data', icon: RotateCcw, action: () => sendCommand('sync_data') }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Command Center</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {quickCommands.map((cmd) => (
              <Button
                key={cmd.label}
                variant="outline"
                size="sm"
                onClick={cmd.action}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <cmd.icon className="h-4 w-4" />
                {cmd.label}
              </Button>
            ))}
          </div>
          
          <div className="space-y-2">
            <Textarea
              placeholder="Enter custom command..."
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              rows={3}
            />
            <Button
              onClick={() => sendCommand('custom')}
              disabled={loading || !command.trim()}
              className="w-full"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Custom Command
            </Button>
          </div>

          {message && (
            <div className={`p-3 rounded-md text-sm ${
              message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
