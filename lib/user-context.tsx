'use client';

import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'buyer' | 'seller' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface UserContextType {
  user: User | null;
  role: UserRole;
  login: (name: string, email: string, role: UserRole) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);

  const login = (name: string, email: string, userRole: UserRole) => {
    setUser({
      id: `user-${Date.now()}`,
      name,
      email,
      role: userRole,
    });
    setRole(userRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  const handleSetRole = (newRole: UserRole) => {
    setRole(newRole);
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        role,
        login,
        logout,
        setRole: handleSetRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
