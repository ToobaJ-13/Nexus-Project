import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Bell,
  MessageCircle,
  User,
  LogOut,
  Building2,
  CircleDollarSign,
  Video,
  FileText,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { CreditCard } from "lucide-react";


export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const dashboardRoute =
    user?.role === 'entrepreneur'
      ? '/dashboard/entrepreneur'
      : '/dashboard/investor';

  const profileRoute = user
    ? `/profile/${user.role}/${user.id}`
    : '/login';

  const navLinks = [
    {
      icon:
        user?.role === 'entrepreneur' ? (
          <Building2 size={18} />
        ) : (
          <CircleDollarSign size={18} />
        ),
      text: 'Dashboard',
      path: dashboardRoute,
    },
    {
      icon: <Video size={18} />,
      text: 'Video Call',
      path: user ? '/video-call' : '/login',
    },
    {
      icon: <FileText size={18} />,
      text: 'Documents',
      path: user ? '/documents' : '/login',
    },
    {
      icon: <MessageCircle size={18} />,
      text: 'Messages',
      path: user ? '/messages' : '/login',
    },
    {
      icon: <Bell size={18} />,
      text: 'Notifications',
      path: user ? '/notifications' : '/login',
    },
    {
      icon: <User size={18} />,
      text: 'Profile',
      path: profileRoute,
    },

    {
      icon: <CreditCard size={18} />,
      text: "Payments",
      path: "/payments",
    },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">BN</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                Business Nexus
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.text}
                  </Link>
                ))}

                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  leftIcon={<LogOut size={18} />}
                >
                  Logout
                </Button>

                <Link
                  to={profileRoute}
                  className="flex items-center space-x-2 ml-2"
                >
                  <Avatar
                    src={user.avatarUrl}
                    alt={user.name}
                    size="sm"
                    status={user.isOnline ? 'online' : 'offline'}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-3 py-2 space-y-1">
            {user ? (
              <>
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    <span className="mr-3">{link.icon}</span>
                    {link.text}
                  </Link>
                ))}

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex w-full items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <LogOut size={18} className="mr-3" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" fullWidth>
                    Log in
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button fullWidth>Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
