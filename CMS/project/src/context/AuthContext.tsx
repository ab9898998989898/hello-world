import React, { createContext, useState, useContext, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'author' | 'viewer';
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Mock user data for demo
const MOCK_USER = {
  id: '1',
  email: 'editor@example.com',
  name: 'Jane Editor',
  role: 'editor' as const,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved auth state in localStorage
    const savedUser = localStorage.getItem('cms_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would call an auth API
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email && password) {
      // Use mock data for demo
      setUser(MOCK_USER);
      localStorage.setItem('cms_user', JSON.stringify(MOCK_USER));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cms_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);