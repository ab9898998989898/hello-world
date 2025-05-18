import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Share2, 
  Users, 
  BarChart3,
  FileText, 
  Settings, 
  X,
  Activity,
  HelpCircle,
  MessageSquare,
  LifeBuoy,
  LogOut
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

const sidebarVariants = {
  open: { 
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  closed: { 
    x: '-100%',
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  }
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [showHelpMenu, setShowHelpMenu] = useState(false);

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
    navigate('/');
  };

  const handleUpgrade = () => {
    // Implement upgrade logic here
    console.log('Upgrading plan...');
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.aside
        className="fixed lg:static z-30 h-screen w-56 bg-dark-900 border-r border-dark-800 flex flex-col lg:translate-x-0"
        variants={sidebarVariants}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
      >
        <div className="p-4 border-b border-dark-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg p-2">
              <Activity size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">SocialPulse</h1>
          </div>
          
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-dark-800 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-3">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-dark-800 text-white' 
                    : 'text-dark-300 hover:text-white hover:bg-dark-800'
                }`
              }
              onClick={() => isOpen && toggleSidebar()}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}

          <NavLink
            to="/messages"
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-dark-800 text-white' 
                  : 'text-dark-300 hover:text-white hover:bg-dark-800'
              }`
            }
          >
            <MessageSquare size={20} />
            <span>Messages</span>
          </NavLink>

          <NavLink
            to="/support"
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-dark-800 text-white' 
                  : 'text-dark-300 hover:text-white hover:bg-dark-800'
              }`
            }
          >
            <HelpCircle size={20} />
            <span>Support</span>
          </NavLink>
        </nav>
        
        <div className="p-4 space-y-4 border-t border-dark-800">
          <div className="bg-dark-800 p-3 rounded-lg">
            <p className="text-xs text-dark-300 mb-2">Your current plan</p>
            <div className="flex justify-between items-center">
              <span className="font-medium text-white">Pro Plan</span>
              <button 
                onClick={handleUpgrade}
                className="text-xs text-primary-400 hover:text-primary-300"
              >
                Upgrade
              </button>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-error-500 hover:bg-error-500/10"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;