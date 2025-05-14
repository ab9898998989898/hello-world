
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from "@/components/ui/toaster";
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import DashboardPage from '@/pages/DashboardPage';
import PlaceholderPage from '@/pages/PlaceholderPage';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  DoughnutController,
  LineController
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  DoughnutController,
  LineController,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div className="min-h-screen flex flex-col gradient-bg">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
          <Navbar onToggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/campaigns" element={<PlaceholderPage title="Campaigns" />} />
                <Route path="/seo" element={<PlaceholderPage title="SEO Analytics" />} />
                <Route path="/audience" element={<PlaceholderPage title="Audience Insights" />} />
                <Route path="/reports" element={<PlaceholderPage title="Reports" />} />
                <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
                <Route path="/help" element={<PlaceholderPage title="Help & Support" />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
