import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Settings,
  Calendar,
  MessageSquare,
  BellRing,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Plus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useWorkspace } from '../../contexts/WorkspaceContext';
import { Button } from '../ui/Button';

const SidebarLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}> = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={twMerge(
      'flex items-center px-3 py-2 rounded-md transition-colors',
      active 
        ? 'bg-blue-100 text-blue-700' 
        : 'text-gray-700 hover:bg-gray-100'
    )}
  >
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
  </Link>
);

export const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWorkspaces, setShowWorkspaces] = useState(true);
  const { currentUser, logout } = useAuth();
  const { workspaces, currentWorkspace, setCurrentWorkspace } = useWorkspace();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const closeSidebar = () => {
    setIsOpen(false);
  };
  
  const handleCreateWorkspace = () => {
    navigate('/workspaces/new');
    closeSidebar();
  };
  
  const handleWorkspaceChange = (workspace: typeof workspaces[number]) => {
    setCurrentWorkspace(workspace);
    closeSidebar();
  };
  
  const renderUserSection = () => (
    <div className="flex items-center p-4 border-t border-gray-200">
      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
        {currentUser?.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
      </div>
      <div className="flex-grow">
        <div className="font-medium text-sm text-gray-800">{currentUser?.displayName}</div>
        <div className="text-xs text-gray-500">{currentUser?.email}</div>
      </div>
      <button 
        onClick={handleLogout}
        className="text-gray-500 hover:text-gray-700"
        aria-label="Logout"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );
  
  const renderWorkspaceSection = () => (
    <div className="mb-4">
      <div 
        className="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-500 cursor-pointer"
        onClick={() => setShowWorkspaces(!showWorkspaces)}
      >
        <span>WORKSPACES</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${showWorkspaces ? 'transform rotate-180' : ''}`} />
      </div>
      
      {showWorkspaces && (
        <div className="mt-1 pl-2">
          {workspaces.map(workspace => (
            <div 
              key={workspace.id}
              className={twMerge(
                'flex items-center px-3 py-2 mx-2 text-sm rounded-md cursor-pointer',
                currentWorkspace?.id === workspace.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
              onClick={() => handleWorkspaceChange(workspace)}
            >
              <div className="w-6 h-6 rounded bg-purple-500 text-white flex items-center justify-center mr-2">
                {workspace.name[0].toUpperCase()}
              </div>
              <span className="truncate">{workspace.name}</span>
            </div>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            className="mt-1 ml-2"
            onClick={handleCreateWorkspace}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            New workspace
          </Button>
        </div>
      )}
    </div>
  );
  
  const menu = (
    <>
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          <div className="mr-2 p-1 bg-blue-500 rounded">
            <CheckSquare className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg">Taskify</span>
        </div>
        <button 
          className="md:hidden text-gray-500"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {renderWorkspaceSection()}
        
        <div className="space-y-1 mb-4">
          <SidebarLink 
            to="/dashboard" 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            label="Dashboard" 
            active={location.pathname === '/dashboard'}
          />
          <SidebarLink 
            to="/tasks" 
            icon={<CheckSquare className="w-5 h-5" />} 
            label="Tasks" 
            active={location.pathname.startsWith('/tasks')}
          />
          <SidebarLink 
            to="/calendar" 
            icon={<Calendar className="w-5 h-5" />} 
            label="Calendar" 
            active={location.pathname === '/calendar'}
          />
          <SidebarLink 
            to="/team" 
            icon={<Users className="w-5 h-5" />} 
            label="Team" 
            active={location.pathname === '/team'}
          />
          <SidebarLink 
            to="/messages" 
            icon={<MessageSquare className="w-5 h-5" />} 
            label="Messages" 
            active={location.pathname === '/messages'}
          />
          <SidebarLink 
            to="/notifications" 
            icon={<BellRing className="w-5 h-5" />} 
            label="Notifications" 
            active={location.pathname === '/notifications'}
          />
          <SidebarLink 
            to="/settings" 
            icon={<Settings className="w-5 h-5" />} 
            label="Settings" 
            active={location.pathname === '/settings'}
          />
        </div>
      </div>
      
      {renderUserSection()}
    </>
  );
  
  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded-md shadow"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>
      
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      {/* Mobile sidebar */}
      <aside
        className={twMerge(
          'md:hidden fixed inset-y-0 left-0 w-72 bg-white shadow-lg z-50 transform transition-transform',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        <div className="h-full flex flex-col">
          {menu}
        </div>
      </aside>
      
      {/* Desktop sidebar */}
      <aside
        className={twMerge(
          'hidden md:flex flex-col h-full bg-white border-r border-gray-200 w-64',
          className
        )}
      >
        {menu}
      </aside>
    </>
  );
};