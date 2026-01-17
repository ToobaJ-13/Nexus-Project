// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserRole, Entrepreneur, Investor, AuthContextType } from '../types';
import { users } from '../data/users';
import toast from 'react-hot-toast';

// -------- CONTEXT --------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// -------- LOCAL STORAGE KEYS --------
const USER_STORAGE_KEY = 'business_nexus_user';
const RESET_TOKEN_KEY = 'business_nexus_reset_token';

// -------- PROVIDER --------
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Entrepreneur | Investor | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      const parsedUser: Entrepreneur | Investor = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(parsedUser.role);
    }
    setIsLoading(false);
  }, []);

  // -------- LOGIN --------
  const login = async (email: string, _password: string, userRole: UserRole) => {
    setIsLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1000));

      const foundUser = users.find(u => u.email === email && u.role === userRole);
      if (!foundUser) throw new Error('Invalid credentials or user not found');

      setUser(foundUser as Entrepreneur | Investor);
      setRole(foundUser.role);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(foundUser));
      toast.success('Successfully logged in!');
    } catch (err) {
      toast.error((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // -------- REGISTER --------
  const register = async (name: string, email: string, _password: string, userRole: UserRole) => {
    setIsLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1000));

      if (users.some(u => u.email === email)) throw new Error('Email already in use');

      let newUser: Entrepreneur | Investor;
      if (userRole === 'entrepreneur') {
        newUser = {
          id: `e${users.length + 1}`,
          name,
          email,
          role: 'entrepreneur',
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
          bio: '',
          isOnline: true,
          createdAt: new Date().toISOString(),
          startupName: '',
          pitchSummary: '',
          fundingNeeded: '',
          industry: '',
          location: '',
          foundedYear: new Date().getFullYear(),
          teamSize: 1
        };
      } else {
        newUser = {
          id: `i${users.length + 1}`,
          name,
          email,
          role: 'investor',
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
          bio: '',
          isOnline: true,
          createdAt: new Date().toISOString(),
          investmentInterests: [],
          investmentStage: [],
          portfolioCompanies: [],
          totalInvestments: 0,
          minimumInvestment: '0',
          maximumInvestment: '0',
          industry: '' // <-- add this line
        };
      }

      users.push(newUser);
      setUser(newUser);
      setRole(newUser.role);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      toast.success('Account created successfully!');
    } catch (err) {
      toast.error((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // -------- FORGOT PASSWORD --------
  const forgotPassword = async (email: string) => {
    try {
      await new Promise(res => setTimeout(res, 1000));

      const foundUser = users.find(u => u.email === email);
      if (!foundUser) throw new Error('No account found with this email');

      const resetToken = Math.random().toString(36).substring(2, 15);
      localStorage.setItem(RESET_TOKEN_KEY, resetToken);
      toast.success('Password reset instructions sent to your email');
    } catch (err) {
      toast.error((err as Error).message);
      throw err;
    }
  };

  // -------- RESET PASSWORD --------
  const resetPassword = async (token: string, _newPassword: string) => {
    try {
      await new Promise(res => setTimeout(res, 1000));

      const storedToken = localStorage.getItem(RESET_TOKEN_KEY);
      if (token !== storedToken) throw new Error('Invalid or expired reset token');

      localStorage.removeItem(RESET_TOKEN_KEY);
      toast.success('Password reset successfully');
    } catch (err) {
      toast.error((err as Error).message);
      throw err;
    }
  };

  // -------- LOGOUT --------
  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    toast.success('Logged out successfully');
  };

  // -------- UPDATE PROFILE (Role-Aware) --------
  const updateProfile = async (
    userId: string,
    updates: Partial<Entrepreneur> | Partial<Investor>
  ) => {
    try {
      await new Promise(res => setTimeout(res, 1000));

      const index = users.findIndex(u => u.id === userId);
      if (index === -1) throw new Error('User not found');

      const existingUser = users[index];

      // Role-aware filtering
      let filteredUpdates: Partial<Entrepreneur> | Partial<Investor> = {};
      if (existingUser.role === 'entrepreneur') {
        const allowedKeys: (keyof Entrepreneur)[] = [
          'name','avatarUrl','bio','startupName','pitchSummary','fundingNeeded','industry','location','foundedYear','teamSize'
        ];
        filteredUpdates = Object.fromEntries(
          Object.entries(updates).filter(([k]) => allowedKeys.includes(k as keyof Entrepreneur))
        ) as Partial<Entrepreneur>;
      } else if (existingUser.role === 'investor') {
        const allowedKeys: (keyof Investor)[] = [
          'name','avatarUrl','bio','investmentInterests','investmentStage','portfolioCompanies','totalInvestments','minimumInvestment','maximumInvestment'
        ];
        filteredUpdates = Object.fromEntries(
          Object.entries(updates).filter(([k]) => allowedKeys.includes(k as keyof Investor))
        ) as Partial<Investor>;
      } else {
        throw new Error('Unknown user role');
      }

      const updatedUser = { ...existingUser, ...filteredUpdates };
      users[index] = updatedUser as Entrepreneur | Investor;

      if (user?.id === userId) {
        setUser(updatedUser as Entrepreneur | Investor);
        setRole(updatedUser.role);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      }

      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error((err as Error).message);
      throw err;
    }
  };

  // -------- CONTEXT VALUE --------
  const value: AuthContextType = {
    user,
    role,
    setRole,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// -------- CUSTOM HOOK --------
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
