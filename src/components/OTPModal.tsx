// src/components/OTPModal.tsx
import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';

interface OTPModalProps {
  email: string;
  onVerify: () => void;
  onCancel: () => void;
}

export const OTPModal: React.FC<OTPModalProps> = ({ email, onVerify, onCancel }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerify = () => {
    if (otp === '123456') {
      setError(null);
      onVerify();
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResend = () => {
    setCountdown(60);
    setOtp('');
    setError(null);
    alert(`Demo OTP sent to ${email}: 123456`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-80 shadow-md">
        <h2 className="text-xl font-bold mb-2">Two-Factor Authentication</h2>
        <p className="text-sm text-gray-600 mb-4">
          Enter the 6-digit OTP sent to <span className="font-medium">{email}</span>
        </p>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-2 text-center text-lg tracking-widest"
        />
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleVerify}>Verify OTP</Button>
        </div>

        <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
          <span>*Use OTP: 123456 for demo*</span>
          <button
            className={`text-primary-600 hover:underline ${countdown > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={countdown > 0}
            onClick={handleResend}
          >
            Resend {countdown > 0 ? `(${countdown}s)` : ''}
          </button>
        </div>
      </div>
    </div>
  );
};
