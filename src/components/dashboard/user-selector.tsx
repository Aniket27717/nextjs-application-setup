'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase-init';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface User {
  id: string;
  email: string;
  displayName?: string;
}

interface UserSelectorProps {
  onUserSelect: (userId: string) => void;
  selectedUserId?: string;
}

export function UserSelector({ onUserSelect, selectedUserId }: UserSelectorProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersList = usersSnapshot.docs
        .filter(doc => doc.data().role === 'user')
        .map(doc => ({
          id: doc.id,
          email: doc.data().email,
          displayName: doc.data().displayName || doc.data().email
        }));
      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select value={selectedUserId} onValueChange={onUserSelect}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a user..." />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.displayName || user.email}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
