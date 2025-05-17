import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Share2, 
  Users, 
  BarChart3,
  FileText, 
  Settings,
  LogOut,
  HelpCircle,
  MessageSquare 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const navItems = [
  { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
  { name: 'Platforms', path: '/platforms', icon: <Share2 size={20} /> },
  { name: 'Audience', path: '/audience', icon: <Users size={20} /> },
  { name: 'Content', path: '/content', icon: <BarChart3 size={20} /> },
  { name: 'Reports', path: '/reports', icon: <FileText size={20} /> },
  { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    navigate('/');
  };

  const handleSupport = () => {
    // Add your support logic here
    console.log('Opening support...');
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-56 bg-dark-900 border-r border-dark-800 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-dark-800">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-primary-500 to-secondary-600 p-2 rounded-lg">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold">SocialPulse</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-dark-300 hover:bg-dark-800 hover:text-white'
                }`
              }
              onClick={() => isOpen && toggleSidebar()}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}

          {/* Support Button */}
          <button
            onClick={handleSupport}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-dark-300 hover:bg-dark-800 hover:text-white transition-colors"
          >
            <HelpCircle size={20} />
            <span>Support</span>
          </button>

          {/* Message Button */}
          <button
            onClick={() => console.log('Opening messages...')}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-dark-300 hover:bg-dark-800 hover:text-white transition-colors"
          >
            <MessageSquare size={20} />
            <span>Messages</span>
          </button>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-dark-800">
          <div className="bg-dark-800 p-3 rounded-lg mb-4">
            <p className="text-xs text-dark-300 mb-2">Current Plan</p>
            <div className="flex justify-between items-center">
              <span className="font-medium">Pro Plan</span>
              <button className="text-xs text-primary-400 hover:text-primary-300">
                Upgrade
              </button>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-error-500 hover:bg-error-500/10 transition-colors"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;