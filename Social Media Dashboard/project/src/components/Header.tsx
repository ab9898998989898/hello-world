import React, { useState } from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="sticky top-0 z-40 bg-dark-900 border-b border-dark-800">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-dark-800 lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
            
            <form onSubmit={handleSearch} className="relative flex-1 max-w-xl">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-dark-800 border border-dark-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary-600 text-sm"
              />
            </form>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                className="p-2 rounded-lg hover:bg-dark-800 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-dark-900 border border-dark-800 rounded-lg shadow-lg p-4">
                  <h3 className="font-medium mb-2">Notifications</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-dark-400">No new notifications</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">Alex Morgan</p>
                  <p className="text-xs text-dark-400">Marketing Director</p>
                </div>
                
                <button 
                  className="w-9 h-9 rounded-full bg-secondary-600 flex items-center justify-center text-white"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <User size={20} />
                </button>
              </div>
              
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-dark-900 border border-dark-800 rounded-lg shadow-lg">
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 rounded hover:bg-dark-800 text-sm">
                      Profile Settings
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded hover:bg-dark-800 text-sm">
                      Account Settings
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded hover:bg-dark-800 text-sm text-error-500">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;