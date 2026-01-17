// src/pages/auth/LoginPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, CircleDollarSign, Building2, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';
import { OTPModal } from '../../components/OTPModal';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const { login, setRole: setAuthRole } = useAuth();
  const navigate = useNavigate();

  // Handle login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password, role);
      setAuthRole(role);
      setShowOTP(true); // Show OTP modal after login
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // OTP verification
  const handleOTPVerify = () => {
    setShowOTP(false);
    navigate(role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor');
  };

  // Fill demo credentials
  const fillDemoCredentials = (userRole: UserRole) => {
    if (userRole === 'entrepreneur') {
      setEmail('sarah@techwave.io');
      setPassword('password123');
    } else {
      setEmail('michael@vcinnovate.com');
      setPassword('password123');
    }
    setRole(userRole);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Sign in to Business Nexus</h2>
        <p className="mt-2 text-sm text-gray-600">Connect with investors and entrepreneurs</p>
      </div>

      {/* Login form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {error && (
          <div className="mb-4 bg-error-50 border border-error-500 text-error-700 px-4 py-3 rounded-md flex items-start">
            <AlertCircle size={18} className="mr-2 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`py-3 px-4 border rounded-md flex items-center justify-center transition-colors ${
                  role === 'entrepreneur'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setRole('entrepreneur')}
              >
                <Building2 size={18} className="mr-2" />
                Entrepreneur
              </button>
              <button
                type="button"
                className={`py-3 px-4 border rounded-md flex items-center justify-center transition-colors ${
                  role === 'investor'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setRole('investor')}
              >
                <CircleDollarSign size={18} className="mr-2" />
                Investor
              </button>
            </div>
          </div>

          {/* Email */}
          <Input
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            startAdornment={<User size={18} />}
          />

          {/* Password */}
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <Button type="submit" fullWidth isLoading={isLoading} leftIcon={<LogIn size={18} />}>
            Sign in
          </Button>
        </form>

        {/* Demo accounts */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 text-center mb-2">Demo Accounts</p>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => fillDemoCredentials('entrepreneur')}
              leftIcon={<Building2 size={16} />}
            >
              Entrepreneur Demo
            </Button>
            <Button
              variant="outline"
              onClick={() => fillDemoCredentials('investor')}
              leftIcon={<CircleDollarSign size={16} />}
            >
              Investor Demo
            </Button>
          </div>
        </div>

        {/* Sign up link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
            Sign up
          </Link>
        </div>
      </div>

      {/* OTP Modal */}
      {showOTP && <OTPModal email={email} onVerify={handleOTPVerify} onCancel={() => setShowOTP(false)} />}
    </div>
  );
};
