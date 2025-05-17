import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Platforms from './pages/Platforms';
import Audience from './pages/Audience';
import Content from './pages/Content';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="platforms" element={<Platforms />} />
        <Route path="audience" element={<Audience />} />
        <Route path="content" element={<Content />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;