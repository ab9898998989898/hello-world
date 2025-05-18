import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you might want logout functionality

// Placeholder for an icon, you can replace this with an actual SVG or icon component
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const Layout: React.FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout function from AuthContext

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  // This is the function you provided, used for the "Profile" link in the dropdown
  const handleProfileLinkClick = () => {
    setUserMenuOpen(false); // Close the dropdown
    navigate('/profile');   // Navigate to the profile page
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    if (logout) {
      logout(); // Call the logout function from your AuthContext
    }
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">CMS Admin</Link>
          <nav className="space-x-4">
            <Link to="/" className="text-gray-600 hover:text-primary-600">Dashboard</Link>
            <Link to="/content" className="text-gray-600 hover:text-primary-600">Content</Link>
            <Link to="/media" className="text-gray-600 hover:text-primary-600">Media</Link>
            <Link to="/settings" className="text-gray-600 hover:text-primary-600">Settings</Link>
          </nav>
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center text-gray-600 hover:text-primary-600 focus:outline-none"
            >
              <UserIcon />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-50 border border-gray-200">
                <button onClick={handleProfileLinkClick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600">
                  Profile
                </button>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-6">
        <Outlet /> {/* Child routes defined in App.tsx will render here */}
      </main>

      {/* Footer (Optional) */}
      <footer className="bg-gray-200 text-center p-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Your CMS. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;