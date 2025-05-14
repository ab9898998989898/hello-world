import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Plus, 
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';
import { useTask } from '../../contexts/TaskContext';
import { useWorkspace } from '../../contexts/WorkspaceContext';
import { Button } from '../../components/ui/Button';
import { TaskCard } from '../../components/tasks/TaskCard';

export const DashboardPage: React.FC = () => {
  const { tasks, loading } = useTask();
  const { currentWorkspace } = useWorkspace();
  const navigate = useNavigate();
  
  const upcomingTasks = tasks
    .filter(task => task.status !== 'done' && task.dueDate)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 3);
  
  const recentlyCompletedTasks = tasks
    .filter(task => task.status === 'done')
    .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
    .slice(0, 3);
  
  const urgentTasks = tasks
    .filter(task => task.priority === 'urgent' && task.status !== 'done')
    .slice(0, 3);
  
  const getTaskStatusCounts = () => {
    const counts = {
      todo: 0,
      'in-progress': 0,
      review: 0,
      done: 0
    };
    
    tasks.forEach(task => {
      counts[task.status]++;
    });
    
    return counts;
  };
  
  const statusCounts = getTaskStatusCounts();
  const totalTasks = tasks.length;
  const completedTasks = statusCounts.done;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            {currentWorkspace ? `${currentWorkspace.name} workspace` : 'Welcome to your dashboard'}
          </p>
        </div>
        <Button
          onClick={() => navigate('/tasks/new')}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          New Task
        </Button>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
            <div className="p-2 bg-blue-100 rounded-full text-blue-600">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalTasks}</p>
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium">{completedTasks} completed</span> ({completionRate}%)
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
            <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{statusCounts['in-progress']}</p>
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium">{statusCounts.review} in review</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Urgent Tasks</h3>
            <div className="p-2 bg-red-100 rounded-full text-red-600">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {tasks.filter(task => task.priority === 'urgent' && task.status !== 'done').length}
          </p>
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium">
              {tasks.filter(task => task.priority === 'high' && task.status !== 'done').length} high priority
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Team Members</h3>
            <div className="p-2 bg-purple-100 rounded-full text-purple-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {currentWorkspace?.members.length || 1}
          </p>
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium">
              {currentWorkspace?.members.filter(m => m.role === 'admin').length || 0} admins
            </span>
          </div>
        </div>
      </div>
      
      {/* Task sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming tasks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              Upcoming Tasks
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/tasks?filter=upcoming')}
            >
              View all
            </Button>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : upcomingTasks.length > 0 ? (
              upcomingTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No upcoming tasks</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => navigate('/tasks/new')}
                >
                  Create a task
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Urgent tasks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
              Urgent Tasks
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/tasks?priority=urgent')}
            >
              View all
            </Button>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : urgentTasks.length > 0 ? (
              urgentTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No urgent tasks</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Recently completed */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Recently Completed
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/tasks?status=done')}
            >
              View all
            </Button>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : recentlyCompletedTasks.length > 0 ? (
              recentlyCompletedTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No completed tasks yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Activity chart - placeholder */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
            Activity Overview
          </h2>
        </div>
        
        <div className="h-64 flex items-center justify-center text-gray-500">
          <p>Activity chart would be displayed here</p>
        </div>
      </div>
    </div>
  );
};