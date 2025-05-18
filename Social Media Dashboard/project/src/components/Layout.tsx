import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { motion } from 'framer-motion';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex min-h-screen bg-dark-950">
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={toggleSidebar}
          />
        )}
        <div className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="fixed inset-y-0 z-30 w-64">
          <Sidebar isOpen={true} toggleSidebar={toggleSidebar} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;