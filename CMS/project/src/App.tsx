import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Layout  from './components/Layout';
import Dashboard from './pages/Dashboard';
import ContentList from './pages/ContentList';
import ContentEditor from './pages/ContentEditor';
import MediaLibrary from './pages/MediaLibrary';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="content" element={<ContentList />} />
            <Route path="content/new" element={<ContentEditor />} />
            <Route path="content/edit/:id" element={<ContentEditor />} />
            <Route path="media" element={<MediaLibrary />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;