
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart2, HelpCircle, LogOut } from 'lucide-react';
import { navItems } from '@/config/navigation';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: isOpen ? 0 : '-100%' }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      className={`fixed top-0 left-0 h-full w-64 bg-slate-900/80 backdrop-blur-md shadow-lg z-40 p-4 flex flex-col`}
    >
      <div className="flex items-center mb-8">
        <BarChart2 className="h-10 w-10 text-sky-400 mr-3" />
        <h1 className="text-2xl font-bold text-sky-100">Analytics</h1>
      </div>
      <nav className="flex-grow">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center py-3 px-4 my-1 rounded-lg text-sky-200 hover:bg-sky-700/30 sidebar-link ${location.pathname === item.path ? 'active bg-sky-600 text-white shadow-md' : ''}`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <Link
          to="/help"
          className="flex items-center py-3 px-4 my-1 rounded-lg text-sky-300 hover:bg-sky-700/30 sidebar-link"
        >
          <HelpCircle className="h-5 w-5 mr-3" />
          Help & Support
        </Link>
        <button
          className="flex items-center w-full py-3 px-4 my-1 rounded-lg text-red-400 hover:bg-red-700/30 sidebar-link"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
