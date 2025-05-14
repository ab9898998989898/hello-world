
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const PlaceholderPage = ({ title }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="p-6"
  >
    <h1 className="text-3xl font-bold text-sky-100">{title}</h1>
    <p className="mt-4 text-sky-300">This page is under construction. Check back soon for updates!</p>
    <div className="mt-8 flex justify-center items-center h-64 bg-slate-700/30 rounded-lg">
      <Briefcase className="w-16 h-16 text-sky-500 opacity-50" />
    </div>
  </motion.div>
);

export default PlaceholderPage;
