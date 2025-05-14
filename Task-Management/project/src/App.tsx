import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { WorkspaceProvider } from './contexts/WorkspaceContext';
import { TaskProvider } from './contexts/TaskContext';
import { AuthPage } from './pages/auth/AuthPage';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { TasksPage } from './pages/tasks/TasksPage';
import { CreateTaskPage } from './pages/tasks/CreateTaskPage';
import { EditTaskPage } from './pages/tasks/EditTaskPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <WorkspaceProvider>
          <TaskProvider>
            <Routes>
              <Route path="/login" element={<AuthPage />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              <Route path="/" element={<AppLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="tasks" element={<TasksPage />} />
                <Route path="tasks/new" element={<CreateTaskPage />} />
                <Route path="tasks/:taskId/edit" element={<EditTaskPage />} />
                
                {/* Placeholder routes for future implementation */}
                <Route path="calendar" element={<div className="p-4">Calendar coming soon</div>} />
                <Route path="team" element={<div className="p-4">Team management coming soon</div>} />
                <Route path="messages" element={<div className="p-4">Messages coming soon</div>} />
                <Route path="notifications" element={<div className="p-4">Notifications coming soon</div>} />
                <Route path="settings" element={<div className="p-4">Settings coming soon</div>} />
                <Route path="workspaces/new" element={<div className="p-4">Create workspace coming soon</div>} />
              </Route>
              
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </TaskProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;